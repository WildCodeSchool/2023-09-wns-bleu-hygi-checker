import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/router";
import { useState } from "react";

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

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    router.push(`/check/response?url=${encodeURIComponent(url)}`);
  };
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
          {checkText}
        </Button>
      </div>
    </form>
  );
}
