import { useState, useEffect } from 'react';
import { dataBasePath } from '../services/config';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Features() {
  const [background, setBackground] = useState<string>('');

  useEffect(() => {
    setBackground(`${dataBasePath}/features-page/background.jpg`);
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
      <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.6))' }} />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, py: 8 }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 700 }}>Features</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, mt: 4 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>MMO Game Player</Typography>
            <Typography>Play in multiple worlds, interact with players worldwide, and embark on epic adventures.</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>World Creator</Typography>
            <Typography>Design your own worlds with powerful tools, publish them, and share your creations with the community.</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Features;