"use client";

import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Switch } from "../ui/switch";
import Link from "next/link";
import { CampaignCardProps } from "@/types/interfaces";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  useCountUrlFromCampaignQuery,
  useSwitchWorkingCampaignMutation,
  useCampaignsByUserIdQuery,
} from "@/types/graphql";
import { testPerDay } from "@/utils/chartFunction/testsPerDay";
import { formatDate } from "@/utils/chartFunction/formatDate";

export default function CampaignCard({ data }: CampaignCardProps) {
  const { toast } = useToast();
  const [isWorkingCampaign, setIsWorkingCampaign] = useState<boolean>(
    data?.isWorking ?? false
  );

  const { refetch } = useCampaignsByUserIdQuery();

  const [switchWorkingCampaignMutation] = useSwitchWorkingCampaignMutation({
    onCompleted: (data) => {
      toast({
        title: data.switchWorkingCampaign.message,
        variant: `${isWorkingCampaign === false ? "default" : "success"}`,
      });
      refetch();
    },
    onError: () => {
      toast({
        title: `Something went wrong. Please try again`,
        variant: "destructive",
      });
    },
  });

  const handleIsWorking = () => {
    setIsWorkingCampaign(!isWorkingCampaign);
  };

  const { data: countUrl } = useCountUrlFromCampaignQuery({
    variables: {
      campaignId: data?.id,
    },
  });

  const count = countUrl?.countUrlFromCampaign.count;
  const testEachDay = testPerDay(count as number, data?.intervalTest as number);

  useEffect(() => {
    if (isWorkingCampaign !== data?.isWorking) {
      switchWorkingCampaignMutation({
        variables: {
          input: {
            campaignId: data?.id,
            isWorking: isWorkingCampaign,
          },
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWorkingCampaign]);

  return (
    <Card className="flex flex-col w-[350px] h-[350px]">
      <Image
        src={data?.image ?? "../../../public/logo_large.svg"}
        alt="image"
        className="w-full rounded-t-lg"
        width={350}
        height={200}
        priority
      />

      <CardContent className="flex justify-between p-6 items-center">
        <div className="flex flex-col">
          <CardTitle className="text-2xl">{data.name}</CardTitle>
          <CardDescription>
            {formatDate(new Date(data?.createdAt))}
          </CardDescription>
        </div>
        <Switch checked={isWorkingCampaign} onCheckedChange={handleIsWorking} />
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          <Badge>{count ?? 0} urls</Badge>
          <Badge className="ml-2">{testEachDay ?? 0} tests / day</Badge>
        </div>

        <Link href={`/dashboard/campaign/details/${data.id}`}>
          <Button data-testid="watch-button" variant="outline">
            Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
