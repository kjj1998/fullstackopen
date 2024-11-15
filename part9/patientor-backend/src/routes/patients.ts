import express from 'express';
import patientService from '../services/patientService';

import toNewPatientInfo from '../utils';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

patientRouter.post('/', (req, res) => {
  const newPatientInfo = toNewPatientInfo(req.body);

  const { ssn, gender, dateOfBirth, name, occupation } = newPatientInfo;
  const addedPatient = patientService.addPatient({
    ssn, gender, dateOfBirth, name, occupation
  });

  res.json(addedPatient);
});

export default patientRouter;