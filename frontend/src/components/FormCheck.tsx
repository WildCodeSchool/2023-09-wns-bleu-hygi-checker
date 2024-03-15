import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/router";

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

  return (
    <form className={`flex gap-2 ${className}`}>
      <Input id="url" placeholder="enter URL" className="w-[300px]" />
      <div>
        <Button
          variant={variant}
          onClick={() => {
            router.push("/check/response");
          }}
        >
          {checkText}
        </Button>
      </div>
    </form>
  );
}
