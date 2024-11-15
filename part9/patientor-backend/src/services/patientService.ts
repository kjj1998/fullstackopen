import data from '../data/patients';

import { v1 as uuid } from 'uuid';
import { NonSensitivePatientEntry, NewPatientInfo } from "../types";

const patients: NonSensitivePatientEntry[] = data as NonSensitivePatientEntry[];

const getPatients = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, gender, dateOfBirth, occupation }) => {
    return {
      id, 
      name, 
      gender,
      dateOfBirth,
      occupation
    };
  });
};

const addPatient = (patientInfo: NewPatientInfo): NonSensitivePatientEntry => {
  const patientId = uuid();
  const newPatient = {
    ...patientInfo,
    id: patientId
  };
  
  patients.push(newPatient);
  const { id, occupation, gender, dateOfBirth, name } = newPatient;


  return {
    id, occupation, gender, dateOfBirth, name
  };
};

export default { getPatients, addPatient };