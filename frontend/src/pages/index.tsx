import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

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
      <Button
        variant="outline"
        onClick={() => {
          router.push("/response");
        }}
      >
        Réponse
      </Button>
    </Layout>
  );
}
