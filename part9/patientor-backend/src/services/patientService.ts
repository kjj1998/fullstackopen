import patients from '../data/patients';

import { v1 as uuid } from 'uuid';
import { NonSensitivePatientEntry, NewPatientInfo, Patient, Entry } from "../types";

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

const addEntry = (patientId: string, newEntry: Entry): Entry => {
  const entryId = uuid();
  newEntry.id = entryId;

  const patient = patients.find(patient => patient.id === patientId);
  patient?.entries.push(newEntry);
  
  return newEntry;
};

export default { getPatients, addPatient, getPatient, addEntry };