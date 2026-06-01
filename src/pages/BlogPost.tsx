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
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        backgroundImage: background
          ? `radial-gradient(circle at top left, rgba(106, 228, 255, 0.12), transparent 40%), radial-gradient(circle at 80% 0%, rgba(245, 180, 74, 0.12), transparent 35%), linear-gradient(160deg, rgba(12, 10, 20, 0.88), rgba(8, 7, 12, 0.9)), url(${background})`
          : 'radial-gradient(circle at top left, rgba(106, 228, 255, 0.12), transparent 40%), radial-gradient(circle at 80% 0%, rgba(245, 180, 74, 0.12), transparent 35%), linear-gradient(160deg, rgba(12, 10, 20, 0.98), rgba(8, 7, 12, 0.98))',
        backgroundSize: background ? 'cover' : undefined,
        backgroundPosition: background ? 'center' : undefined,
        backgroundRepeat: background ? 'no-repeat' : undefined,
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, py: { xs: 6, md: 8 } }}>
        <Box sx={{ maxWidth: 900, mx: 'auto' }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 700, fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}
          >
            {post.title}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 3, color: 'text.secondary', flexWrap: 'wrap', fontSize: { xs: '0.95rem', sm: '1rem' } }}>
            <span>By {post.author}</span>
            <span>{formatDate(post.date)}</span>
          </Box>
          <Paper sx={{ p: { xs: 2, sm: 3, md: 4 }, bgcolor: 'rgba(20,16,24,0.6)' }}>
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <Typography
                    variant="h4"
                    component="h2"
                    sx={{ fontWeight: 700, mt: 3, mb: 2, fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' } }}
                  >
                    {children}
                  </Typography>
                ),
                h2: ({ children }) => (
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{ fontWeight: 700, mt: 4, mb: 1.5, fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.75rem' } }}
                  >
                    {children}
                  </Typography>
                ),
                h3: ({ children }) => (
                  <Typography
                    variant="h6"
                    component="h4"
                    sx={{ fontWeight: 700, mt: 3, mb: 1, fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' } }}
                  >
                    {children}
                  </Typography>
                ),
                p: ({ children }) => <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.8 }}>{children}</Typography>,
                ul: ({ children }) => <Box component="ul" sx={{ pl: 3, mb: 2, color: 'text.secondary' }}>{children}</Box>,
                ol: ({ children }) => <Box component="ol" sx={{ pl: 3, mb: 2, color: 'text.secondary' }}>{children}</Box>,
                li: ({ children }) => <Typography component="li" variant="body1" sx={{ color: 'text.secondary', mb: 0.5 }}>{children}</Typography>,
                strong: ({ children }) => <Box component="strong" sx={{ color: 'text.primary', fontWeight: 700 }}>{children}</Box>,
                em: ({ children }) => <Box component="em" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>{children}</Box>,
                blockquote: ({ children }) => (
                  <Box sx={{ borderLeft: '4px solid rgba(106,228,255,0.55)', pl: 2, my: 2, color: 'text.secondary', fontStyle: 'italic' }}>
                    {children}
                  </Box>
                ),
                code: ({ children }) => (
                  <Box component="code" sx={{ bgcolor: 'rgba(255,255,255,0.06)', px: 0.8, py: 0.2, borderRadius: 1, fontSize: '0.875rem', fontFamily: 'monospace', color: 'secondary.main' }}>
                    {children}
                  </Box>
                ),
                pre: ({ children }) => (
                  <Box component="pre" sx={{ bgcolor: 'rgba(255,255,255,0.06)', p: 2, borderRadius: 2, overflowX: 'auto', my: 2 }}>
                    {children}
                  </Box>
                ),
                img: ({ src, alt, ...props }) => {
                  // Transform relative image paths to absolute paths
                  let imageSrc = src;
                  if (src && src.startsWith('./imgs/')) {
                    imageSrc = `${dataBasePath}/blog-page/${date}/imgs/${src.substring(7)}`;
                  }
                  return <Box component="img" src={imageSrc} alt={alt} {...props} sx={{ borderRadius: 2, maxWidth: '100%', height: 'auto', my: 2 }} />;
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