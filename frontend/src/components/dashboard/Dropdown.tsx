import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import QuickUrlTest from "../check/QuickUrlTest";
import UrlResponsesDetailChart from "../response/UrlResponsesDetailChart";
import { Url, useDeleteUrlFromCampaignMutation } from "@/types/graphql";
// ************ IMPORT UI COMPONENTS  *****************
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { ChevronDown, Trash, Loader2, ZoomIn } from "lucide-react";
// ****************************************************

interface DropdownProps {
  refetch: () => void;
  data: {
    id: number;
    campaign: {
      id: number | undefined;
    };
    url: Url;
  };
}

export default function Dropdown({ data, refetch }: DropdownProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false); // to show the loader in the button
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openDetailDropdown, setOpenDetailDropdown] = useState(false);
  const [choice, setChoice] = useState("status");

  const handleOpen = () => {
    setOpenDeleteModal(!openDeleteModal);
  };

  const deleteURL = () => {
    setLoading(true);
    deleteUrlMutation({
      variables: {
        infos: {
          id: data.id,
        },
      },
    });
  };

  const [deleteUrlMutation] = useDeleteUrlFromCampaignMutation({
    onCompleted: (data) => {
      setTimeout(() => {
        setLoading(false);
        setOpenDeleteModal(false);
        refetch();
        toast({
          title: data.deleteUrlFromCampaign.message,
          variant: "success",
        });
      }, 1500);
    },
    onError: (err) => {
      toast({
        title: err.message,
        variant: "destructive",
      });
    },
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <ChevronDown className="h-4 w-4 m-1" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="cursor-pointer text-green-500"
            onClick={() => setOpenDetailDropdown(true)}
          >
            <ZoomIn className="mr-2 h-4 w-4" />
            Detail
          </DropdownMenuItem>
          <QuickUrlTest
            urlPath={data.url.urlPath}
            onDropdown={true}
            iconOnly={false}
          />
          <DropdownMenuItem
            className="cursor-pointer text-red-500"
            onClick={() => setOpenDeleteModal(true)}
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {openDeleteModal && (
        <Dialog open={openDeleteModal} onOpenChange={handleOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Delete this URL</DialogTitle>
              <DialogDescription>are you sure ?</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <DialogTrigger asChild>
                <Button variant="outline" type="submit">
                  No
                </Button>
              </DialogTrigger>
              <Button
                variant="destructive"
                disabled={loading === true}
                onClick={deleteURL}
              >
                {loading === true && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {loading === true ? "Please wait" : "Yes"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
      {openDetailDropdown === true && (
        <Dialog open={openDetailDropdown} onOpenChange={setOpenDetailDropdown}>
          <DialogContent className="sm:max-w-[425px]">
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
            <UrlResponsesDetailChart campaignUrlId={data.id} choice={choice} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
