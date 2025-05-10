
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { calculateFitnessData, FitnessData } from "@/utils/fitnessCalculator";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Json } from "@/integrations/supabase/types";

interface UserDataHookResult {
  fitnessData: FitnessData | null;
  userData: any | null;
  isLoading: boolean;
  error: Error | null;
  updateUserData: (updatedUserData: any) => void;
  saveMealPlanToSupabase: (userId: string, fitnessData: FitnessData) => Promise<void>;
}

export function useUserData(): UserDataHookResult {
  const [fitnessData, setFitnessData] = useState<FitnessData | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserData() {
      try {
        setIsLoading(true);
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
              
              // Also save meal plan
              await saveMealPlanToSupabase(user.id, calculatedData);
              
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
          
          // Save meal plan
          await saveMealPlanToSupabase(user.id, calculatedData);
        }
      } catch (err: any) {
        console.error("Error fetching user data:", err);
        setError(err);
        toast({
          title: "Error",
          description: "Failed to load your fitness data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchUserData();
  }, [navigate, toast]);
  
  const saveMealPlanToSupabase = async (userId: string, fitnessData: FitnessData) => {
    try {
      // Fix: Convert meal objects to JSON-compatible format
      await supabase.from('meal_plans').upsert({
        user_id: userId,
        calories: fitnessData.calories,
        protein: fitnessData.protein,
        carbs: fitnessData.carbs,
        fat: fitnessData.fat,
        breakfast: fitnessData.mealPlan.breakfast as unknown as Json,
        lunch: fitnessData.mealPlan.lunch as unknown as Json,
        dinner: fitnessData.mealPlan.dinner as unknown as Json,
        snacks: fitnessData.mealPlan.snacks as unknown as Json
      }, {
        onConflict: 'user_id'
      });
    } catch (error) {
      console.error("Error saving meal plan to Supabase:", error);
    }
  };
  
  const updateUserData = (updatedUserData: any) => {
    setUserData(updatedUserData);
    const updatedFitnessData = calculateFitnessData(updatedUserData);
    setFitnessData(updatedFitnessData);
  };
  
  return {
    fitnessData,
    userData,
    isLoading,
    error,
    updateUserData,
    saveMealPlanToSupabase
  };
}
