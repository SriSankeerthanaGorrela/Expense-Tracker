import { AlertCircleIcon } from "lucide-react";

export default function ErrorState({ message }: { message: string }) {
  return (
    <div className="text-center py-6 text-red-500 text-sm">
    <AlertCircleIcon/> {message}
    </div>
  );
}
