import axios from "axios";
import { Entry, NewEntry } from "./types";

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllDiaryEntries = async () => {
  const response = await axios.get<Entry[]>(baseUrl);
  return response.data;
}

export const createDiaryEntry = async (object: NewEntry) => {
  try {
    const response = await axios.post<Entry>(baseUrl, object);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
  }
}