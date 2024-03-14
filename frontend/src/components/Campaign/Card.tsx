import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Switch } from "../ui/switch";

export interface DataCardProps {
  id: number;
  url: number;
  working: boolean;
}  

export default function CampaignCard({ data }: { data: DataCardProps }) {
  return (
    <Card className="flex flex-col text-white w-[350px]">
      <img src="/card.jpg" alt="image" className="w-full rounded-t-lg" />
      <CardContent className="flex justify-between bg-card p-6">
        <CardTitle className="text-2xl">Campaign #{data.id}</CardTitle>
        <Switch />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Badge variant={"white"}>{data.url} URLs</Badge>
        <Button>Voir</Button>
      </CardFooter>
    </Card>
  );
}
