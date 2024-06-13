import Layout from "@/components/check/Layout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import FormCheck from "../components/FormCheck";
import Home from "../components/check/Home";
import { useEffect, useState } from "react";

export default function Index() {
  const router = useRouter();

  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const checkMail = () => {
      const mail = document.cookie
        .split("; ")
        .find((row) => row.startsWith("email="));

      setIsConnected(!!mail);
    };

    checkMail();
  }, []);

  return (
    <Layout title="Home">
      <div className="flex flex-col justify-center items-center text-center gap-8 text-white w-full h-full">
        <Home />

        <div className="flex justify-center text-black">
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
            className="text-black"
            onClick={() => {
              router.push("auth/login");
            }}
          >
            Create your free acount
          </Button>
        )}
      </div>
    </Layout>
  );
}
