import data from '../data/patients';

import { NonSensitivePatientEntry } from "../types";

const patients: NonSensitivePatientEntry[] = data as NonSensitivePatientEntry[];

const getPatients = (): NonSensitivePatientEntry[] => patients;

export default { getPatients };