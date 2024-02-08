import CampaignCard from "@/components/CampaignCard";
import Layout from "@/components/Layout";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const campaignTest = {
  title: "titleTest",
  url: "urlTest",
  urlNumber: 3,
};

export default function Home() {
  return (
    <Layout title="Home">
      <h1>Coucou</h1>
      <CampaignCard campaign={campaignTest} />
    </Layout>
  );
}
