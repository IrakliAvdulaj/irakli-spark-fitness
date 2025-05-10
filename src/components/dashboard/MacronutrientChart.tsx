
import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MacronutrientChartProps {
  protein: number;
  carbs: number;
  fat: number;
}

export function MacronutrientChart({ protein, carbs, fat }: MacronutrientChartProps) {
  // Calculate calorie contribution from each macronutrient
  // Protein: 4 calories per gram, Carbs: 4 calories per gram, Fat: 9 calories per gram
  const proteinCalories = protein * 4;
  const carbsCalories = carbs * 4;
  const fatCalories = fat * 9;
  const totalCalories = proteinCalories + carbsCalories + fatCalories;
  
  const data = useMemo(() => [
    { name: "Protein", value: proteinCalories, grams: protein },
    { name: "Carbs", value: carbsCalories, grams: carbs },
    { name: "Fat", value: fatCalories, grams: fat }
  ], [protein, carbs, fat, proteinCalories, carbsCalories, fatCalories]);
  
  // Define colors for each macro
  const COLORS = ["#8B5CF6", "#10B981", "#F97316"];
  
  const percentages = data.map(item => ({
    ...item,
    percentage: Math.round((item.value / totalCalories) * 100)
  }));
  
  return (
    <Card className="glass-card h-full">
      <CardHeader>
        <CardTitle className="text-xl">Macronutrient Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={percentages}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                innerRadius={40}
                fill="#8884d8"
                dataKey="value"
                label={({name, percentage}) => `${name}: ${percentage}%`}
              >
                {percentages.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name, props) => {
                  return [
                    `${value} cal (${props.payload.percentage}%)`, 
                    `${name} (${props.payload.grams}g)`
                  ];
                }}
              />
              <Legend 
                formatter={(value, entry) => {
                  const item = percentages.find(item => item.name === value);
                  return `${value}: ${item?.percentage || 0}% (${item?.grams || 0}g)`;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
