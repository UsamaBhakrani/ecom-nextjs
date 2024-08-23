import { CheckCircle2 } from "lucide-react";

const FormSuccess = ({ message }: { message?: string }) => {
  if (!message) return null;
  return (
    <div className="bg-teal-400/25 gap-2 my-4 text-secondary-foreground p-3 rounded-md flex justify-start items-center font-medium text-xs">
      <CheckCircle2 className="w-4 h-4" />
      <p>{message}</p>
    </div>
  );
};

export default FormSuccess;
