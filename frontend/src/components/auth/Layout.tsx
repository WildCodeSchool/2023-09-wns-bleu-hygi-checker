import Head from "next/head";
import { ReactNode } from "react";
import Image from "next/image";

interface LayoutProps {
  children: ReactNode;
  title: string;
}

export default function LayoutLogin({ children, title }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="petites annonces" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <div className="grid md:grid-cols-2 h-screen">
        <div className="md:flex hidden justify-center items-center bg-primary">
          <Image src="/logo_large.svg" width={350} height={0} alt="logo" />
        </div>
        {children}
      </div>
    </>
  );
}
