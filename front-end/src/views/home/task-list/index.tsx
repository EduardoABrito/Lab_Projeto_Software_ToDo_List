// Materia UI
import { Grid } from "@mui/material";

// Componente
import CardTask from "../../../components/card-task";

// Type
import type { TaskType } from "../../../services/todo-list/types";
import DialogUpdateTask from "@src/components/dialog-update-task";
import { useState } from "react";

interface props {
  data: TaskType[];
}

const TaskList = ({ data }: props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [task, setTask] = useState<TaskType>({} as TaskType);

  const edit = () => {};
  return (
    <>
      <DialogUpdateTask open={open} setOpen={setOpen} task={task} />
      <Grid
        container
        spacing={3}
        sx={{ maxHeight: 550, overflowY: "auto", px: 1 }}
      >
        {data?.map((task) => (
          <Grid item xs={12} md={3} lg={4} key={task.id}>
            <CardTask
              onEdit={() => {
                setTask(task);
                setOpen(true);
              }}
              data={task}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
export default TaskList;
