import Layout from "@/components/dashboard/Layout";

import { ConfirmationModal } from "@/components/ConfirmationModal";
import { EditCampaignForm } from "@/components/campaign/EditCampaignForm";

import { UrlForm } from "@/components/campaign/UrlForm";
import { Badge } from "@/components/ui/badge";
import MobileLayout from "@/components/campaign/layout/MobileLayout";
import DesktopLayout from "@/components/campaign/layout/DesktopLayout";
import { useRouter } from "next/router";
import { useToast } from "@/components/ui/use-toast";
import {
  useCampaignByIdQuery,
  useDeleteCampaignMutation,
  useCampaignsByUserIdQuery,
  useGetUrlFromCampaignQuery,
} from "@/types/graphql";
import { Button } from "@/components/ui/button";
import Loading from "@/components/Loading";

export default function CampaignDetail() {
  const router = useRouter();
  const { toast } = useToast();

  const { id } = router.query;

  const { refetch } = useCampaignsByUserIdQuery();

  const {
    data: campaignById,
    loading,
    error,
  } = useCampaignByIdQuery({
    variables: {
      campaignId: typeof id === "string" ? parseInt(id) : 0,
    },
    skip: typeof id === "undefined",
  });
  if (error) {
    console.error("GraphQL Error:", error);
  }
  const campaign = campaignById?.campaignById;

  const deleteCampaign = () => {
    deleteCampaignMutation({
      variables: {
        campaignId: parseInt(id as string),
      },
    });
    router.push("/dashboard/campaign/lists");
  };

  const [deleteCampaignMutation] = useDeleteCampaignMutation({
    onCompleted: (data) => {
      toast({
        title: `${data.deleteCampaign.message}`,
        variant: "success",
      });
      refetch();
    },
    onError: (err) => {
      toast({
        title: `${err.message}`,
        variant: "destructive",
      });
    },
  });

  // ******************* GET ALL URLs ************************
  const { data: getUrlFromCampaign, refetch: refetchUrl } =
    useGetUrlFromCampaignQuery({
      variables: {
        campaignId: typeof id === "string" ? parseInt(id) : 0,
      },
      skip: typeof id === "undefined",
    });
  const urls = getUrlFromCampaign?.getUrlFromCampaign;

  return (
    <Layout title="Read">
      {loading ? (
        <div className="h-full flex justify-center items-center">
          <Loading />
        </div>
      ) : campaign ? (
        <div className="w-full h-[80vh]">
          <div className="flex flex-col items-center  md:flex-row justify-between gap-4 mt-5">
            <div className="flex flex-col text-white md:flex-row justify-center items-center">
              <p className="font-bold text-xl md:text-2xl">{campaign?.name}</p>

              <Badge
                variant={
                  campaign?.isWorking === true ? "secondary" : "destructive"
                }
                className="mt-1 ml-0 md:ml-4"
              >
                {campaign?.isWorking === true ? "Active" : "Stopped"}
              </Badge>
            </div>
            {/* **************  HEADER BUTTONS  *************** */}
            <div className="flex justify-end">
              {id && campaign && (
                <>
                  <UrlForm campaignId={id as string} />
                  <EditCampaignForm campaignId={id as string} />
                  <ConfirmationModal
                    isLargeButton={false}
                    forDelete={true}
                    buttonText={"Delete campaign"}
                    buttonVariant={"destructive"}
                    title={"Delete this campaign"}
                    message={"WARNING : Datas will be delete forever"}
                    noText={"No"}
                    yesText={"Yes"}
                    action={deleteCampaign}
                  />
                </>
              )}
            </div>
          </div>
          {/* *********************************************** */}
          {/* **************  MAIN DISPLAY *************** */}
          {urls && campaign && (
            <>
              <DesktopLayout
                urls={urls}
                campaignData={campaign}
                refetch={refetchUrl}
              />
              <MobileLayout urls={urls} />
            </>
          )}
          {/* ********************************************** */}
        </div>
      ) : (
        <div className="flex justify-center items-center h-full mt-4 flex-col gap-2 text-white">
          <p className="text-center text-4xl font-bold">
            Campaign {id} unavailable.
          </p>
          <Button
            variant={"secondary"}
            onClick={() => router.push("/dashboard/campaign/lists")}
          >
            Retour
          </Button>
        </div>
      )}
    </Layout>
  );
}
