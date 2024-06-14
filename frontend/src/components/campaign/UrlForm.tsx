"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

// ************ IMPORT UI COMPONENTS  *****************
import { Button } from "@/components/ui/button";
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
  FormMessage,
} from "@/components/ui/form";
import { Loader2, Plus } from "lucide-react";
import { useAddUrlToCampaignMutation } from "@/types/graphql";
import { AddUrlToCampaignProps } from "@/types/interfaces";

// ****************************************************

const urlPattern =
  /^(https?:\/\/)?(www\.)?[\w-]+\.[\w-]+(?:\.[\w-]+)*(\/[\w-]*)*$/;

// Define the form schema for validation
const formSchema = z.object({
  url: z.string().regex(urlPattern, {
    message: "Invalid URL format",
  }),
  campaignId: z.string().min(1, {
    message: "Please select your campagin",
  }),
});

export function UrlForm({ campaignId }: AddUrlToCampaignProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false); // to show the loader in the button
  const [openForm, setOpenForm] = useState(false); // to close the form after submit

  const [addUrlToCampaignMutation] = useAddUrlToCampaignMutation({
    onCompleted: (data) => {
      setTimeout(() => {
        setLoading(false);
        handleCloseForm();
        toast({
          title: `${data.addUrlToCampaign.message}`,
          variant: "success",
        });
      }, 1000);
    },
    onError: (err) => {
      setLoading(false);

      toast({
        title: `${err.message}`,
        variant: "destructive",
      });
    },
  });

  // Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      campaignId: campaignId,
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
    addUrlToCampaignMutation({
      variables: {
        infos: values,
      },
    });
  }

  return (
    <Dialog open={openForm} onOpenChange={handleCloseForm}>
      <DialogTrigger asChild>
        <Button className={` mx-4`} variant="outline">
          <Plus className="md:mr-2 h-4 w-4" />
          <span className="hidden md:block">Add URL</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new URL</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="http://example.com"
                      id="URL"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={loading === true}>
              {loading === true && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {loading === true ? "Please wait" : "Add"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
