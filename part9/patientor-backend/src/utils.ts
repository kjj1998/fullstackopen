import { NewPatientInfo, Gender } from "./types";
import { z } from 'zod';

const parseSsn = z.custom<`ssn`>((val) => {
  const ssnRegex = /^\d{6}-(\d{2}[A-Z]|\d{3}[A-Z]|\d{4})$/;

  return typeof val === 'string' ? ssnRegex.test(val) : false;
});

type parseSsn = z.infer<typeof parseSsn>;

export const newPatientSchema = z.object({
  ssn: parseSsn,
  gender: z.nativeEnum(Gender),
  dateOfBirth: z.string().date(),
  occupation: z.string(),
  name: z.string()
});

const toNewPatientInfo = (object: unknown): NewPatientInfo => {
  return newPatientSchema.parse(object);
};

export default toNewPatientInfo;