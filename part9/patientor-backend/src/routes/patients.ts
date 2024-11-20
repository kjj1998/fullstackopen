import express, { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

import patientService from '../services/patientService';
import { newPatientSchema } from '../utils';
import { Patient, NewPatientInfo, NonSensitivePatientEntry } from '../types';

const patientRouter = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

patientRouter.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
  res.send(patientService.getPatients());
});

patientRouter.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientInfo>, res: Response<NonSensitivePatientEntry>) => {
  const addedPatient = patientService.addPatient(req.body);
  res.json(addedPatient);
});

patientRouter.get('/:id', (req, res: Response<Patient | undefined>) => {
  res.send(patientService.getPatient(req.params.id));
});

patientRouter.use(errorMiddleware);

export default patientRouter;