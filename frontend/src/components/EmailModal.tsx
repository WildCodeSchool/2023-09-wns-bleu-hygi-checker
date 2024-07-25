import { useState } from "react";
import { EmailModalProps } from "@/types/interfaces";
import { useMutation } from "@apollo/client";
import { SEND_EMAIL_MUTATION } from "@/requests/mutations/sendEmail.mutation";

// ************ IMPORT UI COMPONENTS  *****************
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "./ui/use-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import Email from "@/emails/passwordForget";
import { renderToStaticMarkup } from "react-dom/server";

// ****************************************************

export function EmailModal({
  buttonText,
  title,
  message,
  confirmButton,
}: EmailModalProps) {
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [sendEmail] = useMutation(SEND_EMAIL_MUTATION);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const emailContent = renderToStaticMarkup(<Email />);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (!validateEmail(email)) {
        setEmailError("Please enter a valid email address.");
        return;
      }
      setEmailError("");
      setLoading(true);

      await sendEmail({
        variables: {
          to: email,
          subject: "Mot de passe oublié",
          content: emailContent,
        },
      });
      setTimeout(() => {
        setLoading(false);
        setOpenForm(false);
        toast({
          title: `An email has been sent to the following address: ${email} `,
          variant: "success",
        });
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
        setOpenForm(false);
        toast({
          title: `An error has occurred`,
          variant: "destructive",
        });
      }, 1000);
    }
  };

  return (
    <Dialog open={openForm} onOpenChange={setOpenForm}>
      <DialogTrigger asChild>
        <Button variant={"modal"} className="italic">
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex flex-col gap-6 rounded-lg">
        <DialogHeader className="flex flex-col gap-4">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleInputChange}
          />
          {emailError && <p className="text-red-500 text-xs">{emailError}</p>}{" "}
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleSubmit}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Please wait" : confirmButton}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
