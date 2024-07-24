import { Campaign, UserProfile } from "./graphql";
import { Dispatch, SetStateAction } from "react";
import { DataItem } from "@/utils/chartFunction/countStatusCodes";

export interface ConfirmationModalProps {
  isLargeButton: boolean;
  forDelete: boolean;
  buttonText: string;
  buttonVariant:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "white"
    | "ghost"
    | null
    | undefined;
  title: string;
  message: string;
  noText: string;
  yesText: string;
  action: () => void;
}
export interface CGUModalProps {
  buttonText: string;
  buttonVariant:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "white"
    | "ghost"
    | null
    | undefined;
  title: string;
  noText: string;
  yesText: string;
  onConfirm: (isConfirmed: boolean) => void;
}
export interface EditCampaignFormProps {
  campaignId: string;
}

export interface ChangeImageCampaignFormProps {
  campaignId: number;
  imageSrc: string;
}

export interface CampaignCardProps {
  data: Campaign;
}

export interface SettingsProps {
  data: UserProfile;
}

export interface AddUrlToCampaignToastProps {
  showAddUrlModal: boolean;
  setShowAddUrlModal: Dispatch<SetStateAction<boolean>>;
  urlToAdd: string | undefined;
  setUrlPath: Dispatch<SetStateAction<string>> | null;
}

export interface AddUrlToCampaignProps {
  campaignId: string;
}

export interface ChartSectionProps {
  PieChartData: DataItem[] | undefined | null;
}

export interface InputData {
  __typename?: "Response" | undefined;
  id: number | null | undefined;
  responseTime?: number | null | undefined;
  statusCode?: number | null | undefined;
  createdAt?: Date | null | undefined;
  campaignUrl: {
    __typename?: "CampaignUrl" | undefined;
    id: number;
  };
}

export interface ActivatePremiumModalProps {
  premiumCode: string;
  openForm: boolean;
  setOpenForm: Dispatch<SetStateAction<boolean>>;
}
