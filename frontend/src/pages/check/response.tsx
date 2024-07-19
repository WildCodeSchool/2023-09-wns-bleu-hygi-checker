import Layout from "@/components/check/Layout";
import CardResponse from "@/components/check/CardResponse";
import { AddUrlToCampaign } from "@/components/check/AddUrlToCampaign";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Response() {
  const router = useRouter();
  const urlPath = router.query.url;

  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [showAddUrlModal, setShowAddUrlModal] = useState<boolean>(false);

  const handleOpenForm = () => {
    setShowAddUrlModal(true);
  };

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
    <Layout title="Read">
      <div className="text-white"></div>
      <div className="flex justify-center gap-4 mt-5">
        <CardResponse />
      </div>
      <div className="flex justify-center mt-5 text-white">
        {isConnected === false && (
          <p className="text-center">
            You have just checked your url, you can check again or sign up for
            the app for free to get more features:
          </p>
        )}
        {isConnected === true && (
          <p className="text-center">
            You have just checked your url, you can check again or add this url
            to a campaign:
          </p>
        )}
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
        {isConnected === false && (
          <Button
            variant="outline"
            onClick={() => {
              router.push("/auth/login");
            }}
          >
            Create your free account
          </Button>
        )}
        {isConnected === true && (
          <Button variant="outline" onClick={handleOpenForm}>
            <Plus className="md:mr-2 h-4 w-4" />
            <span className="hidden md:block">Add URL to campaign</span>
          </Button>
        )}
        {showAddUrlModal === true && (
          <AddUrlToCampaign
            showAddUrlModal={showAddUrlModal}
            setShowAddUrlModal={setShowAddUrlModal}
            urlToAdd={urlPath as string | undefined}
            setUrlPath={null}
          />
        )}
      </div>
    </Layout>
  );
}
