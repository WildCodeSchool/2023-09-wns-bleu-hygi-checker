import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { LOGIN } from "@/requests/queries/auth.queries";
import { InputLogin, LoginQuery, LoginQueryVariables } from "@/types/graphql";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";

export default function SignUp() {
  const router = useRouter();

  const [login] = useLazyQuery<LoginQuery, LoginQueryVariables>(LOGIN);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as InputLogin;
    console.log(data);
    if (data.email && data.password) {
      login({
        variables: { infos: { email: data.email, password: data.password } },
        onCompleted(data) {
          if (data.login.success) {
            router.push("/");
          }
        },
      });
    }
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="space-x-1">
        <CardTitle className="text-2xl">Se connecter</CardTitle>
        <CardDescription>
          Entrer votre email pour vous connecter
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <form onSubmit={handleSubmit} className="grid gap-2">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              name="email"
              data-testid="login-email"
            />
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              name="password"
              data-testid="login-password"
            />
          </div>
          <Button>Connexion</Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
