// Material UI
import { Box, IconButton, Typography } from "@mui/material";

//Icon
import { Icon } from "@iconify/react";

//Component
import OverlayTask from "../overlay-task/indext";

// Types
import type { TaskType } from "@src/services/todo-list-api/types";

interface props {
  data: TaskType;
}

const CardTask = ({ data }: props) => {
  return (
    <Box
      boxShadow={1}
      bgcolor={data.completed ? "#0173297b" : "#11111184"}
      border={1}
      borderRadius={2}
      p={2}
      borderColor={"white"}
      position={"relative"}
      display={{ xs: "flex", md: "block" }}
      justifyContent={"space-between"}
    >
      <Box textAlign={{ md: "center" }}>
        <Typography variant="h6" noWrap>
          {data.name}
        </Typography>
        <Typography variant="subtitle2">11 de abril 2024</Typography>
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
        <IconButton color="warning">
          <Icon icon="mingcute:edit-4-fill" fontSize={30} />
        </IconButton>
        <IconButton color="error">
          <Icon icon="gg:trash" fontSize={30} />
        </IconButton>
        <IconButton color="success">
          <Icon icon="lets-icons:check-fill" fontSize={30} />
        </IconButton>
      </Box>
      {data.completed && <OverlayTask />}
    </Box>
  );
};

export default CardTask;
