import { useState } from "react";
import { ConfirmationModalProps } from "@/types/interfaces";

// ************ IMPORT UI COMPONENTS  *****************
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash, Loader2 } from "lucide-react";
// ****************************************************

export function ConfirmationModal({
  isLargeButton,
  forDelete,
  buttonText,
  buttonVariant,
  title,
  message,
  noText,
  yesText,
  action,
}: ConfirmationModalProps) {
  const [loading, setLoading] = useState(false); // to show the loader in the button
  const [openForm, setOpenForm] = useState(false); // to close the form after submit

  const onSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenForm(false);
      action();
    }, 1500);
  };

  return (
    <Dialog open={openForm} onOpenChange={setOpenForm}>
      <DialogTrigger asChild>
        <Button
          variant={buttonVariant}
          className={` ${isLargeButton === true ? "w-1/2" : "mx-4"}`}
        >
          {forDelete === true ? (
            <Trash
              className={`${isLargeButton === true ? "mr-2 h-4 w-4" : ""}md:mr-2 h-4 w-4`}
            />
          ) : null}
          <span
            className={`${isLargeButton === true ? "block" : "hidden"} md:block`}
          >
            {buttonText}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <DialogFooter>
            <Button
              variant="default"
              type="submit"
              onClick={() => setOpenForm(false)}
            >
              {noText}
            </Button>
            <Button variant="destructive" disabled={loading} onClick={onSubmit}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Please wait" : yesText}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
