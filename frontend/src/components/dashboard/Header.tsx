import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import {
  useProfileQuery,
} from "@/types/graphql";
import Image from "next/image";

export default function Nav() {
  const router = useRouter();

  const { data: currentUser, client } = useProfileQuery({
    errorPolicy: "ignore",
  });

  const isConnected = !!currentUser?.profile.email;

  const handleLog = async () => {
    if (isConnected) {
      router.push("/auth/logout");
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <header className="bg-primary p-4 flex justify-between text-align">
      <p className="text-white">Hygi-Checker</p>
      <div className="flex justify-center gap-6">
        <Button onClick={() => router.push("/lists")}>Campaign</Button>
        <Button>Analytics</Button>
        <Button>Settings</Button>
      </div>
      <div>
        <Image src="../../logo_small.svg" width={150} height={0} alt="logo" />
      </div>
      <div className="ml-auto">
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
