import express from 'express';
import cors from 'cors';
import diagnosisRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

const app = express();
app.use(express.json());

const PORT = 3001;

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.get('/api/ping', cors(corsOptions), (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', cors(corsOptions), patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});