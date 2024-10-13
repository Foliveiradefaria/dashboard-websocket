import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard WebSocket",
  description:
    "This project consists of a real-time dashboard application, developed using Next.js, which allows data to be exchanged instantly via WebSockets. The goal is to provide an interactive and responsive dashboard experience, leveraging the advantages of Next.js for server-side rendering and WebSocket for real-time communication.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
