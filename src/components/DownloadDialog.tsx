import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FaLinux, FaWindows } from 'react-icons/fa';
import { getExportZipPath } from '../services/exportsService';

interface Props {
    open: boolean;
    appName: 'ftr_game' | 'ftr_world_editor' | null;
    onClose: () => void;
}

export default function DownloadDialog({ open, appName, onClose }: Props) {
    const [busy, setBusy] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const handle = async (os: 'linux' | 'windows') => {
        if (!appName) return;
        setBusy(true);
        setError(null);
        try {
            const url = await getExportZipPath({ appName, os });
            window.open(url, '_blank', 'noopener,noreferrer');
            onClose();
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Failed to get download');
        } finally {
            setBusy(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" sx={{ '& .MuiDialog-paper': { borderRadius: 4 } }}>
            <DialogTitle sx={{ pb: 1 }}>
                <Typography className="app-title" variant="h5" component="div">
                    Choose your operating system
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Select the platform you want to download.
                </Typography>
            </DialogTitle>

            <DialogContent sx={{ pt: 1 }}>
                <Box sx={{ mt: 1, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                    <Paper
                        component="button"
                        type="button"
                        onClick={() => handle('linux')}
                        disabled={busy}
                        sx={{
                            flex: 1,
                            p: 2,
                            textAlign: 'left',
                            cursor: 'pointer',
                            bgcolor: 'rgba(15,13,23,0.85)',
                            border: '1px solid rgba(106,228,255,0.22)',
                            borderRadius: 3,
                            color: 'inherit',
                            transition: 'transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                borderColor: 'rgba(106,228,255,0.6)',
                                boxShadow: '0 12px 30px rgba(106,228,255,0.12)',
                            },
                            '&:disabled': {
                                opacity: 0.5,
                                cursor: 'not-allowed',
                            },
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{ width: 72, height: 72, borderRadius: 3, display: 'grid', placeItems: 'center', bgcolor: 'rgba(106,228,255,0.12)', color: '#6ae4ff', fontSize: 36 }}>
                                <FaLinux />
                            </Box>
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>Linux</Typography>
                                <Typography variant="body2" color="text.secondary">ZIP build for Linux systems</Typography>
                            </Box>
                        </Box>
                    </Paper>

                    <Paper
                        component="button"
                        type="button"
                        onClick={() => handle('windows')}
                        disabled={busy}
                        sx={{
                            flex: 1,
                            p: 2,
                            textAlign: 'left',
                            cursor: 'pointer',
                            bgcolor: 'rgba(15,13,23,0.85)',
                            border: '1px solid rgba(245,180,74,0.22)',
                            borderRadius: 3,
                            color: 'inherit',
                            transition: 'transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                borderColor: 'rgba(245,180,74,0.6)',
                                boxShadow: '0 12px 30px rgba(245,180,74,0.12)',
                            },
                            '&:disabled': {
                                opacity: 0.5,
                                cursor: 'not-allowed',
                            },
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{ width: 72, height: 72, borderRadius: 3, display: 'grid', placeItems: 'center', bgcolor: 'rgba(245,180,74,0.12)', color: '#f5b44a', fontSize: 36 }}>
                                <FaWindows />
                            </Box>
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>Windows</Typography>
                                <Typography variant="body2" color="text.secondary">ZIP build for Windows systems</Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Box>

                {error && (
                    <Typography variant="body2" sx={{ mt: 2, color: '#ff8a80' }}>
                        {error}
                    </Typography>
                )}
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3 }}>
                <Button onClick={onClose} disabled={busy} color="inherit">
                    Cancel
                </Button>
                {busy && <CircularProgress size={20} sx={{ color: 'secondary.main' }} />}
            </DialogActions>
        </Dialog>
    );
}
