"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  useCampaignsByUserIdQuery,
  useCreateCampaignMutation,
} from "@/types/graphql";

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
import { Loader2, Plus } from "lucide-react";
// ****************************************************

// Define the form schema for validation
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

interface AddCampaignFormProps {
  callToAction: boolean;
}

export function AddCampaignForm({ callToAction }: AddCampaignFormProps) {
  const { toast } = useToast();
  const router = useRouter();

  const [fakeLoading, setFakeLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const { refetch } = useCampaignsByUserIdQuery();

  const [createCampaign] = useCreateCampaignMutation({
    onCompleted: (data) => {
      const campaignId = data.createCampaign.id;
      setTimeout(() => {
        setFakeLoading(false);
        setOpenForm(false);
        router.push(`/dashboard/campaign/details/${campaignId}`);
        toast({
          title: `Campaign created successfully`,
          variant: "success",
        });
        refetch();
      }, 1000);
    },
    onError: (err) => {
      setTimeout(() => {
        setFakeLoading(false);
        toast({
          description: err.message,
          variant: "destructive",
        });
      }, 500);
    },
  });

  // Define the form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
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
    if (values.name) {
      createCampaign({
        variables: {
          input: {
            name: values.name,
          },
        },
      });
    } else {
      toast({
        title: "Champ incomplet !",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open={openForm} onOpenChange={handleCloseForm}>
      <DialogTrigger asChild>
        {callToAction === true ? (
          <Button
            className="bg-blue-500 text-white mx-4 mt-12 px-8 py-8 md:px-12 md:py-12"
            variant={"edit"}
          >
            <Plus className="mr-4 h-8 w-8 md:mr-4 md:h-12 md:w-12" />
            <span className="text-lg md:block md:text-2xl">
              Create your first campaign
            </span>
          </Button>
        ) : (
          <Button className="bg-blue-500 text-white mx-4" variant={"edit"}>
            <Plus className="md:mr-2 h-4 w-4" />
            <span className="hidden md:block">Create new campaign</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new campaign</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
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
            <div className="flex flex-row justify-end">
              <Button disabled={fakeLoading === true}>
                {fakeLoading === true && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {fakeLoading === true ? "Please wait" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
