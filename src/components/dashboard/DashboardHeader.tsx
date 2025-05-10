
import { Button } from "@/components/ui/button";
import { HomeButton } from "@/components/navigation/HomeButton";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface DashboardHeaderProps {
  title: string;
  onUpdateProfile?: () => void;
}

export function DashboardHeader({ title, onUpdateProfile }: DashboardHeaderProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("user");
    localStorage.removeItem("isAdmin");
    toast({
      title: "Logged out",
      description: "You've been logged out successfully.",
    });
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold text-gradient">
        {title}
      </h1>
      <div className="flex items-center gap-2">
        <HomeButton />
        {onUpdateProfile && (
          <Button 
            variant="outline" 
            onClick={onUpdateProfile}
            className="px-4 py-2"
          >
            Update Profile
          </Button>
        )}
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-secondary/60 hover:bg-secondary rounded-md text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
