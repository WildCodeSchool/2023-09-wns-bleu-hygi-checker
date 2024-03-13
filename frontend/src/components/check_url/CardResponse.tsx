import Layout from "@/components/Layout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CardResponse() {
  const invoices = [
    {
      type: "Url",
      status: "200",
      time: "1.2ms",
      result: "Ok",
    },
    // {
    //   type: "Url",
    //   status: "400",
    //   time: "1.5ms",
    //   result: "Bad Request",
    // },
    // {
    //   type: "Url",
    //   status: "500",
    //   time: "2.2ms",
    //   result: "Internal Server Error",
    // },
  ];
  return (
    <Card className="flex flex-col justify-center">
      <CardContent className="grid gap-4">
        <Input className="mt-4" />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Time</TableHead>
              <TableHead className="text-right">Result</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="font-medium">{invoice.type}</TableCell>
                <TableCell>{invoice.status}</TableCell>
                <TableCell>{invoice.time}</TableCell>
                <TableCell className="text-right">{invoice.result}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
