import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { marked } from 'marked';

// Configure marked options
marked.setOptions({
  gfm: true,        // GitHub Flavored Markdown
  breaks: true,     // Convert \n to <br>
  pedantic: false,  // Don't be too strict with markdown spec
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

export default function BlogPost({ params }: { params: { blogId: string } }) {
  const { blogId } = params;
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
  
  // Convert markdown to HTML using marked
  const htmlContent = marked(content);
  
  return (
    <div style={{ maxWidth: "650px", margin: "0 auto", padding: "20px" }}>
       <p>
        <Link href="/">← Back to home</Link> | <Link href="/blog">All posts</Link>
      </p>
      <h1>{title}</h1>
      <p className="post-date">{formattedDate}</p>
      <article>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </article>
      <hr />
    </div>
  );
} 