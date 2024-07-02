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
import { ZoomIn } from "lucide-react";
import UrlResponsesDetailChart from "./UrlResponsesDetailChart";

interface UrlResponsesDetailProps {
  campaignUrlId: number;
}

export default function UrlResponsesDetail({
  campaignUrlId,
}: UrlResponsesDetailProps) {
  const [openDetail, setOpenDetail] = useState(false);

  return (
    <Dialog open={openDetail} onOpenChange={setOpenDetail}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-black mx-4" type="button">
          <ZoomIn className="mr-2 h-4 w-4" />
          Detail
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>URL responses detail</DialogTitle>
          <DialogDescription>
            This is the response on this URL for the last 24 hours
          </DialogDescription>
        </DialogHeader>
        <UrlResponsesDetailChart campaignUrlId={campaignUrlId} />
      </DialogContent>
    </Dialog>
  );
}
