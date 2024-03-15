import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { REGISTER } from "@/requests/mutations/auth.mutations";
import {
  InputRegister,
  RegisterMutation,
  RegisterMutationVariables,
} from "@/types/graphql";

export default function Register() {
  const router = useRouter();

  const [register] = useMutation<RegisterMutation, RegisterMutationVariables>(
    REGISTER,
    {
      onCompleted: () => {
        router.push("/auth/login");
      },
      onError(error) {
        console.error(error);
      },
    }
  );
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as InputRegister;
    if (data.email && data.password) {
      register({
        variables: { infos: { email: data.email, password: data.password } },
      });
    }
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Créer un compte</CardTitle>
        <CardDescription>
          Entrer votre email pour créer un compte
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <form onSubmit={handleSubmit} className="grid gap-2">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="text-"
              type="email"
              name="email"
              placeholder="name@example.com"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input id="password" type="password" name="password" />
          </div>
          <Button type="submit" className="w-full bg-primary">
            Créer un compte
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
