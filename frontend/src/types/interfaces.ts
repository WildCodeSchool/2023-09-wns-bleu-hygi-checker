export interface ConfirmationModalProps {
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
  id: number;
  name: string;
  image: string;
  intervalTest: number;
  isMailAlert: boolean;
  isWorking: boolean;
  userId: string;
  urls: {
    id: number;
    urlPath: string;
    type: string;
  };
}
