import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";

export default function Nav() {
  const router = useRouter();
  const [isConnected] = useState<boolean>(false);

  return (
    <header className="bg-primary p-4 flex justify-center mb-12 text-align ">
      <div>
        <Image src="../../logo_small.svg" width={150} height={0} alt="logo" />
      </div>
      <div className="ml-auto">
        <Button
          variant={isConnected ? "destructive" : "outline"}
          onClick={() =>
            router.push(isConnected ? "auth/logout" : "auth/login")
          }
        >
          {isConnected ? "Déconnexion" : "Connexion"}
        </Button>
      </div>
    </header>
  );
}
