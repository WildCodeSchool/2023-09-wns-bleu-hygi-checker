// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { useState } from "react";
import { avatars } from "../../utils/avatars";

interface Avatar {
  id: number;
  fileName: string;
}

export default function Appearance() {
  const [selectedAvatar, setSelectedAvatar] = useState("avatar01");

  const actualAvatar = "avatar01";

  const handleSetAvatar = (avatar: Avatar) => {
    setSelectedAvatar(avatar.fileName);
  };

  return (
    <Card className="md:w-[750px]">
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>Modify yout appearance informations</CardDescription>
      </CardHeader>
      <CardContent className=" flex flex-row flex-wrap justify-center align-center">
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
        {actualAvatar !== selectedAvatar && (
          <Button className="mt-6">Change avatar</Button>
        )}
      </CardContent>
    </Card>
  );
}
