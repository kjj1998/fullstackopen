import axios from "axios";
import { Entry } from "./types";

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllDiaryEntries = async () => {
  const response = await axios.get<Entry[]>(baseUrl);
  return response.data;
}