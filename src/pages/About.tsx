import { useState, useEffect } from 'react';

function About() {
  const [background, setBackground] = useState<string>('');

  useEffect(() => {
    const loadBackground = async () => {
      const bgModule = await import('/data/about-page/background.jpg?url');
      setBackground(bgModule.default);
    };
    loadBackground();
  }, []);

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: `url(${background})` }}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
      <div className="container mx-auto px-4 py-20 relative z-10 text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center">About Feed the Realm</h1>
        <p className="text-base md:text-lg max-w-3xl mx-auto text-center">
          Feed the Realm is a revolutionary MMO game where players can explore countless worlds created by the community. With our world creator tool, anyone can design and publish their own worlds for others to enjoy.
        </p>
      </div>
    </div>
  );
}

export default About;