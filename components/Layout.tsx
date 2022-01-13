import Head from "next/head";
import React, { ReactNode } from "react";
import Toast from "../features/toast/Toast";
import Footer from "./Footer";
import Header from "./Header";

type Props = {
  title: string;
  children: ReactNode;
};

const Layout = ({ title, children }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
    </Head>
    <Header />
    <div className="w-screen h-[var(--page-height)] mt-[var(--nav-height)] flex flex-col items-center justify-between overflow-auto">
      <Toast />
      <main
        className={
          "px-4 flex flex-col items-center pt-8 pb-4 sm:max-w-prose sm:pt-16"
        }
      >
        {children}
      </main>
      <Footer>&copy; 2022 Example</Footer>
    </div>
  </div>
);

export default Layout;
