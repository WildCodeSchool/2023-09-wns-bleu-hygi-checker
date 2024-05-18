import { ChangePassword } from "./ChangePassword";
import { ConfirmationModal } from "../ConfirmationModal";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Account() {
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

  return (
    <Card className="md:w-[750px]">
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>Modify yout account informations</CardDescription>
      </CardHeader>
      <CardContent className="">
        <form className="grid gap-2">
          <div className="space-y-1">
            <Label htmlFor="email">Username</Label>
            <Input
              id="username"
              type="text"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
            />
          </div>
          <Button className="mt-6">Valid changes</Button>
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
