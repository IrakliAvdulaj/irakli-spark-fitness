import { getNearestMealPlan } from "./mealPlans";

interface UserData {
  height: string;
  weight: string;
  age: string;
  sex: string;
  activityLevel: string;
  goal: string;
  goalAmount?: string;
}

export interface FitnessData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mealPlan: MealPlan;
}

export interface Meal {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  description: string;
  portions?: number;
}

export interface MealPlan {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snacks: Meal[];
}

export function calculateFitnessData(userData: UserData): FitnessData {
  // Parse input values to numbers
  const height = parseFloat(userData.height);
  const weight = parseFloat(userData.weight);
  const age = parseFloat(userData.age);
  const isMale = userData.sex === 'male';
  const goalAmount = userData.goalAmount ? parseFloat(userData.goalAmount) : 0;
  
  // Calculate Basal Metabolic Rate (BMR) using Mifflin-St Jeor Equation
  let bmr;
  if (isMale) {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  
  // Apply activity multiplier
  let activityMultiplier;
  switch (userData.activityLevel) {
    case 'sedentary': activityMultiplier = 1.2; break;
    case 'light': activityMultiplier = 1.375; break;
    case 'moderate': activityMultiplier = 1.55; break;
    case 'active': activityMultiplier = 1.725; break;
    case 'extreme': activityMultiplier = 1.9; break;
    default: activityMultiplier = 1.2;
  }
  
  // Total Daily Energy Expenditure (TDEE)
  let tdee = bmr * activityMultiplier;
  
  // Calculate calories based on goal and goal amount
  let calories;
  switch (userData.goal) {
    case 'lose': 
      calories = tdee - (goalAmount * 7700) / 7; // Daily calorie deficit based on weekly goal
      break;
    case 'gain': 
      calories = tdee + (goalAmount * 7700) / 7; // Daily calorie surplus based on weekly goal
      break;
    case 'maintain': 
      calories = tdee;
      break;
    default: 
      calories = tdee;
  }
  
  // Set minimum calories based on gender to ensure health
  const minCalories = isMale ? 1500 : 1200;
  calories = Math.max(calories, minCalories);
  
  // Calculate macros
  let proteinRatio, fatRatio;
  
  switch (userData.goal) {
    case 'lose': 
      proteinRatio = 0.4;        // 40% of calories from protein
      fatRatio = 0.3;            // 30% of calories from fat
      break;
    case 'gain': 
      proteinRatio = 0.3;        // 30% of calories from protein
      fatRatio = 0.25;           // 25% of calories from fat
      break;
    case 'maintain': 
      proteinRatio = 0.3;        // 30% of calories from protein
      fatRatio = 0.25;           // 25% of calories from fat
      break;
    default: 
      proteinRatio = 0.3;
      fatRatio = 0.25;
  }
  
  // Carbs: remaining calories
  const carbRatio = 1 - proteinRatio - fatRatio;
  
  // Convert to grams
  const protein = Math.round((calories * proteinRatio) / 4); // 4 calories per gram of protein
  const fat = Math.round((calories * fatRatio) / 9);         // 9 calories per gram of fat
  const carbs = Math.round((calories * carbRatio) / 4);      // 4 calories per gram of carbs
  
  // Get the appropriate meal plan based on calculated calories
  const roundedCalories = Math.round(calories);
  const mealPlan = getNearestMealPlan(roundedCalories);
  
  return {
    calories: roundedCalories,
    protein,
    carbs,
    fat,
    mealPlan
  };
}
