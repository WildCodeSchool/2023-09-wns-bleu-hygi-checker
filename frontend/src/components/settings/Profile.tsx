"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { useState, useEffect, useMemo } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandList,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { countries } from "@/utils/countries";
import { toast } from "@/components/ui/use-toast";
import { SettingsProps } from "@/types/interfaces";
import {
  useUpdateProfileMutation,
  useGetUserProfileQuery,
} from "@/types/graphql";

type GENDER = "male" | "female" | "other" | "unspecified";

const FormSchema = z.object({
  gender: z.enum(["male", "female", "other", "unspecified"], {
    required_error: "You need to select a notification type.",
  }),
  birth_date: z
    .string({
      required_error: "A date of birth is required.",
    })
    .min(10, {
      message: "Birth date must be 2 caracters length.", // TODO : Regex the URL Format
    })
    .max(10, {
      message: "Birth date must be 2 caracters length.", // TODO : Regex the URL Format
    }),
  country: z
    .string({
      required_error: "Please select yout country.",
    })
    .min(2, {
      message: "Country code must be 2 caracters length.", // TODO : Regex the URL Format
    })
    .max(2, {
      message: "Country code must be 2 caracters length.", // TODO : Regex the URL Format
    }),
});

export default function Profile({ data }: SettingsProps) {
  const [fakeLoading, setFakeLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const { refetch } = useGetUserProfileQuery();
  const [updateProfileMutation] = useUpdateProfileMutation({
    onCompleted: () => {
      toast({
        title: "Profile updated successfully",
        variant: "success",
      });
      setIsChanged(false);
      refetch();
    },
    onError: () => {
      toast({
        title: `Something went wrong. Please try again`,
        variant: "destructive",
      });
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      gender: (data?.gender as GENDER) ?? "",
      birth_date: (data?.birth_date as string) ?? "",
      country: (data?.country as string) ?? "",
    },
  });

  function onSubmit(formData: z.infer<typeof FormSchema>) {
    setFakeLoading(true);
    setTimeout(() => {
      setFakeLoading(false);
      updateProfileMutation({
        variables: {
          updateData: formData,
        },
      });
    }, 1000);
  }

  const date = new Date();
  const todayDate = date.toISOString().split("T")[0];

  const initialValues = useMemo(
    () => ({
      gender: data?.gender,
      birth_date: data?.birth_date,
      country: data?.country,
    }),
    [data]
  );

  useEffect(() => {
    const subscription = form.watch((value) => {
      setIsChanged(
        initialValues.gender !== value.gender ||
          initialValues.birth_date !== value.birth_date ||
          initialValues.country !== value.country
      );
    });
    return () => subscription.unsubscribe();
  }, [form, initialValues]);

  return (
    <Card className="xl:border-x xl:rounded-none w-[350px] sm:w-[385px] text-center">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Modify your profile information</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-center items-center space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Select your gender</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col justify-center items-center gap-6"
                    >
                      <FormItem className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="male" />
                        </FormControl>
                        <FormLabel className="font-normal">Male</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="female" />
                        </FormControl>
                        <FormLabel className="font-normal">Female</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="other" />
                        </FormControl>
                        <FormLabel className="font-normal">Other</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="unspecified" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Unspecified
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birth_date"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center justify-center">
                  <FormLabel>Date of birth</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      min="1900-01-01"
                      max={todayDate}
                      className="flex items-center justify-center"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center justify-center">
                  <FormLabel>Country</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="setting" role="combobox">
                          {field.value
                            ? countries.find(
                                (language) => language.code === field.value
                              )?.name
                            : "Select country"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-80" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput placeholder="Search country..." />
                        <CommandEmpty>No country found.</CommandEmpty>
                        <CommandGroup>
                          <CommandList>
                            {countries.map((language) => (
                              <CommandItem
                                value={language.name}
                                key={language.code}
                                onSelect={() => {
                                  form.setValue("country", language.code);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    language.code === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {language.name}
                              </CommandItem>
                            ))}
                          </CommandList>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* ******************************* */}
            {isChanged && (
              <div className="flex justify-center">
                <Button type="submit" className="mt-8">
                  {fakeLoading === true && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {fakeLoading === true ? "Please wait" : "Update Profile"}
                </Button>
              </div>
            )}
            {/* ***************************** */}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
