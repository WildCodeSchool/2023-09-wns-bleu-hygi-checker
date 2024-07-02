"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  useCampaignByIdQuery,
  useModifyCampaignMutation,
} from "@/types/graphql";
import { EditCampaignFormProps } from "@/types/interfaces";
import { ChangeImageForm } from "./ChangeImageForm";
// ************ IMPORT UI COMPONENTS  *****************
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
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
  FormDescription,
} from "@/components/ui/form";
import { Loader2, Wrench } from "lucide-react";
// ****************************************************

// Define the form schema for validation
const formSchema = z.object({
  id: z.number({
    required_error: "ID of the campaign is required",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters",
  }),
  intervalTest: z
    .number({
      required_error: "interval test is required",
    })
    .positive({
      message: "Interval of test must be a positive number.",
    })
    .int({
      message: "Interval of test must be a number",
    })
    .lte(1440, {
      message: "Interval can't be over 24 hours",
    })
    .gte(1, {
      message: "Interval of test must be at least 1 minute",
    }),
  isWorking: z.boolean({
    required_error: "Working is required",
    invalid_type_error: "Working must be a boolean",
  }),
  isMailAlert: z.boolean({
    required_error: "Mail alert is required",
    invalid_type_error: "Mail alert must be a boolean",
  }),
});
export function EditCampaignForm({ campaignId }: EditCampaignFormProps) {
  const { toast } = useToast();
  const router = useRouter();

  const [fakeLoading, setFakeLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const { data, refetch: refreshData } = useCampaignByIdQuery({
    variables: {
      campaignId: parseInt(campaignId),
    },
  });

  const campaignData = data?.campaignById;

  const [modifyCampaign] = useModifyCampaignMutation({
    onCompleted: () => {
      setTimeout(() => {
        setFakeLoading(false);
        setOpenForm(false);
        toast({
          title: "Campaign edited successfully",
          variant: "success",
        });
        refreshData();
        router.reload(); // TODO : currently, the data in the form does not update after the modification when you reopen the form. For now, I'm using a router.reload but I need to find another solution
      }, 1000);
    },
    onError: () => {
      toast({
        title: `Something went wrong. Please try again`,
        variant: "destructive",
      });
    },
  });

  // Define the form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: campaignData ? (campaignData.id as number) : 0,
      name: campaignData ? (campaignData.name as string) : "",
      intervalTest: campaignData ? (campaignData.intervalTest as number) : 60,
      isWorking: campaignData ? (campaignData.isWorking as boolean) : false,
      isMailAlert: campaignData ? (campaignData.isMailAlert as boolean) : false,
    },
  });

  // to reset form inputs when closing the dialog
  const handleCloseForm = () => {
    setOpenForm(!openForm);
    form.reset();
  };

  // Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setFakeLoading(true);
    modifyCampaign({
      variables: {
        input: values,
      },
    });
  }

  return (
    <>
      {campaignData && (
        <Dialog open={openForm} onOpenChange={handleCloseForm}>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 text-white mx-4" variant={"edit"}>
              <Wrench className="md:mr-2 h-4 w-4" />
              <span className="hidden md:block">Edit campaign</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit this campaign</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-col items-left justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Name of the campaign
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Input autoFocus={true} {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="intervalTest"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Interval time
                          </FormLabel>
                          <FormDescription>
                            Choose the interval time, in minutes, between each
                            test on URLs of your campaign
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Input
                            type="number"
                            className="w-20 text-right"
                            {...field}
                            onChange={(event) =>
                              field.onChange(+event.target.value)
                            }
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isWorking"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Working campaign
                          </FormLabel>
                          <FormDescription>
                            Choose if you want to play automatic tests on your
                            campaign
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="ml-4"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isMailAlert"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Email alerts
                          </FormLabel>
                          <FormDescription>
                            Choose if you want to receive emails when tests goes
                            wrong
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            disabled
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="ml-4"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col items-left justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Image of campaign
                    </FormLabel>
                    <FormDescription>
                      Set a new background image for your campaign
                    </FormDescription>
                    <div className="flex flex-col items-center">
                      <ChangeImageForm
                        campaignId={campaignData.id as number}
                        imageSrc={campaignData.image as string}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-end">
                  <Button variant={"outline"} disabled={fakeLoading === true}>
                    {fakeLoading === true && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {fakeLoading === true ? "Please wait" : "Confirm changes"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
