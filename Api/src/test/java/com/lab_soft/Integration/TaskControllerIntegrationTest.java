package com.lab_soft.Integration;

import lab_soft.todo_list.TodoListApplication;
import lab_soft.todo_list.service.dto.TaskDto;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
@SpringBootTest(classes = {TodoListApplication.class}, webEnvironment
        = SpringBootTest.WebEnvironment.DEFINED_PORT)
@ActiveProfiles("test")
public class TaskControllerIntegrationTest {
    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void givenValidTaskDto_whenCreateTask_thenStatus201() {
        // Arrange
        TaskDto.Create taskDto = new TaskDto.Create();
        taskDto.type = 1;
        taskDto.description = "Nova tarefa";

        HttpHeaders headers = new HttpHeaders();
        HttpEntity<TaskDto.Create> request = new HttpEntity<>(taskDto, headers);

        // Act
        ResponseEntity<TaskDto.Response> response = restTemplate.exchange(
                "http://localhost:8080/api/task/",
                HttpMethod.POST,
                request,
                TaskDto.Response.class
        );

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().description).isEqualTo("Nova tarefa");
    }

    @Test
    public void givenInvalidTaskDto_whenCreateTask_thenStatus400() {
        // Arrange
        TaskDto.Create taskDto = new TaskDto.Create();
        // Não definindo os campos necessários para simular uma solicitação inválida

        HttpHeaders headers = new HttpHeaders();
        HttpEntity<TaskDto.Create> request = new HttpEntity<>(taskDto, headers);

        // Act
        ResponseEntity<Void> response = restTemplate.exchange(
                "http://localhost:8080/api/task/",
                HttpMethod.POST,
                request,
                Void.class
        );

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void givenValidTaskDto_whenUpdateTask_thenStatus200() {
        // Arrange
        long taskId = 1;
        TaskDto.Update taskDto = new TaskDto.Update();
        taskDto.type = 1;
        taskDto.description = "Tarefa atualizada";

        HttpHeaders headers = new HttpHeaders();
        HttpEntity<TaskDto.Update> request = new HttpEntity<>(taskDto, headers);

        // Act
        ResponseEntity<TaskDto.Response> response = restTemplate.exchange(
                "http://localhost:8080/api/task/" + taskId,
                HttpMethod.PUT,
                request,
                TaskDto.Response.class
        );

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().description).isEqualTo("Tarefa atualizada");
    }

    @Test
    public void givenNonExistentTaskId_whenUpdateTask_thenStatus404() {
        // Arrange
        long nonExistentTaskId = 999;
        TaskDto.Update taskDto = new TaskDto.Update();
        taskDto.type = 1;
        taskDto.description = "Tarefa atualizada";

        HttpHeaders headers = new HttpHeaders();
        HttpEntity<TaskDto.Update> request = new HttpEntity<>(taskDto, headers);

        // Act
        ResponseEntity<Void> response = restTemplate.exchange(
                "http://localhost:8080/api/task/" + nonExistentTaskId,
                HttpMethod.PUT,
                request,
                Void.class
        );

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }

    @Test
    public void givenInvalidTaskDto_whenUpdateTask_thenStatus400() {
        // Arrange
        long taskId = 1L;
        TaskDto.Update taskDto = new TaskDto.Update();

        HttpHeaders headers = new HttpHeaders();
        HttpEntity<TaskDto.Update> request = new HttpEntity<>(taskDto, headers);

        // Act
        ResponseEntity<Void> response = restTemplate.exchange(
                "http://localhost:8080/api/task/" + taskId,
                HttpMethod.PUT,
                request,
                Void.class
        );

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void givenExistingTaskId_whenDeleteTask_thenStatus200() {
        // Arrange
        long taskId = 1L; // ID da tarefa existente para exclusão

        HttpHeaders headers = new HttpHeaders();
        HttpEntity<Void> request = new HttpEntity<>(headers);

        // Act
        ResponseEntity<Void> response = restTemplate.exchange(
                "http://localhost:8080/api/task/" + taskId,
                HttpMethod.DELETE,
                request,
                Void.class
        );

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void givenNonExistentTaskId_whenDeleteTask_thenStatus404() {
        // Arrange
        long nonExistentTaskId = 200;

        HttpHeaders headers = new HttpHeaders();
        HttpEntity<Void> request = new HttpEntity<>(headers);

        // Act
        ResponseEntity<Void> response = restTemplate.exchange(
                "http://localhost:8080/api/task/" + nonExistentTaskId,
                HttpMethod.DELETE,
                request,
                Void.class
        );

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }

    @Test
    public void givenExistingTaskId_whenCompleteTask_thenStatus200() {
        // Arrange
        long taskId = 1;

        HttpHeaders headers = new HttpHeaders();
        HttpEntity<Void> request = new HttpEntity<>(headers);

        // Act
        ResponseEntity<TaskDto.Response> response = restTemplate.exchange(
                "http://localhost:8080/api/task/complete/" + taskId,
                HttpMethod.PUT,
                request,
                TaskDto.Response.class
        );

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
    }

    @Test
    public void givenNonExistentTaskId_whenCompleteTask_thenStatus404() {
        // Arrange
        long nonExistentTaskId = 999;

        HttpHeaders headers = new HttpHeaders();
        HttpEntity<Void> request = new HttpEntity<>(headers);

        // Act
        ResponseEntity<Void> response = restTemplate.exchange(
                "http://localhost:8080/api/task/complete/" + nonExistentTaskId,
                HttpMethod.PUT,
                request,
                Void.class
        );

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }

    @Test
    public void givenInvalidRequest_whenCompleteTask_thenStatus400() {
        // Arrange
        long invalidTaskId = -1L; // ID inválido para simular uma solicitação incorreta

        HttpHeaders headers = new HttpHeaders();
        HttpEntity<Void> request = new HttpEntity<>(headers);

        // Act
        ResponseEntity<Void> response = restTemplate.exchange(
                "http://localhost:8080/api/task/complete/" + invalidTaskId,
                HttpMethod.PUT,
                request,
                Void.class
        );

        // Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }
}
