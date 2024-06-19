// Next
import { Metadata } from "next";

// Style
import "./globals.css";

// Theme
import ReactQueryProvider from "@src/contexts/reactQueryProvider";
import ThemeProviderCustom from "@src/contexts/themeProvider";

export const metadata: Metadata = {
  title: "To Do list",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-Br">
      <body>
        <ReactQueryProvider>
          <ThemeProviderCustom>{children}</ThemeProviderCustom>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
