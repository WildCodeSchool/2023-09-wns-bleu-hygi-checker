import CampaignCard, { DataCardProps } from "@/components/campaign/Card";
import Layout from "@/components/dashboard/Layout";
import { CampaignForm } from "@/components/campaign/CampaignForm";

export default function Campaign() {
  const datas: DataCardProps[] = [
    {
      id: 1,
      url: 53,
      working: true,
    },
    {
      id: 2,
      url: 17,
      working: false,
    },
    {
      id: 3,
      url: 53,
      working: true,
    },
    {
      id: 4,
      url: 17,
      working: false,
    },
    {
      id: 5,
      url: 53,
      working: true,
    },
    {
      id: 6,
      url: 17,
      working: false,
    },
  ];

  return (
    <Layout title="Campaign">
      <div className="flex justify-end mt-4 mb-6 mr-1 md:mr-4">
        <CampaignForm
          isNewCampaign={true}
          buttonText={"Create new campaign"}
          buttonVariant={"outline"}
          title={"Create new campaign"}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 justify-items-center xl:mx-24">
        {datas.map((data) => (
          <CampaignCard key={data.id} data={data} />
        ))}
      </div>
    </Layout>
  );
}
