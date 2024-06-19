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
import { Fragment, useState } from "react";
const priorityColor = ["error", "warning", "success", "secondary"];
const DialogCreateTask = () => {
  const [open, setOpen] = useState(true);
  const [type, setType] = useState<number>();
  const [priority, setPriority] = useState<number>(3);
  const [description, setDescription] = useState<string>("");
  const handleClickOpen = () => {
    setType(3);
    setPriority(3);
    setDescription("");
    setOpen(true);
  };

  const handleClose = () => {
    setType(3);
    setPriority(3);
    setDescription("");
    setOpen(false);
  };
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
          <Typography variant="h5" textAlign={"center"}>
            Cadastrar Tarefa
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined"
            label="Nome"
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
                value={0}
                control={<Radio color="secondary" />}
                label="Data"
              />
              <FormControlLabel
                value={1}
                control={<Radio color="secondary" />}
                label="Prazo"
              />
              <FormControlLabel
                value={2}
                control={<Radio color="secondary" />}
                label="Livre"
              />
            </RadioGroup>
          </FormControl>
          {type == 0 && (
            <TextField
              variant="outlined"
              type="datetime-local"
              fullWidth
              sx={{ my: 2 }}
              color="secondary"
            />
          )}
          {type == 1 && (
            <TextField
              variant="outlined"
              label="Dias"
              type="number"
              fullWidth
              sx={{ my: 2 }}
              color="secondary"
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
            onClick={handleClose}
            autoFocus
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
