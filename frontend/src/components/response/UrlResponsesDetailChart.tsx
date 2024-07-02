import { useLastDayResponsesOfOneUrlQuery } from "@/types/graphql";

interface UrlResponsesDetailChartProps {
  campaignUrlId: number;
}

export default function UrlResponsesDetailChart({
  campaignUrlId,
}: UrlResponsesDetailChartProps) {
  const { data: getLastResponses } = useLastDayResponsesOfOneUrlQuery({
    variables: {
      campaignUrlId: campaignUrlId,
    },
  });

  const lastResponses = getLastResponses?.lastDayResponsesOfOneUrl;

  return (
    <div>
      {lastResponses !== undefined && lastResponses?.length > 0 ? (
        lastResponses.map((lastResponse) => (
          <li key={lastResponse.id}>{lastResponse.id}</li>
        ))
      ) : (
        <p>No recent data on this URL</p>
      )}
    </div>
  );
}
