"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";
import { CampaignFormProps } from "@/types/interfaces";
import { useState } from "react";

// ************ IMPORT UI COMPONENTS  *****************
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, Plus, Wrench } from "lucide-react";
// ****************************************************

// Define the form schema for validation
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function CampaignForm({
  isNewCampaign,
  buttonText,
  buttonVariant,
  title,
}: CampaignFormProps) {
  const { toast } = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  // Define the form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // to reset form inputs when closing the dialog
  const handleCloseForm = () => {
    setOpenForm(!openForm);
    form.reset();
  };

  // Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: `Campaign ${isNewCampaign ? "created" : "edited"} successfully`,
        variant: "success",
      });
      setOpenForm(false);
      if (isNewCampaign === true) {
        router.push(`/dashboard/campaign/details/1`);
      }
    }, 1500);
    // Do something with data below
    console.warn(values);
  }

  // the following variable is used for avoiding a ternary in a ternary
  const EditOrCreate = isNewCampaign === true ? "Create" : "Confirm changes";

  return (
    <Dialog open={openForm} onOpenChange={handleCloseForm}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 text-white mx-4" variant={buttonVariant}>
          {isNewCampaign === true ? (
            <Plus className="md:mr-2 h-4 w-4" />
          ) : (
            <Wrench className="md:mr-2 h-4 w-4" />
          )}
          <span className="hidden md:block">{buttonText}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name of the campaign</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={loading === true}>
              {loading === true && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {loading === true ? "Please wait" : EditOrCreate}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
