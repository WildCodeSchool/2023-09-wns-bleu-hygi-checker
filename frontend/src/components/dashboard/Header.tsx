import { useRouter } from "next/router";
import Image from "next/image";
import FormCheck from "../FormCheck";
import Link from "next/link";
import { AlignJustify, X } from "lucide-react";
import DropdownMenuNav from "./DropdownMenuNav";
import { useEffect, useState } from "react";
import { useGetAvatarQuery, useGetUserProfileQuery } from "@/types/graphql";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useLogout } from "../auth/Logout";

export default function Nav() {
  const router = useRouter();
  const { data } = useGetAvatarQuery();

  const { data: currentUser } = useGetUserProfileQuery({
    errorPolicy: "ignore",
  });

  const isConnected = !!currentUser?.getUserProfile;

  const [openNavMobile, setOpenNavMobile] = useState(false);

  const handleChangeButton = () => {
    setOpenNavMobile(!openNavMobile);
  };

  const handleCloseButton = () => {
    setOpenNavMobile(false);
  };

  const handleLogout = useLogout();

  // ferme la nav mobile quand on resize l'écran
  useEffect(() => {
    window.addEventListener("resize", handleCloseButton);
    return () => {
      window.removeEventListener("resize", handleCloseButton);
    };
  }, []);

  const isActiveLink = (href: string, name: string) => {
    if (router.pathname === href) {
      return "bg-secondary rounded text-black";
    }

    if (
      router.pathname.startsWith("/dashboard/campaign/details") &&
      name == "Campaign"
    ) {
      return "bg-secondary rounded text-black";
    }

    return "";
  };

  const navLink = [
    { name: "Campaign", link: "/dashboard/campaign/lists" },
    { name: "Analytics", link: "/dashboard/analytics" },
    { name: "Settings", link: "/dashboard/settings" },
  ];

  return (
    <>
      <header className="bg-primary p-4 flex justify-between border-b items-center h-20">
        <Link href="/">
          <Image
            src="../../../logo_small.svg"
            width={150}
            height={0}
            alt="logo"
          />
        </Link>

        <div className="hidden md:flex justify-center gap-6 text-white">
          {navLink.map((a, index) => (
            <Link
              key={index}
              className={`p-2 ${isActiveLink(a.link, a.name)}`}
              href={a.link}
            >
              {a.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <FormCheck
            checkText="Check"
            inputId="nav_check"
            className="flex-row"
            variant="outline"
          />
        </div>

        <div className="md:flex hidden w-[150px] lg:w-auto justify-end">
          <DropdownMenuNav isConnected={isConnected} />
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
        className={`absolute top-20 bottom-0 z-50 w-full transition-all duration-300 ease-in-out ${
          openNavMobile ? "left-0" : "left-full hidden"
        }`}
      >
        <div className="h-full w-full bg-primary p-5 flex flex-col gap-10">
          <div className="flex flex-col items-center gap-3 text-white">
            {navLink.map((a, index) => (
              <Link
                key={index}
                className={`p-2 text-lg font-semibold ${isActiveLink(a.link, a.name)}`}
                href={a.link}
              >
                {a.name.toUpperCase()}
              </Link>
            ))}
          </div>
          <div className="flex justify-center">
            <FormCheck
              checkText="Check"
              inputId="mobile_check"
              className="flex-row"
              variant="outline"
            />
          </div>
          <div className="flex-grow"></div>

          <div className="flex flex-col gap-6">
            <hr />
            <div className="flex justify-between">
              <Avatar>
                <AvatarImage
                  src={
                    isConnected
                      ? `../../../avatars/${data?.getAvatar.avatar}.jpg`
                      : "https://i.stack.imgur.com/vaDPM.png?s=256&g=1"
                  }
                />
                <AvatarFallback>HC</AvatarFallback>
              </Avatar>
              <Button variant={"destructive"} onClick={handleLogout}>
                Log out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
