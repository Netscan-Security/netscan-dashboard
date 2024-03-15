import { CircleDashed } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <CircleDashed size={40} className="text-blue-600 animate-spin" />
    </div>
  );
};

export default PageLoader;
