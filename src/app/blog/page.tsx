import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import readingTime from 'reading-time';
import BlogCard from './BlogCard';

function getAllBlogPosts() {
  const postsDirectory = path.join(process.cwd(), 'src/app/blog/posts');
  
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '');
    
    // Read file content
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // Extract frontmatter if present
    let content = fileContents;
    let title = id;
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
    if (title === id) {
      const titleMatch = content.match(/^# (.*$)/m);
      if (titleMatch) {
        title = titleMatch[1];
        // Remove the title if found as h1
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
    
    // Extract a simpler excerpt - take first few lines of content
    // and clean up markdown formatting thoroughly
    const firstFewLines = content.split('\n').slice(0, 6).join(' ');
    let excerpt = firstFewLines
      // HTML tags (remove all HTML tags but keep content)
      .replace(/<[^>]*>/g, '')
      // Headers
      .replace(/^#{1,6}\s+/gm, '')
      // Bold and italic
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/__(.*?)__/g, '$1')
      .replace(/_(.*?)_/g, '$1')
      // Links (markdown format)
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)\([^)]+\)/g, '$1')
      // Code
      .replace(/`([^`]+)`/g, '$1')
      .replace(/```[\s\S]*?```/g, '')
      .replace(/~~~[\s\S]*?~~~/g, '')
      // Lists
      .replace(/^[\s]*[-*+]\s+/gm, '')
      .replace(/^[\s]*\d+\.\s+/gm, '')
      // Blockquotes
      .replace(/^>\s*/gm, '')
      // Horizontal rules
      .replace(/^[\s]*[-*_]{3,}[\s]*$/gm, '')
      // Strikethrough
      .replace(/~~(.*?)~~/g, '$1')
      // Tables
      .replace(/\|[\s\S]*?\|/g, '')
      // Clean up extra whitespace and line breaks
      .replace(/\n{3,}/g, '\n\n')
      .replace(/\n/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .replace(/^\s+|\s+$/g, '')
      .trim();

    // Limit length and add ellipsis if needed
    if (excerpt.length > 200) {
      excerpt = excerpt.substring(0, 197) + '...';
    }

    const read = readingTime(content);
    
    return {
      id,
      title,
      excerpt,
      date, // Store the original date string for sorting
      formattedDate, // Store the formatted date for display
      readingTimeText: read.text
    };
  }).sort((a, b) => (a.date > b.date ? -1 : 1)); // Sort by date, newest first
}


export default function BlogIndex() {
  const allPosts = getAllBlogPosts();

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1>Blog Posts</h1>

      {allPosts.length === 0 ? (
        <p>No blog posts found.</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '40px'
        }}>
          {allPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}

      <hr />
      <p><Link href="/">← Back to home</Link></p>
    </div>
  );
}