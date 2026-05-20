import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
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
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Choose your operating system</DialogTitle>
      <DialogContent>
        <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
          <Button variant="outlined" startIcon={<FaLinux />} onClick={() => handle('linux')} disabled={busy} fullWidth>
            Linux
          </Button>
          <Button variant="outlined" startIcon={<FaWindows />} onClick={() => handle('windows')} disabled={busy} fullWidth>
            Windows
          </Button>
        </Stack>
        {error && <div style={{ color: '#ff8a80', marginTop: 12 }}>{error}</div>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={busy}>Cancel</Button>
        {busy && <CircularProgress size={20} />}
      </DialogActions>
    </Dialog>
  );
}
