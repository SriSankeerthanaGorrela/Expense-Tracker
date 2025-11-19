export default function Loader({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-gray-600">
      <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="mt-3 text-sm">{message}</p>
    </div>
  );
}
