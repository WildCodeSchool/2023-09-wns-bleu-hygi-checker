import SignUp from "@/components/login/SignUp";
import CreateAccount from "@/components/login/CreateAccount";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Login() {
  const [showSignUp, setShowSignUp] = useState(false);

  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };

  const buttonText = showSignUp ? "Inscription" : "Connexion";
  const CardComponent = showSignUp ? SignUp : CreateAccount;

  return (
    <div className="grid md:grid-cols-2 h-screen">
      <div className="md:flex hidden justify-center items-center bg-primary">
        <p className="text-white font-bold text-4xl">Hygi-Checker</p>
      </div>

      <div className="flex justify-center items-center md:bg-gray-300 bg-primary relative">
        <Button
          variant="secondary"
          className="absolute top-4 right-4"
          onClick={toggleSignUp}
        >
          {buttonText}
        </Button>

        <CardComponent />
      </div>
    </div>
  );
}
