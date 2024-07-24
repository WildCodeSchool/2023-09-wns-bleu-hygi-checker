import { useState, useEffect } from "react";
import Layout from "@/components/check/Layout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import FormCheck from "../components/FormCheck";
import Home from "../components/check/Home";
import Pricing from "@/components/premium/Pricing";
import { useGetUserProfileQuery } from "@/types/graphql";
import { MoveDown } from "lucide-react";

export default function Index() {
  const router = useRouter();
  const [isAtTop, setIsAtTop] = useState(true);

  const { data: currentUser } = useGetUserProfileQuery({
    errorPolicy: "ignore",
  });

  const isConnected = !!currentUser?.getUserProfile;

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Vérifiez la position de défilement initiale

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Layout title="Home">
      <div className=" text-center gap-8 text-white w-full  min-h-[90vh]">
        <Home />

        <div className="flex justify-center text-black mt-8">
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
            className="text-black mt-4"
            onClick={() => {
              router.push("auth/login");
            }}
          >
            Create your free account
          </Button>
        )}
        {isAtTop && (
          <div
            className={`flex justify-end items-center ${isConnected === true ? "h-[200px]" : ""}`}
          >
            <a href="#pricing">
              <button className="w-12 h-12 text-white transition-colors duration-150 animate-fade bg-secondary border border-r-0 border-secondary rounded-full focus:shadow-outline hover:bg-green-600 flex justify-center items-center">
                <MoveDown className="mr-1" />
              </button>
            </a>
          </div>
        )}
      </div>
      <div
        id="pricing"
        className="w-full flex flex-col justify-center items-center min-h-screen"
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
