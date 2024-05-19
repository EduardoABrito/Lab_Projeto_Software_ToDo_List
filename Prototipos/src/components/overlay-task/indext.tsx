import { Icon } from "@iconify/react/dist/iconify.js";
import { Box } from "@mui/material";

const OverlayTask = () => {
  return (
    <Box
      borderRadius={2}
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.668)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      <Icon
        icon={"icon-park-outline:check-one"}
        color="#04800e"
        fontSize={50}
      />
    </Box>
  );
};

export default OverlayTask;
