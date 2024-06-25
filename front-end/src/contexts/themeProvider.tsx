"use client";
import { Container, ThemeProvider } from "@mui/material";
import { Theme } from "@src/@core/components/theme";

const ThemeProviderCustom = ({ children }: any) => {
  return (
    <Container>
      <ThemeProvider theme={Theme}>{children}</ThemeProvider>
    </Container>
  );
};

export default ThemeProviderCustom;
