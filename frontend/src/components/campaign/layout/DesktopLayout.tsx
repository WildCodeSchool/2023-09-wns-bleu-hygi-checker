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
import {
  Url,
  useDeleteUrlFromCampaignMutation,
  useLastDayResponsesOfOneUrlLazyQuery,
  useResponsesByCampaignUrlIdByPageQuery,
  useCountResponsesByCampaignUrlIdQuery,
  useAllResponsesOfOneUrlLazyQuery,
  useCountUrlFromCampaignQuery,
} from "@/types/graphql";
import QuickUrlTest from "@/components/check/QuickUrlTest";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import PieChart from "@/components/analytics/PieChart";
import LineChart from "@/components/analytics/LineChart";
import StatusBar from "../StatusBar";
import PaginatedResponses from "../PaginatedResponses";
import {
  countStatusCodes,
  DataItem,
} from "@/utils/chartFunction/countStatusCodes";
import {
  formatResponseTime,
  OutputData,
} from "@/utils/chartFunction/formatResponseTime";
import { Campaign } from "@/types/graphql";
import { calculateAverageResponseTime } from "@/utils/chartFunction/calculateAverageResponseTime ";
import { calculateAvailability } from "@/utils/chartFunction/calculateAvailability";
import { formatDate } from "@/utils/chartFunction/formatDate";
import { testPerDay } from "@/utils/chartFunction/testsPerDay";
import {
  getStatusColor,
  getResponseColor,
  getAvailabilityColor,
} from "@/utils/chartFunction/getColor";
import { toast } from "@/components/ui/use-toast";

export type CampaignMini = {
  __typename?: "Campaign";
  id: number;
  name?: string;
  userId?: number;
};
export type CampaignUrl = {
  __typename?: "CampaignUrl";
  campaign: CampaignMini;
  createdAt: Date;
  id: number;
  url: Url;
};

interface DesktopLayoutProps {
  urls: CampaignUrl[];
  campaignData: Campaign;
  refetch: () => void;
}
export default function DesktopLayout({
  urls,
  campaignData,
  refetch,
}: DesktopLayoutProps) {
  const [selectedUrl, setSelectedUrl] = useState<string>("");
  const [selectedUrlId, setSelectedUrlId] = useState<number>(0);
  const [pieData, setPieData] = useState<DataItem[] | undefined | null>(null);
  const [lineData, setLineData] = useState<OutputData[] | undefined | null>(
    null
  );
  const [averageTime, setAverageTime] = useState<number | null>(null);
  const [availability, setAvailability] = useState<number | null>(null);
  const [urlCreatedAt, setUrlCreatedAt] = useState<string | null>(null);
  const [campaignCreatedAt] = useState<string | null>(
    formatDate(new Date(campaignData.createdAt))
  );

  const handleSetUrl = (url: string, campainUrlId: number): void => {
    if (selectedUrl === "") {
      setSelectedUrl(url);
      setSelectedUrlId(campainUrlId);
    }
    if (selectedUrl !== url) {
      setSelectedUrl(url);
      setSelectedUrlId(campainUrlId);
    }
    if (selectedUrl === url) {
      setSelectedUrl("");
      setSelectedUrlId(0);
    }
  };

  const [getLastResponses, { data, refetch: refetchLastResponses }] =
    useLastDayResponsesOfOneUrlLazyQuery();

  const lastResponses = data?.lastDayResponsesOfOneUrl;

  const [getAllStatus, { data: allStatus, refetch: refetchAllStatus }] =
    useAllResponsesOfOneUrlLazyQuery();

  const ResponseStatusOfThisUrl = allStatus?.allResponsesOfOneUrl;

  const { refetch: refetchAllResponses } =
    useResponsesByCampaignUrlIdByPageQuery({
      variables: {
        pageSize: 5,
        page: 1,
        campaignUrlId: selectedUrlId,
      },
    });

  const { refetch: refetchCountResponses } =
    useCountResponsesByCampaignUrlIdQuery({
      variables: {
        campaignUrlId: selectedUrlId,
      },
    });

  const refreshDataFunction = () => {
    if (selectedUrlId !== 0 && campaignData.isWorking === true) {
      refetchLastResponses();
      refetchAllStatus();
      refetchAllResponses();
      refetchCountResponses();
      console.warn("Data refreshed");
    }
  };

  useEffect(() => {
    const runAutoRefresh = setInterval(refreshDataFunction, 3 * 1000);
    return () => {
      clearInterval(runAutoRefresh);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUrlId, campaignData.isWorking]);

  useEffect(() => {
    if (selectedUrlId !== 0) {
      getLastResponses({
        variables: {
          campaignUrlId: selectedUrlId,
        },
      });
      getAllStatus({
        variables: {
          campaignUrlId: selectedUrlId,
        },
      });
      if (
        lastResponses &&
        lastResponses.length > 0 &&
        ResponseStatusOfThisUrl &&
        ResponseStatusOfThisUrl.length > 0
      ) {
        // Set PieData
        const chartData = countStatusCodes(ResponseStatusOfThisUrl);
        setPieData(chartData);
        // Set LineData
        const outputData = formatResponseTime(lastResponses);
        setLineData(outputData);
        // Set average time for urls
        const calculatedAverageTime =
          calculateAverageResponseTime(lastResponses);
        setAverageTime(calculatedAverageTime);
        // Set availability of url
        const calculatedAvailability = calculateAvailability(lastResponses);
        setAvailability(calculatedAvailability);
        // Set creation date of url
        const urlDate = urls.find((url) => url.url.urlPath === selectedUrl);
        const createdAtDate = urlDate?.createdAt;

        const formattedDate = createdAtDate
          ? formatDate(new Date(createdAtDate))
          : "";
        setUrlCreatedAt(formattedDate);
      }
    }
  }, [
    campaignData,
    getLastResponses,
    lastResponses,
    ResponseStatusOfThisUrl,
    selectedUrl,
    selectedUrlId,
    urls,
    getAllStatus,
  ]);

  const { refetch: refetchNbUrlOfCampaign } = useCountUrlFromCampaignQuery({
    variables: {
      campaignId: campaignData.id,
    },
  });

  const deleteURL = () => {
    deleteUrlMutation({
      variables: {
        infos: {
          id: selectedUrlId,
        },
      },
    });
  };

  const [deleteUrlMutation] = useDeleteUrlFromCampaignMutation({
    onCompleted: (data) => {
      toast({
        title: data.deleteUrlFromCampaign.message,
        variant: "success",
      });
      refetch();
      refetchNbUrlOfCampaign();
      setSelectedUrl("");
    },
    onError: (err) => {
      toast({
        title: err.message,
        variant: "destructive",
      });
    },
  });

  return (
    <section className="hidden md:grid grid-cols-3 gap-6 h-[98%] mt-6">
      {/* ---------------------  START LEFT BLOC : URL TABLE ------------------------*/}
      <div className="col-span-1 border-2 border-slate-200 bg-slate-200 rounded-md overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-primary border-b-2 border-gray-500 font-bold text-center">
                URLs
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {urls.map((url) => (
              <TableRow key={url.id}>
                <TableCell
                  className={`p-0 flex justify-between items-center font-medium cursor-pointer text-black ${selectedUrl === url.url.urlPath ? "bg-primary text-white" : ""} hover:${selectedUrl === url.url.urlPath ? "" : "bg-slate-300 hover:text-black"}`}
                >
                  <button
                    onClick={() => handleSetUrl(url.url.urlPath, url.id)}
                    className={`h-[50px] px-4 w-full flex justify-between items-center font-medium cursor-pointer text-black ${selectedUrl === url.url.urlPath ? "bg-primary text-white" : ""} hover:${selectedUrl === url.url.urlPath ? "" : "bg-slate-300 hover:text-black"}`}
                  >
                    {url.url.urlPath}
                  </button>
                  <QuickUrlTest
                    urlPath={url.url.urlPath}
                    onDropdown={false}
                    iconOnly={true}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* ---------------------  END LEFT BLOC : URL TABLE ------------------------*/}
      {/* ---------------------  START RIGHT BLOC : URL TABLE ------------------------*/}
      <div className="col-span-2 p-4 border-2 border-white rounded-md overflow-auto">
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
                <p className="text-gray-300">{urlCreatedAt}</p>
              </div>
              <div>
                <QuickUrlTest
                  urlPath={selectedUrl}
                  onDropdown={false}
                  iconOnly={false}
                />
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
            <div>
              {lastResponses && lastResponses.length > 0 && (
                <figure className="border-2 border-white bg-slate-800 rounded-md h-24 flex justify-start items-center pl-6 mt-2">
                  <StatusBar data={lastResponses} />
                </figure>
              )}
            </div>
            {lastResponses && lastResponses.length > 0 ? (
              <div className="min-h-24 my-4 grid grid-cols-4 gap-2">
                <div className="col-span-1 border-2 border-white flex flex-col justify-between items-center py-2 bg-slate-800 rounded-md">
                  <p className="text-white font-bold ">Last Status</p>
                  <p
                    className={`${getStatusColor(lastResponses[0].statusCode, false)} font-bold text-lg lg:text-2xl`}
                  >
                    {lastResponses[0].statusCode}
                  </p>
                </div>
                <div className="col-span-1 border-2 border-white flex flex-col justify-between items-center py-2 bg-slate-800 rounded-md">
                  <p className="text-white font-bold">Last Response</p>
                  <p
                    className={`${getResponseColor(lastResponses[0].responseTime)} font-bold text-lg lg:text-2xl`}
                  >
                    {lastResponses[0].responseTime} ms
                  </p>
                </div>
                <div className="col-span-1 border-2 border-white flex flex-col justify-between items-center py-2 bg-slate-800 rounded-md">
                  <p className="text-white font-bold">Avg Response</p>
                  <p
                    className={`${getResponseColor(averageTime)} font-bold text-lg lg:text-2xl`}
                  >
                    {averageTime} ms
                  </p>
                </div>
                <div className="col-span-1 border-2 border-white flex flex-col justify-between items-center py-2 bg-slate-800 rounded-md">
                  <p className="text-white font-bold">Uptime</p>
                  <p
                    className={`${getAvailabilityColor(availability)} font-bold text-lg lg:text-2xl`}
                  >
                    {availability} %
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center w-full h-24 bg-slate-200 rounded-md my-4">
                <p>No data to display</p>
              </div>
            )}
            <div className="flex flex-col justify-center items-center">
              {pieData !== null &&
                pieData !== undefined &&
                lastResponses &&
                ResponseStatusOfThisUrl && (
                  <div className="w-full h-[300px] bg-slate-200 rounded-md">
                    <PieChart chartData={pieData} />
                  </div>
                )}
              {lineData !== null &&
                lineData !== undefined &&
                lineData.length > 0 && (
                  <div className="w-full h-[300px] p-4 bg-slate-200 my-4 rounded-md">
                    <LineChart chartData={lineData} />
                  </div>
                )}
              {selectedUrlId !== null &&
                selectedUrlId !== undefined &&
                selectedUrlId !== 0 && (
                  <PaginatedResponses campaignUrlId={selectedUrlId} />
                )}
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-white font-bold text-4xl my-12 w-fit mx-auto">
              Overview
            </h3>
            {campaignData && (
              <div className="min-h-24 my-4 grid grid-cols-4 gap-2">
                <div className="col-span-1 border-2 border-white flex flex-col justify-between items-center py-2 bg-slate-800 rounded-md">
                  <p className="text-white font-bold text-lg lg:text-2xl">
                    URL Count
                  </p>
                  <p className="font-bold text-green-500 text-lg lg:text-2xl">
                    {urls.length ?? 0} urls
                  </p>
                </div>
                <div className="col-span-1 border-2 border-white flex flex-col justify-between items-center py-2 bg-slate-800 rounded-md">
                  <p className="text-white font-bold">Tests / Day</p>
                  <p className="font-bold text-green-500 text-lg lg:text-2xl">
                    {testPerDay(
                      urls.length,
                      campaignData.intervalTest as number
                    )}{" "}
                    tests
                  </p>
                </div>
                <div className="col-span-1 border-2 border-white flex flex-col justify-between items-center py-2 bg-slate-800 rounded-md">
                  <p className="text-white font-bold">Interval Test</p>
                  <p className="font-bold text-green-500 text-lg lg:text-2xl">
                    {campaignData.intervalTest} min
                  </p>
                </div>
                <div className="col-span-1 border-2 border-white flex flex-col justify-between items-center py-2 bg-slate-800 rounded-md">
                  <p className="text-white font-bold">Created At</p>
                  <p className="font-bold text-green-500 text-lg lg:text-2xl">
                    {campaignCreatedAt}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* ---------------------  END RIGHT BLOC : URL TABLE ------------------------*/}
    </section>
  );
}
