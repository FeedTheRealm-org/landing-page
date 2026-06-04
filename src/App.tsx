import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Media from './pages/Media';
import PrivacyPolicy from './pages/PrivacyPolicy';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:date" element={<BlogPost />} />
          <Route path="/media" element={<Media />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
        <Footer />
      </Box>
    </Router>
  );
}

export default App;
