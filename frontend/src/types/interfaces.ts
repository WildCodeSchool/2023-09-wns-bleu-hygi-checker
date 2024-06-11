import { Campaign, UserProfile } from "./graphql";

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
