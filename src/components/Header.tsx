import { Link as RouterLink } from 'react-router-dom';
import { useMemo, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = useMemo(
    () => [
      { label: 'Home', to: '/' },
      { label: 'About', to: '/about' },
      { label: 'Features', to: '/features' },
      { label: 'Blog', to: '/blog' },
      { label: 'Media', to: '/media' },
    ],
    []
  );

  const toggleDrawer = (open: boolean) => () => setMobileOpen(open);

  return (
    <AppBar position="sticky" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(6px)', backgroundColor: 'rgba(10,10,12,0.6)' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              component={RouterLink}
              to="/"
              aria-label="Go to home"
              sx={{ display: 'inline-flex', alignItems: 'center' }}
            >
              <Avatar src="/logo.jpg" alt="Feed the Realm Logo" sx={{ width: 42, height: 42, borderRadius: '999px', border: '1px solid rgba(106,228,255,0.24)' }} />
            </Box>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 700, display: { xs: 'none', md: 'block' } }}
            >
              Feed the Realm
            </Typography>
          </Box>

          {isMobile ? (
            <IconButton
              aria-label="Open navigation menu"
              onClick={toggleDrawer(true)}
              sx={{ color: 'text.primary', border: '1px solid rgba(106,228,255,0.22)', borderRadius: 2 }}
            >
              <MenuRoundedIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              {navItems.map((item) => (
                <Button
                  key={item.to}
                  component={RouterLink}
                  to={item.to}
                  color="secondary"
                  variant="outlined"
                  sx={{ borderColor: 'rgba(106,228,255,0.22)' }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </Container>
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 280,
            bgcolor: 'rgba(14,12,20,0.98)',
            borderLeft: '1px solid rgba(106,228,255,0.16)',
            pt: 2,
          },
        }}
      >
        <List sx={{ px: 1 }}>
          {navItems.map((item) => (
            <ListItemButton
              key={item.to}
              component={RouterLink}
              to={item.to}
              onClick={toggleDrawer(false)}
              sx={{ borderRadius: 2, mb: 0.5 }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
}

export default Header;