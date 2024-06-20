// Materia UI
import { Grid } from "@mui/material";

// Componente
import CardTask from "../../../components/card-task";

// Type
import type { TaskType } from "../../../services/todo-list/types";

interface props {
  data: TaskType[];
}

const TaskList = ({ data }: props) => {
  return (
    <Grid
      container
      spacing={3}
      sx={{ maxHeight: 550, overflowY: "auto", px: 1 }}
    >
      {data?.map((task) => (
        <Grid item xs={12} md={3} lg={4} key={task.id}>
          <CardTask data={task} />
        </Grid>
      ))}
    </Grid>
  );
};
export default TaskList;
