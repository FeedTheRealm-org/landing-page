import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import yaml from 'js-yaml';
import { dataBasePath } from '../services/config';

function BlogPost() {
  const { date } = useParams<{ date: string }>();
  const [post, setPost] = useState<{
    title: string;
    date: string;
    author: string;
    content: string;
  } | null>(null);
  const [background, setBackground] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      if (!date) {
        setError('No date provided');
        setLoading(false);
        return;
      }

        try {
          // Load metadata
          const metaRes = await fetch(`${dataBasePath}/blog-page/${date}/metadata.yaml`);
          if (!metaRes.ok) throw new Error('metadata not found');
          const metaText = await metaRes.text();
          const metadata = yaml.load(metaText as string) as {
            post: { title: string; date: string; author: string }
          };

          // Load post content
          const contentRes = await fetch(`${dataBasePath}/blog-page/${date}/post.md`);
          if (!contentRes.ok) throw new Error('content not found');
          const content = await contentRes.text();

          // Load background (optional)
          let backgroundUrl = '';
          try {
            const bgRes = await fetch(`${dataBasePath}/blog-page/${date}/background.jpg`);
            if (bgRes.ok) backgroundUrl = `${dataBasePath}/blog-page/${date}/background.jpg`;
            else {
              // fallback to blog page background
              const blogBgRes = await fetch(`${dataBasePath}/blog-page/background.jpg`);
              if (blogBgRes.ok) backgroundUrl = `${dataBasePath}/blog-page/background.jpg`;
            }
          } catch (e) {
            // ignore
          }

          setPost({
            ...metadata.post,
            content
          });
          setBackground(backgroundUrl);
          setLoading(false);
        } catch (err) {
        console.error('Error loading post:', err);
        setError('Post not found');
        setLoading(false);
      }
    };

    loadPost();
  }, [date]);

  // Format date manually to avoid timezone issues
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${parseInt(month)}/${parseInt(day)}/${year}`;
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (error || !post) {
    return (
      <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography color="error">{error || 'Post not found'}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
      <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.6))' }} />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, py: 8 }}>
        <Box sx={{ maxWidth: 900, mx: 'auto' }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>{post.title}</Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 3, color: 'text.secondary' }}>
            <span>By {post.author}</span>
            <span>{formatDate(post.date)}</span>
          </Box>
          <Paper sx={{ p: 4, bgcolor: 'rgba(20,16,24,0.6)' }}>
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">{children}</h2>,
                h2: ({ children }) => <h3 className="text-xl md:text-2xl font-bold mb-3 text-white mt-8">{children}</h3>,
                h3: ({ children }) => <h4 className="text-lg md:text-xl font-semibold mb-2 text-white mt-6">{children}</h4>,
                p: ({ children }) => <p className="text-gray-200 mb-4 leading-relaxed">{children}</p>,
                ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2 text-gray-200">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-200">{children}</ol>,
                li: ({ children }) => <li className="text-gray-200">{children}</li>,
                strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                em: ({ children }) => <em className="italic text-gray-300">{children}</em>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-300 my-4">
                    {children}
                  </blockquote>
                ),
                code: ({ children }) => (
                  <code className="bg-gray-800 px-2 py-1 rounded text-sm font-mono text-green-400">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-gray-800 p-4 rounded overflow-x-auto my-4">
                    {children}
                  </pre>
                ),
                img: ({ src, alt, ...props }) => {
                  // Transform relative image paths to absolute paths
                  let imageSrc = src;
                  if (src && src.startsWith('./imgs/')) {
                      imageSrc = `${dataBasePath}/blog-page/${date}/imgs/${src.substring(7)}`;
                    }
                  return <img src={imageSrc} alt={alt} {...props} className="rounded-lg max-w-full h-auto my-4" />;
                },
              }}
            >
                {post.content}
              </ReactMarkdown>
            </Paper>
          </Box>
        </Container>
      </Box>
  );
}

export default BlogPost;