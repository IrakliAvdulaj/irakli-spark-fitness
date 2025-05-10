
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
  // 1kg of fat is approximately 7700 calories
  // So to lose/gain 0.5kg per week, we need a deficit/surplus of 3850 calories per week, or 550 per day
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
  
  // Generate a meal plan based on the macros and goal
  const mealPlan = generateMealPlan(calories, protein, carbs, fat, userData.goal, weight);
  
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
  goal: string,
  weight: number
): MealPlan {
  // Determine meal distribution based on calorie level and goal
  let breakfastRatio, lunchRatio, dinnerRatio, snacksRatio;
  
  if (totalCalories < 1600) {
    // For lower calorie plans, less snacking
    breakfastRatio = 0.25;
    lunchRatio = 0.35;
    dinnerRatio = 0.35;
    snacksRatio = 0.05;
  } else if (totalCalories > 2500) {
    // For higher calorie plans, more frequent eating
    breakfastRatio = 0.2;
    lunchRatio = 0.3;
    dinnerRatio = 0.3;
    snacksRatio = 0.2; // More snacks for higher calorie needs
  } else {
    // Standard distribution
    breakfastRatio = 0.25;
    lunchRatio = 0.35;
    dinnerRatio = 0.3;
    snacksRatio = 0.1;
  }
  
  // Meal options database - these will be selected based on goals and adjusted for portions
  const breakfastOptions = [
    {
      name: "Protein Oatmeal",
      description: "Oatmeal with protein powder, berries, and nuts",
      baseProtein: 20,
      baseCarbs: 30,
      baseFat: 10,
      baseCalories: 290, // Calculated from macros
      scaleFactor: 1, // Will be adjusted based on calorie needs
    },
    {
      name: "Greek Yogurt Parfait",
      description: "Greek yogurt with granola, honey, and mixed berries",
      baseProtein: 15,
      baseCarbs: 25,
      baseFat: 8,
      baseCalories: 228,
      scaleFactor: 1,
    },
    {
      name: "Veggie Egg Scramble",
      description: "Eggs scrambled with spinach, bell peppers, and feta cheese",
      baseProtein: 18,
      baseCarbs: 8,
      baseFat: 12,
      baseCalories: 212,
      scaleFactor: 1,
    },
    {
      name: "Protein Pancakes",
      description: "High-protein pancakes with berries and light syrup",
      baseProtein: 25,
      baseCarbs: 30,
      baseFat: 7,
      baseCalories: 283,
      scaleFactor: 1,
    }
  ];
  
  const lunchOptions = [
    {
      name: "Grilled Chicken Salad",
      description: "Mixed greens with grilled chicken, avocado, and light dressing",
      baseProtein: 30,
      baseCarbs: 15,
      baseFat: 15,
      baseCalories: 315,
      scaleFactor: 1,
    },
    {
      name: "Turkey Wrap",
      description: "Whole grain wrap with turkey, hummus, and vegetables",
      baseProtein: 25,
      baseCarbs: 35,
      baseFat: 10,
      baseCalories: 330,
      scaleFactor: 1,
    },
    {
      name: "Quinoa Bowl",
      description: "Quinoa with roasted vegetables, chickpeas, and tahini sauce",
      baseProtein: 18,
      baseCarbs: 40,
      baseFat: 12,
      baseCalories: 340,
      scaleFactor: 1,
    },
    {
      name: "Tuna Salad Sandwich",
      description: "Light tuna salad on whole grain bread with lettuce and tomato",
      baseProtein: 28,
      baseCarbs: 30,
      baseFat: 8,
      baseCalories: 304,
      scaleFactor: 1,
    }
  ];
  
  const dinnerOptions = [
    {
      name: "Salmon with Vegetables",
      description: "Baked salmon with roasted asparagus and sweet potatoes",
      baseProtein: 30,
      baseCarbs: 25,
      baseFat: 15,
      baseCalories: 355,
      scaleFactor: 1,
    },
    {
      name: "Lean Beef Stir Fry",
      description: "Stir-fried lean beef with mixed vegetables and brown rice",
      baseProtein: 35,
      baseCarbs: 30,
      baseFat: 10,
      baseCalories: 350,
      scaleFactor: 1,
    },
    {
      name: "Veggie and Bean Chili",
      description: "Hearty bean chili with mixed vegetables and avocado",
      baseProtein: 20,
      baseCarbs: 35,
      baseFat: 12,
      baseCalories: 324,
      scaleFactor: 1,
    },
    {
      name: "Grilled Fish Tacos",
      description: "Grilled fish in corn tortillas with cabbage slaw and lime",
      baseProtein: 25,
      baseCarbs: 30,
      baseFat: 10,
      baseCalories: 310,
      scaleFactor: 1,
    }
  ];
  
  const snackOptions = [
    {
      name: "Protein Shake",
      description: "Protein shake with banana and almond butter",
      baseProtein: 25,
      baseCarbs: 15,
      baseFat: 8,
      baseCalories: 232,
      scaleFactor: 1,
    },
    {
      name: "Greek Yogurt with Berries",
      description: "Greek yogurt with mixed berries and a drizzle of honey",
      baseProtein: 12,
      baseCarbs: 15,
      baseFat: 3,
      baseCalories: 135,
      scaleFactor: 1,
    },
    {
      name: "Nuts and Fruit",
      description: "Mixed nuts with an apple or orange",
      baseProtein: 6,
      baseCarbs: 15,
      baseFat: 12,
      baseCalories: 192,
      scaleFactor: 1,
    },
    {
      name: "Hummus with Veggies",
      description: "Hummus with carrot and cucumber sticks",
      baseProtein: 5,
      baseCarbs: 12,
      baseFat: 7,
      baseCalories: 131,
      scaleFactor: 1,
    },
    {
      name: "Protein Bar",
      description: "High-protein, low-sugar protein bar",
      baseProtein: 20,
      baseCarbs: 15,
      baseFat: 7,
      baseCalories: 203,
      scaleFactor: 1,
    }
  ];
  
  // Select meals based on goal
  const getRandomItem = (array: any[]) => array[Math.floor(Math.random() * array.length)];
  
  let breakfastTemplate, lunchTemplate, dinnerTemplate;
  let snackTemplates: any[] = [];
  
  if (goal === 'lose') {
    // For weight loss, favor higher protein, lower carb options
    breakfastTemplate = getRandomItem([breakfastOptions[0], breakfastOptions[2], breakfastOptions[3]]); 
    lunchTemplate = getRandomItem([lunchOptions[0], lunchOptions[3]]);
    dinnerTemplate = getRandomItem([dinnerOptions[0], dinnerOptions[3]]);
    
    // Select 1-2 snacks based on calories
    if (totalCalories < 1600) {
      snackTemplates = [getRandomItem([snackOptions[1], snackOptions[3]])]; // Lower calorie snacks
    } else {
      snackTemplates = [
        getRandomItem([snackOptions[1], snackOptions[3]]),
        snackOptions[0] // Protein shake for satiety
      ];
    }
  } else if (goal === 'gain') {
    // For weight gain, include more carbs and calorie-dense options
    breakfastTemplate = getRandomItem([breakfastOptions[0], breakfastOptions[3]]); 
    lunchTemplate = getRandomItem([lunchOptions[1], lunchOptions[2]]);
    dinnerTemplate = getRandomItem([dinnerOptions[1], dinnerOptions[2]]);
    
    // More snacks for weight gain
    snackTemplates = [
      snackOptions[0], // Protein shake
      getRandomItem([snackOptions[2], snackOptions[4]]) // Calorie-dense snacks
    ];
    
    if (totalCalories > 2800) {
      // Add a third snack for very high calorie needs
      snackTemplates.push(getRandomItem([snackOptions[1], snackOptions[2]]));
    }
  } else {
    // For maintenance, balanced options
    breakfastTemplate = getRandomItem(breakfastOptions);
    lunchTemplate = getRandomItem(lunchOptions);
    dinnerTemplate = getRandomItem(dinnerOptions);
    
    // Select 1-2 snacks based on calories
    if (totalCalories < 2000) {
      snackTemplates = [getRandomItem(snackOptions)];
    } else {
      snackTemplates = [
        getRandomItem([snackOptions[0], snackOptions[1]]),
        getRandomItem([snackOptions[2], snackOptions[3], snackOptions[4]])
      ];
    }
  }
  
  // Scale meal portions based on calorie and macro targets
  const breakfastTargetCal = totalCalories * breakfastRatio;
  const lunchTargetCal = totalCalories * lunchRatio;
  const dinnerTargetCal = totalCalories * dinnerRatio;
  
  // Calculate scale factor for each meal
  const breakfastScale = breakfastTargetCal / breakfastTemplate.baseCalories;
  const lunchScale = lunchTargetCal / lunchTemplate.baseCalories;
  const dinnerScale = dinnerTargetCal / dinnerTemplate.baseCalories;
  
  // Create scaled meals
  const breakfast: Meal = {
    name: breakfastTemplate.name,
    description: breakfastTemplate.description,
    calories: Math.round(breakfastTemplate.baseCalories * breakfastScale),
    protein: Math.round(breakfastTemplate.baseProtein * breakfastScale),
    carbs: Math.round(breakfastTemplate.baseCarbs * breakfastScale),
    fat: Math.round(breakfastTemplate.baseFat * breakfastScale),
    portions: Math.round(breakfastScale * 10) / 10 // Round to 1 decimal place
  };
  
  const lunch: Meal = {
    name: lunchTemplate.name,
    description: lunchTemplate.description,
    calories: Math.round(lunchTemplate.baseCalories * lunchScale),
    protein: Math.round(lunchTemplate.baseProtein * lunchScale),
    carbs: Math.round(lunchTemplate.baseCarbs * lunchScale),
    fat: Math.round(lunchTemplate.baseFat * lunchScale),
    portions: Math.round(lunchScale * 10) / 10
  };
  
  const dinner: Meal = {
    name: dinnerTemplate.name,
    description: dinnerTemplate.description,
    calories: Math.round(dinnerTemplate.baseCalories * dinnerScale),
    protein: Math.round(dinnerTemplate.baseProtein * dinnerScale),
    carbs: Math.round(dinnerTemplate.baseCarbs * dinnerScale),
    fat: Math.round(dinnerTemplate.baseFat * dinnerScale),
    portions: Math.round(dinnerScale * 10) / 10
  };
  
  // Calculate remaining calories for snacks
  const allocatedCalories = breakfast.calories + lunch.calories + dinner.calories;
  const remainingCalories = totalCalories - allocatedCalories;
  
  // Distribute remaining calories among snacks
  let snacks: Meal[] = [];
  if (snackTemplates.length > 0) {
    const caloriesPerSnack = remainingCalories / snackTemplates.length;
    
    snacks = snackTemplates.map(snack => {
      const snackScale = caloriesPerSnack / snack.baseCalories;
      return {
        name: snack.name,
        description: snack.description,
        calories: Math.round(snack.baseCalories * snackScale),
        protein: Math.round(snack.baseProtein * snackScale),
        carbs: Math.round(snack.baseCarbs * snackScale),
        fat: Math.round(snack.baseFat * snackScale),
        portions: Math.round(snackScale * 10) / 10
      };
    });
  }
  
  return {
    breakfast,
    lunch,
    dinner,
    snacks
  };
}
