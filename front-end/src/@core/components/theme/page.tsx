"use client";

// Material UI
import { createTheme } from "@mui/material";

export const Theme = createTheme({
  palette: {
    secondary: {
      main: "#ffff",
    },
    primary: {
      main: "#595BD4",
    },
  },
  typography: {
    fontFamily: "Plus Jakarta Sans",
    allVariants: {
      color: "white",
    },
  },
});
