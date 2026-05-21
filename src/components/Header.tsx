import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

function Header() {
  return (
    <AppBar position="sticky" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(6px)', backgroundColor: 'rgba(10,10,12,0.6)' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar src="/logo.jpg" alt="Feed the Realm Logo" sx={{ width: 42, height: 42, borderRadius: '999px', border: '1px solid rgba(106,228,255,0.24)' }} />
            <Typography variant="h6" component={RouterLink} to="/" sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 700 }}>
              Feed the Realm
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <Button component={RouterLink} to="/" color="secondary" variant="outlined" sx={{ borderColor: 'rgba(106,228,255,0.22)' }}>Home</Button>
            <Button component={RouterLink} to="/about" color="secondary" variant="outlined" sx={{ borderColor: 'rgba(106,228,255,0.22)' }}>About</Button>
            <Button component={RouterLink} to="/features" color="secondary" variant="outlined" sx={{ borderColor: 'rgba(106,228,255,0.22)' }}>Features</Button>
            <Button component={RouterLink} to="/blog" color="secondary" variant="outlined" sx={{ borderColor: 'rgba(106,228,255,0.22)' }}>Blog</Button>
            <Button component={RouterLink} to="/media" color="secondary" variant="outlined" sx={{ borderColor: 'rgba(106,228,255,0.22)' }}>Media</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;