"use client";

import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import {
  useAddPremiumToUserMutation,
  useRemovePremiumToUserMutation,
  useGetUserProfileQuery,
} from "@/types/graphql";

// ************ IMPORT UI COMPONENTS  *****************
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Loader2, Crown, CheckCheck } from "lucide-react";
// ****************************************************

interface PremiumModalProps {
  currentPremium: boolean;
}

export function PremiumModal({ currentPremium }: PremiumModalProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false); // to show the loader in the button
  const [openForm, setOpenForm] = useState(false); // to close the form after submit
  const [premiumCode, setPremiumCode] = useState(""); // the code to subscribe to premium

  // to close the dialog
  const handleCloseForm = () => {
    setOpenForm(!openForm);
  };

  function isValidPremiumCode(code: string) {
    const regex = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
    return regex.test(code);
  }

  const { refetch: refreshProfile } = useGetUserProfileQuery();

  const [addPremiumToUserMutation] = useAddPremiumToUserMutation({
    onCompleted: (data) => {
      setTimeout(() => {
        setLoading(false);
        if (data.addPremiumToUser.success === false) {
          toast({
            title: data.addPremiumToUser.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: data.addPremiumToUser.message,
            variant: "success",
          });
          refreshProfile();
          handleCloseForm();
        }
      }, 3000);
    },
    onError: () => {
      setLoading(false);
      toast({
        title: `Something went wrong. Please try again`,
        variant: "destructive",
      });
    },
  });
  const [removePremiumToUserMutation] = useRemovePremiumToUserMutation({
    onCompleted: (data) => {
      setTimeout(() => {
        setLoading(false);
        if (data.RemovePremiumToUser.success === false) {
          toast({
            title: data.RemovePremiumToUser.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: data.RemovePremiumToUser.message,
            variant: "success",
          });
          refreshProfile();
          handleCloseForm();
        }
      }, 3000);
    },
    onError: () => {
      toast({
        title: `Something went wrong. Please try again`,
        variant: "destructive",
      });
    },
  });

  function subscribeToPremium() {
    setLoading(true);
    addPremiumToUserMutation({
      variables: {
        inputCode: premiumCode,
      },
    });
  }

  function unsubscribeFromPremium() {
    setLoading(true);
    removePremiumToUserMutation();
  }

  return (
    <Dialog open={openForm} onOpenChange={handleCloseForm}>
      <DialogTrigger asChild>
        <Button className="w-fit mb-4">
          <Crown className="mr-2 h-4 w-4 text-yellow-400" />
          Open Premium Center
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex justify-start items-center">
            <Crown className="mr-2 h-4=6 w-6 text-yellow-400" /> Premium Center
          </DialogTitle>
        </DialogHeader>
        {currentPremium === false ? (
          <div>
            <p className="text-center mb-8">
              You are currently not subscribed to Premium
            </p>
            <div className="flex flex-col justify-center items-center">
              <p className="font-bold">Add Premium to your account</p>
              <Input
                type="text"
                className="w-1/2 mt-2 text-center"
                placeholder="eg : TF5G-2EF6-4E1J-PO9B"
                onChange={(e) => setPremiumCode(e.target.value)}
              />
              <Button
                type="button"
                onClick={subscribeToPremium}
                disabled={!isValidPremiumCode(premiumCode)}
                className="mt-4 bg-yellow-400 text-black hover:bg-yellow-500"
              >
                {loading === true && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {loading === true ? "Please wait" : "Get Premium"}
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-center mb-8 flex justify-center items-center">
              You are currently subscribed to Premium{" "}
              <CheckCheck className="ml-2 h-4=6 w-6 text-green-500" />
            </p>
            <div className="flex flex-col justify-center items-center">
              <p className="font-bold">Unsubscribe from Premium</p>

              <Button
                type="button"
                onClick={unsubscribeFromPremium}
                className="mt-4"
              >
                {loading === true && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {loading === true ? "Please wait" : "Unsubscribe"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
