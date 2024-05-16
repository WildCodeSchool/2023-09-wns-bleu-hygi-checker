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
    | null
    | undefined;
  title: string;
}
