import data from '../data/diagnoses';

import { Diagnosis } from '../types';

const diagnoses: Diagnosis[] = data as Diagnosis[];

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  getDiagnoses
};
