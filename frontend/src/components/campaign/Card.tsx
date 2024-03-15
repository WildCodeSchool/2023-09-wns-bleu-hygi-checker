import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardTitle, CardContent, CardFooter } from "../ui/card";
import { Switch } from "../ui/switch";
import { useRouter } from "next/router";

export interface DataCardProps {
  id: number;
  url: number;
  working: boolean;
}

export default function CampaignCard({ data }: { data: DataCardProps }) {
  const router = useRouter();
  return (
    <Card className="flex flex-col w-[350px]">
      <Image
        src="https://source.unsplash.com/random?wallpapers"
        alt="image"
        className="w-full rounded-t-lg"
        width={250}
        height={0}
      />
      <CardContent className="flex justify-between p-6 items-center">
        <CardTitle className="text-2xl">Campaign #{data.id}</CardTitle>
        <Switch />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Badge>{data.url} URLs</Badge>
        <Button
          onClick={() => {
            router.push("/dashboard/campaign/details");
          }}
        >
          Voir
        </Button>
      </CardFooter>
    </Card>
  );
}
