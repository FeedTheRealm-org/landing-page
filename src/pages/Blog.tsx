import { useState, useEffect } from 'react';
import yaml from 'js-yaml';

function Blog() {
    const [posts, setPosts] = useState<any[]>([]);
    const [background, setBackground] = useState<string>('');

    useEffect(() => {
        const loadPosts = async () => {
            const postModules = import.meta.glob('/data/blog-page/**/metadata.yaml', { query: '?raw', import: 'default' });
            const postList = [];

            for (const path in postModules) {
                const metadataContent = await postModules[path]();
                const metadata = yaml.load(metadataContent as string) as { post: { title: string; date: string; author: string } };

                // Get the post folder path
                const postFolder = path.replace('/metadata.yaml', '');

                // Load thumbnail
                const thumbnailModules = import.meta.glob('/data/blog-page/**/imgs/thumbnail.jpg', { query: '?url', import: 'default' });
                const thumbnailPath = `${postFolder}/imgs/thumbnail.jpg`;
                let thumbnail = '';

                for (const thumbPath in thumbnailModules) {
                    if (thumbPath === thumbnailPath) {
                        thumbnail = await thumbnailModules[thumbPath]() as string;
                        break;
                    }
                }

                postList.push({
                    ...metadata.post,
                    folder: postFolder,
                    thumbnail
                });
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
                        <div
                            key={index}
                            className="bg-black/70 backdrop-blur-sm p-6 rounded cursor-pointer hover:bg-black/80 transition-all duration-300"
                            onClick={() => console.log('Navigate to post:', post.folder)}
                        >
                            {post.thumbnail && (
                                <img
                                    src={post.thumbnail}
                                    alt={post.title}
                                    className="w-full h-48 object-cover rounded mb-4"
                                />
                            )}
                            <h4 className="text-lg md:text-xl font-bold mb-2">{post.title}</h4>
                            <p className="text-sm text-gray-300 mb-1">By {post.author}</p>
                            <p className="text-sm text-gray-400">{new Date(post.date).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Blog;
