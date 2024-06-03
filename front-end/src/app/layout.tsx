// Next
import { Metadata } from "next";

// Style
import "./globals.css";

// Material UI
import { Container, ThemeProvider } from "@mui/material";

// Theme
import { Theme } from "@src/@core/components/theme/page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const metadata: Metadata = {
  title: "To Do list",
};

// Create a client
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ptBr">
      <body>
        <QueryClientProvider client={queryClient}>
          <Container>
            <ThemeProvider theme={Theme}>{children}</ThemeProvider>
          </Container>
        </QueryClientProvider>
      </body>
    </html>
  );
}
