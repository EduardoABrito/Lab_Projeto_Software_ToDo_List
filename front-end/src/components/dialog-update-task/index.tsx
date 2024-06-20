import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  LinearProgress,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { ReactQueryEnum } from "@src/enum/react-query-enum.enum";
import { updateTaskById } from "@src/services/todo-list";
import { TaskType } from "@src/services/todo-list/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import Swal from "sweetalert2";
const priorityColor = ["error", "warning", "success", "secondary"];

const avisoCampo = (campo: string) => {
  Swal.fire({
    title: "Campo obrigatorio!",
    text: `Favor preencher o campo: ${campo}`,
    icon: "warning",
    toast: true,
    timer: 3000,
    position: "top-end",
    showConfirmButton: false,
  });
};

const DialogUpdateTask = ({
  task,
  open,
  setOpen,
}: {
  task: TaskType;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [priority, setPriority] = useState<number>(task.priority);
  const [description, setDescription] = useState<string>(task.description);

  const queryClient = useQueryClient();

  const handleClose = () => {
    setOpen(false);
  };

  const update = async () => {
    const payload = {
      description:
        description != "" && description != undefined
          ? description
          : task.description,
      priority: priority ?? task.priority,
    };
    if (!payload.description) {
      return avisoCampo("descrição");
    }

    if (payload.priority == 3) {
      return avisoCampo("Prioridade");
    }

    await updateTaskById(task.id, payload);
    queryClient.refetchQueries({ queryKey: [ReactQueryEnum.LIST_TASK] });

    handleClose();

    Swal.fire({
      title: "Sucesso!",
      text: `Tarefa Atualizada com sucesso!`,
      icon: "success",
      timer: 3000,
      toast: true,
      position: "top-end",
      showConfirmButton: false,
    });
  };

  const mutation = useMutation({
    onMutate: update,
  });

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography fontSize={30} textAlign={"center"}>
            Editar Tarefa
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined"
            label="Descrição"
            fullWidth
            sx={{ my: 2 }}
            color="secondary"
            defaultValue={task.description}
            onKeyUp={(e: any) => {
              setDescription(e.target.value);
            }}
          />
          <FormControl sx={{ my: 2 }}>
            <FormLabel id="prioridade-tarefa-label" color="secondary">
              Prioridade
            </FormLabel>
            <RadioGroup
              defaultValue={task.priority}
              row
              aria-labelledby="prioridade-tarefa-label"
              name="row-radio-buttons-group"
              onChange={(e) => setPriority(e.target.value as any)}
            >
              <FormControlLabel
                value={0}
                control={<Radio color="secondary" sx={{}} />}
                label="Alta"
              />
              <FormControlLabel
                value={1}
                control={<Radio color="secondary" />}
                label="Média"
              />
              <FormControlLabel
                value={2}
                control={<Radio color="secondary" />}
                label="Baixa"
              />
            </RadioGroup>
          </FormControl>
          <LinearProgress
            color={priorityColor[priority ?? task.priority] as any}
            sx={{ height: 8, borderRadius: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            color="error"
            fullWidth
          >
            Fechar
          </Button>
          <Button
            onClick={() => mutation.mutate()}
            variant="contained"
            color="success"
            fullWidth
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default DialogUpdateTask;
