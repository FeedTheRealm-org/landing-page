import { Link } from 'react-router-dom';

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
    <Link to={`/blog/${post.folder.split('/').pop()}`} className={`app-card p-4 cursor-pointer hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition ${className}`}>
      {post.thumbnail && (
        <img src={post.thumbnail} alt={post.title} className="w-full h-40 object-cover rounded mb-4" />
      )}
      <h4 className="app-title text-lg md:text-xl font-bold mb-2">{post.title}</h4>
      <p className="text-sm text-muted mb-1">By {post.author}</p>
      <p className="text-sm text-muted">{formatDate(post.date)}</p>
    </Link>
  );
}

export default PostCard;