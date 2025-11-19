import { Plus } from "lucide-react";
import Link from "next/link";

export default function Fallback({ message,buttonText,href }: { message: string,buttonText?:string,href?:string }) {
  return (
    <div className="w-full h-48 flex flex-col items-center justify-center text-gray-500 gap-3">
      {message}
      <Link href={href} className="bg-blue-600 text-white px-3 py-2 flex items-center gap-1 text-center rounded-lg text-xs hover:bg-blue-700 transition">
      
      <Plus size={16}/>{buttonText}
      </Link>
    </div>
  );
}
