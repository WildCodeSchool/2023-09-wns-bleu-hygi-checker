import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/router";

import { useLogoutLazyQuery, useGetAvatarQuery } from "@/types/graphql";

import { useToast } from "../ui/use-toast";

interface DropdownMenuProps {
  isConnected: boolean;
}

export default function DropdownMenuNav({ isConnected }: DropdownMenuProps) {
  const router = useRouter();

  const { toast } = useToast();

  const [logout] = useLogoutLazyQuery();
  const { data } = useGetAvatarQuery();

  const handleLogout = () => {
    logout({
      onCompleted: (data) => {
        if (data.logout.success) {
          if (router.pathname == "/") {
            router.reload();
          } else {
            router.push("/");
            setTimeout(() => {
              router.reload();
            }, 200);
          }

          setTimeout(() => {
            toast({
              title: data.logout.message,
            });
          }, 500);
        }
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src={
              isConnected
                ? `../../../avatars/${data?.getAvatar.avatar}.jpg`
                : "https://i.stack.imgur.com/vaDPM.png?s=256&g=1"
            }
          />
          <AvatarFallback>HC</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      {isConnected ? (
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push("/dashboard/campaign/lists")}
          >
            Campaigns
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer text-destructive focus:text-destructive"
            onClick={handleLogout}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent align="end">
          <DropdownMenuLabel
            className="cursor-pointer"
            onClick={() => router.push("/auth/login")}
          >
            Login
          </DropdownMenuLabel>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
