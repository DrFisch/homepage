import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

export default function Blog({ posts }) {
    return (
      <div className="container mx-auto px-4 py-12 ">
        <h1 className="text-5xl font-bold text-center mb-10 text-black dark:text-white">Blog</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="border rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
            >
              <Link href={`/blog/${post.slug}`}>
                <img
                  src={`/images/${post.slug}.png`}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">{post.date}</p>
                  <p className="text-gray-700 dark:text-gray-300">{post.excerpt}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }

export async function getStaticProps() {
    const postsDirectory = path.join(process.cwd(), 'data/posts');
    const filenames = fs.readdirSync(postsDirectory);
  
    const posts = filenames.map((filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
  
      return {
        slug: filename.replace(/\.md$/, ''),
        ...data,
      };
    });
  
    // Sortiere die Blogposts nach Datum und Uhrzeit (neueste zuerst)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  
    return {
      props: {
        posts,
      },
    };
  }
  
