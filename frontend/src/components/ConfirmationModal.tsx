import { useState } from "react";
import { ConfirmationModalProps } from "@/types/interfaces";

// ************ IMPORT UI COMPONENTS  *****************
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash, Loader2 } from "lucide-react";
// ****************************************************

export function ConfirmationModal({
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
        <Button variant={buttonVariant} className="mx-4">
          {forDelete === true ? <Trash className="md:mr-2 h-4 w-4" /> : null}
          <span className="hidden md:block">{buttonText}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <DialogTrigger asChild>
            <Button variant="outline" type="submit">
              {noText}
            </Button>
          </DialogTrigger>
          <Button
            variant="destructive"
            disabled={loading === true}
            onClick={onSubmit}
          >
            {loading === true && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {loading === true ? "Please wait" : yesText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
