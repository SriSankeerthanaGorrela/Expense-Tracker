import { Plus } from "lucide-react";
import Link from "next/link";

type FallbackProps = {
  message: string;
  buttonText?: string;
  href?: string;
};

export default function Fallback({ message, buttonText, href }: FallbackProps) {
  return (
    <div className="w-full h-48 flex flex-col items-center justify-center text-gray-500 gap-3">
      <p>{message}</p>

      {href && buttonText && (
        <Link
          href={href}
          className="bg-blue-600 text-white px-3 py-2 flex items-center gap-1 text-center rounded-lg text-xs hover:bg-blue-700 transition"
        >
          <Plus size={16} />
          {buttonText}
        </Link>
      )}
    </div>
  );
}
