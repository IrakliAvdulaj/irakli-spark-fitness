
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface NutritionSummaryProps {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  goal: string;
}

export function NutritionSummary({ 
  calories, 
  protein, 
  carbs, 
  fat, 
  goal 
}: NutritionSummaryProps) {
  // Get goal description
  const getGoalDescription = () => {
    switch (goal) {
      case 'lose': return 'Weight Loss';
      case 'gain': return 'Weight Gain';
      case 'maintain': return 'Weight Maintenance';
      default: return 'Custom Plan';
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="p-4 glass-card">
        <div className="text-center mb-2">
          <p className="text-sm text-muted-foreground">Daily Calories</p>
          <h3 className="text-2xl font-bold text-primary">{calories}</h3>
        </div>
        <p className="text-xs text-center text-muted-foreground">{getGoalDescription()}</p>
      </Card>
      
      <MacroCard 
        name="Protein" 
        amount={protein} 
        unit="g"
        percentage={Math.round((protein * 4 / calories) * 100)}
        color="bg-coach"
      />
      
      <MacroCard 
        name="Carbs" 
        amount={carbs} 
        unit="g"
        percentage={Math.round((carbs * 4 / calories) * 100)}
        color="bg-coach-blue"
      />
      
      <MacroCard 
        name="Fat" 
        amount={fat} 
        unit="g"
        percentage={Math.round((fat * 9 / calories) * 100)}
        color="bg-accent"
      />
    </div>
  );
}

interface MacroCardProps {
  name: string;
  amount: number;
  unit: string;
  percentage: number;
  color: string;
}

function MacroCard({ name, amount, unit, percentage, color }: MacroCardProps) {
  return (
    <Card className="p-4 glass-card">
      <div className="text-center mb-2">
        <p className="text-sm text-muted-foreground">{name}</p>
        <h3 className="text-2xl font-bold">{amount} <span className="text-sm">{unit}</span></h3>
      </div>
      <div className="space-y-1">
        <Progress value={percentage} className={color} />
        <p className="text-xs text-muted-foreground text-right">{percentage}% of calories</p>
      </div>
    </Card>
  );
}
