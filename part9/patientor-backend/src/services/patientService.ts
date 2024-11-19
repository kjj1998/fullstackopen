import data from '../data/patients';

import { v1 as uuid } from 'uuid';
import { NonSensitivePatientEntry, NewPatientInfo, Patient, Gender } from "../types";

const patients: Patient[] = data.map(datum => { 
  return {
    ...datum,
    gender: datum.gender as Gender,
    entries: []
  };
});

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

const getPatient = (patientId: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === patientId);

  return patient;
};

export default { getPatients, addPatient, getPatient };