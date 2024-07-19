import { useEffect } from "react";
import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/client";
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
import { CHECK_URL } from "@/requests/queries/check-url.queries";

export default function CardResponse() {
  const router = useRouter();
  const urlPath = router.query.url;

  const [checkURL, { data, loading, error }] = useLazyQuery(CHECK_URL);

  useEffect(() => {
    if (urlPath) {
      checkURL({ variables: { urlPath } });
    }
  }, [checkURL, urlPath]);
  // Fonction pour formater la date au bon format
  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  return (
    <Card className="flex flex-col justify-center">
      <CardContent className="grid gap-4">
        <Input id="check_response" className="mt-4" value={urlPath} disabled />
        {loading && <p>Loading...</p>}
        {data && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Response Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow key={data.checkUrl.type}>
                <TableCell className="font-medium">Url</TableCell>
                <TableCell>{data.checkUrl.status}</TableCell>
                <TableCell>{data.checkUrl.responseTime}ms</TableCell>
                <TableCell className="text-right">
                  {formatDate(data.checkUrl.responseDate)}{" "}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
        {error && <p>Erreur lors de la vérification: {error.message}</p>}
      </CardContent>
    </Card>
  );
}
