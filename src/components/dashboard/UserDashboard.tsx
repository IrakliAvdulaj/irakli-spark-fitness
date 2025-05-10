
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculateFitnessData, FitnessData } from "@/utils/fitnessCalculator";
import { NutritionSummary } from "./NutritionSummary";
import { MealPlanView } from "./MealPlanView";
import { MotivationalPosts } from "./MotivationalPosts";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export function UserDashboard() {
  const [fitnessData, setFitnessData] = useState<FitnessData | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.email) {
      toast({
        title: "Not authorized",
        description: "Please login to access the dashboard",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem(`onboarding-${user.email}`);
    if (!hasCompletedOnboarding) {
      navigate("/onboarding");
      return;
    }
    
    // Get user data and calculate fitness metrics
    const userDataString = localStorage.getItem(`userData-${user.email}`);
    if (userDataString) {
      const parsedUserData = JSON.parse(userDataString);
      setUserData(parsedUserData);
      
      // Calculate fitness data
      const calculatedData = calculateFitnessData(parsedUserData);
      setFitnessData(calculatedData);
    }
  }, [navigate, toast]);
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You've been logged out successfully.",
    });
    navigate("/login");
  };
  
  if (!fitnessData || !userData) {
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
  
  return (
    <div className="container mx-auto py-6 px-4 space-y-8 max-w-7xl">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gradient">
          Your Fitness Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-secondary/60 hover:bg-secondary rounded-md text-sm"
        >
          Logout
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-3 glass-card">
          <CardHeader>
            <CardTitle className="text-xl">Your Daily Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <NutritionSummary
              calories={fitnessData.calories}
              protein={fitnessData.protein}
              carbs={fitnessData.carbs}
              fat={fitnessData.fat}
              goal={userData.goal}
            />
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="meal-plan" className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
          <TabsTrigger value="meal-plan">Meal Plan</TabsTrigger>
          <TabsTrigger value="motivation">Motivation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="meal-plan">
          <MealPlanView mealPlan={fitnessData.mealPlan} />
        </TabsContent>
        
        <TabsContent value="motivation">
          <MotivationalPosts />
        </TabsContent>
      </Tabs>
    </div>
  );
}
