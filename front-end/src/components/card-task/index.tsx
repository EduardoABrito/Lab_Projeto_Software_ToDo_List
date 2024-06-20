// Material UI
import { Box, IconButton, LinearProgress, Typography } from "@mui/material";

//Icon
import { Icon } from "@iconify/react";

//Component
import OverlayTask from "../overlay-task/indext";

// Types
import type { TaskType } from "../../services/todo-list/types";
import Swal from "sweetalert2";
import { completeTaskById, deleteTaskById } from "../../services/todo-list";
import { useQueryClient } from "@tanstack/react-query";
import { ReactQueryEnum } from "../../enum/react-query-enum.enum";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ConvertSubTitle } from "@src/utils/convert-sub-title.util";

interface props {
  data: TaskType;
  onEdit: () => void;
}

const priorityColor = ["error", "warning", "success", "secondary"];
const CardTask = ({ onEdit, data }: props) => {
  const queryClient = useQueryClient();

  const deleteTask = () => {
    Swal.fire({
      title: `Deseja deletar a tarefa?`,
      text: `Essa ação e irreversivel.`,
      showDenyButton: true,
      confirmButtonText: "Deletar",
      denyButtonText: `Cancelar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteTaskById(data.id);

        queryClient.refetchQueries({
          queryKey: [ReactQueryEnum.LIST_TASK],
        });

        Swal.fire({
          title: "Deletado!",
          text: `Tarefa deletada com sucesso`,
          icon: "success",
          toast: true,
          timer: 3000,
          position: "top-end",
          showConfirmButton: false,
        });
      }
    });
  };

  const completeTask = () => {
    Swal.fire({
      title: `Deseja completar a tarefa?`,
      text: `Essa ação e irreversivel.`,
      showDenyButton: true,
      confirmButtonText: "Completar",
      denyButtonText: `Cancelar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await completeTaskById(data.id);

        queryClient.refetchQueries({ queryKey: [ReactQueryEnum.LIST_TASK] });

        Swal.fire({
          title: "Deletado!",
          text: `Tarefa deletada com sucesso`,
          icon: "success",
          toast: true,
          timer: 3000,
          position: "top-end",
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <Box
      boxShadow={1}
      bgcolor={data.completed ? "#0173297b" : "#11111184"}
      border={1}
      borderRadius={2}
      p={2}
      borderColor={"white"}
      position={"relative"}
    >
      <Box
        display={{ xs: "flex", md: "block" }}
        justifyContent={"space-between"}
      >
        <Box textAlign={{ md: "center" }}>
          <Typography variant="h6" noWrap textTransform={"capitalize"}>
            {data.description}
          </Typography>
          <Typography variant="subtitle2" textTransform={"capitalize"}>
            {ConvertSubTitle(data)}
          </Typography>
        </Box>
        <Box
          justifyContent={"center"}
          my={2}
          display={{ xs: "none", md: "flex" }}
        >
          <Icon
            icon={"fluent:person-clock-16-regular"}
            color={data.completed ? "transparent" : "white"}
            fontSize={60}
          />
        </Box>
        <Box display={"flex"} justifyContent={"space-around"}>
          <IconButton color="warning" onClick={onEdit}>
            <Icon icon="mingcute:edit-4-fill" fontSize={30} />
          </IconButton>
          <IconButton color="error" onClick={deleteTask}>
            <Icon icon="gg:trash" fontSize={30} />
          </IconButton>
          <IconButton color="success" onClick={completeTask}>
            <Icon icon="lets-icons:check-fill" fontSize={30} />
          </IconButton>
        </Box>
        {data.completed && <OverlayTask />}
      </Box>
      {!data.completed && (
        <LinearProgress
          color={priorityColor[data.priority] as any}
          sx={{ height: 8, borderRadius: 2, my: 2 }}
        />
      )}
    </Box>
  );
};

export default CardTask;
