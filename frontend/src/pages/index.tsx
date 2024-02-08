import Layout from "@/components/Layout";
import { useToast } from "@/components/ui/use-toast";
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
    </Layout>
  );
}
