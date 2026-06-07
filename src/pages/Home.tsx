import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import yaml from 'js-yaml';
import { dataBasePath } from '../services/config';
import { getYouTubeEmbedUrl, loadMediaImageUrls } from '../services/mediaAssets';
import PostCard from '../components/PostCard';
import DownloadDialog from '../components/DownloadDialog';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import ImagePopupDialog from '../components/ImagePopupDialog';
import MediaImageThumbnail from '../components/MediaImageThumbnail';
import MediaVideoIframe from '../components/MediaVideoIframe';

function Home() {
    const [posts, setPosts] = useState<any[]>([]);
    const [videos, setVideos] = useState<string[]>([]);
    const [images, setImages] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [backgroundUpper, setBackgroundUpper] = useState<string>('');
    const [backgroundLower, setBackgroundLower] = useState<string>('');
    const [downloadModalOpen, setDownloadModalOpen] = useState<boolean>(false);
    const [downloadApp, setDownloadApp] = useState<'ftr_game' | 'ftr_world_editor' | null>(null);
    const [description, setDescription] = useState<string>('');
    const [discordLink, setDiscordLink] = useState<string>('');

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
                setPosts(postList.slice(0, 3));
            } catch (e) {
                // ignore
            }
        };

        // Load videos
        const loadVideos = async () => {
            try {
                const res = await fetch(`${dataBasePath}/media-page/videos.yaml`);
                if (!res.ok) return;
                const text = await res.text();
                const data = yaml.load(text) as { links: string[] };
                const videoLinks = data?.links?.slice(0, 3) ?? [];
                setVideos(videoLinks);
            } catch (e) {
                // ignore
            }
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
            setBackgroundUpper(`${dataBasePath}/home-page/background-upper.jpg`);
            setBackgroundLower(`${dataBasePath}/home-page/background-lower.jpg`);
        };

        // Load metadata
        const loadMetadata = async () => {
            try {
                const res = await fetch(`${dataBasePath}/metadata.yaml`);
                if (!res.ok) return;
                const text = await res.text();
                const metadata = yaml.load(text) as { description: string; socials: { discord: string } };
                setDescription(metadata?.description ?? '');
                setDiscordLink(metadata?.socials?.discord ?? '#');
            } catch (e) {
                // ignore
            }
        };

        loadPosts();
        loadVideos();
        loadMediaImageUrls().then((imageList) => setImages(imageList.slice(0, 3)));
        loadBackgrounds();
        loadMetadata();
    }, []);

    return (
        <Box sx={{ minHeight: '100vh', color: 'text.primary' }}>
            <Box
                sx={{
                    position: 'relative',
                    minHeight: '100vh',
                    display: 'grid',
                    placeItems: 'center',
                    backgroundImage: `url(${backgroundUpper})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.76), rgba(0,0,0,0.58), rgba(0,0,0,0.78))' }} />
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: { xs: 6, md: 8 } }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                            <Box
                                component="img"
                                src="/logo-text.png"
                                alt="Feed the Realm"
                                sx={{
                                    height: { xs: '7rem', sm: '8rem', md: '10rem' },
                                    width: 'auto',
                                    objectFit: 'contain',
                                }}
                            />
                        </Box>
                        <Typography variant="h5" sx={{ color: 'text.secondary', maxWidth: 760, mx: 'auto', mb: 4, fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' } }}>
                            The ultimate MMO experience with world creation tools
                        </Typography>

                        <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: { sm: 'row' }, gap: 2, justifyContent: 'center', alignItems: 'center' }}>
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    setDownloadApp('ftr_game');
                                    setDownloadModalOpen(true);
                                }}
                                sx={{
                                    width: { xs: '100%', sm: 'auto' },
                                    maxWidth: { xs: 360, sm: 'none' },
                                    px: 4,
                                    py: 1.6,
                                    borderRadius: 999,
                                    borderColor: 'rgba(245,180,74,0.55)',
                                    color: 'var(--ember)',
                                    bgcolor: 'rgba(20,16,24,0.72)',
                                    fontSize: { xs: '0.95rem', sm: '1rem' },
                                    '&:hover': {
                                        borderColor: 'rgba(245,180,74,0.9)',
                                        bgcolor: 'rgba(245,180,74,0.08)',
                                    },
                                }}
                            >
                                Download Feed the Realm - Game
                            </Button>

                            <Button
                                variant="outlined"
                                onClick={() => {
                                    setDownloadApp('ftr_world_editor');
                                    setDownloadModalOpen(true);
                                }}
                                sx={{
                                    width: { xs: '100%', sm: 'auto' },
                                    maxWidth: { xs: 360, sm: 'none' },
                                    px: 4,
                                    py: 1.6,
                                    borderRadius: 999,
                                    borderColor: 'rgba(106,228,255,0.55)',
                                    color: 'secondary.main',
                                    bgcolor: 'rgba(20,16,24,0.72)',
                                    fontSize: { xs: '0.95rem', sm: '1rem' },
                                    '&:hover': {
                                        borderColor: 'rgba(106,228,255,0.9)',
                                        bgcolor: 'rgba(106,228,255,0.08)',
                                    },
                                }}
                            >
                                Download Feed the Realm - World Editor
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Box sx={{ py: { xs: 8, md: 10 }, position: 'relative' }}>
                <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top, rgba(106,228,255,0.09), transparent 45%), radial-gradient(circle at bottom right, rgba(245,180,74,0.08), transparent 35%)' }} />
                <Container maxWidth="lg" sx={{ position: 'relative' }}>
                    <Box sx={{ textAlign: 'center', maxWidth: 900, mx: 'auto' }}>
                        <Typography className="app-title" variant="h4" sx={{ fontWeight: 700, mb: 2, fontSize: { xs: '1.6rem', sm: '2rem', md: '2.25rem' } }}>
                            Discover the Future of Gaming
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8, fontSize: { xs: '1rem', sm: '1.15rem', md: '1.25rem' } }}>
                            {description}
                        </Typography>
                        <Button
                            component="a"
                            href={discordLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="outlined"
                            endIcon={<KeyboardArrowRightRoundedIcon />}
                            sx={{
                                px: 4,
                                py: 1.5,
                                borderRadius: 999,
                                borderColor: 'rgba(106,228,255,0.5)',
                                color: 'secondary.main',
                                bgcolor: 'rgba(20,16,24,0.72)',
                                '&:hover': {
                                    borderColor: 'rgba(245,180,74,0.85)',
                                    color: 'var(--ember)',
                                    bgcolor: 'rgba(245,180,74,0.08)',
                                },
                            }}
                        >
                            Join Our Community
                        </Button>
                    </Box>
                </Container>
            </Box>

            <Box sx={{ py: { xs: 8, md: 10 }, position: 'relative', backgroundImage: `url(${backgroundLower})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.78), rgba(0,0,0,0.62), rgba(0,0,0,0.82))' }} />
                <Container maxWidth="lg" sx={{ position: 'relative' }}>
                    <Typography className="app-title" variant="h4" align="center" sx={{ fontWeight: 700, mb: 5, fontSize: { xs: '1.6rem', sm: '2rem', md: '2.25rem' } }}>
                        Latest Posts
                    </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
                        {posts.map((post, index) => (
                            <PostCard key={index} post={post} />
                        ))}
                    </Box>
                    <Box sx={{ textAlign: 'center', mt: 5 }}>
                        <Button
                            component={Link}
                            to="/blog"
                            variant="outlined"
                            sx={{
                                px: 3,
                                py: 1.2,
                                borderRadius: 999,
                                borderColor: 'rgba(106,228,255,0.45)',
                                color: 'secondary.main',
                                bgcolor: 'rgba(20,16,24,0.72)',
                                '&:hover': {
                                    borderColor: 'rgba(245,180,74,0.85)',
                                    color: 'var(--ember)',
                                    bgcolor: 'rgba(245,180,74,0.08)',
                                },
                            }}
                        >
                            Show More
                        </Button>
                    </Box>
                </Container>
            </Box>

            <Box sx={{ py: { xs: 8, md: 10 }, backgroundColor: 'background.default' }}>
                <Container maxWidth="lg">
                    <Typography className="app-title" variant="h4" align="center" sx={{ fontWeight: 700, mb: 5, fontSize: { xs: '1.6rem', sm: '2rem', md: '2.25rem' } }}>
                        Latest Media
                    </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
                        {[...images.map((image) => ({ kind: 'image' as const, source: image })), ...videos.map((video) => ({ kind: 'video' as const, source: video }))].map((item, index) => (
                            item.kind === 'image' ? (
                                <MediaImageThumbnail key={`${item.kind}-${index}`} src={item.source} alt={`Media ${index}`} onClick={() => setSelectedImage(item.source)} />
                            ) : (
                                <MediaVideoIframe key={`${item.kind}-${index}`} src={getYouTubeEmbedUrl(item.source)} title={`Video ${index}`} />
                            )
                        ))}
                    </Box>
                    <Box sx={{ textAlign: 'center', mt: 5 }}>
                        <Button
                            component={Link}
                            to="/media"
                            variant="outlined"
                            sx={{
                                px: 3,
                                py: 1.2,
                                borderRadius: 999,
                                borderColor: 'rgba(106,228,255,0.45)',
                                color: 'secondary.main',
                                bgcolor: 'rgba(20,16,24,0.72)',
                                '&:hover': {
                                    borderColor: 'rgba(245,180,74,0.85)',
                                    color: 'var(--ember)',
                                    bgcolor: 'rgba(245,180,74,0.08)',
                                },
                            }}
                        >
                            Show More
                        </Button>
                    </Box>
                </Container>
            </Box>

            <ImagePopupDialog open={Boolean(selectedImage)} imageSrc={selectedImage} alt="Expanded media" onClose={() => setSelectedImage(null)} />

            {downloadModalOpen && (
                <DownloadDialog open={downloadModalOpen} appName={downloadApp} onClose={() => setDownloadModalOpen(false)} />
            )}
        </Box>
    );
}

export default Home;
