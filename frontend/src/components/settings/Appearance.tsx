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

interface Avatar {
  id: number;
  path: string;
}

const avatars = [
  {
    id: 1,
    path: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671159.jpg?w=740&t=st=1715987693~exp=1715988293~hmac=22584ce72f4e711aa637e3cc98c23790e17a18fe91980a9ea1cb94218a27799e",
  },
  {
    id: 2,
    path: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?w=740&t=st=1715987647~exp=1715988247~hmac=144ca1de89f7f26ae64fbf3e6715552465a3062e3913140457fe9c0e60c70532",
  },
  {
    id: 3,
    path: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671116.jpg?w=740&t=st=1715987683~exp=1715988283~hmac=d5872b4a5dfcb50637fe14490ff1741d1e934c6b747c611c259a9bead13a8f7b",
  },
  {
    id: 4,
    path: "https://img.freepik.com/free-psd/3d-rendering-avatar_23-2150833562.jpg?w=740&t=st=1715987685~exp=1715988285~hmac=8b66248c07b7be5a06b1c2a05212437d126b5b767b87e6f26f6250391e458ada",
  },
  {
    id: 5,
    path: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671136.jpg?w=740&t=st=1715988180~exp=1715988780~hmac=5cc15132c97e1a9f138186b834d9cf8c6d0639d41461a8a6b38aaeb4ad47e361",
  },
  {
    id: 6,
    path: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg?w=740&t=st=1715987710~exp=1715988310~hmac=84e7840a954d53743b6819104f8f0add2be304a45ab3da032d7c8c34874f19c3",
  },
  {
    id: 7,
    path: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671155.jpg?w=740&t=st=1715987712~exp=1715988312~hmac=113b8a75f75e92f3b8e654960ee513d2245661d68a3fad6adf98ee2d3bc5a88c",
  },
  {
    id: 8,
    path: "https://img.freepik.com/free-psd/3d-rendering-avatar_23-2150833546.jpg?w=740&t=st=1715987717~exp=1715988317~hmac=b6b1568f614ea9fd3e8105d37253df631a528826551d6d5681b01155ffd1528d",
  },
  {
    id: 9,
    path: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671126.jpg?w=740&t=st=1715987734~exp=1715988334~hmac=c570d1abc2869d343408940dde366164a204bcd0f858aca1cf29203251caaeb6",
  },
  {
    id: 10,
    path: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671124.jpg?w=740&t=st=1715987736~exp=1715988336~hmac=c6833cf5f280ca4e4844cf5ace846db39a0ff369af9da28511601ce926a6e760",
  },
  {
    id: 11,
    path: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671153.jpg?w=740&t=st=1715987934~exp=1715988534~hmac=17b317728180dc7fc843577826e6ea3cf7852d787563a1dd0c1cb765f308608f",
  },
  {
    id: 12,
    path: "https://img.freepik.com/free-psd/3d-rendering-avatar_23-2150833536.jpg?w=740&t=st=1715988300~exp=1715988900~hmac=50c70744a8cc6290487a7355feeab3b7ab604b89e39763d531bd47de0c4f4388",
  },
];

export default function Appearance() {
  const [selectedAvatar, setSelectedAvatar] = useState(
    "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671159.jpg?w=740&t=st=1715987693~exp=1715988293~hmac=22584ce72f4e711aa637e3cc98c23790e17a18fe91980a9ea1cb94218a27799e"
  );

  const actualAvatar =
    "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671159.jpg?w=740&t=st=1715987693~exp=1715988293~hmac=22584ce72f4e711aa637e3cc98c23790e17a18fe91980a9ea1cb94218a27799e";

  const handleSetAvatar = (avatar: Avatar) => {
    setSelectedAvatar(avatar.path);
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
              className={`m-4 w-[80px] h-[80px] cursor-pointer ${selectedAvatar === avatar.path ? "border-4 border-zinc-900" : ""}`}
            >
              <AvatarImage src={avatar.path} />
              <AvatarFallback>CN</AvatarFallback>
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
