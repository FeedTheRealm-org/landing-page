import Paper from '@mui/material/Paper';

interface MediaImageThumbnailProps {
    src: string;
    alt: string;
    onClick: () => void;
    aspectRatio?: string;
}

function MediaImageThumbnail({ src, alt, onClick, aspectRatio = '16 / 9' }: MediaImageThumbnailProps) {
    return (
        <Paper
            component="button"
            type="button"
            onClick={onClick}
            sx={{
                overflow: 'hidden',
                p: 0,
                border: 'none',
                cursor: 'pointer',
                backgroundColor: 'transparent',
                aspectRatio,
                transition: 'transform 180ms ease, box-shadow 180ms ease',
                '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 18px 40px rgba(0,0,0,0.45)',
                },
            }}
        >
            <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </Paper>
    );
}

export default MediaImageThumbnail;