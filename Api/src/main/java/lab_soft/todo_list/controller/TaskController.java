package lab_soft.todo_list.controller;

import lab_soft.todo_list.exception.exceptions.NotFoundEntityException;
import lab_soft.todo_list.service.dto.TaskDto;
import org.springframework.beans.factory.annotation.Autowired;
import io.swagger.v3.oas.annotations.Operation;
import lab_soft.todo_list.entity.Task;
import lab_soft.todo_list.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/task")
public class TaskController {
    @Autowired(required = true)
    private TaskService taskService;

    @GetMapping("/{id}")
    @Operation(summary = "List task found by id.")
    public ResponseEntity<Task> getById(@PathVariable("id") long id){
        try{
            Task taskFound = taskService.getById(id);
            return new ResponseEntity<>(taskFound, HttpStatus.OK);
        }catch (NotFoundEntityException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/")
    @Operation(summary = "List all task found.")
    public ResponseEntity<List<Task>> getAll(){
        return new ResponseEntity<>(taskService.getAll(), HttpStatus.OK);
    }

    @PostMapping("/")
    @Operation(summary = "Create task in data base.")
    public ResponseEntity<Task> create(@RequestBody() TaskDto.Create taskDto){
      try{
          return new ResponseEntity<>(taskService.create(taskDto), HttpStatus.CREATED);
      }catch (Exception e){
          return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
      }
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update data task found by id.")
    public ResponseEntity<Task> updateById(@PathVariable("id") long id, @RequestBody() TaskDto.Create taskDto){
        try{
            return new ResponseEntity<>(taskService.update(id, taskDto), HttpStatus.OK);
        }catch (NotFoundEntityException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete task found by id.")
    public ResponseEntity<Void> deleteById(@PathVariable("id") long id){
        try{
            taskService.delete(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (NotFoundEntityException e){
            return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
        }
        catch (Exception e){
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }

    }

    @PatchMapping("/complete/{id}")
    @Operation(summary = "Complete task found by id.")
    public ResponseEntity<Task> complete(@PathVariable("id") long id){
        try{
            return new ResponseEntity<>(taskService.complete(id), HttpStatus.OK);
        }catch (NotFoundEntityException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

}
