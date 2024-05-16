import Layout from "@/components/check/Layout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import FormCheck from "../components/FormCheck";
import Home from "../components/check/Home";

export default function Index() {
  const router = useRouter();

  return (
    <Layout title="Home">
      <div className="flex flex-col text-center gap-8 items-center text-white">
        <Home />

        <div className="flex justify-center text-black">
          <FormCheck
            checkText="Start checking URL"
            className="flex-col"
            variant="white"
          />
        </div>
        <Button
          variant="outline"
          className="text-black"
          onClick={() => {
            router.push("auth/register");
          }}
        >
          Create your free acount
        </Button>
      </div>
    </Layout>
  );
}
