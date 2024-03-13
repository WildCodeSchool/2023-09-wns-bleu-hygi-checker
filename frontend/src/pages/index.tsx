import Layout from "@/components/Layout";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import FormCheck from "@/components/check_url/FormCheck";

export default function Home() {
  const router = useRouter();

  return (
    <Layout title="Home">
      <div>hello</div>
      <Button
        variant="outline"
        onClick={() => {
          router.push("/auth/login");
        }}
      >
        Inscription/Connexion
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          router.push("/auth/logout");
        }}
      >
        Deconnexion
      </Button>
      <FormCheck />
    </Layout>
  );
}
