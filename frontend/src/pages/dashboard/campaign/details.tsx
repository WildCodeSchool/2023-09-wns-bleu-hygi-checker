import Layout from "@/components/dashboard/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useRouter } from "next/router";

export default function Response() {
  const router = useRouter();
  const responses = [
    {
      routes: "app/v1/users.com",
      status: "Alerte",
      actions: "",
    },
    {
      routes: "app/v1/campus.com",
      status: "Off",
      actions: "",
    },
    {
      routes: "app/v1/trainings.com",
      status: "Alerte",
      actions: "",
    },
  ];

  return (
    <Layout title="Read">
      <div className="w-full">
        <div className="flex justify-end gap-4 mt-5">
          <Button
            variant="outline"
            className="bg-blue-500 text-white"
            onClick={() => {
              router.push("/");
            }}
          >
            Edit campaign
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              router.push("/");
            }}
          >
            Delete this campaign
          </Button>
        </div>
        <div className="flex justify-center mt-5 gap-4">
          <Card className="flex justify-center p-10">
            <CardContent>Graphiques multiples</CardContent>
          </Card>
          <Card className="flex justify-center p-10">
            <CardContent>Graphiques multiples</CardContent>
          </Card>
          <Card className="flex justify-center p-10">
            <CardContent>Graphiques multiples</CardContent>
          </Card>
        </div>
        <div className="w-full flex justify-center gap-4 mt-5">
          <Table className="w-full text-white">
            <TableHeader className="bg-stone-500 text-white">
              <TableRow>
                <TableHead className="w-[100px] text-white">Routes</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-right text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {responses.map((response) => (
                <TableRow key={response.routes}>
                  <TableCell className="font-medium">
                    {response.routes}
                  </TableCell>
                  <TableCell>{response.status}</TableCell>
                  <TableCell className="text-right gap-4">
                    <div className="flex justify-end gap-4">
                      <Button
                        variant="outline"
                        className="bg-blue-500 text-white"
                        onClick={() => {
                          router.push("/auth/register");
                        }}
                      >
                        Change
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          router.push("/auth/register");
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
}
