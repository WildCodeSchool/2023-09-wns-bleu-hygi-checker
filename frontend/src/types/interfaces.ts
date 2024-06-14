import { Campaign, UserProfile } from "./graphql";
import { Dispatch, SetStateAction } from "react";

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
export interface CampaignFormProps {
  isNewCampaign: boolean;
  buttonText: string;
  buttonVariant:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "white"
    | "ghost"
    | "edit"
    | null
    | undefined;
  title: string;
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
