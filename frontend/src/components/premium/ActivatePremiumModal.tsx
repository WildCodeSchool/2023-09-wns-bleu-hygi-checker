"use client";

import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import {
  useAddPremiumToUserMutation,
  useGetUserProfileQuery,
} from "@/types/graphql";
import { useRouter } from "next/router";
// ************ IMPORT UI COMPONENTS  *****************
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Loader2, Crown } from "lucide-react";
import { ActivatePremiumModalProps } from "@/types/interfaces";
// ****************************************************

export function ActivatePremiumModal({
  premiumCode,
  openForm,
  setOpenForm,
}: ActivatePremiumModalProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false); // to show the loader in the button

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
          router.push(`/dashboard/campaign/lists`);
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

  function subscribeToPremium() {
    setLoading(true);
    addPremiumToUserMutation({
      variables: {
        inputCode: premiumCode,
      },
    });
  }

  return (
    <Dialog open={openForm} onOpenChange={handleCloseForm}>
      <DialogContent className="sm:max-w-[500px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex justify-start items-center">
            <Crown className="mr-2 h-6 w-6 text-yellow-400" /> Premium Center
          </DialogTitle>
        </DialogHeader>

        <div>
          <p className="text-center mb-8 font-bold text-yellow-500">
            Thank you for your purchase 🚀
          </p>
          <div className="flex flex-col justify-center items-center">
            <p className="font-bold">Here is your activation code</p>
            <Input
              type="text"
              className="w-1/2 mt-2 text-center"
              value={premiumCode}
            />
            <p className="text-center mb-12 mt-6">
              You can copy this code and keep it to activate Premium later via
              the settings section.
            </p>
            <p className="text-center mb-2">
              Or you can activate it now by clicking on the button below.
            </p>
            <Button
              type="button"
              onClick={subscribeToPremium}
              disabled={!isValidPremiumCode(premiumCode)}
              className="mt-2 bg-yellow-400 text-black hover:bg-yellow-500"
            >
              {loading === true && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {loading === true ? "Please wait" : "Activate Premium Now"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
