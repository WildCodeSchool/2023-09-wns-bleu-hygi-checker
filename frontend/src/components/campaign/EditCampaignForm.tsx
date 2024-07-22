"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  intervalTest: z.string({
    required_error: "interval test is required",
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

  const [fakeLoading, setFakeLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [selectedInterval, setSelectedInterval] = useState<string>("");

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
        //  TODO : currently, the data in the form does not update after the modification when you reopen the form. For now, I'm using a router.reload but I need to find another solution
      }, 1000);
    },
    onError: () => {
      setTimeout(() => {
        setFakeLoading(false);
        toast({
          title: `Something went wrong. Please try again`,
          variant: "destructive",
        });
      }, 1000);
    },
  });

  // Define the form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: campaignData ? (campaignData.id as number) : 0,
      name: campaignData ? (campaignData.name as string) : "",
      intervalTest:
        campaignData !== null &&
        campaignData !== undefined &&
        campaignData.intervalTest !== null &&
        campaignData.intervalTest !== undefined
          ? campaignData.intervalTest.toString()
          : "60",
      isWorking: campaignData ? (campaignData.isWorking as boolean) : false,
      isMailAlert: campaignData ? (campaignData.isMailAlert as boolean) : false,
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (campaignData && campaignData !== null && campaignData !== undefined) {
      ({
        id: campaignData.id,
        name: campaignData.name,
        intervalTest:
          campaignData.intervalTest !== null &&
          campaignData.intervalTest !== undefined
            ? campaignData.intervalTest.toString()
            : "60",
        isWorking: campaignData ? (campaignData.isWorking as boolean) : false,
        isMailAlert: campaignData
          ? (campaignData.isMailAlert as boolean)
          : false,
      });
      setSelectedInterval(campaignData.intervalTest?.toString() || "60");
    }
  }, [campaignData, reset]);

  // to reset form inputs when closing the dialog
  const handleCloseForm = () => {
    setOpenForm(!openForm);
    form.reset();
  };

  // Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setFakeLoading(true);

    const transformedValues = {
      ...values,
      intervalTest: parseFloat(values.intervalTest),
    };

    modifyCampaign({
      variables: {
        input: transformedValues,
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
          <DialogContent className="sm:max-w-[425px] dialog-content max-h-[90vh] overflow-y-auto">
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
                      <div className="flex flex-col items-left justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Name of the campaign
                          </FormLabel>
                          <FormDescription>
                            Choose the frequency of testing
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                              setSelectedInterval(value);
                            }}
                            value={selectedInterval}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0.5">30 seconds</SelectItem>
                              <SelectItem value="1">1 minute</SelectItem>
                              <SelectItem value="5">5 minutes</SelectItem>
                              <SelectItem value="10">10 minutes</SelectItem>
                              <SelectItem value="30">30 minutes</SelectItem>
                              <SelectItem value="60">1 hour</SelectItem>
                              <SelectItem value="180">3 hours</SelectItem>
                              <SelectItem value="360">6 hours</SelectItem>
                              <SelectItem value="720">12 hours</SelectItem>
                              <SelectItem value="1440">24 hours</SelectItem>
                            </SelectContent>
                          </Select>
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
