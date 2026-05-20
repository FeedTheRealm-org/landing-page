import { useState, useEffect } from 'react';
import yaml from 'js-yaml';
import { dataBasePath } from '../services/config';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';

function About() {
  const [background, setBackground] = useState<string>('');
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    const loadBackground = async () => {
      setBackground(`${dataBasePath}/about-page/background.jpg`);
    };

    const loadTeam = async () => {
      try {
        const res = await fetch(`${dataBasePath}/about-page/team/team.yaml`);
        if (!res.ok) return;
        const text = await res.text();
        const teamData = yaml.load(text) as { members: Record<string, { name: string; position: string }> };

        const imageModules = import.meta.glob('/data/about-page/team/imgs/*.jpg', { query: '?url', import: 'default' });
        const members = [];

        for (const id in teamData.members) {
          const member = teamData.members[id];
          const imagePath = `${dataBasePath}/about-page/team/imgs/${id}.jpg`;
          let imageUrl = '';

          for (const path in imageModules) {
            if (path === imagePath) {
              imageUrl = await imageModules[path]() as string;
              break;
            }
          }

          // Fallback to direct URL if import.meta.glob didn't match
          if (!imageUrl) imageUrl = `${dataBasePath}/about-page/team/imgs/${id}.jpg`;

          members.push({
            ...member,
            image: imageUrl
          });
        }

        setTeamMembers(members);
      } catch (e) {
        // ignore
      }
    };

    const loadDescription = async () => {
      try {
        const res = await fetch(`${dataBasePath}/metadata.yaml`);
        if (!res.ok) return;
        const text = await res.text();
        const metadata = yaml.load(text) as { description: string };
        setDescription(metadata?.description ?? '');
      } catch (e) {
        // ignore
      }
    };

    loadBackground();
    loadTeam();
    loadDescription();
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
      <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.6))' }} />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, py: 8 }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 700 }}>About Feed the Realm</Typography>
        <Typography align="center" sx={{ maxWidth: '64ch', mx: 'auto', mb: 6 }}>{description}</Typography>

        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700 }}>Meet the Team</Typography>
          <Typography align="center" sx={{ maxWidth: '72ch', mx: 'auto', mb: 4, color: 'text.secondary' }}>
            Feed the Realm was born from our team's final university project, and we're passionately developing it with cutting-edge technology, innovative gameplay mechanics, and a vision to revolutionize the MMO landscape. Our dedicated developers bring fresh perspectives and boundless creativity to create an unparalleled gaming experience.
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 3 }}>
            {teamMembers.map((member, index) => (
              <Paper key={index} sx={{ textAlign: 'center', p: 2, bgcolor: 'transparent' }}>
                <Avatar src={member.image} alt={member.name} sx={{ width: 96, height: 96, mx: 'auto', mb: 2 }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{member.name}</Typography>
                <Typography variant="body2" color="text.secondary">{member.position}</Typography>
              </Paper>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default About;