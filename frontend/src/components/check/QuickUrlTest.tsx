import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { useLazyQuery } from "@apollo/client";
import { CHECK_URL } from "@/requests/queries/check-url.queries";
import { Zap } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface QuickTestProps {
  urlPath: string;
  onDropdown: boolean;
}

export default function QuickUrlTest({ urlPath, onDropdown }: QuickTestProps) {
  const [checkURL] = useLazyQuery(CHECK_URL, {
    onCompleted: (data) => {
      const { status, responseTime, responseDate } = data.checkUrl;
      toast({
        title: `✅ URL verified :`,
        description: (
          <pre className="flex-col gap-4 mt-5">
            <div>URL: {urlPath}</div>
            <div>Status: {status}</div>
            <div>Time: {responseTime}ms</div>
            <div>Date: {new Date(responseDate).toLocaleString()}</div>
          </pre>
        ),
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: `❌ Erreur lors de la vérification: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const handleQuickTest = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const urlPattern =
      /^(https?:\/\/)?(www\.)?[\w-]+\.[\w-]+(?:\.[\w-]+)*(\/[\w-]*)*$/;

    const isValidUrlFormat = urlPattern.test(urlPath);

    if (isValidUrlFormat === false) {
      toast({
        title: "URL doesn't match the required format",
        variant: "destructive",
      });
      return;
    }
    try {
      checkURL({ variables: { urlPath } });
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la vérification de l'URL:",
        error
      );
    }
  };

  if (onDropdown === true) {
    return (
      <DropdownMenuItem
        className="cursor-pointer text-violet-500"
        onClick={handleQuickTest}
      >
        <Zap className="mr-2 h-4 w-4" />
        Quick test
      </DropdownMenuItem>
    );
  }
  if (onDropdown === false) {
    return (
      <Button
        variant="default"
        className="bg-violet-500"
        onClick={handleQuickTest}
        type="button"
      >
        <Zap className="mr-2 h-4 w-4" />
        Quick test
      </Button>
    );
  }
}
