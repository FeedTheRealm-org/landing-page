import { useState, useEffect } from 'react';
import yaml from 'js-yaml';
import { dataBasePath } from '../services/config';
import { getYouTubeEmbedUrl, loadMediaImageUrls } from '../services/mediaAssets';
import ImagePopupDialog from '../components/ImagePopupDialog';
import MediaImageThumbnail from '../components/MediaImageThumbnail';
import MediaVideoIframe from '../components/MediaVideoIframe';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Media() {
    const [videos, setVideos] = useState<string[]>([]);
    const [images, setImages] = useState<string[]>([]);
    const [background, setBackground] = useState<string>('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
                            {images.map((image, index) => (
                                <MediaImageThumbnail
                                    key={index}
                                    src={image}
                                    alt={`Media ${index}`}
                                    onClick={() => setSelectedImage(image)}
                                />
                            ))}
                        </Box>
                    </Box>
                )}

                {videos.length > 0 && (
                    <Box sx={{ mb: 6 }}>
                        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700 }}>Videos</Typography>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
                            {videos.map((video, index) => (
                                <MediaVideoIframe key={index} src={getYouTubeEmbedUrl(video)} title={`Video ${index}`} />
                            ))}
                        </Box>
                    </Box>
                )}
            </Container>

            <ImagePopupDialog open={Boolean(selectedImage)} imageSrc={selectedImage} alt="Expanded media" onClose={() => setSelectedImage(null)} />
        </Box>
    );
}

export default Media;
