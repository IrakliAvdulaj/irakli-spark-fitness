
import { useState } from "react";
import { useUserData } from "@/hooks/use-user-data";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardLoading } from "./DashboardLoading";
import { DashboardContent } from "./DashboardContent";
import { UpdateProfileForm } from "./UpdateProfileForm";

export function UserDashboard() {
  const [isUpdating, setIsUpdating] = useState(false);
  const { fitnessData, userData, isLoading, updateUserData } = useUserData();
  
  if (isLoading || !fitnessData || !userData) {
    return <DashboardLoading />;
  }

  if (isUpdating) {
    return (
      <div className="container mx-auto py-6 px-4 space-y-8 max-w-7xl">
        <DashboardHeader 
          title="Update Your Profile"
        />
        
        <UpdateProfileForm 
          userData={userData} 
          onUpdateComplete={updateUserData} 
          onCancel={() => setIsUpdating(false)} 
        />
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-6 px-4 space-y-8 max-w-7xl">
      <DashboardHeader 
        title="Your Fitness Dashboard"
        onUpdateProfile={() => setIsUpdating(true)}
      />
      
      <DashboardContent 
        fitnessData={fitnessData}
        userData={userData}
      />
    </div>
  );
}
