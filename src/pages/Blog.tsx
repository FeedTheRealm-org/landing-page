import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

function Blog() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      const postModules = import.meta.glob('/data/posts-page/**/*.md', { query: '?raw', import: 'default' });
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

    loadPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-12">Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div key={index} className="bg-gray-700 p-6 rounded">
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