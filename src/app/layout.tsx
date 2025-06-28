import type { Metadata } from "next";
import "./globals.css";

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
      <body className="bg-fawn text-outer-space dark:bg-outer-space dark:text-fawn">
        {children}
      </body>
    </html>
  );
}
