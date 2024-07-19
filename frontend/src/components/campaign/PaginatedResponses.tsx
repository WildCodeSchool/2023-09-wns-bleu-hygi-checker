import { useState, useEffect } from "react";
import {
  useResponsesByCampaignUrlIdByPageLazyQuery,
  useCountResponsesByCampaignUrlIdLazyQuery,
} from "@/types/graphql";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { formatDate } from "@/utils/chartFunction/formatDate";
import { FormatHoursAndMinutes } from "@/utils/chartFunction/FormatHoursAndMinutes";
import {
  getStatusColor,
  getResponseColor,
} from "@/utils/chartFunction/getColor";

interface PaginatedResponsesProps {
  campaignUrlId: number;
}

function PaginatedResponses({ campaignUrlId }: PaginatedResponsesProps) {
  const [page, setPage] = useState<number>(1);
  const resultsPerPage = 5;
  const [maxPage, setMaxPage] = useState<number>(1);

  const [getPaginatedReponses, { data }] =
    useResponsesByCampaignUrlIdByPageLazyQuery();

  const [countResponses, { data: count }] =
    useCountResponsesByCampaignUrlIdLazyQuery();

  const total = count?.countResponsesByCampaignUrlId.count;
  const paginatedResponsesList = data?.responsesByCampaignUrlIdByPage;

  useEffect(() => {
    if (
      campaignUrlId !== null &&
      campaignUrlId !== undefined &&
      campaignUrlId !== 0
    ) {
      getPaginatedReponses({
        variables: {
          pageSize: resultsPerPage,
          page: page,
          campaignUrlId: campaignUrlId,
        },
      });
      countResponses({
        variables: {
          campaignUrlId: campaignUrlId,
        },
      });
    }
    if (total !== undefined) {
      setMaxPage(Math.ceil(total / resultsPerPage));
    }
  }, [campaignUrlId, countResponses, getPaginatedReponses, page, total]);

  useEffect(() => {
    setPage(1);
  }, [campaignUrlId]);

  return (
    <>
      <div className="w-full min-h-[430px] h-fit p-4 bg-slate-200 my-4 rounded-md overflow-y-auto flex flex-col justify-between">
        <Table>
          <TableHeader>
            <TableRow className="border-b-2 border-gray-500">
              <TableHead className="text-black text-center">Date</TableHead>
              <TableHead className="text-black text-center">Time</TableHead>
              <TableHead className="text-black text-center">
                Response Status
              </TableHead>
              <TableHead className="text-black text-center">
                Response Time (ms)
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedResponsesList !== undefined &&
              paginatedResponsesList !== null &&
              paginatedResponsesList.length > 0 &&
              paginatedResponsesList.map((response) => (
                <TableRow
                  key={response.id}
                  className="border-b-2 border-gray-300"
                >
                  <TableCell className="text-center">
                    {formatDate(response.createdAt)}
                  </TableCell>
                  <TableCell className="text-center">
                    {FormatHoursAndMinutes(response.createdAt)}
                  </TableCell>
                  <TableCell
                    className={`${getStatusColor(response.statusCode, false)} font-bold text-center`}
                  >
                    {response.statusCode}
                  </TableCell>
                  <TableCell
                    className={`${getResponseColor(response.responseTime)} font-bold text-center`}
                  >
                    {response.responseTime}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div className="mt-8 place-content-end">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage(page - 1)}
                  aria-disabled={page <= 1}
                  tabIndex={page <= 1 ? -1 : undefined}
                  className={`${
                    page <= 1 ? "pointer-events-none opacity-50" : undefined
                  } cursor-pointer`}
                />
              </PaginationItem>
              <div className="w-[220px] flex justify-center">
                {maxPage && page ? (
                  <>
                    {maxPage && page !== 1 && (
                      <PaginationItem>
                        <PaginationLink
                          onClick={() => setPage(1)}
                          className="cursor-pointer prevent-select"
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                    )}
                    {maxPage && page > 1 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                    {maxPage && (
                      <PaginationItem>
                        <PaginationLink className="prevent-select" isActive>
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )}
                    {maxPage && page < maxPage && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                    {maxPage && page !== maxPage && (
                      <PaginationItem>
                        <PaginationLink
                          onClick={() => setPage(maxPage)}
                          className="cursor-pointer prevent-select"
                        >
                          {maxPage}
                        </PaginationLink>
                      </PaginationItem>
                    )}
                  </>
                ) : null}
              </div>
              <PaginationItem>
                {maxPage && maxPage !== undefined ? (
                  <PaginationNext
                    onClick={() => setPage(page + 1)}
                    aria-disabled={page === maxPage}
                    tabIndex={page === maxPage ? -1 : undefined}
                    className={`${
                      page === maxPage
                        ? "pointer-events-none opacity-50"
                        : undefined
                    } cursor-pointer`}
                  />
                ) : (
                  <PaginationNext
                    aria-disabled={true}
                    tabIndex={-1}
                    className="pointer-events-none opacity-50"
                  />
                )}
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </>
  );
}

export default PaginatedResponses;
