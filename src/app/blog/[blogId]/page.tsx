import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import hljs from 'highlight.js';
import sanitizeHtml from 'sanitize-html';
import readingTime from 'reading-time';
import { marked } from 'marked';
import GithubSlugger from 'github-slugger';

function ImageModal() {
  return (
    <>
      <div id="imageModal" className="image-modal" style={{ display: 'none' }}>
        <div className="image-modal-backdrop"></div>
        <div className="image-modal-content">
          <button className="image-modal-close">&times;</button>
          <img id="modalImage" alt="" style={{ display: 'none' }} />
        </div>
      </div>
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', function() {
            const modal = document.getElementById('imageModal');
            const modalImg = document.getElementById('modalImage');
            const closeBtn = document.querySelector('.image-modal-close');
            const backdrop = document.querySelector('.image-modal-backdrop');
            
            // Make all article images clickable
            document.querySelectorAll('article img').forEach(img => {
              img.style.cursor = 'pointer';
              img.addEventListener('click', function() {
                modal.style.display = 'flex';
                modalImg.src = this.src;
                modalImg.alt = this.alt;
                modalImg.style.display = 'block';
                document.body.style.overflow = 'hidden';
              });
            });
            
            // Close modal functions
            function closeModal() {
              modal.style.display = 'none';
              modalImg.style.display = 'none';
              modalImg.src = '';
              document.body.style.overflow = 'auto';
            }
            
            closeBtn.addEventListener('click', closeModal);
            backdrop.addEventListener('click', closeModal);
            
            // Close on escape key
            document.addEventListener('keydown', function(e) {
              if (e.key === 'Escape' && modal.style.display === 'flex') {
                closeModal();
              }
            });
          });
        `
      }} />
    </>
  );
}

// Configure marked
marked.setOptions({
  gfm: true,
  breaks: true,
  pedantic: false
});

export function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'src/app/blog/posts');
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map(fileName => ({
    blogId: fileName.replace(/\.md$/, '')
  }));
}

export default async function BlogPost({ params }: { params: Promise<{ blogId: string }> }) {
  const { blogId } = await params;
  const postsDirectory = path.join(process.cwd(), 'src/app/blog/posts');
  const fullPath = path.join(postsDirectory, `${blogId}.md`);
  
  if (!fs.existsSync(fullPath)) {
    notFound();
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  // Extract frontmatter if present
  let content = fileContents;
  let title = blogId;
  let date = '';
  
  // Look for frontmatter
  const frontmatterMatch = fileContents.match(/^---\s*([\s\S]*?)---\s*/m);
  if (frontmatterMatch) {
    // Extract the content after frontmatter
    content = fileContents.substring(frontmatterMatch[0].length).trim();
    
    // Extract title from frontmatter
    const titleMatch = frontmatterMatch[1].match(/title:\s*['"]?(.*?)['"]?(\s*$|\s*\n)/m);
    if (titleMatch) {
      title = titleMatch[1];
    }
    
    // Extract date from frontmatter
    const dateMatch = frontmatterMatch[1].match(/date:\s*['"]?(\d{4}-\d{2}-\d{2})['"]?/m);
    if (dateMatch) {
      date = dateMatch[1];
    }
  }
  
  // If no title in frontmatter, look for the first h1 tag
  if (title === blogId) {
    const titleMatch = content.match(/^# (.*$)/m);
    if (titleMatch) {
      title = titleMatch[1];
      // Remove the title from content as we'll display it separately
      content = content.replace(/^# .*$/m, '').trim();
    }
  }
  
  // If no date was found in frontmatter, use file modification time
  if (!date) {
    const stats = fs.statSync(fullPath);
    date = stats.mtime.toISOString().split('T')[0];
  }
  
  // Format the date properly
  let formattedDate = '';
  if (date) {
    // Split the date string directly to avoid timezone issues
    const [year, month, day] = date.split('-').map(num => parseInt(num, 10));
    
    // Use explicit date parts to create the formatted date
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    formattedDate = `${months[month - 1]} ${day}, ${year}`;
  }

  // Build TOC from headings manually
  const headings: { depth: number, text: string, id: string }[] = [];
  const slugger = new GithubSlugger();
  
  // Extract headings with regex
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const depth = match[1].length;
    const text = match[2].trim();
    const id = slugger.slug(text);
    
    if (depth <= 3) { // Only include h1-h3 in TOC
      headings.push({ depth, text, id });
    }
  }

  // Reading time
  const read = readingTime(content);

  // Process content - add IDs to headings
  let processedContent = content.replace(headingRegex, (match, hashes, title) => {
    const id = slugger.slug(title.trim());
    return `${hashes} <a id="${id}"></a>${title}`;
  });

  // Add syntax highlighting with highlight.js
  processedContent = processedContent.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    const language = lang || 'plaintext';
    const validLang = hljs.getLanguage(language) ? language : 'plaintext';
    const highlighted = hljs.highlight(code, { language: validLang }).value;
    return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`;
  });

  // Convert markdown to HTML
  const rawHtml = marked(processedContent) as string;
  
  // Sanitize HTML
  const htmlContent = sanitizeHtml(rawHtml, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      'img', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre', 'code', 'span', 'kbd', 'table', 'thead', 'tbody', 'tr', 'th', 'td'
    ]),
    allowedAttributes: {
      '*': ['id', 'class'],
      a: ['href', 'name', 'target', 'rel', 'id'],
      img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
      code: ['class'],
      span: ['class']
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }, true),
    },
  });
  
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
       <p>
        <Link href="/">← Back to home</Link> | <Link href="/blog">All posts</Link>
      </p>
      <h1>{title}</h1>
      <p className="post-date">{formattedDate} · {read.text}</p>
      {headings.length > 1 && (
        <nav className="toc">
          <strong>Contents</strong>
          <ul>
            {headings.map(item => (
              <li key={item.id} className={`depth-${item.depth}`}>
                <a href={`#${item.id}`}>{item.text}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <article style={{ marginTop: "2rem", marginBottom: "2rem" }}>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </article>
      <hr />
      <ImageModal />
    </div>
  );
}