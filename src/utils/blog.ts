import fs from 'fs';
import path from 'path';
import readingTime from 'reading-time';

export function getRecentBlogPosts() {
    const postsDirectory = path.join(process.cwd(), 'src/app/blog/posts');
    
    if (!fs.existsSync(postsDirectory)) {
      console.error('Blog posts directory does not exist:', postsDirectory);
      return [];
    }
    
    try {
      const fileNames = fs.readdirSync(postsDirectory);
      const posts = fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map(fileName => {
          const id = fileName.replace(/\.md$/, '');
          
          try {
            // Read file content to extract title
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            
            // Extract frontmatter
            let frontmatter = null;
            const frontmatterMatch = fileContents.match(/^---\s*([\s\S]*?)---\s*/m);
            
            if (frontmatterMatch) {
              frontmatter = frontmatterMatch[1];
            }
            
            // Check for frontmatter date
            let date;
            if (frontmatter) {
              const dateMatch = frontmatter.match(/date:\s*['"]?(\d{4}-\d{2}-\d{2})['"]?/m);
              if (dateMatch) {
                date = dateMatch[1];
              }
            }
            
            // Fall back to file modification time if no date in frontmatter
            if (!date) {
              const stats = fs.statSync(fullPath);
              date = stats.mtime.toISOString().split('T')[0];
            }
            
            // Format the date
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
            
            // Extract title from frontmatter or first h1 tag
            let title = '';
            
            if (frontmatter) {
              const titleMatch = frontmatter.match(/title:\s*['"]?(.*?)['"]?(\n|$)/m);
              if (titleMatch && titleMatch[1]) {
                title = titleMatch[1].trim();
                // console.log(`Found title in frontmatter for ${id}:`, title);
              }
            }
            
            // If no title in frontmatter, look for H1 heading
            if (!title) {
              const h1Match = fileContents.match(/^#\s+(.*?)(\n|$)/m);
              if (h1Match && h1Match[1]) {
                title = h1Match[1].trim();
                // console.log(`Found title in H1 for ${id}:`, title);
              }
            }
            
            // Fall back to file name if no title found
            if (!title) {
              title = id.replace(/-/g, ' ');
              // console.log(`Using filename as title for ${id}:`, title);
            }
            
            // Extract content after frontmatter
            let content = fileContents;
            if (frontmatterMatch) {
              content = fileContents.substring(frontmatterMatch[0].length).trim();
            }
            
            // Extract an excerpt
            content = content.replace(/^#\s+.*$/m, '').trim(); // Remove H1 title
            
            // Attempt to find the first paragraph
            let excerpt = '';
            const paragraphMatch = content.match(/^([^#\n][^\n]+)(?:\n|$)/m);
            
            if (paragraphMatch) {
              excerpt = paragraphMatch[1];
            } else {
              excerpt = content.split(/\n+/)[0] || '';
            }
            
            // Clean up markdown syntax
            excerpt = excerpt
              .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markdown
              .replace(/\*(.*?)\*/g, '$1')     // Remove italic markdown
              .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Replace links with just text
              .replace(/`([^`]+)`/g, '$1')     // Remove code formatting
              .trim();
            
            // Limit length and add ellipsis if needed
            if (excerpt.length > 150) {
              excerpt = excerpt.substring(0, 147) + '...';
            }
            
            const read = readingTime(content);
            
            return {
              id,
              title,
              excerpt,
              date,
              formattedDate,
              readingTimeText: read.text
            };
          } catch (err) {
            console.error(`Error processing blog post ${fileName}:`, err);
            return {
              id,
              title: id.replace(/-/g, ' '),
              excerpt: 'Error loading blog post',
              date: new Date().toISOString().split('T')[0],
              formattedDate: 'Unknown date'
            };
          }
        });
      
      // Sort by date, newest first
      return posts
        .sort((a, b) => (a.date > b.date ? -1 : 1));
    } catch (err) {
      console.error('Error getting blog posts:', err);
      return [];
    }
  }