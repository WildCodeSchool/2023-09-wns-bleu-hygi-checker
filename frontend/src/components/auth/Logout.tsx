import { useGetUserProfileQuery, useLogoutLazyQuery } from "@/types/graphql";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/router";

export function useLogout() {
  const [logout] = useLogoutLazyQuery();
  const { toast } = useToast();
  const router = useRouter();

  const { data: currentUser } = useGetUserProfileQuery({
    errorPolicy: "ignore",
  });

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
              title: `Bye ${currentUser?.getUserProfile.username} !`,
            });
          }, 500);
        }
      },
    });
  };

  return handleLogout;
}
