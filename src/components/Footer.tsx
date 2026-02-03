import { useState, useEffect } from 'react';
import { FaYoutube, FaDiscord, FaTwitter, FaGlobe } from 'react-icons/fa';
import yaml from 'js-yaml';

function Footer() {
  const [socials, setSocials] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const loadMetadata = async () => {
      const metadataModule = await import('/data/metadata.yaml?raw');
      const metadata = yaml.load(metadataModule.default) as { socials: { [key: string]: string } };
      setSocials(metadata.socials);
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
    <footer className="bg-black py-8">
      {/* Social Media Bar */}
      <div className="border-t border-gray-800 pt-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-6 mb-4">
            {Object.entries(socials).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-2"
              >
                {getSocialIcon(platform)}
                <span className="text-sm font-medium capitalize">{platform}</span>
              </a>
            ))}
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-sm">&copy; 2026 Feed the Realm. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;