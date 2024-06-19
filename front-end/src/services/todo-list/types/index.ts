export type TaskType = {
  id: number;
  description: string;
  completed: boolean;
  priority: number;
  days?: number;
  completionDate?: Date;
  type: number;
  status: string;
  createdAt?: Date;
};
