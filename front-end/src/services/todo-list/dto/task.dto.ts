export interface TaskCreateDto {
  description: string;
  priority: number;
  type: number;
  completionDate?: Date;
}

export interface TaskUpdateDto {
  description: string;
  priority: number;
}
