import Layout from "@/components/dashboard/Layout";
import { Card, CardContent } from "@/components/ui/card";
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
import { CampaignForm } from "@/components/campaign/CampaignForm";
import { UrlForm } from "@/components/campaign/UrlForm";
import { Badge } from "@/components/ui/badge";

import { useRouter } from "next/router";
import { useToast } from "@/components/ui/use-toast";
import Dropdown from "@/components/dashboard/Dropdown";
import {
  useCampaignByIdQuery,
  useDeleteCampaignMutation,
  useCampaignsByUserIdQuery,
} from "@/types/graphql";
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
  // données des table row des urls
  const responses = [
    {
      routes: "app/v1/users.com",
      status: "Alerte",
      actions: "",
    },
  ];
  // données des card/carousel
  const table = [
    "Graphiques multiples 1",
    "Graphiques multiples 2",
    "Graphiques multiples 3",
  ];

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
              {id && <UrlForm campaignId={id as string} />}
              <CampaignForm
                isNewCampaign={false}
                buttonText={"Edit campaign"}
                buttonVariant={"edit"}
                title={"Edit this campaign"}
              />
              {id && (
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
              )}
            </div>
          </div>
          {/* *********************************************** */}
          {/* **************  CHARTS *************** */}
          {/* --------------------  Desktop  -------------------- */}
          <section className="hidden md:block">
            <div className="flex justify-center mt-5 gap-4">
              {table.map((t, index) => (
                <Card key={index} className="flex justify-center p-10">
                  <CardContent className="p-0">{t}</CardContent>
                </Card>
              ))}
            </div>
          </section>
          {/* --------------------  Mobile  -------------------- */}
          <section className="my-4 px-12 md:hidden">
            <Carousel className="flex justify-center items-center">
              <CarouselContent>
                {table.map((t, index) => (
                  <CarouselItem key={index}>
                    <Card className="flex justify-center p-10 rounded-lg text-2xl w-full">
                      <CardContent>{t}</CardContent>
                    </Card>
                  </CarouselItem>
                ))}
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
                  <TableHead className="w-[100px] text-white">Routes</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                  <TableHead className="text-right text-white">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              {/* ----------------  Table Body  ------------- */}
              <TableBody>
                {responses?.map((response) => (
                  <TableRow key={response.routes}>
                    <TableCell className="font-medium">
                      {response.routes}
                    </TableCell>
                    <TableCell>{response.status}</TableCell>
                    <TableCell className="text-right gap-4">
                      <div className="flex justify-end gap-4 md:hidden">
                        <Dropdown />
                      </div>
                      <div className="hidden md:flex justify-end gap-4">
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
