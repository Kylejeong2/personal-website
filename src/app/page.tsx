import Link from 'next/link';
import Image from 'next/image';
import { getRecentBlogPosts } from '@/utils/blog';

export default function Home() {
  const recentPosts = getRecentBlogPosts();
  // console.log('Blog posts:', recentPosts); // Debug log
  
  return (
    <div style={{ maxWidth: "650px", margin: "0 auto", padding: "20px", position: "relative" }}>
      <div style={{ position: "absolute", top: "20px", right: "20px" }}>
        <div style={{ 
          width: "80px", 
          height: "80px", 
          backgroundColor: "white",
          padding: "4px",
          borderRadius: "5px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
          overflow: "hidden"
        }}>
          <Image 
            src="/pictures/Headshot.png" 
            alt="Kyle Jeong's headshot" 
            width={72} 
            height={72} 
            style={{ 
              borderRadius: "3px",
              objectFit: "cover",
              width: "100%",
              height: "100%"
            }}
          />
        </div>
      </div>

      <h1>Kyle Jeong</h1>
      <p>Engineer | Founder | Student</p>
      
      <p className="social-links">
        <a href="https://github.com/Kylejeong2" target="_blank" rel="noopener noreferrer" title="GitHub">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </span>
        </a>
        <a href="https://www.linkedin.com/in/kyle-jeong/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </span>
        </a>
        <a href="https://twitter.com/kylejeong21" target="_blank" rel="noopener noreferrer" title="Twitter">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
            </svg>
          </span>
        </a>
      </p>
      
      <nav className="nav-menu">
        <a href="#about">About</a>
        <a href="#experience">Experience</a>
        <a href="#projects">Projects</a>
        <a href="#blog">Blog</a>
        <a href="#contact">Contact</a>
      </nav>

      <hr />

      <h2 id="about">About</h2>
      <p>
        Hey, I&apos;m Kyle. I am 20 years old and I&apos;m currently in LA (for school), but will be in SF this summer. 
        I&apos;m a student at UCLA studying Math and CS and looking to either be an engineer at a fast growing startup or start my own.
        In my free time, I enjoy going to the gym and listening to house music.
      </p>

      <div style={{ marginTop: "15px", marginBottom: "20px" }}>
        <h3>Watering My GitHub Grass</h3>
        <div style={{ 
          backgroundColor: "white", 
          padding: "10px", 
          borderRadius: "5px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.12)", 
          overflowX: "auto" 
        }}>
          <Image 
            src="https://ghchart.rshah.org/Kylejeong2" 
            alt="Kyle Jeong's GitHub Contributions" 
            width={800}
            height={150}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>

      <h2 id="experience">Experience</h2>
      <p>
        <b>Engineering & Growth</b>, <a href="https://browserbase.com" target="_blank" rel="noopener noreferrer">Browserbase</a><br />
        March 2025 - Present<br />
        Giving AI agents a browser.
      </p>
      <p>
        <b>Engineering Fellow</b>, <a href="https://browserbase.com" target="_blank" rel="noopener noreferrer">Kleiner Perkins</a><br />
        June 2025 - Present<br />
        KP fellow
      </p>
      <p>
        <b>Growth</b>, <a href="https://excessive-pound-7e1.notion.site/Nexus-116f0e56bcf380098f71e857ab5e0f2b?pvs=74" target="_blank" rel="noopener noreferrer">Nexus</a><br />
        2025<br />
        Writing the newsletter, helping connect builders, and scaling startup culture in Socal. Backed by Soma Capital, Pear VC, the 1517 Fund, + more.
      </p>

      <p>
        <b>Software Engineer</b>, <a href="https://withpace.com" target="_blank" rel="noopener noreferrer">Pace</a><br />
        Jan-Mar 2025<br />
        Building multi-purpose web agents for insurance companies.
      </p>

      <p>
        <b>Founder, President</b>, <a href="https://vestucla.com" target="_blank" rel="noopener noreferrer">VEST at UCLA<br /></a>
        2024-Present<br />
        Building the startup/builder community for UCLA.
      </p>

      <p>
        <b>Software Engineer</b>, <a href="https://lookbk.com" target="_blank" rel="noopener noreferrer">Lookbk</a><br />
        Fall 2024<br />
        Building Shazam for clothes.
      </p>

      <h2 id="projects">Projects</h2>
      <ul className="project-list">
      <li className="project-item active" data-filter-item>
          <a href="https://github.com/Kylejeong2/mcpvals" target="_blank">
            <h3 className="project-title">Mcpvals</h3>
            <p className="project-category">Evaluation library for MCP servers</p>
          </a>
        </li>
      <li className="project-item active" data-filter-item>
          <a href="https://salesbench.dev" target="_blank">
            <h3 className="project-title">Salesbench</h3>
            <p className="project-category">Benchmarking foundation models on their ability to sell insurance</p>
          </a>
        </li>
      
      <li className="project-item active" data-filter-item>
          <a href="https://github.com/browserbase/mcp-server-browserbase" target="_blank">
            <h3 className="project-title">Browserbase MCP Server</h3>
            <p className="project-category">Main contributor, 2.1k Github Stars, 50k+ Downloads</p>
          </a>
        </li>

        <li className="project-item active" data-filter-item>
          <a href="https://github.com/browserbase/stagehand" target="_blank">
            <h3 className="project-title">Stagehand</h3>
            <p className="project-category">Automate the web with natural language, 15k Github Stars</p>
          </a>
        </li>

        <li className="project-item active" data-filter-item>
          <a href="https://github.com/Kylejeong2/graham" target="_blank">
            <h3 className="project-title">Graham</h3>
            <p className="project-category">a phone agents for SMBs</p>
          </a>
        </li>
        <li className="project-item active" data-filter-item>
          <a href="https://github.com/Kylejeong2/UCLA-Wildfires" target="_blank">
            <h3 className="project-title">Westwood Wildfires</h3>
            <p className="project-category">Realtime Dashboard to see LA Wildfires</p>
          </a>
        </li>
        <li className="project-item active" data-filter-item>
          <a href="https://github.com/Kylejeong2/Github-Wrapped" target="_blank">
            <h3 className="project-title">Github Wrapped</h3>
            <p className="project-category">See your year on github</p>
          </a>
        </li>
      </ul>

      <h2 id="blog">Blog</h2>
      <p>
        Check out my <Link href="/blog">blog</Link> where I write about tech, projects, and other topics.
      </p>
      
      {recentPosts && recentPosts.length > 0 && (
        <ul className="project-list">
          {recentPosts.map(post => (
            <li key={post.id} className="project-item active" data-filter-item>
              <Link href={`/blog/${post.id}`}>
                <h3 className="project-title">{post.title || 'Untitled Post'}</h3>
                <p className="project-category">{post.formattedDate}</p>
                <p className="project-excerpt">{post.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <h2 id="contact">Contact</h2>
      <p>
        <b>Email:</b> <a href="mailto:kylejeong@g.ucla.edu">kylejeong@g.ucla.edu</a><br />
        <b>Twitter:</b> <a href="https://twitter.com/kylejeong21" target="_blank" rel="noopener noreferrer">@kylejeong21</a><br />
        <b>Location:</b> Sometimes in Los Angeles, sometimes in San Francisco
      </p>

      <hr />

      <p>© {new Date().getFullYear()} Kyle Jeong</p>
    </div>
  );
}
