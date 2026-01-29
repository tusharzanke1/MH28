import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MH28 - Premium Indian Wear",
  description: "Premium Indian clothing for modern wardrobes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
