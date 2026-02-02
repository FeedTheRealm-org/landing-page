import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import yaml from 'js-yaml';

function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [backgroundUpper, setBackgroundUpper] = useState<string>('');
  const [backgroundLower, setBackgroundLower] = useState<string>('');

  useEffect(() => {
    // Load posts
    const loadPosts = async () => {
      const postModules = import.meta.glob('/data/blog-page/**/*.md', { query: '?raw', import: 'default' });
      const postList = [];
      for (const path in postModules) {
        const content = await postModules[path]();
        const date = path.split('/')[3];
        postList.push({ date, content, path });
      }
      // Sort by date descending
      postList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setPosts(postList.slice(0, 3)); // Latest 3
    };

    // Load videos
    const loadVideos = async () => {
      const videoModule = await import('/data/media-page/videos.yaml?raw');
      const data = yaml.load(videoModule.default) as { links: string[] };
      setVideos(data.links.slice(0, 3)); // Latest 3
    };

    // Load images
    const loadImages = async () => {
      const imageModules = import.meta.glob('/data/media-page/imgs/*', { query: '?url', import: 'default' });
      const imageList: string[] = [];
      for (const path in imageModules) {
        const url = await imageModules[path]() as string;
        imageList.push(url);
      }
      setImages(imageList.slice(0, 3)); // Latest 3
    };

    // Load background image
    // const loadBackground = async () => {
    //   try {
    //     const bgModule = await import('/data/home-page/background.jpg?url');
    //     setBackground(bgModule.default);
    //   } catch (e) {
    //     // Background not found, use default
    //   }
    // };

    // Load background images
    const loadBackgrounds = async () => {
      const upperModule = await import('/data/home-page/background-upper.jpg?url');
      const lowerModule = await import('/data/home-page/background-lower.jpg?url');
      setBackgroundUpper(upperModule.default);
      setBackgroundLower(lowerModule.default);
    };

    loadPosts();
    loadVideos();
    loadImages();
    loadBackgrounds();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${backgroundUpper})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        <div className="relative text-center z-10 px-4">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">Feed the Realm</h2>
          <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto">The ultimate MMO experience with world creation tools</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-lg font-semibold transition">Download Player</button>
            <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-lg font-semibold transition">Download Creator</button>
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="py-20 bg-cover bg-center relative" style={{ backgroundImage: `url(${backgroundLower})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h3 className="text-2xl md:text-4xl font-bold text-center mb-12 text-white">Latest Posts</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <div key={index} className="bg-black/70 backdrop-blur-sm p-6 rounded text-white">
                <h4 className="text-lg md:text-xl font-bold mb-4">{post.date}</h4>
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/blog" className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-white">Show More</Link>
          </div>
        </div>
      </section>

      {/* Latest Media */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl md:text-4xl font-bold text-center mb-12">Latest Media</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <div key={index} className="aspect-video">
                <iframe src={`https://www.youtube.com/embed/${video.split('v=')[1]}`} className="w-full h-full" frameBorder="0" allowFullScreen></iframe>
              </div>
            ))}
            {images.map((image, index) => (
              <img key={index} src={image} alt={`Media ${index}`} className="w-full h-auto" />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/media" className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded">Show More</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;