import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import PieChart from "@/components/analytics/PieChart";
import LineChart from "@/components/analytics/LineChart";

import { ChartSectionProps } from "@/types/interfaces";

const ChartSection = ({ PieChartData }: ChartSectionProps) => {
  return (
    <>
      {/* **************  CHARTS *************** */}
      {/* --------------------  Desktop  -------------------- */}
      <section className="hidden 2xl:flex flex-row flex-wrap justify-around my-6">
        <Card className="rounded-lg text-2xl w-[400px] h-[400px]">
          <CardHeader>
            <CardTitle>Global Campaign Responses</CardTitle>
            <CardDescription>
              Status obtained from all URLs of this campaign
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full h-[200px] md:h-[300px]">
            {PieChartData !== null && PieChartData !== undefined ? (
              <PieChart chartData={PieChartData} />
            ) : (
              <div className="h-full flex justify-center items-center">
                <p>No data to display</p>
              </div>
            )}
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
      {/* --------------------  Mobile & Tablet  -------------------- */}
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
                  {PieChartData !== null && PieChartData !== undefined ? (
                    <PieChart chartData={PieChartData} />
                  ) : (
                    <div className="h-full flex justify-center items-center">
                      <p>No data to display</p>
                    </div>
                  )}
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
    </>
  );
};

export default ChartSection;
