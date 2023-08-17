import "./globals.css";
import { Inter } from "next/font/google";
import React, { FC } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sarjis Portfolio",
  description: "Software Engineer",
};

const RootLayout: FC = (props) => {
  return (
    <html lang="en">
      <body className={'bg-[#F5F5F5]'}>
        <main>{props.children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
