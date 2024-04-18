import { useRouter } from "next/router";
import Image from "next/image";
import FormCheck from "../FormCheck";
import Link from "next/link";
import { AlignJustify, X } from "lucide-react";
import DropdownMenuTest from "../DropdownMenu";
import { useState } from "react";
import { Button } from "../ui/button";

export default function Nav() {
  const router = useRouter();

  const isConnected = true;

  const [testButton, setTestButton] = useState(true);

  const handleChangeButton = () => {
    setTestButton(!testButton);
  };

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
  const size = 20;

  return (
    <>
      <header
        className={`bg-primary p-4 flex justify-between border-b items-center h-${size}`}
      >
        <Link href="/">
          <Image src="../../logo_small.svg" width={150} height={0} alt="logo" />
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

        <div className="md:flex hidden w-[150px] lg:w-auto justify-end">
          <DropdownMenuTest isConnected={isConnected} />
        </div>

        <div className="md:hidden flex">
          <button onClick={handleChangeButton}>
            {testButton ? (
              <AlignJustify color="white" height={24} />
            ) : (
              <X color="white" height={24} />
            )}
          </button>
        </div>
      </header>

      <div
        className={`absolute top-${size} bottom-0 z-50 w-full transition-all duration-300 ease-in-out ${
          testButton ? "left-full" : "left-0"
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
            <Button variant={"destructive"} onClick={() => router.push("/")}>
              Déconnexion
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
