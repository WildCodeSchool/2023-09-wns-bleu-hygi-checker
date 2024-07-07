import Layout from "@/components/dashboard/Layout";
import PieChart from "@/components/analytics/PieChart";
import LineChart from "@/components/analytics/LineChart";

export default function Home() {
  return (
    <Layout title="Analytics">
      <div className="flex flex-col text-center gap-8 items-center text-white">
        <div className="w-[900px] h-[700px] bg-slate-500 flex justify-center items-center">
          <PieChart />
        </div>
        <div className="w-[900px] h-[700px] bg-slate-500 flex justify-center items-center">
          <LineChart />
        </div>
      </div>
    </Layout>
  );
}
