import express from 'express';
import { Express, Request, Response } from 'express';
import calculateBmi from './bmiCalculator';
import qs from 'qs';
import calculateExercises from './exerciseCalculator';

// interface bmiInformationRequest extends Request {
//   query: {
//     height: string,
//     weight: string
//   }
// };

const app: Express = express();
app.use(express.json());

app.set('query parser',
  (str: string) => qs.parse(str));

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

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  
  if (!daily_exercises || !target) {
    res.status(400).send({ error: 'parameters missing'});
    return;
  }

  if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
    res.status(400).send({ error: 'malformatted parameters'});
    return;
  }

  daily_exercises.forEach(exercise => {
    if (isNaN(Number(exercise))) {
      res.status(400).send({ error: 'malformatted parameters'});
      return;
    }
  });

  const dailyExercises = daily_exercises as number[];
  const exerciseTarget = target as number;

  const results = calculateExercises(dailyExercises, exerciseTarget);

  res.send(results);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});