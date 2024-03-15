import Head from "next/head";
import { ReactNode } from "react";
import Nav from "./Header";

interface LayoutProps {
  children: ReactNode;
  title: string;
}

export default function Layout({ children, title }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="health-check" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Nav />
      <main className="main-content p-4 bg-primary">{children}</main>
    </>
  );
}
