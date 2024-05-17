"use client";

import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardTitle, CardContent, CardFooter } from "../ui/card";
import { Switch } from "../ui/switch";
import Link from "next/link";
import { CampaignCardProps } from "@/types/interfaces";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function CampaignCard({ data }: CampaignCardProps) {
  const { toast } = useToast();
  const [isWorkingCampaign, setIsWorkingCampaign] = useState<boolean>(
    data.isWorking ?? false
  );

  const handleIsWorking = () => {
    setIsWorkingCampaign(!isWorkingCampaign);
    toast({
      title: `Campaign ${isWorkingCampaign === true ? "stopped" : "started"} successfully`,
      variant: "success",
    });
  };

  return (
    <Card className="flex flex-col w-[350px]">
      <Image
        src={data.image}
        alt="image"
        className="w-full rounded-t-lg"
        width={350}
        height={0}
      />

      <CardContent className="flex justify-between p-6 items-center">
        <CardTitle className="text-2xl">{data.name}</CardTitle>
        <Switch checked={isWorkingCampaign} onCheckedChange={handleIsWorking} />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Badge>{data.urls.length} urls</Badge>
        <Link href={`/dashboard/campaign/details/${data.id}`}>
          <Button data-testid="watch-button">Voir</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
