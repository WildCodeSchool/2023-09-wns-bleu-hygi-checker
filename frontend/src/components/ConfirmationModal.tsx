import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ConfirmationModalProps } from "@/types/interfaces";

export function ConfirmationModal({
  buttonText,
  buttonVariant,
  title,
  message,
  noText,
  yesText,
  action,
}: ConfirmationModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={buttonVariant}>{buttonText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <DialogTrigger asChild>
          <div className="grid gap-4 py-4">
            <Button variant="outline" type="submit">
              {noText}
            </Button>
            <Button variant="destructive" type="submit" onClick={action}>
              {yesText}
            </Button>
          </div>
        </DialogTrigger>
      </DialogContent>
    </Dialog>
  );
}
