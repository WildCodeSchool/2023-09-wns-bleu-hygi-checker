import { LOGOUT } from "@/requetes/queries/auth.queries";
import { useQuery } from "@apollo/client";
import { LogoutQuery, LogoutQueryVariables } from "@/types/graphql";

function Logout() {
  const { loading } = useQuery<LogoutQuery, LogoutQueryVariables>(LOGOUT);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {loading ? "Veuillez patienter..." : "Vous êtes déconnectés."}
    </main>
  );
}

export default Logout;
