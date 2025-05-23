import { useEffect, useState } from 'react';
import { getNewsByCategory } from '../services/newsService';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Box,
  Link,
} from '@mui/material';

function NewsComponent({ category }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const news = await getNewsByCategory(category);
        setArticles(news);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifycontent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">Error loading news: {error.message}</Typography>;
  }

  return (
    <Grid container spacing={4}>
      {articles.map((article) => (
        <Grid item xs={12} sm={6} md={4} key={article.url}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3, borderRadius: '8px' }}>
            {article.urlToImage && (
              <CardMedia
                component="img"
                height="140"
                image={article.urlToImage}
                alt={article.title || 'News image'}
              />
            )}
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h6" component="div">
                {article.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {article.description}
              </Typography>
              {article.publishedAt && (
                <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.disabled' }}>
                  {new Date(article.publishedAt).toLocaleString()}
                </Typography>
              )}
              {article.source?.name && (
                 <Typography variant="caption" display="block" sx={{ color: 'text.disabled' }}>
                  Source: {article.source.name}
                </Typography>
              )}
            </CardContent>
            <Box sx={{ p: 2 }}>
              <Link href={article.url} target="_blank" rel="noopener" variant="button">
                Read More
              </Link>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default NewsComponent; 