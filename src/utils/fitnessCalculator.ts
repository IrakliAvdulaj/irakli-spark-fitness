
interface UserData {
  height: string;
  weight: string;
  age: string;
  sex: string;
  activityLevel: string;
  goal: string;
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
  
  // Adjust calories based on goal
  let calories;
  switch (userData.goal) {
    case 'lose': calories = tdee - 500; break;     // Deficit for weight loss
    case 'gain': calories = tdee + 500; break;     // Surplus for weight gain
    case 'maintain': calories = tdee; break;       // Maintenance
    default: calories = tdee;
  }
  
  // Calculate macros
  // Protein: 2g per kg of body weight (more for weight loss and gain)
  let proteinRatio;
  switch (userData.goal) {
    case 'lose': proteinRatio = 0.4; break;        // 40% of calories from protein
    case 'gain': proteinRatio = 0.3; break;        // 30% of calories from protein
    case 'maintain': proteinRatio = 0.3; break;    // 30% of calories from protein
    default: proteinRatio = 0.3;
  }
  
  // Fat: minimum 20% of calories
  let fatRatio;
  switch (userData.goal) {
    case 'lose': fatRatio = 0.3; break;            // 30% of calories from fat
    case 'gain': fatRatio = 0.25; break;           // 25% of calories from fat
    case 'maintain': fatRatio = 0.25; break;       // 25% of calories from fat
    default: fatRatio = 0.25;
  }
  
  // Carbs: remaining calories
  const carbRatio = 1 - proteinRatio - fatRatio;
  
  // Convert to grams
  const protein = Math.round((calories * proteinRatio) / 4); // 4 calories per gram of protein
  const fat = Math.round((calories * fatRatio) / 9);         // 9 calories per gram of fat
  const carbs = Math.round((calories * carbRatio) / 4);      // 4 calories per gram of carbs
  
  // Generate a basic meal plan based on the macros
  const mealPlan = generateMealPlan(calories, protein, carbs, fat, userData.goal);
  
  return {
    calories: Math.round(calories),
    protein,
    carbs,
    fat,
    mealPlan
  };
}

function generateMealPlan(
  totalCalories: number, 
  totalProtein: number, 
  totalCarbs: number, 
  totalFat: number, 
  goal: string
): MealPlan {
  // Simple distribution of macros throughout the day
  const breakfastRatio = 0.25;  // 25% of daily intake
  const lunchRatio = 0.35;      // 35% of daily intake
  const dinnerRatio = 0.3;      // 30% of daily intake
  const snacksRatio = 0.1;      // 10% of daily intake
  
  // Pre-defined meal templates that we'll adjust based on macros
  const breakfastOptions = [
    {
      name: "Protein Oatmeal",
      description: "Oatmeal with protein powder, berries, and nuts",
      baseProtein: 20,
      baseCarbs: 30,
      baseFat: 10
    },
    {
      name: "Greek Yogurt Parfait",
      description: "Greek yogurt with granola, honey, and mixed berries",
      baseProtein: 15,
      baseCarbs: 25,
      baseFat: 8
    },
    {
      name: "Veggie Egg Scramble",
      description: "Eggs scrambled with spinach, bell peppers, and feta cheese",
      baseProtein: 18,
      baseCarbs: 8,
      baseFat: 12
    }
  ];
  
  const lunchOptions = [
    {
      name: "Grilled Chicken Salad",
      description: "Mixed greens with grilled chicken, avocado, and light dressing",
      baseProtein: 30,
      baseCarbs: 15,
      baseFat: 15
    },
    {
      name: "Turkey Wrap",
      description: "Whole grain wrap with turkey, hummus, and vegetables",
      baseProtein: 25,
      baseCarbs: 35,
      baseFat: 10
    },
    {
      name: "Quinoa Bowl",
      description: "Quinoa with roasted vegetables, chickpeas, and tahini sauce",
      baseProtein: 18,
      baseCarbs: 40,
      baseFat: 12
    }
  ];
  
  const dinnerOptions = [
    {
      name: "Salmon with Vegetables",
      description: "Baked salmon with roasted asparagus and sweet potatoes",
      baseProtein: 30,
      baseCarbs: 25,
      baseFat: 15
    },
    {
      name: "Lean Beef Stir Fry",
      description: "Stir-fried lean beef with mixed vegetables and brown rice",
      baseProtein: 35,
      baseCarbs: 30,
      baseFat: 10
    },
    {
      name: "Veggie and Bean Chili",
      description: "Hearty bean chili with mixed vegetables and avocado",
      baseProtein: 20,
      baseCarbs: 35,
      baseFat: 12
    }
  ];
  
  const snackOptions = [
    {
      name: "Protein Shake",
      description: "Protein shake with banana and almond butter",
      baseProtein: 25,
      baseCarbs: 15,
      baseFat: 8
    },
    {
      name: "Greek Yogurt with Berries",
      description: "Greek yogurt with mixed berries and a drizzle of honey",
      baseProtein: 12,
      baseCarbs: 15,
      baseFat: 3
    },
    {
      name: "Nuts and Fruit",
      description: "Mixed nuts with an apple or orange",
      baseProtein: 6,
      baseCarbs: 15,
      baseFat: 12
    },
    {
      name: "Hummus with Veggies",
      description: "Hummus with carrot and cucumber sticks",
      baseProtein: 5,
      baseCarbs: 12,
      baseFat: 7
    }
  ];
  
  // Select meals based on goal
  const getRandomItem = (array: any[]) => array[Math.floor(Math.random() * array.length)];
  
  let breakfastTemplate, lunchTemplate, dinnerTemplate;
  
  if (goal === 'lose') {
    // For weight loss, favor higher protein, lower carb options
    breakfastTemplate = breakfastOptions[Math.floor(Math.random() * 2)]; // Protein Oatmeal or Greek Yogurt
    lunchTemplate = lunchOptions[0]; // Grilled Chicken Salad
    dinnerTemplate = dinnerOptions[0]; // Salmon with Vegetables
  } else if (goal === 'gain') {
    // For weight gain, include more carbs
    breakfastTemplate = breakfastOptions[0]; // Protein Oatmeal
    lunchTemplate = lunchOptions[1]; // Turkey Wrap
    dinnerTemplate = dinnerOptions[1]; // Lean Beef Stir Fry
  } else {
    // For maintenance, balanced options
    breakfastTemplate = getRandomItem(breakfastOptions);
    lunchTemplate = getRandomItem(lunchOptions);
    dinnerTemplate = getRandomItem(dinnerOptions);
  }
  
  // Calculate calories and macros for each meal
  const breakfast: Meal = {
    name: breakfastTemplate.name,
    description: breakfastTemplate.description,
    calories: Math.round(totalCalories * breakfastRatio),
    protein: Math.round(totalProtein * breakfastRatio),
    carbs: Math.round(totalCarbs * breakfastRatio),
    fat: Math.round(totalFat * breakfastRatio)
  };
  
  const lunch: Meal = {
    name: lunchTemplate.name,
    description: lunchTemplate.description,
    calories: Math.round(totalCalories * lunchRatio),
    protein: Math.round(totalProtein * lunchRatio),
    carbs: Math.round(totalCarbs * lunchRatio),
    fat: Math.round(totalFat * lunchRatio)
  };
  
  const dinner: Meal = {
    name: dinnerTemplate.name,
    description: dinnerTemplate.description,
    calories: Math.round(totalCalories * dinnerRatio),
    protein: Math.round(totalProtein * dinnerRatio),
    carbs: Math.round(totalCarbs * dinnerRatio),
    fat: Math.round(totalFat * dinnerRatio)
  };
  
  // Select 2 snacks
  const selectedSnacks = snackOptions.slice(0, 2).map(snack => ({
    name: snack.name,
    description: snack.description,
    calories: Math.round(totalCalories * snacksRatio / 2),
    protein: Math.round(totalProtein * snacksRatio / 2),
    carbs: Math.round(totalCarbs * snacksRatio / 2),
    fat: Math.round(totalFat * snacksRatio / 2)
  }));
  
  return {
    breakfast,
    lunch,
    dinner,
    snacks: selectedSnacks
  };
}
