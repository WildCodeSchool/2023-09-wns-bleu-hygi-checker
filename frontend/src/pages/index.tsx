import Layout from "@/components/check/Layout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import FormCheck from "@/components/FormCheck";

export default function Home() {
  const router = useRouter();

  return (
    <Layout title="Home">
      <div className="flex flex-col text-center gap-8 items-center text-white">
        <h1 className="font-bold uppercase text-3xl tracking-wider">
          The best Web App for
          <span className="text-secondary"> Website Monitoring</span>
        </h1>

        <div className="md:w-1/2">
          5ème test depuis une PR sur dev ! Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Totam magni odit illo rem incidunt
          officia pariatur excepturi voluptatum et minima, molestiae
          necessitatibus ad perferendis alias fugiat repudiandae voluptatibus
          libero consectetur.
        </div>

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
