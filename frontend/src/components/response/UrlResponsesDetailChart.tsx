import { useState, useEffect } from "react";
import { useLastDayResponsesOfOneUrlQuery } from "@/types/graphql";
import PieChart from "../analytics/PieChart";
import LineChart from "../analytics/LineChart";
import {
  countStatusCodes,
  DataItem,
} from "@/utils/chartFunction/countStatusCodes";
import {
  formatResponseTime,
  OutputData,
} from "@/utils/chartFunction/formatResponseTime";

interface UrlResponsesDetailChartProps {
  campaignUrlId: number;
  choice: string;
}

export default function UrlResponsesDetailChart({
  campaignUrlId,
  choice,
}: UrlResponsesDetailChartProps) {
  const [pieData, setPieData] = useState<DataItem[] | undefined | null>(null);
  const [lineData, setLineData] = useState<OutputData[] | undefined | null>(
    null
  );
  const { data: getLastResponses } = useLastDayResponsesOfOneUrlQuery({
    variables: {
      campaignUrlId: campaignUrlId,
    },
  });

  const lastResponses = getLastResponses?.lastDayResponsesOfOneUrl;

  useEffect(() => {
    if (lastResponses && lastResponses.length > 0) {
      const chartData = countStatusCodes(lastResponses);
      setPieData(chartData);
      const outputData = formatResponseTime(lastResponses);
      setLineData(outputData);
    }
  }, [lastResponses]);

  return (
    <div className="w-full h-[300px] flex justify-center items-center">
      {pieData !== undefined &&
      pieData !== null &&
      pieData?.length &&
      pieData?.length > 0 &&
      lineData !== undefined &&
      lineData !== null ? (
        choice === "status" ? (
          <PieChart chartData={pieData} />
        ) : (
          <LineChart chartData={lineData} />
        )
      ) : (
        <p>No recent data on this URL</p>
      )}
    </div>
  );
}
