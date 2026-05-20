import { useState, useEffect } from 'react';
import { FaYoutube, FaDiscord, FaTwitter, FaGlobe } from 'react-icons/fa';
import yaml from 'js-yaml';
import { dataBasePath } from '../services/config';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

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
      case 'twitter':
        return <FaTwitter className="w-5 h-5" />;
      case 'bluesky':
        return <FaGlobe className="w-5 h-5" />;
      default:
        return <FaGlobe className="w-5 h-5" />;
    }
  };

  return (
    <footer className="bg-gradient-to-t from-black via-gray-900 to-black text-white">
      {/* Social Media Section */}
      <div className="border-t border-gray-800 pt-12 pb-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Join Our Community
            </h3>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Follow us for the latest updates, behind-the-scenes content, and exclusive announcements about Feed the Realm
            </p>
          </div>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
            {Object.entries(socials).map(([platform, url]) => (
              <IconButton key={platform} href={url} target="_blank" rel="noopener noreferrer" color="primary">
                {getSocialIcon(platform)}
              </IconButton>
            ))}
          </Box>

          <Box sx={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.04)', pt: 3 }}>
            <Typography variant="body2" color="text.secondary">&copy; 2026 Feed the Realm. All rights reserved.</Typography>
            <Typography variant="caption" color="text.secondary">Crafting worlds, building communities, revolutionizing gaming.</Typography>
          </Box>
        </div>
      </div>
    </footer>
  );
}

export default Footer;