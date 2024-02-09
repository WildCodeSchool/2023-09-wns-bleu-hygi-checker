import LayoutLogin from "@/components/login/Layout";
import Register from "@/components/login/Register";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const toggleSignUp = () => {
    router.push("login");
  };
  return (
    <LayoutLogin title="Se connecter">
      <div className="flex justify-center items-center md:bg-gray-300 bg-primary relative">
        <Button
          variant="secondary"
          className="absolute top-4 right-4"
          onClick={toggleSignUp}
        >
          Connexion
        </Button>

        <Register />
      </div>
    </LayoutLogin>
  );
}
