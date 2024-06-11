import axios, { AxiosInstance } from "axios";
import type { TaskType } from "./types";

const httpServer: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_API,
});

export const getAll = async (): Promise<TaskType[]> => {
  const { data } = await httpServer.get("/task");

  return data;
};
