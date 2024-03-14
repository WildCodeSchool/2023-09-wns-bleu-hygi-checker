import Head from "next/head";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface LayoutProps {
  children: ReactNode;
  title: string;
}

export default function Layout({ children, title }: LayoutProps) {
  const router = useRouter();
  const [isConnected] = useState<boolean>(false);
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="health-check" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <header className="bg-primary p-4 flex justify-center mb-12 text-align ">
        {/* <header className="bg-red-500 p-4 flex justify-center mb-4 text-align sm:bg-blue-500"> */}

        <div>
          <Image
            className="block sm:hidden"
            src="./favicon.svg"
            width={60}
            height={0}
            alt="logo"
          />
          <Image
            className="hidden sm:block"
            src="./logo_medium.svg"
            width={400}
            height={0}
            alt="logo"
          />
        </div>
        <div className="ml-auto">
          <Button
            variant={isConnected ? "destructive" : "outline"}
            onClick={() =>
              router.push(isConnected ? "auth/logout" : "auth/login")
            }
          >
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </header>
      <main className="main-content p-4 h-screen bg-primary">{children}</main>
    </>
  );
}
