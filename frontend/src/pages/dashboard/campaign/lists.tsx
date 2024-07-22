"use client";

import CampaignCard from "@/components/campaign/CampaignCard";
import Layout from "@/components/dashboard/Layout";
import { AddCampaignForm } from "@/components/campaign/AddCampaignForm";
import { useCampaignsByUserIdQuery } from "@/types/graphql";
import Loading from "@/components/Loading";
import Image from "next/image";

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
              {campaigns !== undefined && campaigns!.length > 0 && (
                <div>
                  <AddCampaignForm callToAction={false} />
                </div>
              )}

              {campaigns !== undefined && campaigns!.length > 0 ? (
                <div className="flex flex-wrap gap-8 justify-center">
                  {campaigns.map((data) => (
                    <CampaignCard key={data.id} data={data} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center">
                  <p className="text-2xl text-center text-white mt-4 mb-2 md:text-5xl md:mt-12 md:mb-8">
                    No campaign yet
                  </p>
                  <Image
                    src="/../../../../no-campaign.svg"
                    width={350}
                    height={0}
                    alt="people searching for something"
                  />
                  <AddCampaignForm callToAction={true} />
                </div>
              )}
            </div>
          </>
        )}
      </>
    </Layout>
  );
}
