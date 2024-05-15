import { CHECK_URL } from "@/requests/queries/check-url.queries";
import { useLazyQuery } from "@apollo/client";
//import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface FormCheckProps {
  checkText: string;
  className: string;
  variant: "outline" | "white";
}

export default function FormCheck({
  checkText,
  className,
  variant,
}: FormCheckProps) {
  // const router = useRouter();
  const [urlPath, setUrlPath] = useState("");

  const [checkURL, { data, loading, error }] = useLazyQuery(CHECK_URL);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await checkURL({ variables: { urlPath } });
      // router.push(`/check/response?url=${encodeURIComponent(url)}`);
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la vérification de l'URL:",
        error
      );
    }
  };

  return (
    <>
      <form className={`flex gap-2 ${className}`} onSubmit={handleSubmit}>
        <Input
          id="url"
          placeholder="enter URL"
          className="w-[300px] text-black"
          value={urlPath}
          onChange={(e) => setUrlPath(e.target.value)}
        />
        <div>
          <Button variant={variant} type="submit">
            {checkText}
          </Button>
        </div>
      </form>
      {loading && <p>Vérification en cours...</p>}
      {error && <p>Erreur lors de la vérification: {error.message}</p>}
      {data && <p>Résultat: {JSON.stringify(data)}</p>}
    </>
  );
}
