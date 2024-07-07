import Layout from "@/components/dashboard/Layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import { EditCampaignForm } from "@/components/campaign/EditCampaignForm";
import QuickUrlTest from "@/components/check/QuickUrlTest";
import UrlResponsesDetail from "@/components/response/UrlResponsesDetail";
import PieChart from "@/components/analytics/PieChart";
import LineChart from "@/components/analytics/LineChart";
import { UrlForm } from "@/components/campaign/UrlForm";
import { Badge } from "@/components/ui/badge";

import { useRouter } from "next/router";
import { useToast } from "@/components/ui/use-toast";
import Dropdown from "@/components/dashboard/Dropdown";
import {
  useCampaignByIdQuery,
  useDeleteCampaignMutation,
  useCampaignsByUserIdQuery,
  useGetUrlFromCampaignQuery,
} from "@/types/graphql";
// import { useResponsesByUrlIdQuery } from "@/types/graphql";
import { Button } from "@/components/ui/button";
import Loading from "@/components/Loading";

export default function CampaignDetail() {
  const router = useRouter();
  const { toast } = useToast();

  const { id } = router.query;

  const { refetch } = useCampaignsByUserIdQuery();

  const {
    data: campaignById,
    loading,
    error,
  } = useCampaignByIdQuery({
    variables: {
      campaignId: typeof id === "string" ? parseInt(id) : 0,
    },
    skip: typeof id === "undefined",
  });
  if (error) {
    console.error("GraphQL Error:", error);
  }
  const campaign = campaignById?.campaignById;

  const deleteCampaign = () => {
    deleteCampaignMutation({
      variables: {
        campaignId: parseInt(id as string),
      },
    });
    router.push("/dashboard/campaign/lists");
  };

  const [deleteCampaignMutation] = useDeleteCampaignMutation({
    onCompleted: (data) => {
      toast({
        title: `${data.deleteCampaign.message}`,
        variant: "success",
      });
      refetch();
    },
    onError: (err) => {
      toast({
        title: `${err.message}`,
        variant: "destructive",
      });
    },
  });

  const deleteURL = () => {
    toast({
      title: "This URL has been deleted",
      variant: "success",
    });
  };
  const { data: getUrlFromCampaign } = useGetUrlFromCampaignQuery({
    variables: {
      campaignId: typeof id === "string" ? parseInt(id) : 0,
    },
    skip: typeof id === "undefined",
  });
  const urls = getUrlFromCampaign?.getUrlFromCampaign;

  // const { data: responsesByUrlId } = useResponsesByUrlIdQuery({
  //   variables: {
  //     urlId: typeof id === "string" ? parseInt(id) : 0,
  //   },
  //   skip: typeof id === "undefined",
  // });

  // const status = responsesByUrlId?.responsesByUrlId;

  return (
    <Layout title="Read">
      {loading ? (
        <Loading />
      ) : campaign ? (
        <div className="w-full">
          <div className="flex flex-col items-center  md:flex-row justify-between gap-4 mt-5">
            <div className="flex flex-col text-white md:flex-row justify-center items-center">
              <p className="font-bold text-xl md:text-2xl">{campaign?.name}</p>

              <Badge variant="secondary" className="mt-1 ml-0 md:ml-4">
                Active
              </Badge>
            </div>
            {/* **************  HEADER BUTTONS  *************** */}
            <div className="flex justify-end">
              {id && campaign && (
                <>
                  <UrlForm campaignId={id as string} />
                  <EditCampaignForm campaignId={id as string} />
                  <ConfirmationModal
                    isLargeButton={false}
                    forDelete={true}
                    buttonText={"Delete campaign"}
                    buttonVariant={"destructive"}
                    title={"Delete this campaign"}
                    message={"WARNING : Datas will be delete forever"}
                    noText={"No, keep it"}
                    yesText={"Yes, delete it"}
                    action={deleteCampaign}
                  />
                </>
              )}
            </div>
          </div>
          {/* *********************************************** */}
          {/* **************  CHARTS *************** */}
          {/* --------------------  Desktop  -------------------- */}
          <section className="hidden 2xl:flex flex-row flex-wrap justify-around my-4">
            <Card className="rounded-lg text-2xl w-[400px] h-[400px]">
              <CardHeader>
                <CardTitle>Global Campaign Responses</CardTitle>
                <CardDescription>
                  Status obtained from all URLs of this campaign
                </CardDescription>
              </CardHeader>
              <CardContent className="w-full h-[200px] md:h-[300px]">
                <PieChart />
              </CardContent>
            </Card>
            <Card className="flex flex-col justify-center rounded-lg text-2xl w-[600px] h-[400px]">
              <CardHeader>
                <CardTitle>Average Response Time</CardTitle>
                <CardDescription>
                  Average response time obtained from all URLs of this campaign
                </CardDescription>
              </CardHeader>
              <CardContent className="w-full h-[300px]">
                <LineChart />
              </CardContent>
            </Card>
            <Card className="flex flex-col justify-center rounded-lg text-2xl w-[400px] h-[400px]">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="w-full h-[300px] text-xs md:text-lg">
                <div className="flex justify-between py-4">
                  <p>Total number of URLs in this campaign :</p>
                  <p className="text-green-500 font-bold">24</p>
                </div>
                <div className="flex justify-between py-4">
                  <p>Number of tests per day :</p>
                  <p className="text-green-500 font-bold">152</p>
                </div>
                <div className="flex justify-between py-4">
                  <p>Average response time :</p>
                  <p className="text-green-500 font-bold">352ms</p>
                </div>
                <div className="flex justify-between py-4">
                  <p>Campaign creation date :</p>
                  <p className="text-green-500 font-bold">27-05-2024</p>
                </div>
              </CardContent>
            </Card>
          </section>
          {/* --------------------  Mobile  -------------------- */}
          <section className="my-4 px-12 2xl:hidden">
            <Carousel className="flex justify-center items-center">
              <CarouselContent>
                <CarouselItem className="flex justify-center items-center">
                  <Card className="rounded-lg text-2xl w-full md:w-[600px]">
                    <CardHeader>
                      <CardTitle>Global Campaign Responses</CardTitle>
                      <CardDescription>
                        Status obtained from all URLs of this campaign
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="w-full h-[200px] md:h-[300px]">
                      <PieChart />
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem>
                  <Card className="flex flex-col justify-center rounded-lg text-2xl w-full">
                    <CardHeader>
                      <CardTitle>Average Response Time</CardTitle>
                      <CardDescription>
                        Average response time obtained from all URLs of this
                        campaign
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="w-full h-[300px]">
                      <LineChart />
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem className="flex justify-center items-center">
                  <Card className="flex flex-col justify-center rounded-lg text-2xl w-full md:w-[600px]">
                    <CardHeader>
                      <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="w-full h-[300px] text-xs md:text-lg">
                      <div className="flex justify-between py-4">
                        <p>Total number of URLs in this campaign :</p>
                        <p className="text-green-500 font-bold">24</p>
                      </div>
                      <div className="flex justify-between py-4">
                        <p>Number of tests per day :</p>
                        <p className="text-green-500 font-bold">152</p>
                      </div>
                      <div className="flex justify-between py-4">
                        <p>Average response time :</p>
                        <p className="text-green-500 font-bold">352ms</p>
                      </div>
                      <div className="flex justify-between py-4">
                        <p>Campaign creation date :</p>
                        <p className="text-green-500 font-bold">27-05-2024</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </section>
          {/* *************************************** */}
          {/* **************  RESPONSE TABLE *************** */}
          {/* ----------------  Table Header  ------------- */}
          <div className="w-full flex justify-center gap-4 mt-5">
            <Table className="w-full text-white">
              <TableHeader className="bg-stone-500 text-white">
                <TableRow>
                  <TableHead className="w-[100px] text-white">Url</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                  <TableHead className="text-right text-white">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              {/* ----------------  Table Body  ------------- */}
              <TableBody>
                {urls?.map((urlResponse) => (
                  <TableRow key={urlResponse.url.urlPath}>
                    <TableCell className="font-medium">
                      {urlResponse.url.urlPath}
                    </TableCell>
                    <TableCell>{}</TableCell>
                    <TableCell className="text-right gap-4">
                      <div className="flex justify-end gap-4 md:hidden">
                        <Dropdown data={urlResponse} />
                      </div>
                      <div className="hidden md:flex justify-end gap-4">
                        <UrlResponsesDetail campaignUrlId={urlResponse.id} />
                        <QuickUrlTest
                          urlPath={urlResponse.url.urlPath}
                          onDropdown={false}
                        />
                        <ConfirmationModal
                          isLargeButton={false}
                          forDelete={true}
                          buttonText={"Delete"}
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {/* ********************************************** */}
        </div>
      ) : (
        <div className="flex justify-center items-center mt-4 flex-col gap-2 text-white">
          <p className="text-center text-2xl font-bold">
            Campaign {id} unavailable.
          </p>
          <Button
            variant={"secondary"}
            onClick={() => router.push("/dashboard/campaign/lists")}
          >
            Retour
          </Button>
        </div>
      )}
    </Layout>
  );
}
