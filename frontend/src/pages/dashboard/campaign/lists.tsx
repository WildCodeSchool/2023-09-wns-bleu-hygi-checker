import CampaignCard from "@/components/campaign/CampaignCard";
import Layout from "@/components/dashboard/Layout";
import { CampaignForm } from "@/components/campaign/CampaignForm";
import { useCampaignsByUserIdQuery } from "@/types/graphql";
import Loading from "@/components/Loading";

export default function Campaign() {
  const { data, loading } = useCampaignsByUserIdQuery();

  const campaigns = data?.campaignsByUserId;

  return (
    <Layout title="Campaign">
      <>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="flex flex-col min-h-full gap-8">
              <div>
                <CampaignForm
                  isNewCampaign={true}
                  buttonText={"Create new campaign"}
                  buttonVariant={"edit"}
                  title={"Create new campaign"}
                />
              </div>
              {campaigns !== undefined && campaigns!.length > 0 ? (
                <div className="flex flex-wrap gap-8 justify-center">
                  {campaigns.map((data) => (
                    <CampaignCard key={data.id} data={data} />
                  ))}
                </div>
              ) : (
                <p className="text-2xl text-center text-white mt-12 md:text-6xl">
                  No campaign yet
                </p>
              )}
            </div>
          </>
        )}
      </>
    </Layout>
  );
}
