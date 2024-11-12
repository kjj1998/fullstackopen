import express from 'express';
import { Express, Request, Response } from 'express';
import calculateBmi from './bmiCalculator';
import qs from 'qs';

// interface bmiInformationRequest extends Request {
//   query: {
//     height: string,
//     weight: string
//   }
// };

const app: Express = express();

app.set('query parser',
  (str: string) => qs.parse(str))

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: Request, res: Response) => {
  if (!req.query.height || !req.query.weight) {
    res.status(400).json({ error: 'Missing query parameters' });
    return;
  }

  if (isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight))) {
    res.status(400).json({ error: 'Non numerical query parameters given' });
    return;
  }
  
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  const bmiRange = calculateBmi(height, weight);

  res.send({
    weight: req.query.weight,
    height: req.query.height,
    bmi: bmiRange
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});