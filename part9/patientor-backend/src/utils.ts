import { NewPatientInfo, Gender } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(x => x.toString()).includes(param);
};

const isSsn = (ssn: string): boolean => {
  const ssnRegex = /^\d{6}-(\d{2}[A-Z]|\d{3}[A-Z]|\d{4})$/;

  return ssnRegex.test(ssn);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing name');
  }

  return occupation;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }

  return date;
};

const parseGender = (gender: unknown): string => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }

  return gender;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn) || !isSsn(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }

  return ssn;
};


const toNewPatientInfo = (object: unknown): NewPatientInfo => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'ssn' in object && 
    'gender' in object && 
    'dateOfBirth' in object && 
    'name' in object && 
    'occupation' in object
  ) {
    const newPatientInfo: NewPatientInfo = {
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      dateOfBirth: parseDate(object.dateOfBirth),
      occupation: parseOccupation(object.occupation),
      name: parseName(object.name)
    };

    return newPatientInfo;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatientInfo;