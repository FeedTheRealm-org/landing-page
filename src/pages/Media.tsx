import { useState, useEffect } from 'react';
import yaml from 'js-yaml';
import { dataBasePath } from '../services/config';
import { loadMediaImageUrls } from '../services/mediaAssets';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

function Media() {
    const [videos, setVideos] = useState<string[]>([]);
    const [images, setImages] = useState<string[]>([]);
    const [background, setBackground] = useState<string>('');

    useEffect(() => {
        const loadVideos = async () => {
            try {
                const res = await fetch(`${dataBasePath}/media-page/videos.yaml`);
                if (!res.ok) return;
                const text = await res.text();
                const data = yaml.load(text) as { links: string[] };
                setVideos(data.links);
            } catch (e) {
                // ignore
            }
        };

        const loadBackground = async () => {
            setBackground(`${dataBasePath}/media-page/background.jpg`);
        };

        loadVideos();
        loadMediaImageUrls().then((imageList) => setImages(imageList));
        loadBackground();
    }, []);

    return (
        <Box sx={{ minHeight: '100vh', backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
            <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.6))' }} />
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, py: 8 }}>
                <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 700, color: 'text.primary' }}>Media</Typography>

                {images.length > 0 && (
                    <Box sx={{ mb: 6 }}>
                        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700 }}>Pictures</Typography>
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 }}>
                            {images.map((image, index) => (
                                <Paper key={index} sx={{ overflow: 'hidden' }}>
                                    <img src={image} alt={`Media ${index}`} className="w-full h-auto" />
                                </Paper>
                            ))}
                        </Box>
                    </Box>
                )}

                {videos.length > 0 && (
                    <Box sx={{ mb: 6 }}>
                        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700 }}>Videos</Typography>
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 2 }}>
                            {videos.map((video, index) => (
                                <Paper key={index} sx={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                                    <iframe src={`https://www.youtube.com/embed/${video.split('v=')[1]}`} className="w-full h-full" frameBorder="0" allowFullScreen></iframe>
                                </Paper>
                            ))}
                        </Box>
                    </Box>
                )}
            </Container>
        </Box>
    );
}

export default Media;
