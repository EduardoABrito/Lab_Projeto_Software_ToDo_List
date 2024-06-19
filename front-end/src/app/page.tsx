"use client";

// React
import { Fragment } from "react";

// Material UI
import { Box, IconButton, TextField, Typography } from "@mui/material";

// Icon
import { Icon } from "@iconify/react";

//Component
import TaskList from "../views/home/task-list";
import { useQuery } from "@tanstack/react-query";
import { ReactQueryEnum } from "../enum/react-query-enum.enum";
import { getAll } from "../services/todo-list";
import DialogCreateTask from "@src/components/dialog-create-task";

const HomePage = () => {
  const useQueryTask = useQuery({
    queryKey: [ReactQueryEnum.LIST_TASK],
    queryFn: getAll,
  });

  if (useQueryTask.isLoading) {
    return <></>;
  }

  return (
    <Fragment>
      <Typography variant="h3" textAlign={"center"} my={2}>
        To Do List
      </Typography>
      <TextField
        variant="outlined"
        color="secondary"
        label={"Pesquisar"}
        InputProps={{
          endAdornment: (
            <Icon
              icon={"line-md:search-twotone"}
              fontSize={35}
              color="#ffffff9b"
            />
          ),
        }}
        fullWidth
        sx={{ my: 3, border: "white" }}
      />
      <Box display={"flex"} justifyContent={"space-between"} my={2}>
        <Typography variant="h5">A Fazer:</Typography>
        <DialogCreateTask />
      </Box>
      <TaskList
        data={
          useQueryTask.data?.filter((task) => task.completed == false) || []
        }
      />
      <Box display={"flex"} justifyContent={"space-between"} my={2}>
        <Typography variant="h5">Concluido:</Typography>
      </Box>
      <TaskList
        data={useQueryTask.data?.filter((task) => task.completed) || []}
      />
    </Fragment>
  );
};
export default HomePage;
