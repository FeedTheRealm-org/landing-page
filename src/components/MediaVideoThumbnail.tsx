import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import YouTubeIcon from '@mui/icons-material/YouTube';

interface MediaVideoThumbnailProps {
    href: string;
    thumbnailSrc: string;
    title: string;
    alt: string;
}

function MediaVideoThumbnail({ href, thumbnailSrc, title, alt }: MediaVideoThumbnailProps) {
    return (
        <Paper
            component="a"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="app-card"
            sx={{
                position: 'relative',
                overflow: 'hidden',
                aspectRatio: '16 / 9',
                textDecoration: 'none',
                color: 'inherit',
                p: 0,
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
            }}
        >
            <img src={thumbnailSrc} alt={alt} style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }} />
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.68), rgba(0,0,0,0.10))',
                }}
            >
                <Box
                    sx={{
                        px: 1.5,
                        pt: 1.25,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        minWidth: 0,
                    }}
                >
                    <Box
                        sx={{
                            flex: '0 0 auto',
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                            display: 'grid',
                            placeItems: 'center',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            border: '1px solid rgba(255,255,255,0.18)',
                        }}
                    >
                        <YouTubeIcon sx={{ color: '#ff0000', fontSize: 18 }} />
                    </Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'common.white', lineHeight: 1.2, textShadow: '0 2px 8px rgba(0,0,0,0.7)' }} noWrap>
                        {title}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        alignSelf: 'center',
                        mb: 2.25,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 1,
                        px: 1.5,
                        py: 0.8,
                        borderRadius: 999,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        opacity: 0.92,
                    }}
                >
                    <YouTubeIcon sx={{ color: '#ff0000', fontSize: 28 }} />
                    <PlayArrowRoundedIcon sx={{ fontSize: 28, color: 'common.white' }} />
                </Box>
            </Box>
        </Paper>
    );
}

export default MediaVideoThumbnail;