
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FitnessData } from "@/utils/fitnessCalculator";
import { NutritionSummary } from "./NutritionSummary";
import { MealPlanView } from "./MealPlanView";
import { MotivationalPosts } from "./MotivationalPosts";
import { MacronutrientChart } from "./MacronutrientChart";

interface DashboardContentProps {
  fitnessData: FitnessData;
  userData: any;
}

export function DashboardContent({ fitnessData, userData }: DashboardContentProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 glass-card">
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
        
        <MacronutrientChart
          protein={fitnessData.protein}
          carbs={fitnessData.carbs}
          fat={fitnessData.fat}
        />
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
    </>
  );
}
