import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function Nav() {
  const router = useRouter();
  const [isConnected, setIsConnected] = useState<string | undefined>("");

  useEffect(() => {
    const email = Cookies.get("email");
    setIsConnected(email);
  }, [Cookies.get("email")]);

  return (
    <header className="bg-primary p-4 flex justify-between text-align">
      <p className="text-white">Hygi-Checker</p>
      <div>
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
