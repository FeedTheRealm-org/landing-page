import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function Header() {
  return (
    <AppBar position="sticky" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(6px)', backgroundColor: 'rgba(10,10,12,0.6)' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <img src="/logo.jpg" alt="Feed the Realm Logo" style={{ height: 40, width: 40 }} />
            <Typography variant="h6" component={RouterLink} to="/" sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 700 }}>
              Feed the Realm
            </Typography>
          </Box>

          <Box>
            <Button component={RouterLink} to="/" color="inherit">Home</Button>
            <Button component={RouterLink} to="/about" color="inherit">About</Button>
            <Button component={RouterLink} to="/features" color="inherit">Features</Button>
            <Button component={RouterLink} to="/blog" color="inherit">Blog</Button>
            <Button component={RouterLink} to="/media" color="inherit">Media</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;