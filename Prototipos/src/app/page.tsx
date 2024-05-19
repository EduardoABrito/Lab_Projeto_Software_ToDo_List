"use client";

// React
import { Fragment } from "react";

// Material UI
import { Box, IconButton, TextField, Typography } from "@mui/material";

// Icon
import { Icon } from "@iconify/react";

//Component
import TaskList from "@src/views/home/task-list";

// Mock
import { TaskMockList } from "@src/services/todo-list-api/mock/indext";

export default function Home() {
  const mockTask = TaskMockList;

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
        <IconButton color={"primary"}>
          <Icon icon="ri:add-box-fill" fontSize={40} />
        </IconButton>
      </Box>
      <TaskList data={mockTask.filter((task) => task.completed == false)} />
      <Box display={"flex"} justifyContent={"space-between"} my={2}>
        <Typography variant="h5">Concluido:</Typography>
      </Box>
      <TaskList data={mockTask.filter((task) => task.completed)} />
    </Fragment>
  );
}
