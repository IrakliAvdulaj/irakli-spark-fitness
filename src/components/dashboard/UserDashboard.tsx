
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculateFitnessData, FitnessData } from "@/utils/fitnessCalculator";
import { NutritionSummary } from "./NutritionSummary";
import { MealPlanView } from "./MealPlanView";
import { MotivationalPosts } from "./MotivationalPosts";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export function UserDashboard() {
  const [fitnessData, setFitnessData] = useState<FitnessData | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    async function fetchUserData() {
      try {
        // Check if user is authenticated
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          toast({
            title: "Not authorized",
            description: "Please login to access the dashboard",
            variant: "destructive",
          });
          navigate("/login");
          return;
        }
        
        // Fetch user profile from Supabase
        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        if (profileError) {
          // If no profile found, check if they completed onboarding in localStorage
          const hasCompletedOnboarding = localStorage.getItem(`onboarding-${user.email}`);
          
          if (!hasCompletedOnboarding) {
            navigate("/onboarding");
            return;
          }
          
          // If they have completed onboarding but no Supabase profile, use localStorage data
          const localUserDataString = localStorage.getItem(`userData-${user.email}`);
          if (localUserDataString) {
            const localUserData = JSON.parse(localUserDataString);
            setUserData(localUserData);
            
            // Calculate fitness data from localStorage data
            const calculatedData = calculateFitnessData(localUserData);
            setFitnessData(calculatedData);
            
            // Save to Supabase for future use
            try {
              await supabase.from('user_profiles').insert({
                user_id: user.id,
                height: parseFloat(localUserData.height),
                weight: parseFloat(localUserData.weight),
                age: parseInt(localUserData.age),
                sex: localUserData.sex,
                activity_level: localUserData.activityLevel,
                goal: localUserData.goal,
                goal_amount: localUserData.goalAmount ? parseFloat(localUserData.goalAmount) : 0
              });
            } catch (error) {
              console.error("Error saving profile to Supabase:", error);
            }
          } else {
            navigate("/onboarding");
            return;
          }
        } else {
          // Found profile in Supabase, use that data
          const formattedUserData = {
            height: profileData.height.toString(),
            weight: profileData.weight.toString(),
            age: profileData.age.toString(),
            sex: profileData.sex,
            activityLevel: profileData.activity_level,
            goal: profileData.goal,
            goalAmount: profileData.goal_amount.toString()
          };
          
          setUserData(formattedUserData);
          
          // Calculate fitness data
          const calculatedData = calculateFitnessData(formattedUserData);
          setFitnessData(calculatedData);
          
          // Also save meal plan in Supabase for future reference
          try {
            // Fix: The issue is here - we need to pass an object, not an array
            await supabase.from('meal_plans').upsert({
              user_id: user.id,
              calories: calculatedData.calories,
              protein: calculatedData.protein,
              carbs: calculatedData.carbs,
              fat: calculatedData.fat,
              breakfast: calculatedData.mealPlan.breakfast,
              lunch: calculatedData.mealPlan.lunch,
              dinner: calculatedData.mealPlan.dinner,
              snacks: calculatedData.mealPlan.snacks
            }, {
              onConflict: 'user_id'
            });
          } catch (error) {
            console.error("Error saving meal plan to Supabase:", error);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast({
          title: "Error",
          description: "Failed to load your fitness data",
          variant: "destructive",
        });
      }
    }
    
    fetchUserData();
  }, [navigate, toast]);
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
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
