package lab_soft.todo_list.entity;

import io.swagger.v3.oas.annotations.media.Schema;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "All task data")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Schema(description = "Summary of the task to be done.")
    @Size(min = 15, message = "Min length  is 15 characters.")
    private String description;

    @Schema(description = "Informs task has been completed.")
    private Boolean completed;

    @Schema(description = "Date in created.")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @PrePersist
    protected void onCreate(){
        this.createdAt = new Date();
        this.completed = false;
    }
}