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
import Dropdown from "@/components/dashboard/Dropdown";
import { Badge } from "@/components/ui/badge";

import { useRouter } from "next/router";
import { useToast } from "@/components/ui/use-toast";

export default function CampaignDetail() {
  const router = useRouter();
  const { toast } = useToast();

  const responses = [
    {
      routes: "app/v1/users.com",
      status: "Alerte",
      actions: "",
    },
    {
      routes: "app/v1/campus.com",
      status: "Off",
      actions: "",
    },
    {
      routes: "app/v1/trainings.com",
      status: "Alerte",
      actions: "",
    },
  ];

  const deleteCampaign = () => {
    router.push("/dashboard/campaign/lists");
    setTimeout(() => {
      toast({
        title: "This campaign has been deleted",
        variant: "success",
      });
    }, 500);
  };

  const deleteURL = () => {
    toast({
      title: "This URL has been deleted",
      variant: "success",
    });
  };

  return (
    <Layout title="Read">
      <div className="w-full">
        <div className="flex flex-col items-center  md:flex-row justify-between gap-4 mt-5">
          <div className="flex flex-col text-white md:flex-row justify-center items-center">
            <p className="font-bold text-xl md:text-2xl">Campaign #1</p>

            <Badge variant="secondary" className="mt-2 ml-0 md:ml-4 mt-1">
              Active
            </Badge>
          </div>
          {/* **************  HEADER BUTTONS  *************** */}
          <div>
            <UrlForm />
            <CampaignForm
              isNewCampaign={false}
              buttonText={"Edit campaign"}
              buttonVariant={"outline"}
              title={"Edit this campaign"}
            />

            <ConfirmationModal
              forDelete={true}
              buttonText={"Delete campaign"}
              buttonVariant={"destructive"}
              title={"Delete this campaign"}
              message={"WARNING : Datas will be delete forever"}
              noText={"No, keep it"}
              yesText={"Yes, delete it"}
              action={deleteCampaign}
            />
          </div>
        </div>
        {/* *********************************************** */}
        {/* **************  CHARTS *************** */}
        {/* --------------------  Desktop  -------------------- */}
        <section className="hidden md:block">
          <div className="flex justify-center mt-5 gap-4">
            <Card className="flex justify-center p-10">
              <CardContent>Graphiques multiples</CardContent>
            </Card>
            <Card className="flex justify-center p-10">
              <CardContent>Graphiques multiples</CardContent>
            </Card>
            <Card className="flex justify-center p-10">
              <CardContent>Graphiques multiples</CardContent>
            </Card>
          </div>
        </section>
        {/* --------------------  Mobile  -------------------- */}

        <section className="my-4 px-12 md:hidden">
          <Carousel className="flex justify-center items-center">
            <CarouselContent className="flex justify-center items-center">
              <CarouselItem>
                <div className="py-16 px-6 bg-gray-50 rounded-lg flex justify-center items-center text-2xl">
                  Graphiques multiples
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="py-16 px-6 bg-gray-50 rounded-lg flex justify-center items-center text-2xl">
                  Graphiques multiples
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="py-16 px-6 bg-gray-50 rounded-lg flex justify-center items-center text-2xl">
                  Graphiques multiples
                </div>
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
                <TableHead className="w-[100px] text-white">Routes</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-right text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            {/* ----------------  Table Body  ------------- */}
            <TableBody>
              {responses.map((response) => (
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
    </Layout>
  );
}
