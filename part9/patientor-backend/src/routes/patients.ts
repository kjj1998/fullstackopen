import express, { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

import patientService from '../services/patientService';
import { newPatientSchema, newEntrySchema, newHospitalEntrySchema, newHealthCheckEntrySchema, newOccupationalHealthcareEntrySchema } from '../utils';
import { Patient, NewPatientInfo, NonSensitivePatientEntry, Entry } from '../types';

const patientRouter = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const newEntryParser = (req: Request<ParamsDictionary, unknown, Entry>, _res: Response, next: NextFunction) => {
  try {
    newEntrySchema.parse(req.body);
    switch (req.body.type) {
      case "Hospital":
        newHospitalEntrySchema.parse(req.body);
        break;
      case "HealthCheck":
        newHealthCheckEntrySchema.parse(req.body);
        break;
      case "OccupationalHealthcare":
        newOccupationalHealthcareEntrySchema.parse(req.body);
        break;
      default:
        throw Error('No suitable type');
    }

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

interface ParamsDictionary {
  [key: string]: string;
}

patientRouter.post('/:id/entries', newEntryParser, (req: Request<ParamsDictionary, unknown, Entry>, res: Response<Entry>) => {
  const addedEntry = patientService.addEntry(req.params.id, req.body);
  res.json(addedEntry);
});

patientRouter.use(errorMiddleware);

export default patientRouter;