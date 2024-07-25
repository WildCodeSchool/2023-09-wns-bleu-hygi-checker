import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Dropdown from "@/components/dashboard/Dropdown";
import { Url } from "@/types/graphql";

export type Campaign = {
  __typename?: "Campaign";
  id: number;
  name?: string;
  userId?: number;
};
export type CampaignUrl = {
  __typename?: "CampaignUrl";
  campaign: Campaign;
  createdAt: Date;
  id: number;
  url: Url;
};

interface MobileLayoutProps {
  urls: CampaignUrl[];
  refetch: () => void;
}

function MobileLayout({ urls, refetch }: MobileLayoutProps) {
  return (
    <div className="w-full flex justify-center gap-4 mt-5 md:hidden">
      <Table className="w-full text-white">
        <TableHeader className="bg-stone-500 text-white w-full">
          <TableRow>
            <TableHead className="text-white">Url</TableHead>
            <TableHead className="text-right text-white">Actions</TableHead>
          </TableRow>
        </TableHeader>
        {/* ----------------  Table Body  ------------- */}
        <TableBody>
          {urls?.map((urlResponse) => (
            <TableRow key={urlResponse.url.urlPath}>
              <TableCell className="font-medium">
                {urlResponse.url.urlPath}
              </TableCell>

              <TableCell className="text-right gap-4">
                <Dropdown data={urlResponse} refetch={refetch} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default MobileLayout;
