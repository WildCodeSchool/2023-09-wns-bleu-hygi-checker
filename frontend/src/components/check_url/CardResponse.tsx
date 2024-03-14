import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export default function CardResponse() {
  const responses = [
    {
      type: "Url",
      status: "200",
      time: "1.2ms",
      result: "Ok",
    },
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
            {responses.map((response) => (
              <TableRow key={response.type}>
                <TableCell className="font-medium">{response.type}</TableCell>
                <TableCell>{response.status}</TableCell>
                <TableCell>{response.time}</TableCell>
                <TableCell className="text-right">{response.result}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
