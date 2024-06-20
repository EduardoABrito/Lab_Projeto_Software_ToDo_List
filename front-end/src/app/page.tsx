"use client";

// React
import { Fragment, useState } from "react";

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
import { TaskType } from "@src/services/todo-list/types";
import LoadingCustom from "@src/components/loading";

const HomePage = () => {
  const useQueryTask = useQuery({
    queryKey: [ReactQueryEnum.LIST_TASK],
    queryFn: async () => {
      const data = await getAll();
      setTask(data);
      return data;
    },
    refetchOnWindowFocus: true,
  });

  const [tasks, setTask] = useState<TaskType[]>();
  const pesquisa = (value: string) => {
    if (value == "") {
      setTask(useQueryTask.data);
    }
    setTask(
      useQueryTask.data?.filter((task) =>
        task.description.toLowerCase().startsWith(value.toLowerCase())
      )
    );
  };

  return (
    <Fragment>
      <Typography variant="h3" textAlign={"center"} my={2}>
        To Do List
      </Typography>
      <TextField
        variant="outlined"
        color="secondary"
        label={"Pesquisar"}
        onKeyUp={(e: any) => pesquisa(e.target.value)}
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
        <Box display={"flex"}>
          <DialogCreateTask />
          <IconButton
            color="warning"
            onClick={() => useQueryTask.refetch()}
            disabled={useQueryTask.isRefetching || useQueryTask.isLoading}
          >
            <Icon
              icon={
                useQueryTask.isRefetching || useQueryTask.isLoading
                  ? "line-md:loading-loop"
                  : "tabler:rotate"
              }
              fontSize={35}
            />
          </IconButton>
        </Box>
      </Box>

      {useQueryTask.isLoading ? (
        <LoadingCustom title="Aguarde o carregamento das tarefas a fazer" />
      ) : (
        <TaskList
          data={tasks?.filter((task) => task.completed == false) || []}
        />
      )}
      <Box display={"flex"} justifyContent={"space-between"} my={2} pb={1}>
        <Typography variant="h5">Concluido:</Typography>
      </Box>
      {useQueryTask.isLoading ? (
        <LoadingCustom title="Aguarde o carregamento das tarefas concluidas" />
      ) : (
        <TaskList data={tasks?.filter((task) => task.completed) || []} />
      )}
    </Fragment>
  );
};
export default HomePage;
