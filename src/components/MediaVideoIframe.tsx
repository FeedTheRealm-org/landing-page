import Paper from '@mui/material/Paper';

interface MediaVideoIframeProps {
    src: string;
    title: string;
}

function MediaVideoIframe({ src, title }: MediaVideoIframeProps) {
    return (
        <Paper sx={{ aspectRatio: '16 / 9', overflow: 'hidden' }}>
            <iframe src={src} className="w-full h-full" frameBorder="0" allowFullScreen title={title}></iframe>
        </Paper>
    );
}

export default MediaVideoIframe;