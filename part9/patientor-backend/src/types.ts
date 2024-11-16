import { z } from 'zod';

import { newPatientSchema } from "./utils";

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
};

export enum Gender {
  male = 'male',
  female = 'female',
  other = 'other'
}


export type NewPatientInfo = z.infer<typeof newPatientSchema>;

export interface Patient extends NewPatientInfo {
  id: string,
}
export interface NonSensitivePatientEntry extends Omit<NewPatientInfo, 'ssn'> {
  id: string
};