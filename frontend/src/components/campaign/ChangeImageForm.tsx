"use client";

import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

// ************ IMPORT UI COMPONENTS  *****************
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import {
  useCampaignsByUserIdQuery,
  useModifyImageOfCampaignMutation,
} from "@/types/graphql";
import { ChangeImageCampaignFormProps } from "@/types/interfaces";

// ****************************************************

export function ChangeImageForm({
  campaignId,
  imageSrc,
}: ChangeImageCampaignFormProps) {
  const { toast } = useToast();
  const [imageToSet, setImageToSet] = useState(imageSrc);
  const [formToSend] = useState({
    id: campaignId,
    image: imageToSet,
  });
  const [loading, setLoading] = useState(false); // to show the loader in the button
  const [openImageForm, setOpenImageForm] = useState(false); // to close the form after submit

  const { refetch } = useCampaignsByUserIdQuery();

  const [modifyImageOfCampaign] = useModifyImageOfCampaignMutation({
    onCompleted: (data) => {
      setTimeout(() => {
        setLoading(false);
        handleCloseForm();
        toast({
          title: `${data.modifyImageOfCampaign.message}`,
          variant: "success",
        });
        refetch();
      }, 500);
    },
    onError: (err) => {
      setLoading(false);

      toast({
        title: `${err.message}`,
        variant: "destructive",
      });
    },
  });

  // to reset form inputs when closing the dialog
  const handleCloseForm = () => {
    setImageToSet(imageSrc); // TODO : when closing the modal after changed image, if i reopen the modal, I still have the previous image in src. I must find a way to update the imageSrc after update the image of campaign
    setOpenImageForm(!openImageForm);
  };

  // Define a submit handler.
  function handleSubmit() {
    setLoading(true);
    modifyImageOfCampaign({
      variables: {
        input: formToSend,
      },
    });
  }

  // Function to fetch a new image
  const getNewImage = async () => {
    await fetch("https://picsum.photos/1920/1080", {
      redirect: "follow",
    })
      .then((res) => {
        setImageToSet(res.url);
        formToSend.image = res.url;
      })
      .catch(() => {
        throw new Error("Failed to get image");
      });
  };

  return (
    <Dialog open={openImageForm} onOpenChange={handleCloseForm}>
      <DialogTrigger asChild>
        <Button className="my-4" variant="edit">
          <span>Open image modal</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new URL</DialogTitle>
          <div className="flex flex-col items-center justify-center">
            {" "}
            <Image
              src={imageToSet ?? "../../../public/logo_large.svg"}
              alt="image"
              className="w-full rounded-lg"
              width={350}
              height={0}
            />
            <Button onClick={getNewImage} variant={"edit"} className="my-4">
              Load a new image
            </Button>
          </div>
        </DialogHeader>

        <Input type="hidden" name="image" value={formToSend.image} />
        <div className="flex flex-row items-center justify-around">
          <DialogFooter>
            <Button onClick={handleCloseForm}>Cancel</Button>
            <Button
              onClick={handleSubmit}
              variant={"outline"}
              disabled={imageToSet === imageSrc}
            >
              {loading === true && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {loading === true ? "Please wait" : "Change"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
