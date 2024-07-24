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
import {
  useUpdateNameMutation,
  useGetUserProfileQuery,
  useDeleteAccountMutation,
} from "@/types/graphql";

export default function Account({ data }: SettingsProps) {
  const [fakeLoading, setFakeLoading] = useState(false);
  const [username, setUsername] = useState(data?.username as string);
  const initialUsername = data?.username;
  const { toast } = useToast();
  const router = useRouter();

  const [deleteAccountMutation] = useDeleteAccountMutation({
    onCompleted: (data) => {
      toast({
        title: data.deleteAccount.message,
        variant: "success",
      });
      router.push("/");
    },
    onError: (err) => {
      toast({
        title: err.message,
        variant: "destructive",
      });
    },
  });

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
    <Card className="w-[350px] sm:w-[385px] text-center">
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>Modify your account information</CardDescription>
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
          <div className="flex justify-center">
            <Button
              disabled={
                username.trim().length <= 3 ||
                username.trim().length >= 20 ||
                username === initialUsername
              }
              className="mt-6"
            >
              {fakeLoading === true && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {fakeLoading === true ? "Please wait" : "Change username"}
            </Button>
          </div>
        </form>
        <div className="flex flex-col items-center">
          <p className="mt-12 font-semibold mb-2">Password</p>
          <ChangePassword />

          <p className="mb-2 font-semibold">Delete account</p>
          <ConfirmationModal
            isLargeButton={true}
            forDelete={true}
            buttonText={"Delete my account"}
            buttonVariant={"destructive"}
            title={"Delete my account"}
            message={
              "WARNING : This action will delete your account, your campaign(s) and every URLs related to them. Are you sure you want to delete your account ?"
            }
            noText={"Back"}
            yesText={"Confirm"}
            action={deleteAccountMutation}
          />
        </div>
      </CardContent>
    </Card>
  );
}
