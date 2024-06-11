import { FormEvent } from "react";
import { ChangePassword } from "./ChangePassword";
import { ConfirmationModal } from "../ConfirmationModal";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SettingsProps } from "@/types/interfaces";
import { useUpdateNameMutation, useGetUserProfileQuery } from "@/types/graphql";

export default function Account({ data }: SettingsProps) {
  const [fakeLoading, setFakeLoading] = useState(false);
  const [username, setUsername] = useState(data?.username as string);
  const initialUsername = data?.username;
  const { toast } = useToast();
  const router = useRouter();

  const deleteAccount = () => {
    // useDeleteAccountMutation
    toast({
      title: `Your account has been deleted successfully`,
      variant: "success",
    });
    router.push("/");
  };

  const { refetch } = useGetUserProfileQuery();
  const [updateNameMutation] = useUpdateNameMutation({
    onCompleted: () => {
      setTimeout(() => {
        setFakeLoading(false);
        toast({
          title: "Username changed successfully",
          variant: "success",
        });
        refetch();
      }, 1000);
    },
    onError: () => {
      toast({
        title: `Something went wrong. Please try again`,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFakeLoading(true);
    updateNameMutation({
      variables: {
        updateName: { username },
      },
    });
  };

  return (
    <Card className="md:w-[750px]">
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>Modify yout account informations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            value={data?.email}
            disabled
          />
        </div>
        <Separator decorative={true} className="my-8" />
        <form onSubmit={handleSubmit} className="grid gap-2">
          <div className="space-y-1">
            <Label htmlFor="email">Username</Label>
            <Input
              id="username"
              type="text"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {username !== initialUsername && (
            <Button
              disabled={
                username.trim().length <= 3 || username.trim().length >= 20
              }
              className="mt-6"
            >
              {fakeLoading === true && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {fakeLoading === true ? "Please wait" : "Change username"}
            </Button>
          )}
        </form>
        <p className="mt-12 font-bold mb-2">Password</p>
        <ChangePassword />

        <p className=" font-bold mb-2">Delete account</p>
        <ConfirmationModal
          isLargeButton={true}
          forDelete={true}
          buttonText={"Delete my account"}
          buttonVariant={"destructive"}
          title={"Delete my account"}
          message={
            "WARNING : This action will delete your account, your campaign(s) and every URLs related to them. Are you sure you want to delete your account ?"
          }
          noText={"No, I want to keep my account for now"}
          yesText={"Yes, I want to delete my account forever"}
          action={deleteAccount}
        />
      </CardContent>
    </Card>
  );
}
