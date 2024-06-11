import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "../ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/router";
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { REGISTER } from "@/requests/mutations/auth.mutations";
import {
  LoginQuery,
  LoginQueryVariables,
  RegisterMutation,
  RegisterMutationVariables,
} from "@/types/graphql";
import { LOGIN } from "@/requests/queries/auth.queries";

export function Auth() {
  const router = useRouter();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Log in");

  const validateUsername = (username: string) => {
    const re = /^[a-zA-Z0-9]{4,24}$/;
    return re.test(username);
  };
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  const validatePassword = (password: string) => {
    const re = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{10,}$/;
    return re.test(password);
  };
  const [login] = useLazyQuery<LoginQuery, LoginQueryVariables>(LOGIN);

  const [register] = useMutation<RegisterMutation, RegisterMutationVariables>(
    REGISTER,
    {
      onCompleted: () => {
        toast({
          title: "Account created successfully !",
          variant: "success",
        });
        setSelectedTab("Log in");
      },
      onError: (error) => {
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

  const handleSubmitLogin = (e: { preventDefault: () => void }) => {
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

    login({ variables: { infos: { email, password } } })
      .then((result) => {
        const data = result.data;
        if (data?.login.success) {
          router.push("/dashboard/campaign/lists");
          setTimeout(() => {
            toast({
              title: `Bienvenue ${username} !`,
              variant: "success",
            });
          }, 500);
        } else {
          toast({
            title: data?.login.message,
            variant: "destructive",
          });
        }
      })
      .catch((error) => {
        toast({
          title: error.message,
          variant: "destructive",
        });
      });
  };

  const handleSubmitRegister = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!validateUsername(username)) {
      setUsernameError(
        "Username must be between 3 and 25 characters and not contain any special characters"
      );
      return;
    }
    setUsernameError("");
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
    if (confirmPassword === "") {
      setConfirmPasswordError("Type your password again");
      return;
    }
    setConfirmPasswordError("");
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords does not match.");
      return;
    }
    setConfirmPasswordError("");
    if (acceptedTerms === false) {
      return;
    }
    register({
      variables: {
        infos: { email, password, username, accepted_terms: acceptedTerms },
      },
    });
  };

  return (
    <Tabs
      value={selectedTab}
      className="w-[400px]"
      onValueChange={(newValue: string) => setSelectedTab(newValue)}
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="Log in">Log in</TabsTrigger>
        <TabsTrigger value="Sign up">Sign up</TabsTrigger>
      </TabsList>
      <TabsContent value="Log in">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Log in</CardTitle>
            <CardDescription>Enter your email to log in.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <form onSubmit={handleSubmitLogin} className="grid gap-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-testid="login-email"
                />
                {emailError && <p className="text-red-500">{emailError}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  data-testid="login-password"
                />
                {passwordError && (
                  <p className="text-red-500">{passwordError}</p>
                )}
              </div>
              <p
                onClick={() => setSelectedTab("Sign up")}
                className="cursor-pointer text-sm"
              >
                You don&apos;t have an account yet, create one&nbsp;
                <span className="font-bold underline">here</span>
              </p>
              <Button type="submit" className="w-full bg-primary">
                Log in
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="Sign up">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Sign up</CardTitle>
            <CardDescription>
              Enter your email to create an account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <form onSubmit={handleSubmitRegister} className="grid gap-2">
              <div className="space-y-1">
                <Label htmlFor="email">Username</Label>
                <Input
                  id="username"
                  placeholder="John Smith"
                  type="text"
                  autoCapitalize="none"
                  autoCorrect="off"
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                  data-testid="login-email"
                />
                {usernameError && (
                  <p className="text-red-500">{usernameError}</p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-testid="login-email"
                />
                {emailError && <p className="text-red-500">{emailError}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  data-testid="login-password"
                />
                {passwordError && (
                  <p className="text-red-500">{passwordError}</p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="confirm_password">Confirm password</Label>
                <Input
                  id="confirm_password"
                  type="password"
                  name="confirm_password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  data-testid="login-password"
                />
                {confirmPasswordError && (
                  <p className="text-red-500">{confirmPasswordError}</p>
                )}
              </div>
              <div className="items-top flex space-x-2 my-4">
                <Checkbox
                  id="terms1"
                  checked={acceptedTerms}
                  onCheckedChange={() => setAcceptedTerms(!acceptedTerms)}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Accept terms and conditions
                  </label>
                  <p className="text-sm text-muted-foreground">
                    You agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </div>
              <Button
                type="submit"
                disabled={acceptedTerms === false}
                className="w-full bg-primary"
              >
                Sign up
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
