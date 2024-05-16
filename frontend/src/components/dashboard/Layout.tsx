import Head from "next/head";
import { ReactNode } from "react";
import Nav from "./Header";
import { Toaster } from "../ui/toaster";

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
      <main
        className="p-4 bg-primary overflow-y-auto"
        // -80px car taille du header
        style={{ maxHeight: "calc(100vh - 80px)" }}
      >
        {children}
      </main>
      <Toaster />
    </>
  );
}
