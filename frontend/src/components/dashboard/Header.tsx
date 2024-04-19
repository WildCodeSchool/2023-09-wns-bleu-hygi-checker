import { useRouter } from "next/router";
import Image from "next/image";
import FormCheck from "../FormCheck";
import Link from "next/link";
import { AlignJustify, X } from "lucide-react";
import DropdownMenuTest from "../DropdownMenu";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useLazyQuery } from "@apollo/client";
import { LogoutQuery, LogoutQueryVariables } from "@/types/graphql";
import { LOGOUT } from "@/requests/queries/auth.queries";
import { useToast } from "../ui/use-toast";

export default function Nav() {
  const router = useRouter();

  const { toast } = useToast();

  const isConnected = true;

  const [openNavMobile, setOpenNavMobile] = useState(false);

  const handleChangeButton = () => {
    setOpenNavMobile(!openNavMobile);
  };

  const handleCloseButton = () => {
    setOpenNavMobile(false);
  };

  // ferme la nav mobile quand on resize l'écran
  useEffect(() => {
    window.addEventListener("resize", handleCloseButton);
    return () => {
      window.removeEventListener("resize", handleCloseButton);
    };
  }, []);

  const isActiveLink = (href: string) => {
    return router.pathname === href ? "bg-secondary rounded text-black" : "";
  };

  const navLink = [
    { name: "Campaign", link: "/dashboard/campaign/lists" },
    { name: "Analytics", link: "/dashboard/analytics" },
    { name: "Settings", link: "/dashboard/settings" },
  ];

  // const cookies = document.cookie.split(";").find((a) => a.startsWith("email"));

  // let email: string;
  // if (cookies) {
  //   const [, emailValue] = cookies.split("=");
  //   email = decodeURIComponent(emailValue);
  // } else {
  //   email = "BUG";
  // }

  const email = "toto@mail.com";

  // taille du header
  const heightHeader = 20;

  // largeur du logo + logo user à partir de md
  const widthImg = 150;

  const [logout] = useLazyQuery<LogoutQuery, LogoutQueryVariables>(LOGOUT);

  const handleLogout = () => {
    logout({
      onCompleted: (data) => {
        if (data.logout.success) {
          router.push("/");
          setTimeout(() => {
            toast({
              title: data.logout.message,
            });
          }, 500);
        }
      },
    });
  };

  return (
    <>
      <header
        className={`bg-primary p-4 flex justify-between border-b items-center h-${heightHeader}`}
      >
        <Link href="/">
          <Image
            src="../../logo_small.svg"
            width={widthImg}
            height={0}
            alt="logo"
          />
        </Link>

        <div className="hidden md:flex justify-center gap-6 text-white">
          {navLink.map((a, index) => (
            <Link
              key={index}
              className={`p-2 ${isActiveLink(a.link)}`}
              href={a.link}
            >
              {a.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <FormCheck checkText="Check" className="flex-row" variant="outline" />
        </div>

        <div
          className={`md:flex hidden w-[${widthImg}px] lg:w-auto justify-end`}
        >
          <DropdownMenuTest isConnected={isConnected} />
        </div>

        <div className="md:hidden flex">
          <button onClick={handleChangeButton}>
            {!openNavMobile ? (
              <AlignJustify color="white" height={24} />
            ) : (
              <X color="white" height={24} />
            )}
          </button>
        </div>
      </header>

      <div
        className={`absolute top-${heightHeader} bottom-0 z-50 w-full transition-all duration-300 ease-in-out ${
          openNavMobile ? "left-0" : "left-full"
        }`}
      >
        <div className="h-full w-full bg-primary p-5 flex flex-col gap-10">
          <div className="flex flex-col items-center gap-3 text-white">
            {navLink.map((a, index) => (
              <Link
                key={index}
                className={`p-2 text-lg font-semibold ${isActiveLink(a.link)}`}
                href={a.link}
              >
                {a.name.toUpperCase()}
              </Link>
            ))}
          </div>
          <div className="flex justify-center">
            <FormCheck
              checkText="Check"
              className="flex-row"
              variant="outline"
            />
          </div>
          <div className="flex-grow"></div>
          <hr />
          <div className="flex justify-between items-center">
            <p className="text-white">{email}</p>
            <Button variant={"destructive"} onClick={handleLogout}>
              Déconnexion
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
