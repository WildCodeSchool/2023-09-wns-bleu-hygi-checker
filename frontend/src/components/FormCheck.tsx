import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/router";
import { useState } from "react";

export default function FormCheck() {
  const router = useRouter();
  const [url, setUrl] = useState("");

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    router.push(`/check/response?url=${encodeURIComponent(url)}`);
  };
  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <Input
        id="url"
        placeholder="enter URL"
        className="w-[300px] text-black"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <div>
        <Button variant={"white"} type="submit">
          Start checking URL
        </Button>
      </div>
    </form>
  );
}
