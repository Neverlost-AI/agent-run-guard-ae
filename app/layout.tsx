import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agent Run Guard",
  description:
    "Define scope, protected areas, verification requirements, and stop conditions before an AI coding agent starts work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
