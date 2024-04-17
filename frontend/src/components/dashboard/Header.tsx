import { useRouter } from "next/router";
// import { useProfileQuery } from "@/types/graphql";
import Image from "next/image";
import FormCheck from "../FormCheck";
import Link from "next/link";
import { AlignJustify, X } from "lucide-react";
import DropdownMenuTest from "../DropdownMenu";
import { useState } from "react";

export default function Nav() {
  const router = useRouter();

  // const { data: currentUser } = useProfileQuery({
  //   errorPolicy: "ignore",
  // });

  // const isConnected = !!currentUser?.profile.email;
  const isConnected = true;

  // const handleLog = () => {
  //   if (isConnected) {
  //     router.push("/auth/logout");
  //   } else {
  //     router.push("/auth/login");
  //   }
  // };

  const [testButton, setTestButton] = useState(true);

  const handleChangeButton = () => {
    setTestButton(!testButton);
  };

  const isActiveLink = (href: string) => {
    return router.pathname === href ? "bg-secondary rounded text-black" : "";
  };

  return (
    <header className="bg-primary p-4 flex justify-between border-b items-center">
      <Link href="/">
        <Image src="../../logo_small.svg" width={150} height={0} alt="logo" />
      </Link>

      <div className="hidden md:flex justify-center gap-6 text-white">
        <Link
          className={`p-2 ${isActiveLink("/dashboard/campaign/lists")}`}
          href="/dashboard/campaign/lists"
        >
          Campaign
        </Link>
        <Link
          className={`p-2 ${isActiveLink("/dashboard/analytics")}`}
          href="/dashboard/analytics"
        >
          Analytics
        </Link>
        <Link
          className={`p-2 ${isActiveLink("/dashboard/settings")}`}
          href="/dashboard/settings"
        >
          Settings
        </Link>
      </div>

      <div className="hidden lg:block">
        <FormCheck checkText="Check" className="flex-row" variant="outline" />
      </div>

      <div className="md:flex hidden w-[150px] lg:w-auto justify-end">
        {/* <Button
          variant={isConnected ? "destructive" : "outline"}
          onClick={handleLog}
        >
          {isConnected ? "Déconnexion" : "Connexion"}
        </Button> */}
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
  );
}
