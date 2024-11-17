export interface Entry {
  id: string
  date: string,
  visibility: string,
  weather: string
};

export interface NewEntry extends Omit<Entry, 'id'> {
  comment: string
};