export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
};

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export enum Gender {
  male = 'male',
  female = 'female',
  other = 'other'
}

export type NonSensitivePatientEntry = Omit<Patient, 'ssn'>;
export type NewPatientInfo = Omit<Patient, 'id'>;