'use client';

import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  formattedDate: string;
  readingTimeText: string;
}

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        padding: "20px",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        cursor: "pointer",
        minHeight: "200px",
        display: "flex",
        flexDirection: "column"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
      }}
    >
      <Link href={`/blog/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <h2 style={{ margin: "0 0 10px 0", fontSize: "18px", lineHeight: "1.3" }}>{post.title}</h2>
      </Link>
      <p className="blog-meta" style={{
        margin: "0 0 12px 0",
        color: '#666',
        fontSize: '0.85em',
        fontStyle: 'italic'
      }}>
        {post.formattedDate} · {post.readingTimeText}
      </p>
      <p className="project-excerpt" style={{
        margin: 0,
        color: '#555',
        fontSize: '14px',
        lineHeight: '1.5',
        flex: '1',
        display: '-webkit-box',
        WebkitLineClamp: 4,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      }}>
        {post.excerpt}
      </p>
    </div>
  );
}
