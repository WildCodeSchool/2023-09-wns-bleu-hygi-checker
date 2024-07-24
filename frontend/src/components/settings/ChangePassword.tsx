"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useChangePasswordMutation } from "@/types/graphql";

// ************ IMPORT UI COMPONENTS  *****************
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Loader2, KeyRound } from "lucide-react";
// ****************************************************

const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{10,}$/;

// Define the form schema for validation
const formSchema = z
  .object({
    previousPassword: z.string().min(10, {
      message: "Your current password should noy be under 10 characters long",
    }),
    newPassword: z.string().regex(passwordRegex, {
      message:
        "Password must contain at least 10 characters, including one uppercase letter, one digit, and one special character.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  });

export function ChangePassword() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false); // to show the loader in the button
  const [openForm, setOpenForm] = useState(false); // to close the form after submit
  const [changePasswordMutation] = useChangePasswordMutation({
    onCompleted: (data) => {
      setTimeout(() => {
        setLoading(false);
        if (data.changePassword.success === false) {
          toast({
            title: data.changePassword.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: data.changePassword.message,
            variant: "success",
          });
          handleCloseForm();
        }
      }, 1000);
    },
    onError: () => {
      toast({
        title: `Something went wrong. Please try again`,
        variant: "destructive",
      });
    },
  });
  // Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      previousPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // to reset form inputs when closing the dialog
  const handleCloseForm = () => {
    setOpenForm(!openForm);
    form.reset();
  };

  // Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setTimeout(() => {
      changePasswordMutation({
        variables: {
          passwordData: values,
        },
      });
    }, 1500);

    console.warn(values); // To remove !!!! ----------------------------------------------------------------
  }

  return (
    <Dialog open={openForm} onOpenChange={handleCloseForm}>
      <DialogTrigger asChild>
        <Button className="w-1/2 mb-4">
          <KeyRound className="mr-2 h-4 w-4" />
          Change password
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change your password</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="previousPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current password</FormLabel>
                  <FormControl>
                    <Input id="previousPassword" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input id="newPassword" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm new password</FormLabel>
                  <FormControl>
                    <Input id="confirmPassword" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={loading === true}>
              {loading === true && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {loading === true ? "Please wait" : "Change password"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
