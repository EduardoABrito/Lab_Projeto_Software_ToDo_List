// Next
import { Metadata } from "next";

// Style
import "./globals.css";

// Material UI
import { Container, ThemeProvider } from "@mui/material";

// Theme
import { Theme } from "../@core/components/theme";
import ReactQueryProvider from "../contexts/reactQueryProvider";

export const metadata: Metadata = {
  title: "To Do list",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <ReactQueryProvider>
          <Container>
            <ThemeProvider theme={Theme}>{children}</ThemeProvider>
          </Container>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
