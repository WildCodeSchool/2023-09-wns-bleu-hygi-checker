import { Search } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";
import { useLazyQuery } from "@apollo/client";
import { CHECK_URL } from "@/requests/queries/check-url.queries";
import { AddUrlToCampaign } from "./check/AddUrlToCampaign";
import { Plus } from "lucide-react";
import { urlPattern } from "@/utils/global/getDomainFromUrl";

interface FormCheckProps {
  inputId: string;
  checkText: string;
  className: string;
  variant: "outline" | "white";
  source: "navbar" | "homepage";
}

export default function FormCheck({
  inputId,
  checkText,
  className,
  variant,
  source,
}: FormCheckProps) {
  const router = useRouter();
  const [urlPath, setUrlPath] = useState("");
  const [showAddUrlModal, setShowAddUrlModal] = useState(false);

  const handleOpenForm = (dismiss: () => void) => {
    dismiss();
    setShowAddUrlModal(true);
  };

  const [checkURL] = useLazyQuery(CHECK_URL, {
    onCompleted: (data) => {
      if (source === "navbar") {
        const { status, responseTime, responseDate } = data.checkUrl;
        const { dismiss } = toast({
          title: `✅ URL verified :`,
          description: (
            <pre className="flex-col gap-4 mt-5">
              <div>URL: {urlPath}</div>
              <div>Status: {status}</div>
              <div>Time: {responseTime}ms</div>
              <div>Date: {new Date(responseDate).toLocaleString()}</div>
              <Button
                className="mt-5"
                variant="outline"
                onClick={() => handleOpenForm(dismiss)}
              >
                <Plus className="md:mr-2 h-4 w-4" />
                <span className="hidden md:block">Add URL to campaign</span>
              </Button>
            </pre>
          ),
          variant: "default",
        });
      }
    },
    onError: (error) => {
      if (source === "navbar") {
        toast({
          title: `❌ Erreur lors de la vérification: ${error.message}`,
          variant: "destructive",
        });
      }
    },
  });

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const isValidUrlFormat = urlPattern.test(urlPath);

    if (isValidUrlFormat === false) {
      toast({
        title: "URL doesn't match the required format",
        variant: "destructive",
      });
      return;
    }
    try {
      if (source === "homepage") {
        router.push(`/check/response?url=${encodeURIComponent(urlPath)}`);
      }
      if (source === "navbar") {
        checkURL({ variables: { urlPath } });
      }
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la vérification de l'URL:",
        error
      );
    }
  };

  // Check if button must be disabled
  const isSubmitDisabled = urlPath.trim() === "";

  return (
    <div className="w-[300px] flex flex-col gap-2">
      <form className={`flex gap-2 ${className}`} onSubmit={handleSubmit}>
        <Input
          id={inputId}
          placeholder="enter URL"
          className="text-black"
          value={urlPath}
          onChange={(e) => setUrlPath(e.target.value)}
        />
        <div>
          <Button variant={variant} type="submit" disabled={isSubmitDisabled}>
            <Search className="mr-2 h-4 w-4" />
            {checkText}
          </Button>
        </div>
      </form>
      {showAddUrlModal === true && (
        <AddUrlToCampaign
          showAddUrlModal={showAddUrlModal}
          setShowAddUrlModal={setShowAddUrlModal}
          urlToAdd={urlPath}
          setUrlPath={setUrlPath}
        />
      )}
    </div>
  );
}
