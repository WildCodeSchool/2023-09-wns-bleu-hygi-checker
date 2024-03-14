import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/router";

export default function FormCheck() {
  const router = useRouter();
  return (
    <form className="flex flex-col gap-2">
      <Input id="url" placeholder="enter URL" className="w-[300px]" />
      <div>
        {/* push vers la page response */}
        <Button variant={"white"} onClick={() => router.push("/")}>
          Check
        </Button>
      </div>
    </form>
  );
}
