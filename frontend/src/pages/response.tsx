import Layout from "@/components/Layout";
import CardResponse from "@/components/check_url/CardResponse";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/router";

export default function Response() {
  const router = useRouter();

  return (
    <Layout title="Read">
      <div className="flex justify-center gap-4 mt-4">
        <CardResponse />
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <p>
          sed viverra tellus in hac habitasse platea dictumst vestibulum rhoncus
          est pellentesque elit ullamcorper dignissim
        </p>
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <Button
          variant="secondary"
          onClick={() => {
            router.push("/");
          }}
        >
          Make a new check
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            router.push("/auth/register");
          }}
        >
          Create your free account
        </Button>
      </div>
    </Layout>
  );
}
