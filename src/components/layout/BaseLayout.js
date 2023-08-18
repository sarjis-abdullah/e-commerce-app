import React from "react";
import Header from "../Header";

const BaseLayout = ({ children }) => {
  return (
    <section>
      <Header />
      <section className="segment-outer">{children}</section>
    </section>
  );
};

export default BaseLayout;
