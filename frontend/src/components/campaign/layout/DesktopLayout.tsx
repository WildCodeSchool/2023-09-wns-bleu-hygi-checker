import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { MoveUpRight } from "lucide-react";
import { getDomainFromUrl } from "@/utils/global/getDomainFromUrl";
import { Url } from "@/types/graphql";
import { useLastDayResponsesOfOneUrlLazyQuery } from "@/types/graphql";
import QuickUrlTest from "@/components/check/QuickUrlTest";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import PieChart from "@/components/analytics/PieChart";
import LineChart from "@/components/analytics/LineChart";
import {
  countStatusCodes,
  DataItem,
} from "@/utils/chartFunction/countStatusCodes";
import {
  formatResponseTime,
  OutputData,
} from "@/utils/chartFunction/formatResponseTime";
import { calculateAverageResponseTime } from "@/utils/chartFunction/calculateAverageResponseTime ";
import { calculateAvailability } from "@/utils/chartFunction/calculateAvailability";
import { formatDate } from "@/utils/chartFunction/formatDate";

export type Campaign = {
  __typename?: "Campaign";
  id: number;
  name?: string;
  userId?: number;
};
export type CampaignUrl = {
  __typename?: "CampaignUrl";
  campaign: Campaign;
  createdAt: Date;
  id: number;
  url: Url;
};

interface DesktopLayoutProps {
  urls: CampaignUrl[];
}
//useLastDayResponsesOfOneUrlLazyQuery
export default function DesktopLayout({ urls }: DesktopLayoutProps) {
  const [selectedUrl, setSelectedUrl] = useState<string>("");
  const [selectedUrlId, setSelectedUrlId] = useState<number>(0);
  const [pieData, setPieData] = useState<DataItem[] | undefined | null>(null);
  const [lineData, setLineData] = useState<OutputData[] | undefined | null>(
    null
  );
  const [averageTime, setAverageTime] = useState<number | null>(null);
  const [availability, setAvailability] = useState<number | null>(null);
  const [urlCreatedAt, setUrlCreatedAt] = useState<string | null>(null);

  const handleSetUrl = (url: string, campainUrlId: number): void => {
    setSelectedUrl(url);
    setSelectedUrlId(campainUrlId);
  };

  const [getLastReponses, { data }] = useLastDayResponsesOfOneUrlLazyQuery();

  const lastResponses = data?.lastDayResponsesOfOneUrl;

  useEffect(() => {
    if (selectedUrlId !== 0) {
      getLastReponses({
        variables: {
          campaignUrlId: selectedUrlId,
        },
      });
      if (lastResponses && lastResponses.length > 0) {
        const chartData = countStatusCodes(lastResponses);
        setPieData(chartData);
        const outputData = formatResponseTime(lastResponses);
        setLineData(outputData);
        const calculatedAverageTime =
          calculateAverageResponseTime(lastResponses);
        setAverageTime(calculatedAverageTime);
        const calculatedAvailability = calculateAvailability(lastResponses);
        setAvailability(calculatedAvailability);
        const urlDate = urls.find((url) => url.url.urlPath === selectedUrl);
        const createdAtDate = urlDate?.createdAt;

        const formattedDate = createdAtDate
          ? formatDate(new Date(createdAtDate))
          : "";
        setUrlCreatedAt(formattedDate);
      }
    }
  }, [getLastReponses, lastResponses, selectedUrl, selectedUrlId, urls]);

  const deleteURL = () => {
    // TODO : make the API call to delete this CampaignURL from this campaign
  };

  return (
    <section className="hidden md:grid grid-cols-3 gap-6 h-[98%] mt-6">
      {/* ---------------------  START LEFT BLOC : URL TABLE ------------------------*/}
      <div className="col-span-1 bg-slate-300 rounded-md  overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>URLs</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {urls.map((url) => (
              <TableRow key={url.id}>
                <TableCell
                  onClick={() => handleSetUrl(url.url.urlPath, url.id)}
                  className={`font-medium cursor-pointer ${selectedUrl === url.url.urlPath ? "bg-green-500" : ""}`}
                >
                  {url.url.urlPath}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* ---------------------  END LEFT BLOC : URL TABLE ------------------------*/}
      {/* ---------------------  START RIGHT BLOC : URL TABLE ------------------------*/}
      <div className="col-span-2 p-4 bg-slate-600 rounded-md overflow-auto">
        {selectedUrl !== "" ? (
          <div>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-4xl mb-2 text-white">
                  {getDomainFromUrl(selectedUrl)}
                </h3>
                <a
                  href={selectedUrl}
                  target="blank"
                  className="flex text-green-500 underline-offset-4"
                >
                  {selectedUrl}{" "}
                  <span className="flex justify-center items-center">
                    <MoveUpRight className="ml-1 mt-1 h-4 w-4" />
                  </span>
                </a>
              </div>
              <div>
                <QuickUrlTest urlPath={selectedUrl} onDropdown={false} />
                <ConfirmationModal
                  isLargeButton={false}
                  forDelete={true}
                  buttonText={"Delete URL"}
                  buttonVariant={"destructive"}
                  title={"Delete this URL"}
                  message={
                    "Do you want to delete this URL from this campaign ?"
                  }
                  noText={"No"}
                  yesText={"Yes"}
                  action={deleteURL}
                />
              </div>
            </div>
            {lastResponses && lastResponses.length > 0 ? (
              <div className="min-h-24 my-4 grid grid-cols-4 gap-2">
                <div className="col-span-1 border-2 border-white flex flex-col justify-between items-center py-2 bg-slate-800 rounded-md">
                  <p className="text-white font-bold">Latest Repsponse</p>
                  <p className="font-bold text-green-500 text-lg lg:text-2xl">
                    {lastResponses[lastResponses.length - 1].responseTime} ms
                  </p>
                </div>
                <div className="col-span-1 border-2 border-white flex flex-col justify-between items-center py-2 bg-slate-800 rounded-md">
                  <p className="text-white font-bold">Avg Repsponse</p>
                  <p className="font-bold text-green-500 text-lg lg:text-2xl">
                    {averageTime} ms
                  </p>
                </div>
                <div className="col-span-1 border-2 border-white flex flex-col justify-between items-center py-2 bg-slate-800 rounded-md">
                  <p className="text-white font-bold">Uptime</p>
                  <p className="font-bold text-green-500 text-lg lg:text-2xl">
                    {availability} %
                  </p>
                </div>
                <div className="col-span-1 border-2 border-white flex flex-col justify-between items-center py-2 bg-slate-800 rounded-md">
                  <p className="text-white font-bold">Created At</p>
                  <p className="font-bold text-green-500 text-lg lg:text-2xl">
                    {urlCreatedAt}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center w-full h-24 bg-slate-200 rounded-md my-4">
                <p>No data to display</p>
              </div>
            )}
            <div className="flex flex-col justify-center items-center">
              {lineData !== null && lineData !== undefined && (
                <div className="w-full h-[300px] p-4 bg-slate-200 my-4 rounded-md">
                  <LineChart chartData={lineData} />
                </div>
              )}
              {pieData !== null && pieData !== undefined && (
                <div className="w-full h-[300px] bg-slate-200 rounded-md">
                  <PieChart chartData={pieData} />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-full text-white font-bold text-4xl">
            <p>Please select an URL</p>
          </div>
        )}
      </div>
      {/* ---------------------  END RIGHT BLOC : URL TABLE ------------------------*/}
    </section>
  );
}
