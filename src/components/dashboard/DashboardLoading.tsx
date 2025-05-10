
import { Card, CardContent } from "@/components/ui/card";

export function DashboardLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md glass-card">
        <CardContent className="pt-6">
          <p className="text-center">Loading your fitness data...</p>
        </CardContent>
      </Card>
    </div>
  );
}
