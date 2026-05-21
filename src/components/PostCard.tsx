import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface PostCardProps {
  post: {
    title: string;
    date: string;
    author: string;
    folder: string;
    thumbnail: string;
  };
  className?: string;
}

function PostCard({ post, className = '' }: PostCardProps) {
  // Format date manually to avoid timezone issues
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${parseInt(month)}/${parseInt(day)}/${year}`;
  };

  return (
    <Paper
      component={Link}
      to={`/blog/${post.folder.split('/').pop()}`}
      className={className}
      sx={{
        p: 0,
        overflow: 'hidden',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: '0 18px 40px rgba(0,0,0,0.45)',
          borderColor: 'rgba(106,228,255,0.32)',
        },
      }}
    >
      {post.thumbnail && <img src={post.thumbnail} alt={post.title} className="w-full h-44 object-cover" />}
      <Box sx={{ p: 2 }}>
        <Typography className="app-title" variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          By {post.author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {formatDate(post.date)}
        </Typography>
      </Box>
    </Paper>
  );
}

export default PostCard;