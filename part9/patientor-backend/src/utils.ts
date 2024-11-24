import { NewPatientInfo, Gender, HealthCheckRating } from "./types";
import { z } from 'zod';

const parseSsn = z.custom<`ssn`>((val) => {
  const ssnRegex = /^\d{6}-(\d{2}[A-Z]|\d{3}[A-Z]|\d{4})$/;

  return typeof val === 'string' ? ssnRegex.test(val) : false;
});

type parseSsn = z.infer<typeof parseSsn>;

const dischargeInfoSchema = z.object({
  date: z.string(),
  criteria: z.string(),
});

const leaveInfoSchema = z.object({
  startDate: z.string(),
  endDate: z.string()
}).optional();

export const newPatientSchema = z.object({
  ssn: parseSsn,
  gender: z.nativeEnum(Gender),
  dateOfBirth: z.string().date(),
  occupation: z.string(),
  name: z.string()
});

export const newEntrySchema = z.object({
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCode: z.string().array().optional(),
  type: z.union([z.literal('HealthCheck'), z.literal('OccupationalHealthcare'), z.literal('Hospital')])
});

export const newHospitalEntrySchema = z.object({
  dischargeInfo: dischargeInfoSchema
});

export const newHealthCheckEntrySchema = z.object({
  healthCheckRating: z.nativeEnum(HealthCheckRating)
});

export const newOccupationalHealthcareEntrySchema = z.object({
  employerName: z.string(),
  sickLeave: leaveInfoSchema
});

const toNewPatientInfo = (object: unknown): NewPatientInfo => {
  return newPatientSchema.parse(object);
};

export default toNewPatientInfo;