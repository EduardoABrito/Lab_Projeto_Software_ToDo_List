import axios, { AxiosInstance } from "axios";
import type { TaskType } from "./types";
import { TaskCreateDto, TaskUpdateDto } from "./dto/task.dto";

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

export const createTask = async (payload: TaskCreateDto): Promise<TaskType> => {
  const { data } = await httpServer.post(`/task/`, {
    description: payload.description,
    type: payload.type,
    priority: payload.priority,
    completionDate: payload.completionDate?.toISOString(),
  });

  return data;
};

export const updateTaskById = async (
  id: number,
  payload: TaskUpdateDto
): Promise<TaskType> => {
  const { data } = await httpServer.put(`/task/${id}`, {
    description: payload.description,
    priority: payload.priority,
  });

  return data;
};
