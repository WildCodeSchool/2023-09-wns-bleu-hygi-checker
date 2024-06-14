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
import { useGetAvatarQuery } from "@/types/graphql";
import { useLogout } from "../auth/Logout";

interface DropdownMenuProps {
  isConnected: boolean;
}

export default function DropdownMenuNav({ isConnected }: DropdownMenuProps) {
  const router = useRouter();

  const { data } = useGetAvatarQuery();

  const handleLogout = useLogout();

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
            className="cursor-pointer"
            onClick={() => router.push("/dashboard/settings")}
          >
            Settings
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
