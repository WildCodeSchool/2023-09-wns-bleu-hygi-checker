import { useEffect } from "react";
import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  getResponseColor,
  getStatusColor,
} from "@/utils/chartFunction/getColor";
import { toUpOne } from "@/utils/global/getFirstMaj";
import { formatDate } from "@/utils/chartFunction/formatDate";
import { FormatHoursAndMinutes } from "@/utils/chartFunction/FormatHoursAndMinutes";

export default function CardResponse() {
  const router = useRouter();
  const urlPath = router.query.url;

  const [checkURL, { data, loading, error }] = useLazyQuery(CHECK_URL);

  useEffect(() => {
    if (urlPath) {
      checkURL({ variables: { urlPath } });
    }
  }, [checkURL, urlPath]);

  const tableHeadValue = ["date", "time", "response status", "response time"];

  return (
    <Card className="flex flex-col justify-center shadow-md w-[350px] sm:w-[550px]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-center">
          URL Response Status
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Input
          id="check_response"
          className="mt-4 p-2 rounded-md border"
          value={urlPath}
          disabled
        />
        {loading && <p className="text-center font-semibold">Loading...</p>}
        {data && (
          <Table className="mt-4 text-center text-xs sm:text-base">
            <TableHeader>
              <TableRow>
                {tableHeadValue.map((value, index) => (
                  <TableHead key={index} className="font-bold text-center">
                    {toUpOne(value)}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow key={data.checkUrl.type} className="font-semibold">
                <TableCell>{formatDate(data.checkUrl.responseDate)}</TableCell>
                <TableCell>
                  {FormatHoursAndMinutes(data.checkUrl.responseDate)}
                </TableCell>
                <TableCell
                  className={getStatusColor(data.checkUrl.status, false)}
                >
                  {data.checkUrl.status}
                </TableCell>
                <TableCell
                  className={getResponseColor(data.checkUrl.responseTime)}
                >
                  {data.checkUrl.responseTime}ms
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
        {error && (
          <p className="text-center text-red-600 font-bold">
            Erreur lors de la vérification: {error.message}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
