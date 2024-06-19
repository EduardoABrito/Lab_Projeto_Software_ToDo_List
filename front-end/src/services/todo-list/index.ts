import axios, { AxiosInstance } from "axios";
import type { TaskType } from "./types";

const httpServer: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_API,
});

export const getAll = async (): Promise<TaskType[]> => {
  const { data } = await httpServer.get("/task/");

  return data;
};

export const deleteTaskById = async (id: number): Promise<void> => {
  const { data } = await httpServer.delete(`/task/${id}`);

  return data;
};

export const completeTaskById = async (id: number): Promise<void> => {
  const { data } = await httpServer.put(`/task/complete/${id}`);

  return data;
};
