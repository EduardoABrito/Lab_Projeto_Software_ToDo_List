package lab_soft.todo_list.service;

import lab_soft.todo_list.entity.Task;
import lab_soft.todo_list.exception.exceptions.NotFoundEntityException;
import lab_soft.todo_list.repository.TaskRepository;
import lab_soft.todo_list.service.dto.TaskDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    @Autowired(required = true)
    TaskRepository taskRepository;

    public List<Task> getAll(){
        return taskRepository.findAll();
    }

    public Task getById(long id){
        return taskRepository.findById(id).orElseThrow(() -> new NotFoundEntityException("Nenhuma tarefa encontrada com o ID: " + id));
    }

    public Task create(TaskDto.Create taskDto){
        Task task = new Task();

        task.setDescription(taskDto.description);

        return taskRepository.save(task);
    }

    public Task update(long id, TaskDto.Create taskDto){
        Task taskUpdated = this.getById(id);

        taskUpdated.setDescription(taskDto.description);

        return taskRepository.save(taskUpdated);
    }

    public void delete(long id) {
        this.getById(id);
        taskRepository.deleteById(id);
    }

    public Task complete(long id){
        Task taskUpdated = this.getById(id);

        if(taskUpdated.getCompleted()){
            return taskUpdated;
        }

        taskUpdated.setCompleted(true);

        return taskRepository.save(taskUpdated);
    }
}