import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

interface ImagePopupDialogProps {
    open: boolean;
    imageSrc: string | null;
    alt: string;
    onClose: () => void;
}

function ImagePopupDialog({ open, imageSrc, alt, onClose }: ImagePopupDialogProps) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="lg"
            sx={{
                '& .MuiBackdrop-root': {
                    backgroundColor: 'rgba(0, 0, 0, 0.72)',
                },
            }}
        >
            <DialogContent sx={{ p: 1, position: 'relative', backgroundColor: 'rgba(10,10,12,0.94)' }}>
                <IconButton
                    aria-label="Close image preview"
                    onClick={onClose}
                    sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1, color: 'common.white', backgroundColor: 'rgba(0,0,0,0.35)' }}
                >
                    <CloseRoundedIcon />
                </IconButton>
                {open && imageSrc && <Box component="img" src={imageSrc} alt={alt} sx={{ width: '100%', height: 'auto', display: 'block', borderRadius: 1 }} />}
            </DialogContent>
        </Dialog>
    );
}

export default ImagePopupDialog;