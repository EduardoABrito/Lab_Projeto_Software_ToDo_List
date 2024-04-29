package lab_soft.todo_list.service.dto;

import java.util.Date;

public class TaskDto {
    public static class Create{
        public String description;
        public int priority;

        public int type;

        public Date completionDate;

        public int days;

    }

    public static class Update{
        public String description;
        public int priority;

        public int type;

        public Date completionDate;

        public int days;
    }

    public static class Response {
        public Long id;
        public String description;
        public boolean completed;
        public int priority;
        public long days;
        public Date completionDate;
        public int type;
        public String status;
        public Date createdAt;
    }
}
