package lab_soft.todo_list.service;

import lab_soft.todo_list.entity.Task;
import lab_soft.todo_list.enums.TaskTypeEnum;
import lab_soft.todo_list.exception.exceptions.NotFoundEntityException;
import lab_soft.todo_list.repository.TaskRepository;

import lab_soft.todo_list.service.dto.TaskDto;
import lab_soft.todo_list.utils.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

@Service
public class TaskService {
    @Autowired
    protected TaskRepository taskRepository;

    public ArrayList<TaskDto.Response> getAll(){
        return this.mapperResponse(taskRepository.findAll());
    }

    public TaskDto.Response getByIdToResponse(long id){
        return mapperResponse(taskRepository.findById(id).orElseThrow(() -> new NotFoundEntityException("Nenhuma tarefa encontrada com o ID: " + id)));
    }
    public Task getById(long id){
        return taskRepository.findById(id).orElseThrow(() -> new NotFoundEntityException("Nenhuma tarefa encontrada com o ID: " + id));
    }

    public void delete(long id) {
        this.getById(id);
        taskRepository.deleteById(id);
    }

    public TaskDto.Response complete(long id){
        Task taskUpdated = this.getById(id);

        if(taskUpdated.getCompleted()){
            return this.mapperResponse(taskUpdated);
        }

        taskUpdated.setCompleted(true);

        return this.mapperResponse(taskRepository.save(taskUpdated));
    }

    public TaskDto.Response mapperResponse(Task task){
        TaskDto.Response response = new TaskDto.Response();

        response.id = task.getId();
        response.description = task.getDescription();
        response.completed = task.getCompleted();
        response.priority = task.getPriority();
        response.completionDate = task.getCompletionDate();
        response.type = task.getType();
        response.status = this.getStatus(task);
        response.createdAt = task.getCreatedAt();

        if(task.getType() == (TaskTypeEnum.Period.ordinal() + 1 )){
            response.days = DateUtil.getDayDifference(task.getCreatedAt(), task.getCompletionDate());
        }

        return response;
    }

    public ArrayList<TaskDto.Response> mapperResponse(Collection<Task> taskList){
        ArrayList<TaskDto.Response> responseList = new ArrayList<TaskDto.Response>();

        taskList.forEach(task -> responseList.add(this.mapperResponse(task)));

        return responseList;
    }

    public String getStatus(Task task){
        Date dateCurrent = new Date();
        if(task.getCompleted()){
            return "Concluída";
        }

        if(task.getCompletionDate() != null && task.getCompletionDate().before(dateCurrent)){
            long afterDays = DateUtil.getDayDifference(task.getCompletionDate(), dateCurrent);
            return String.format("%o dias de atraso", afterDays);
        }

        return "Prevista";
    }
}