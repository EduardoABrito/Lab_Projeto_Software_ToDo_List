package lab_soft.todo_list.service;

import lab_soft.todo_list.entity.Task;
import lab_soft.todo_list.enums.TaskTypeEnum;
import lab_soft.todo_list.service.dto.TaskDto;
import lab_soft.todo_list.service.interfaces.ITaskService;
import org.springframework.stereotype.Service;

@Service
public class TaskDateService extends TaskService implements ITaskService {
    public TaskDto.Response create(TaskDto.Create taskDto){
        Task task = new Task();

        task.setDescription(taskDto.description);
        task.setPriority(taskDto.priority);
        task.setType(TaskTypeEnum.DATE.ordinal() + 1);
        task.setCompletionDate(taskDto.completionDate);

        return this.mapperResponse(taskRepository.save(task));
    }

    public TaskDto.Response update(long id, TaskDto.Update taskDto){
        Task taskUpdated = this.getById(id);

        taskUpdated.setDescription(taskDto.description);
        taskUpdated.setPriority(taskDto.priority);
        taskUpdated.setCompletionDate(taskDto.completionDate);

        return this.mapperResponse(taskRepository.save(taskUpdated));
    }
}
