import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kylejeong.com';
  
  // Get all blog posts
  const postsDirectory = path.join(process.cwd(), 'src/app/blog/posts');
  let blogPosts: MetadataRoute.Sitemap = [];
  
  if (fs.existsSync(postsDirectory)) {
    const fileNames = fs.readdirSync(postsDirectory);
    blogPosts = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        const id = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        
        // Extract date from frontmatter if available
        let lastModified = new Date();
        const dateMatch = fileContents.match(/date:\s*['"]?(\d{4}-\d{2}-\d{2})['"]?/m);
        if (dateMatch) {
          lastModified = new Date(dateMatch[1]);
        } else {
          // Fall back to file modification time
          const stats = fs.statSync(fullPath);
          lastModified = stats.mtime;
        }
        
        return {
          url: `${siteUrl}/blog/${id}`,
          lastModified,
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        };
      });
  }
  
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogPosts,
  ];
}

