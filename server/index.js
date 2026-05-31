import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/health', (req, res) => {
  res.json({
    ok: true,
    service: 'news-search-api'
  });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});