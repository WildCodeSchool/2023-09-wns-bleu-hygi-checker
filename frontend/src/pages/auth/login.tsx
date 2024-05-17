import { Auth } from "@/components/auth/Auth";
import LayoutLogin from "@/components/auth/Layout";

export default function Login() {
  return (
    <LayoutLogin title="Se connecter">
      <div className="flex justify-center items-center md:bg-gray-300 bg-primary relative">
        <Auth />
      </div>
    </LayoutLogin>
  );
}
