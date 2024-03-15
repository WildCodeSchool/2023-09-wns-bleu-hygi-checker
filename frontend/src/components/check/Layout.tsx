import Head from "next/head";
import { ReactNode } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
      <header className="bg-primary p-4 flex justify-between items-center mb-4 text-align sm:mb-24">
        <div>
          <Image
            className="block sm:hidden"
            src={
              router.pathname === "/" ? "./favicon.svg" : "../../favicon.svg"
            }
            width={60}
            height={0}
            alt="logo"
          />
          <Image
            className="hidden sm:block fixed top-5 left-1/2 transform -translate-x-1/2"
            src={
              router.pathname === "/"
                ? "./logo_medium.svg"
                : "../../logo_medium.svg"
            }
            width={350}
            height={0}
            alt="logo"
          />
        </div>

        <div className="mr-4 sm:fixed top-8 right-8">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src={
                    isConnected
                      ? "https://github.com/shadcn.png"
                      : "https://i.stack.imgur.com/vaDPM.png?s=256&g=1"
                  }
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            {isConnected ? (
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            ) : (
              <DropdownMenuContent align="end">
                <DropdownMenuLabel
                  className="cursor-pointer"
                  onClick={() => router.push("/auth/login")}
                >
                  Login
                </DropdownMenuLabel>
              </DropdownMenuContent>
            )}
          </DropdownMenu>
        </div>
      </header>
      <main className="main-content p-4 h-screen bg-primary">{children}</main>
    </>
  );
}
