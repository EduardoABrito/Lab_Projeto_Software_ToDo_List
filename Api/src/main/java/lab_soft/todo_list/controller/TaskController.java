package lab_soft.todo_list.controller;

import lab_soft.todo_list.exception.exceptions.NotFoundEntityException;
import lab_soft.todo_list.service.TaskDateService;
import lab_soft.todo_list.service.TaskOpenService;
import lab_soft.todo_list.service.TaskPeriodService;
import lab_soft.todo_list.service.dto.TaskDto;
import lab_soft.todo_list.service.interfaces.ITaskService;
import org.springframework.beans.factory.annotation.Autowired;
import io.swagger.v3.oas.annotations.Operation;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lab_soft.todo_list.enums.TaskTypeEnum;

import java.util.ArrayList;

import org.springframework.web.servlet.config.annotation.CorsRegistry;

@RestController
@RequestMapping("/task")
public class TaskController {
    @Autowired
    public TaskOpenService taskService;
    @Autowired
    public TaskPeriodService taskPeriodService;
    @Autowired
    public TaskDateService taskDateService;

    @GetMapping("/{id}")
    @CrossOrigin()
    @Operation(summary = "List task found by id.")
    public ResponseEntity<TaskDto.Response> getById(@PathVariable("id") long id){
        try{
            TaskDto.Response taskFound = taskService.getByIdToResponse(id);
            return new ResponseEntity<>(taskFound, HttpStatus.OK);
        }catch (NotFoundEntityException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/")
    @CrossOrigin()
    @Operation(summary = "List all task found.")
    public ResponseEntity<ArrayList<TaskDto.Response>> getAll(){
        return new ResponseEntity<>(taskService.getAll(), HttpStatus.OK);
    }

    @PostMapping("/")
    @CrossOrigin()
    @Operation(summary = "Create task in data base.")
    public ResponseEntity<TaskDto.Response> create(@RequestBody() TaskDto.Create taskDto){
      try{
          ITaskService service = this.getService(taskDto.type);
          return new ResponseEntity<>(service.create(taskDto), HttpStatus.CREATED);
      }catch (Exception e){
          return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
      }
    }

    @PutMapping("/{id}")
    @CrossOrigin()
    @Operation(summary = "Update data task found by id.")
    public ResponseEntity<TaskDto.Response> updateById(@PathVariable("id") long id, @RequestBody() TaskDto.Update taskDto){
        try{
            ITaskService service = this.getService(taskDto.type);

            return new ResponseEntity<>(service.update(id, taskDto), HttpStatus.OK);
        }catch (NotFoundEntityException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    @CrossOrigin()
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

    @PutMapping("/complete/{id}")
    @CrossOrigin()
    @Operation(summary = "Complete task found by id.")
    public ResponseEntity<TaskDto.Response> complete(@PathVariable("id") long id){
        try{
            return new ResponseEntity<>(taskService.complete(id), HttpStatus.OK);
        }catch (NotFoundEntityException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    private ITaskService getService(int type){
       if(type == TaskTypeEnum.DATE.ordinal() + 1){
           return this.taskDateService;
       }

        if(type == TaskTypeEnum.Period.ordinal() + 1){
            return this.taskPeriodService;

        }

        return this.taskService;
    }

}
