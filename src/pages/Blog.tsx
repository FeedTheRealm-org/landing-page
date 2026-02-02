import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

function Blog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [background, setBackground] = useState<string>('');

  useEffect(() => {
    const loadPosts = async () => {
      const postModules = import.meta.glob('/data/blog-page/**/*.md', { query: '?raw', import: 'default' });
      const postList = [];
      for (const path in postModules) {
        const content = await postModules[path]();
        const date = path.split('/')[3];
        postList.push({ date, content });
      }
      // Sort by date descending
      postList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setPosts(postList);
    };

    const loadBackground = async () => {
      const bgModule = await import('/data/blog-page/background.jpg?url');
      setBackground(bgModule.default);
    };

    loadPosts();
    loadBackground();
  }, []);

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: `url(${background})` }}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
      <div className="container mx-auto px-4 py-20 relative z-10 text-white">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-12">Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div key={index} className="bg-black/70 backdrop-blur-sm p-6 rounded">
              <h4 className="text-lg md:text-xl font-bold mb-4">{post.date}</h4>
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;