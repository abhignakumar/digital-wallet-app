import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "../providers";
import { NavBarClient } from "../components/NavBarClient";

export const metadata: Metadata = {
  title: "Payment App (User)",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <NavBarClient />
          {children}
        </Providers>
      </body>
    </html>
  );
}
