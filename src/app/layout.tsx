import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "A personal portfolio website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body className="bg-fawn text-outer-space dark:bg-outer-space dark:text-fawn">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
