import { useRouter } from "next/router";
import { useState } from "react";
import { Search } from "lucide-react";
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
  const router = useRouter();
  const [url, setUrl] = useState("");

  const checkURL = async (url: string) => {
    try {
      const response = await fetch("http://localhost:4001/api/check-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la requête vers l'API:",
        error
      );
      throw error;
    }
  };
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // if (validateURL(url)) {
    try {
      checkURL(url);
      router.push(`/check/response?url=${encodeURIComponent(url)}`);
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la vérification de l'URL:",
        error
      );
    }
    // } else {
    //   alert("Invalid URL");
    // }
  };

  // const handleSubmit = (event: { preventDefault: () => void }) => {
  //   event.preventDefault();
  //   router.push(`/check/response?url=${encodeURIComponent(url)}`);
  // };
  return (
    <form className={`flex gap-2 ${className}`} onSubmit={handleSubmit}>
      <Input
        id="url"
        placeholder="enter URL"
        className="w-[300px] text-black"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <div>
        <Button variant={variant} type="submit">
          <Search className="mr-2 h-4 w-4" />
          {checkText}
        </Button>
      </div>
    </form>
  );
}
