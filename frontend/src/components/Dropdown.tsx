import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export default function Dropdown() {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { toast } = useToast();

  const deleteURL = () => {
    toast({
      title: "This URL has been deleted",
      variant: "success",
    });
  };

  const handleOpen = () => {
    setOpenDeleteModal(!openDeleteModal);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <ChevronDown className="h-4 w-4 m-1" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem className="cursor-pointer text-blue-700">
            Change
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer text-red-500"
            onClick={() => setOpenDeleteModal(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {openDeleteModal && (
        <Dialog open onOpenChange={handleOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>delete this campaign</DialogTitle>
              <DialogDescription>are you sure ?</DialogDescription>
            </DialogHeader>
            <DialogTrigger asChild>
              <div className="grid gap-4 py-4">
                <Button variant="outline" type="submit">
                  No
                </Button>
                <Button variant="destructive" type="submit" onClick={deleteURL}>
                  Yes
                </Button>
              </div>
            </DialogTrigger>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
