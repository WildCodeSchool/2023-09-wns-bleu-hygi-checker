import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

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
import { ChevronDown, Trash, Loader2 } from "lucide-react";
// ****************************************************

export default function Dropdown() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false); // to show the loader in the button
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const deleteURL = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenDeleteModal(false);
      toast({
        title: "This URL has been deleted",
        variant: "success",
      });
    }, 1500);
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
    </>
  );
}
