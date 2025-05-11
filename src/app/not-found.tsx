import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ maxWidth: "650px", margin: "0 auto", padding: "20px", textAlign: "center" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist or has been moved.</p>
      <p style={{ marginTop: "20px" }}>
        <Link href="/" style={{ textDecoration: "underline" }}>
          Return to Home
        </Link>
      </p>
    </div>
  );
}
