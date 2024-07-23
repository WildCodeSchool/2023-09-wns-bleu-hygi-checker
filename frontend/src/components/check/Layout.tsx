import Head from "next/head";
import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import DropdownMenuTest from "../dashboard/DropdownMenuNav";
import { Toaster } from "../ui/toaster";
import { useGetUserProfileQuery } from "@/types/graphql";

interface LayoutProps {
  children: ReactNode;
  title: string;
}

export default function Layout({ children, title }: LayoutProps) {
  const { data: currentUser } = useGetUserProfileQuery({
    errorPolicy: "ignore",
  });

  const isConnected = !!currentUser?.getUserProfile;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="health-check" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col">
        <header className="bg-primary p-4 flex justify-between items-center text-align mb-12 sm:mb-0">
          <div>
            <Link href="/">
              <Image
                className="block sm:hidden"
                src="/favicon.svg"
                width={60}
                height={0}
                alt="logo"
              />
            </Link>
            <Link href="/">
              <Image
                className="hidden sm:block"
                src="/logo_medium.svg"
                width={300}
                height={0}
                alt="logo"
              />
            </Link>
          </div>

          <div className="mr-4 ">
            <DropdownMenuTest isConnected={isConnected} />
          </div>
        </header>
        <main className="flex-grow flex flex-col justify-center items-start p-4 bg-primary overflow-y-auto">
          {children}
        </main>
        <Toaster />
      </div>
    </>
  );
}
