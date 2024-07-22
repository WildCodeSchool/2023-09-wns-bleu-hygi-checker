import Layout from "@/components/check/Layout";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Page404() {
  const router = useRouter();

  return (
    <Layout title="Erreur 404">
      <div className="flex flex-col items-center justify-center gap-6">
        <Image src="/404.svg" width={500} height={0} alt="erreur 404" />
        <div className="text-center text-white">
          <h2 className="text-2xl">Unknown Page</h2>
          <p className="text-lg">
            It seems that the page you were looking for does not exist.
          </p>
        </div>
        <Button variant="outline" onClick={() => router.push("/")}>
          Back home
        </Button>
      </div>
    </Layout>
  );
}
