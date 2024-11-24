import patients from '../data/patients';

import { v1 as uuid } from 'uuid';
import { NonSensitivePatientEntry, NewPatientInfo, Patient } from "../types";

const getPatients = (): Patient[] => {
  return patients.map(({ id, name, gender, dateOfBirth, occupation, entries, ssn }) => {
    return {
      id, 
      name, 
      gender,
      dateOfBirth,
      occupation,
      entries,
      ssn
    };
  });
};

const addPatient = (patientInfo: NewPatientInfo): NonSensitivePatientEntry => {
  const patientId = uuid();
  const newPatient = {
    ...patientInfo,
    id: patientId,
    entries: []
  };
  
  patients.push(newPatient);
  const { id, occupation, gender, dateOfBirth, name, entries } = newPatient;

  return { id, occupation, gender, dateOfBirth, name, entries };
};

const getPatient = (patientId: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === patientId);

  return patient;
};

export default { getPatients, addPatient, getPatient };