import { AlertCircle } from "lucide-react";

const DashboardPage = () => {
  return (
    <div className="container mx-auto p-10">
      <div className="flex items-center gap-2 p-4 border rounded-lg bg-muted">
        <AlertCircle className="h-5 w-5 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          This page is currently under development.
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
