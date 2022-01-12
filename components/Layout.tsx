import Head from "next/head";
import React, { ReactNode } from "react";
import Footer from "./Footer";
import Nav from "./Header";

type Props = {
  title: string;
  children: ReactNode;
};

const Layout = ({ title, children }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
    </Head>
    <header>
      <Nav />
    </header>
    <div className="w-screen h-[var(--page-height)] mt-[var(--nav-height)] flex flex-col items-center justify-between overflow-auto">
      <main
        className={
          "px-4 flex flex-col items-center sm:max-w-prose py-4 sm:pt-16"
        }
      >
        {children}
      </main>
      <Footer>&copy; 2022 Example</Footer>
    </div>
  </div>
);

export default Layout;
