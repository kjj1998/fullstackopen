import { z } from 'zod';
import { newEntrySchema } from './utils';

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export type NewDiaryEntry = z.infer<typeof newEntrySchema>;
export interface DiaryEntry extends NewDiaryEntry {
  id: number;
}
export interface NonSensitiveDiaryEntry extends Omit<NewDiaryEntry, 'comment'> {
  id: number;
}