import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FitLife AI",
  description: "AI-powered fitness insights, planning, recovery, and rewards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
