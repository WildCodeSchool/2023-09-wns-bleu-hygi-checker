import LayoutLogin from "@/components/auth/Layout";
import SignUp from "@/components/auth/SignUp";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const toggleSignUp = () => {
    router.push("register");
  };
  return (
    <LayoutLogin title="Se connecter">
      <div className="flex justify-center items-center md:bg-gray-300 bg-primary relative">
        <Button
          variant="secondary"
          className="absolute top-4 right-4"
          onClick={toggleSignUp}
        >
          Inscription
        </Button>

        <SignUp />
      </div>
    </LayoutLogin>
  );
}
