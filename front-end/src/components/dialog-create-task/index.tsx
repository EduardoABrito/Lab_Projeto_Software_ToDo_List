import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  LinearProgress,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { ReactQueryEnum } from "@src/enum/react-query-enum.enum";
import { createTask } from "@src/services/todo-list";
import { TaskCreateDto } from "@src/services/todo-list/dto/task.dto";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDays } from "date-fns";
import { Fragment, useState } from "react";
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

const DialogCreateTask = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<number | null>();
  const [priority, setPriority] = useState<number>(3);
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Date | null>();
  const [days, setDays] = useState<number | null>(0);

  const queryClient = useQueryClient();

  const handleClickOpen = () => {
    setType(null);
    setPriority(3);
    setDescription("");
    setOpen(true);
    setDate(null);
    setDays(null);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submit = async () => {
    if (!description) {
      return avisoCampo("descrição");
    }

    if (priority == 3) {
      return avisoCampo("Prioridade");
    }

    if (!type) {
      return avisoCampo("Tipo Tarefa");
    }

    if (type == 2 && !days) {
      return avisoCampo("Dias");
    }

    if (type == 1 && !date) {
      return avisoCampo("Data");
    }

    const payload: TaskCreateDto = {
      description,
      type: type as number,
      priority,
      completionDate:
        type == 1
          ? date!
          : addDays(Date.now(), days ? parseInt(days as any) : 0),
    };
    await createTask(payload);
    queryClient.refetchQueries({ queryKey: [ReactQueryEnum.LIST_TASK] });
    handleClose();
    Swal.fire({
      title: "Sucesso!",
      text: `Tarefa criada com sucesso!`,
      icon: "success",
      timer: 3000,
      toast: true,
      position: "top-end",
      showConfirmButton: false,
    });
  };

  const mutation = useMutation({
    onMutate: submit,
  });

  return (
    <Fragment>
      <IconButton color={"primary"} onClick={handleClickOpen}>
        <Icon icon="ri:add-box-fill" fontSize={40} />
      </IconButton>

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
            Cadastrar Tarefa
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined"
            label="Descrição"
            fullWidth
            sx={{ my: 2 }}
            color="secondary"
            onKeyUp={(e: any) => {
              setDescription(e.target.value);
            }}
          />
          <FormControl sx={{ my: 2 }}>
            <FormLabel id="prioridade-tarefa-label" color="secondary">
              Prioridade
            </FormLabel>
            <RadioGroup
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
            color={priorityColor[priority] as any}
            sx={{ height: 8, borderRadius: 2 }}
          />
          <FormControl sx={{ my: 2 }}>
            <FormLabel id="tipo-tarefa-label" color="secondary">
              Tipo Tarefa
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="tipo-tarefa-label"
              name="row-radio-buttons-group"
              onChange={(e) => setType(e.target.value as any)}
            >
              <FormControlLabel
                value={1}
                control={<Radio color="secondary" />}
                label="Data"
              />
              <FormControlLabel
                value={2}
                control={<Radio color="secondary" />}
                label="Prazo"
              />
              <FormControlLabel
                value={3}
                control={<Radio color="secondary" />}
                label="Livre"
              />
            </RadioGroup>
          </FormControl>
          {type == 1 && (
            <TextField
              variant="outlined"
              type="datetime-local"
              fullWidth
              sx={{ my: 2 }}
              color="secondary"
              onChange={(e: any) => setDate(new Date(e.target.value))}
            />
          )}
          {type == 2 && (
            <TextField
              variant="outlined"
              label="Dias"
              type="number"
              fullWidth
              sx={{ my: 2 }}
              color="secondary"
              onChange={(e: any) => setDays(e.target.value)}
            />
          )}
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

export default DialogCreateTask;
