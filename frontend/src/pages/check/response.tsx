import Layout from "@/components/Layout/Layout";
import CardResponse from "@/components/check/CardResponse";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/router";

export default function Response() {
  const router = useRouter();

  return (
    <Layout title="Read">
      <div className="flex justify-center gap-4 mt-5">
        <CardResponse />
      </div>
      <div className="flex justify-center mt-5 text-white">
        <p className="text-center">
          Sed viverra tellus in hac habitasse platea dictumst vestibulum rhoncus
          est pellentesque elit ullamcorper dignissim
        </p>
      </div>
      <div className="flex justify-center gap-4 mt-5">
        <Button
          variant={"white"}
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
