import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex text-white gap-2 justify-center">
      <Loader2 className="animate-spin" />
    </div>
  );
}
