import express from 'express';
import diaryRouter from './routes/diaries';
import cors from 'cors';

const app = express();
app.use(express.json());

const PORT = 3000;

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
};

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diaries', cors(corsOptions) ,diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});