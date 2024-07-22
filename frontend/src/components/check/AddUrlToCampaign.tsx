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
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import {
  useCampaignsByUserIdQuery,
  useAddUrlToCampaignMutation,
} from "@/types/graphql";
import { AddUrlToCampaignToastProps } from "@/types/interfaces";
import { urlPattern } from "@/utils/global/getDomainFromUrl";
// ****************************************************

// Define the form schema for validation
const formSchema = z.object({
  url: z.string().regex(urlPattern, {
    message: "Invalid URL format",
  }),
  campaignId: z.string().min(1, {
    message: "Please select your campagin",
  }),
});

export function AddUrlToCampaign({
  showAddUrlModal,
  setShowAddUrlModal,
  urlToAdd,
  setUrlPath,
}: AddUrlToCampaignToastProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false); // to show the loader in the button

  const { data } = useCampaignsByUserIdQuery();
  const campaigns = data?.campaignsByUserId;

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
      url: urlToAdd,
      campaignId: "",
    },
  });

  // to reset form inputs when closing the dialog
  const handleCloseForm = () => {
    setShowAddUrlModal(false);
    form.reset();
    if (setUrlPath !== null) {
      setUrlPath("");
    }
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
    <Dialog open={showAddUrlModal} onOpenChange={handleCloseForm}>
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
                    <Input disabled id="URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="campaignId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Campaign</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a campaign to save this URL" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {campaigns && campaigns.length > 0 ? (
                        campaigns.map((campaign) => (
                          <SelectItem
                            key={campaign.id}
                            value={campaign.id.toString()}
                          >
                            {campaign.name}
                          </SelectItem>
                        ))
                      ) : (
                        <p>No campaign available</p>
                      )}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button disabled={loading === true}>
                {loading === true && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {loading === true ? "Please wait" : "Add"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
