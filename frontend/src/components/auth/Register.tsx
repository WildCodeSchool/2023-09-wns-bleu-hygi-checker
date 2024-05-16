import { useState } from "react";
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
import { RegisterMutation, RegisterMutationVariables } from "@/types/graphql";
import { useToast } from "../ui/use-toast";

export default function Register() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  const validatePassword = (password: string) => {
    const re = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{10,}$/;
    return re.test(password);
  };

  const [register] = useMutation<RegisterMutation, RegisterMutationVariables>(
    REGISTER,
    {
      onCompleted: () => {
        toast({
          title: "Account created successfully !",
          variant: "success",
        });
        router.push("/auth/login");
      },
      onError(error) {
        if (error.message == "An error has occurred, please try again.") {
          router.push("/auth/login");
          setTimeout(() => {
            toast({
              title: error.message,
            });
          }, 500);
        }
        console.error(error);
      },
    }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    if (!validatePassword(password)) {
      setPasswordError(
        "Password must contain at least 10 characters, including one uppercase letter, one digit, and one special character."
      );
      return;
    }
    setPasswordError("");
    register({ variables: { infos: { email, password } } });
  };

  return (
    <Card className="flex flex-col shadow-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>Enter your email to create an account</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <form onSubmit={handleSubmit} className="grid gap-2">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="text-red-500">{emailError}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <p className="text-red-500">{passwordError}</p>}
          </div>
          <Button type="submit" className="w-full bg-primary">
            Sign up
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
