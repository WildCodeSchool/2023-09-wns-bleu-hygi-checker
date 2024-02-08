import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

export default function CreateAccount() {
  const router = useRouter();

  const [register, { error }] = useMutation<
    RegisterMutation,
    RegisterMutationVariables
  >(REGISTER, {
    onCompleted: (data) => {
      console.log(data);
      router.push("/auth/login");
    },
    onError(error) {
      console.log(error);
    },
  });
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
        <div className="grid grid-cols-2 gap-6">
          <Button variant="outline">
            <Icons.gitHub className="mr-2 h-4 w-4" />
            Github
          </Button>
          <Button variant="outline">
            <Icons.google className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Ou continuer avec
            </span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="name@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input id="password" type="password" />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-primary">Créer un compte</Button>
      </CardFooter>
    </Card>
  );
}
