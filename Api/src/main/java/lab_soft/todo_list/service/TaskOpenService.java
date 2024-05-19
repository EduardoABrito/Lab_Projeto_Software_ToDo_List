package lab_soft.todo_list.service;

import lab_soft.todo_list.entity.Task;
import lab_soft.todo_list.enums.TaskTypeEnum;
import lab_soft.todo_list.repository.TaskRepository;
import lab_soft.todo_list.service.dto.TaskDto;
import lab_soft.todo_list.service.interfaces.ITaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

@Service
public class TaskOpenService extends TaskService implements ITaskService {
    public TaskDto.Response create(TaskDto.Create taskDto){
        Task task = new Task();

        task.setDescription(taskDto.description);
        task.setPriority(taskDto.priority);
        task.setType(TaskTypeEnum.OPEN.ordinal() + 1);

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
