import data from '../data/patients';

import { v1 as uuid } from 'uuid';
import { NonSensitivePatientEntry, NewPatientInfo } from "../types";

const patients: NonSensitivePatientEntry[] = data.map(datum => { 
  return {
    ...datum,
    entries: []
  };
}) as NonSensitivePatientEntry[];

const getPatients = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, gender, dateOfBirth, occupation }) => {
    return {
      id, 
      name, 
      gender,
      dateOfBirth,
      occupation,
      entries: []
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


  return {
    id, occupation, gender, dateOfBirth, name, entries
  };
};

const getPatient = (patientId: string): NonSensitivePatientEntry | undefined => {
  const patient = patients.find((p) => p.id === patientId);

  return patient;
};

export default { getPatients, addPatient, getPatient };