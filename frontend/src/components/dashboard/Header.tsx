import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { useProfileQuery } from "@/types/graphql";
import Image from "next/image";
import FormCheck from "../FormCheck";
import Link from "next/link";

export default function Nav() {
  const router = useRouter();

  const { data: currentUser } = useProfileQuery({
    errorPolicy: "ignore",
  });

  const isConnected = !!currentUser?.profile.email;

  const handleLog = () => {
    if (isConnected) {
      router.push("/auth/logout");
    } else {
      router.push("/auth/login");
    }
  };

  const isActiveLink = (href: string) => {
    return router.pathname === href ? "bg-secondary rounded text-black" : "";
  };

  return (
    <header className="bg-primary p-4 flex justify-between border-b items-center">
      <Link href="/">
        <Image src="../../logo_small.svg" width={150} height={0} alt="logo" />
      </Link>
      <div className="flex justify-center gap-6 text-white">
        <Link
          className={`p-2 ${isActiveLink("/dashboard/campaign/lists")}`}
          href="/dashboard/campaign/lists"
        >
          Campaign
        </Link>
        <Link className={`p-2 ${isActiveLink("/analytics")}`} href="/analytics">
          Analytics
        </Link>
        <Link className={`p-2 ${isActiveLink("/settings")}`} href="/settings">
          Settings
        </Link>
      </div>
      <div>
        <FormCheck checkText="Check" className="flex-row" variant="outline" />
      </div>
      <div className="">
        <Button
          variant={isConnected ? "destructive" : "outline"}
          onClick={handleLog}
        >
          {isConnected ? "Déconnexion" : "Connexion"}
        </Button>
      </div>
    </header>
  );
}
