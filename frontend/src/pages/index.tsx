import Layout from "@/components/check/Layout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import FormCheck from "../components/FormCheck";
import Home from "../components/check/Home";
import Pricing from "@/components/premium/Pricing";
import { useGetUserProfileQuery } from "@/types/graphql";

export default function Index() {
  const router = useRouter();

  const { data: currentUser } = useGetUserProfileQuery({
    errorPolicy: "ignore",
  });

  const isConnected = !!currentUser?.getUserProfile;

  return (
    <Layout title="Home">
      <div className=" text-center gap-8 text-white w-full  min-h-[90vh]">
        <Home />

        <div className="flex justify-center text-black mt-12">
          <FormCheck
            inputId="home_check"
            checkText="Start checking URL"
            className="flex-col"
            variant="white"
            source="homepage"
          />
        </div>
        {isConnected === false && (
          <Button
            variant="outline"
            className="text-black mt-8"
            onClick={() => {
              router.push("auth/login");
            }}
          >
            Create your free account
          </Button>
        )}
      </div>
      <div
        id="pricing"
        className="w-full flex flex-col justify-center items-center min-h-screen border-2 border-white rounded-md"
      >
        <h3 className="font-bold uppercase text-3xl tracking-wider text-white">
          Pricing
        </h3>
        <p className="text-white text-center mt-4 md:w-1/2">
          Explore our flexible pricing options tailored to your website
          monitoring needs. Whether you&apos;re an individual or a large
          organization, we have the perfect plan for you.
        </p>
        <Pricing />
      </div>
    </Layout>
  );
}
