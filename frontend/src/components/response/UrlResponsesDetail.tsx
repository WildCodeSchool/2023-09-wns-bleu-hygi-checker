import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ZoomIn } from "lucide-react";
import UrlResponsesDetailChart from "./UrlResponsesDetailChart";

interface UrlResponsesDetailProps {
  campaignUrlId: number;
}

export default function UrlResponsesDetail({
  campaignUrlId,
}: UrlResponsesDetailProps) {
  const [openDetail, setOpenDetail] = useState(false);
  const [choice, setChoice] = useState("status");

  return (
    <Dialog open={openDetail} onOpenChange={setOpenDetail}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-black mx-4" type="button">
          <ZoomIn className="mr-2 h-4 w-4" />
          Detail
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-[425px] md:w-[600px]">
        <DialogHeader>
          <DialogTitle>URL responses detail</DialogTitle>
          <DialogDescription>
            {choice === "status"
              ? "This is the response status on this URL for the last 24 hours"
              : "This is the average response time on this URL for the last 24 hours"}
          </DialogDescription>
        </DialogHeader>
        <Select onValueChange={setChoice} defaultValue={choice}>
          <SelectTrigger className="w-[180px] place-self-center">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="status">Status</SelectItem>
              <SelectItem value="time">Average time</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <UrlResponsesDetailChart
          campaignUrlId={campaignUrlId}
          choice={choice}
        />
      </DialogContent>
    </Dialog>
  );
}
