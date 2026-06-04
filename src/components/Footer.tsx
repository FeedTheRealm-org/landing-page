import { useState, useEffect } from 'react';
import { FaYoutube, FaDiscord, FaGlobe } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link as RouterLink } from 'react-router-dom';
import yaml from 'js-yaml';
import { dataBasePath } from '../services/config';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';

function Footer() {
  const [socials, setSocials] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const loadMetadata = async () => {
      try {
        const res = await fetch(`${dataBasePath}/metadata.yaml`);
        if (!res.ok) return;
        const text = await res.text();
        const metadata = yaml.load(text) as { socials: { [key: string]: string } };
        setSocials(metadata?.socials ?? {});
      } catch (e) {
        // ignore
      }
    };
    loadMetadata();
  }, []);

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'youtube':
        return <FaYoutube className="w-5 h-5" />;
      case 'discord':
        return <FaDiscord className="w-5 h-5" />;
      case 'x':
        return <FaXTwitter className="w-5 h-5" />;
      case 'bluesky':
        return <FaGlobe className="w-5 h-5" />;
      default:
        return <FaGlobe className="w-5 h-5" />;
    }
  };

  return (
    <footer>
      <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.04)', pt: 6, pb: 4, background: 'linear-gradient(to top, rgba(4,4,8,1), rgba(10,10,18,1))' }}>
        <Box className="container mx-auto px-4">
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography className="app-title" variant="h5" sx={{ fontWeight: 700, mb: 1, background: 'linear-gradient(90deg, #6ae4ff, #f5b44a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Join Our Community
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 760, mx: 'auto' }}>
              Follow us for the latest updates, behind-the-scenes content, and exclusive announcements about Feed the Realm
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mb: 4 }}>
            {Object.entries(socials).map(([platform, url]) => (
              <Paper
                key={platform}
                component={Link}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  p: 1.5,
                  minWidth: 112,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                  textDecoration: 'none',
                  color: 'text.primary',
                  bgcolor: 'rgba(20,16,24,0.72)',
                  transition: 'transform 180ms ease, border-color 180ms ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    borderColor: 'rgba(106,228,255,0.45)',
                  },
                }}
              >
                <Box sx={{ width: 56, height: 56, borderRadius: 2, display: 'grid', placeItems: 'center', bgcolor: 'rgba(106,228,255,0.08)', color: 'secondary.main' }}>
                  {getSocialIcon(platform)}
                </Box>
                <Typography variant="body2" sx={{ textTransform: 'capitalize', fontWeight: 700, color: 'text.secondary' }}>
                  {platform}
                </Typography>
              </Paper>
            ))}
          </Box>

          <Box sx={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.04)', pt: 3 }}>
            <Typography variant="body2" color="text.secondary">&copy; 2026 Feed the Realm. All rights reserved.</Typography>
            <Typography variant="caption" color="text.secondary">Crafting worlds, building communities, revolutionizing gaming.</Typography>
            <Box sx={{ mt: 1 }}>
              <RouterLink to="/privacy-policy" style={{ textDecoration: 'none' }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', cursor: 'pointer', '&:hover': { color: 'secondary.main' } }}>
                  Privacy Policy
                </Typography>
              </RouterLink>
            </Box>
          </Box>
        </Box>
      </Box>
    </footer>
  );
}

export default Footer;