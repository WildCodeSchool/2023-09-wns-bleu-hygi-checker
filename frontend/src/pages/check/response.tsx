import Layout from "@/components/check/Layout";
import CardResponse from "@/components/check/CardResponse";
import { AddUrlToCampaign } from "@/components/check/AddUrlToCampaign";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { useRouter } from "next/router";
import { useState } from "react";
import { useGetUserProfileQuery } from "@/types/graphql";

export default function Response() {
  const router = useRouter();
  const urlPath = router.query.url;

  const [showAddUrlModal, setShowAddUrlModal] = useState<boolean>(false);

  const handleOpenForm = () => {
    setShowAddUrlModal(true);
  };

  const { data: currentUser } = useGetUserProfileQuery({
    errorPolicy: "ignore",
  });

  const isConnected = !!currentUser?.getUserProfile;

  return (
    <Layout title="Read">
      <div className="flex justify-center gap-4 mt-12 w-full">
        <CardResponse />
      </div>
      <div className="flex justify-center mt-5 text-white w-full">
        {isConnected === false && (
          <p className="text-center">
            You have just checked your url, you can check again or sign up for
            the app for free to get more features:
          </p>
        )}
        {isConnected === true && (
          <p className="text-center">
            You have just checked your url, you can check again or add this url
            to a campaign :
          </p>
        )}
      </div>
      <div className="flex justify-center gap-4 mt-5 w-full">
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
            className="ml-4"
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
