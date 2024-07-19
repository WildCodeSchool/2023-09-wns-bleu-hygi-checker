"use client";

import CampaignCard from "@/components/campaign/CampaignCard";
import Layout from "@/components/dashboard/Layout";
import { AddCampaignForm } from "@/components/campaign/AddCampaignForm";
import { useCampaignsByUserIdQuery } from "@/types/graphql";
import Loading from "@/components/Loading";

export default function Campaign() {
  const { data, loading } = useCampaignsByUserIdQuery();

  const campaigns = data?.campaignsByUserId ? [...data.campaignsByUserId] : [];

  campaigns.sort((a, b) => {
    return a.id - b.id;
  });

  return (
    <Layout title="Campaign">
      <>
        {loading ? (
          <div className="h-full flex justify-center items-center">
            <Loading />
          </div>
        ) : (
          <>
            <div className="flex flex-col min-h-full gap-8">
              <div>
                <AddCampaignForm />
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
