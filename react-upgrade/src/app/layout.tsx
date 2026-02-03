import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "React Migration - Dashboard Todo",
  description: "Angular 1.x to React migration example",
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
