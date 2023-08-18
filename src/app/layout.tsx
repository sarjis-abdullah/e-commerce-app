import "./globals.css";
import { Inter } from "next/font/google";
import React, { FC } from "react";
import { Providers } from "@/redux/providers";
export const metadata = {
  title: "Sarjis Portfolio",
  description: "Software Engineer",
};

const RootLayout: FC = ({ children }: any) => {
  return (
    <html lang="en">
      <body className={"bg-white"}>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
