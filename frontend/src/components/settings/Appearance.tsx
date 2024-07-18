import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { avatars } from "../../utils/avatars";
import { SettingsProps } from "@/types/interfaces";
import {
  useChangeAvatarMutation,
  useGetAvatarQuery,
  useGetUserProfileQuery,
} from "@/types/graphql";

interface Avatar {
  id: number;
  fileName: string;
}

export default function Appearance({ data }: SettingsProps) {
  const [fakeLoading, setFakeLoading] = useState(false);
  const { toast } = useToast();
  const { refetch: refreshAvatar } = useGetAvatarQuery();
  const { refetch: refreshProfile } = useGetUserProfileQuery();
  const [changeAvatarMutation] = useChangeAvatarMutation({
    onCompleted: (data) => {
      setTimeout(() => {
        setFakeLoading(false);
        setActualAvatar(data.changeAvatar.avatar);
        toast({
          title: "Avatar changed successfully",
          variant: "success",
        });
        refreshAvatar();
        refreshProfile();
      }, 1000);
    },
    onError: () => {
      setFakeLoading(false);
      toast({
        title: `Something went wrong. Please try again`,
        variant: "destructive",
      });
    },
  });

  const [selectedAvatar, setSelectedAvatar] = useState(data?.avatar as string);
  const [actualAvatar, setActualAvatar] = useState(data?.avatar as string);

  const handleSetAvatar = (avatar: Avatar) => {
    setSelectedAvatar(avatar.fileName);
  };

  const handleSubmit = () => {
    setFakeLoading(true);
    changeAvatarMutation({
      variables: {
        newAvatar: selectedAvatar,
      },
    });
  };

  return (
    <Card className="md:w-2/5 m-auto">
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>Modify your appearance information</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="flex flex-wrap justify-center w-full">
          {avatars.map((avatar) => (
            <button key={avatar.id} onClick={() => handleSetAvatar(avatar)}>
              <Avatar
                className={`m-4 w-[80px] h-[80px] cursor-pointer ${selectedAvatar === avatar.fileName ? "border-4 border-zinc-900" : ""}`}
              >
                <AvatarImage src={`../../../avatars/${avatar.fileName}.jpg`} />
                <AvatarFallback>HC</AvatarFallback>
              </Avatar>
            </button>
          ))}
        </div>
        {actualAvatar !== selectedAvatar && (
          <Button onClick={handleSubmit} className="mt-6">
            {fakeLoading === true && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {fakeLoading === true ? "Please wait" : "Change avatar"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
