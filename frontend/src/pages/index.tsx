import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <Layout title="Home">
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
    </Layout>
  );
}
