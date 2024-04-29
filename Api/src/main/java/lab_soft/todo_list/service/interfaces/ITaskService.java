package lab_soft.todo_list.service.interfaces;

import lab_soft.todo_list.service.dto.TaskDto;

public interface ITaskService {
    TaskDto.Response create(TaskDto.Create taskDto);
    TaskDto.Response update(long id, TaskDto.Update taskDto);
}
