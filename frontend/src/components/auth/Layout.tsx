import Head from "next/head";
import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Toaster } from "../ui/toaster";
import { ArrowLeft } from "lucide-react";
interface LayoutProps {
  children: ReactNode;
  title: string;
}

export default function LayoutLogin({ children, title }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="hygi-checker" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <div className="relative grid md:grid-cols-2 h-screen">
        <div className="absolute top-4 left-4 z-10">
          <Link href="/">
            <div className="flex items-center justify-center bg-primary p-2 rounded-full text-white">
              <ArrowLeft className="h-6 w-6 text-white" />
            </div>
          </Link>
        </div>
        <Link
          href="/"
          className="md:flex hidden justify-center items-center bg-primary"
        >
          <Image src="/logo_large.svg" width={350} height={0} alt="logo" />
        </Link>
        {children}
      </div>
      <Toaster />
    </>
  );
}
