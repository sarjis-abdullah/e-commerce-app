import "./globals.css";
import { Inter } from "next/font/google";
import React, { FC } from "react";

export const metadata = {
  title: "Sarjis Portfolio",
  description: "Software Engineer",
};

const RootLayout: FC = ({children}: any) => {
  return (
    <html lang="en">
      <body className={'bg-white'}>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
