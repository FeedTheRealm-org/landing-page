import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import yaml from 'js-yaml';
import { dataBasePath } from '../services/config';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

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
        const teamData = yaml.load(text) as { members: Record<string, { name: string; position: string; comments?: string }> };

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
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, py: { xs: 6, md: 8 } }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 700, fontSize: { xs: '2.1rem', sm: '2.6rem', md: '3rem' } }}>About Feed the Realm</Typography>
        <Typography align="center" sx={{ maxWidth: '64ch', mx: 'auto', mb: { xs: 4, md: 6 } }}>{description}</Typography>

        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700, fontSize: { xs: '1.6rem', sm: '2rem', md: '2.25rem' } }}>Meet the Team</Typography>
          <Typography align="center" sx={{ maxWidth: '72ch', mx: 'auto', mb: 4, color: 'text.secondary' }}>
            Feed the Realm was born from our team's final university project, and we're passionately developing it with cutting-edge technology, innovative gameplay mechanics, and a vision to revolutionize the MMO landscape. Our dedicated developers bring fresh perspectives and boundless creativity to create an unparalleled gaming experience.
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: { xs: 2.5, md: 3 } }}>
            {teamMembers.map((member, index) => (
              <Paper key={index} sx={{ textAlign: 'center', p: 2, bgcolor: 'transparent' }}>
                <Avatar src={member.image} alt={member.name} sx={{ width: { xs: 84, sm: 96 }, height: { xs: 84, sm: 96 }, mx: 'auto', mb: 2 }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{member.name}</Typography>
                <Typography variant="body2" color="text.secondary">{member.position}</Typography>
                {member.comments ? (
                  <Typography
                    variant="body2"
                    sx={{ mt: 1, whiteSpace: 'pre-line', color: 'text.secondary', textAlign: 'left' }}
                  >
                    {member.comments}
                  </Typography>
                ) : null}
              </Paper>
            ))}
          </Box>
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              component={Link}
              to="/privacy-policy"
              variant="outlined"
              sx={{
                px: 3,
                py: 1.2,
                borderRadius: 999,
                borderColor: 'rgba(106,228,255,0.45)',
                color: 'secondary.main',
                bgcolor: 'rgba(20,16,24,0.72)',
                '&:hover': {
                  borderColor: 'rgba(245,180,74,0.85)',
                  color: 'var(--ember)',
                  bgcolor: 'rgba(245,180,74,0.08)',
                },
              }}
            >
              Privacy Policy
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default About;