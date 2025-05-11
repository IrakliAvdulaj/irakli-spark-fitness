
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { MealPlan, Meal } from "@/utils/fitnessCalculator";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

interface MealPlanViewProps {
  mealPlan: MealPlan;
}

export function MealPlanView({ mealPlan }: MealPlanViewProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Your Daily Meal Plan</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MealCard title="Breakfast" meal={mealPlan.breakfast} />
        <MealCard title="Lunch" meal={mealPlan.lunch} />
        <MealCard title="Dinner" meal={mealPlan.dinner} />
        
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">Snacks</CardTitle>
            <CardDescription>Enjoy between main meals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {mealPlan.snacks.map((snack, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{snack.name}</h4>
                  {snack.portions && (
                    <div className="flex items-center gap-1">
                      <span className="text-xs bg-secondary/60 rounded-full px-2 py-1">{snack.portions}x portion</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-muted-foreground cursor-pointer" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">A single portion equals approximately {snack.portions ? (100 / snack.portions).toFixed(0) : 100}g</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{snack.description}</p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <p className="font-medium">{snack.calories}</p>
                    <p className="text-muted-foreground">kcal</p>
                  </div>
                  <div>
                    <p className="font-medium">{snack.protein}g</p>
                    <p className="text-muted-foreground">Protein</p>
                  </div>
                  <div>
                    <p className="font-medium">{snack.carbs}g</p>
                    <p className="text-muted-foreground">Carbs</p>
                  </div>
                </div>
                {index < mealPlan.snacks.length - 1 && (
                  <div className="border-t border-border my-4"></div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface MealCardProps {
  title: string;
  meal: Meal;
}

function MealCard({ title, meal }: MealCardProps) {
  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{title}</CardTitle>
          {meal.portions && (
            <div className="flex items-center gap-1">
              <span className="text-xs bg-secondary/60 rounded-full px-2 py-1">{meal.portions}x portion</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground cursor-pointer" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">A single portion equals approximately {meal.portions ? (100 / meal.portions).toFixed(0) : 100}g</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
        </div>
        <CardDescription>{meal.name}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm">{meal.description}</p>
        
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="bg-secondary/40 rounded-md p-2">
            <p className="font-medium">{meal.calories}</p>
            <p className="text-xs text-muted-foreground">calories</p>
          </div>
          <div className="bg-secondary/40 rounded-md p-2">
            <p className="font-medium">{meal.protein}g</p>
            <p className="text-xs text-muted-foreground">protein</p>
          </div>
          <div className="bg-secondary/40 rounded-md p-2">
            <p className="font-medium">{meal.carbs}g</p>
            <p className="text-xs text-muted-foreground">carbs</p>
          </div>
          <div className="bg-secondary/40 rounded-md p-2">
            <p className="font-medium">{meal.fat}g</p>
            <p className="text-xs text-muted-foreground">fat</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
