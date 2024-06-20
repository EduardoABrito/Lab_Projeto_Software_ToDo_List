export interface TaskCreateDto {
  description: string;
  priority: number;
  type: number;
  completionDate?: Date;
}
