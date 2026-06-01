import { useState, useEffect } from 'react';
import yaml from 'js-yaml';
import { dataBasePath } from '../services/config';
import PostCard from '../components/PostCard';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Blog() {
    const [posts, setPosts] = useState<any[]>([]);
    const [background, setBackground] = useState<string>('');

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const manifestRes = await fetch(`${dataBasePath}/blog-page/manifest.json`);
                if (!manifestRes.ok) return;
                const dates: string[] = await manifestRes.json();
                const postList: any[] = [];

                for (const date of dates) {
                    try {
                        const metaRes = await fetch(`${dataBasePath}/blog-page/${date}/metadata.yaml`);
                        if (!metaRes.ok) continue;
                        const metaText = await metaRes.text();
                        const metadata = yaml.load(metaText as string) as { post: { title: string; date: string; author: string } };
                        const thumbnail = `${dataBasePath}/blog-page/${date}/imgs/thumbnail.jpg`;
                        postList.push({
                            ...metadata.post,
                            folder: `/data/blog-page/${date}`,
                            thumbnail,
                        });
                    } catch (e) {
                        // skip
                    }
                }

                postList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setPosts(postList);
            } catch (e) {
                // ignore
            }
        };

        const loadBackground = async () => {
            setBackground(`${dataBasePath}/blog-page/background.jpg`);
        };

        loadPosts();
        loadBackground();
    }, []);

    return (
        <Box sx={{ minHeight: '100vh', backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
            <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.6))' }} />
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, py: { xs: 6, md: 8 } }}>
                <Typography
                    variant="h3"
                    align="center"
                    gutterBottom
                    sx={{ fontWeight: 700, fontSize: { xs: '2.1rem', sm: '2.6rem', md: '3rem' } }}
                >
                    Blog
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: { xs: 3, md: 4 } }}>
                    {posts.map((post, index) => (
                        <PostCard key={index} post={post} />
                    ))}
                </Box>
            </Container>
        </Box>
    );
}

export default Blog;
