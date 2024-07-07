import { useLastDayResponsesOfOneUrlQuery } from "@/types/graphql";
import PieChart from "../analytics/PieChart";
import LineChart from "../analytics/LineChart";

interface UrlResponsesDetailChartProps {
  campaignUrlId: number;
  choice: string;
}

export default function UrlResponsesDetailChart({
  campaignUrlId,
  choice,
}: UrlResponsesDetailChartProps) {
  const { data: getLastResponses } = useLastDayResponsesOfOneUrlQuery({
    variables: {
      campaignUrlId: campaignUrlId,
    },
  });

  const lastResponses = getLastResponses?.lastDayResponsesOfOneUrl;

  return (
    <div className="w-full h-[300px] flex justify-center items-center">
      {lastResponses !== undefined && lastResponses?.length > 0 ? (
        choice === "status" ? (
          <PieChart />
        ) : (
          <LineChart />
        )
      ) : (
        <p>No recent data on this URL</p>
      )}
    </div>
  );
}
