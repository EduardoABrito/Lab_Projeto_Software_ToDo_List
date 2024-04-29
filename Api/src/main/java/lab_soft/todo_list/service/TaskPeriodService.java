package lab_soft.todo_list.service;

import lab_soft.todo_list.entity.Task;
import lab_soft.todo_list.enums.TaskTypeEnum;
import lab_soft.todo_list.service.dto.TaskDto;
import lab_soft.todo_list.service.interfaces.ITaskService;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.Date;

@Component
public class TaskPeriodService extends TaskService implements ITaskService {
    public TaskDto.Response create(TaskDto.Create taskDto){
        Task task = new Task();
        Date dateCurrent = new Date();

        task.setDescription(taskDto.description);
        task.setPriority(taskDto.priority);
        task.setType(TaskTypeEnum.Period.ordinal() + 1);
        task.setCompletionDate(taskDto.completionDate);

        return this.mapperResponse(this.taskRepository.save(task));
    }

    public TaskDto.Response update(long id, TaskDto.Update taskDto){
        Task taskUpdated = this.getById(id);

        taskUpdated.setDescription(taskDto.description);
        taskUpdated.setPriority(taskDto.priority);
        taskUpdated.setCompletionDate(this.getDeadLine(taskUpdated.getCreatedAt(), taskDto.days));


        return this.mapperResponse(taskRepository.save(taskUpdated));
    }

    private Date getDeadLine(Date dateStart, int days){
        Calendar calendar = Calendar.getInstance();

        calendar.setTime(dateStart);

        calendar.add(Calendar.DATE, days);

        return calendar.getTime();
    }
}
