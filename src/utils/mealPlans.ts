import { MealPlan } from "./fitnessCalculator";

export interface PredefinedMealPlan {
  calories: number;
  plan: MealPlan;
}

export const mealPlans: PredefinedMealPlan[] = [
  {
    calories: 1500,
    plan: {
      breakfast: {
        name: "Boiled Eggs & Toast",
        description: "2 boiled eggs, 1 slice whole-grain toast, 1/2 avocado, black coffee or green tea",
        calories: 350,
        protein: 18,
        carbs: 15,
        fat: 22,
        portions: 1
      },
      lunch: {
        name: "Grilled Chicken & Quinoa",
        description: "100g grilled chicken breast, 1 cup cooked quinoa, mixed greens with olive oil & vinegar",
        calories: 500,
        protein: 35,
        carbs: 48,
        fat: 15,
        portions: 1
      },
      dinner: {
        name: "Salmon & Vegetables",
        description: "120g salmon, 1 cup steamed broccoli, 1/2 cup sweet potato",
        calories: 450,
        protein: 30,
        carbs: 30,
        fat: 20,
        portions: 1
      },
      snacks: []
    }
  },
  {
    calories: 1700,
    plan: {
      breakfast: {
        name: "Oatmeal with Fixings",
        description: "Oatmeal (1/2 cup dry oats) with almond milk, 1 tbsp peanut butter, 1 banana",
        calories: 400,
        protein: 14,
        carbs: 60,
        fat: 12,
        portions: 1
      },
      lunch: {
        name: "Turkey & Rice",
        description: "120g grilled turkey, 1/2 cup brown rice, steamed vegetables",
        calories: 450,
        protein: 40,
        carbs: 40,
        fat: 8,
        portions: 1
      },
      dinner: {
        name: "Cod with Greens",
        description: "150g cod, 1 cup mixed greens with olive oil, 1 slice whole grain bread",
        calories: 400,
        protein: 35,
        carbs: 25,
        fat: 15,
        portions: 1
      },
      snacks: [
        {
          name: "Boiled Egg & Apple",
          description: "1 boiled egg, 1 medium apple",
          calories: 150,
          protein: 7,
          carbs: 20,
          fat: 5,
          portions: 1
        }
      ]
    }
  },
  {
    calories: 1900,
    plan: {
      breakfast: {
        name: "Vegetable Omelette",
        description: "3 egg omelette with veggies, 1 slice whole grain toast, 1 orange",
        calories: 450,
        protein: 25,
        carbs: 30,
        fat: 20,
        portions: 1
      },
      lunch: {
        name: "Grilled Chicken & Couscous",
        description: "120g grilled chicken, 1/2 cup couscous, salad with 1 tbsp olive oil",
        calories: 480,
        protein: 40,
        carbs: 35,
        fat: 15,
        portions: 1
      },
      dinner: {
        name: "Lean Beef & Sweet Potato",
        description: "100g lean beef, 3/4 cup mashed sweet potato, asparagus",
        calories: 450,
        protein: 30,
        carbs: 40,
        fat: 15,
        portions: 1
      },
      snacks: [
        {
          name: "Greek Yogurt & Almonds",
          description: "150g Greek yogurt, 10 almonds",
          calories: 220,
          protein: 20,
          carbs: 10,
          fat: 10,
          portions: 1
        }
      ]
    }
  },
  {
    calories: 2100,
    plan: {
      breakfast: {
        name: "Eggs & Avocado Toast",
        description: "3 scrambled eggs, 1/2 avocado, 2 slices rye toast",
        calories: 500,
        protein: 25,
        carbs: 35,
        fat: 25,
        portions: 1
      },
      lunch: {
        name: "Grilled Chicken & Rice",
        description: "130g grilled chicken breast, 3/4 cup brown rice, steamed green beans",
        calories: 450,
        protein: 40,
        carbs: 45,
        fat: 8,
        portions: 1
      },
      dinner: {
        name: "Tilapia & Mixed Veggies",
        description: "150g tilapia, 1 cup mixed veggies, 1/2 cup white rice",
        calories: 400,
        protein: 35,
        carbs: 40,
        fat: 8,
        portions: 1
      },
      snacks: [
        {
          name: "Protein Shake",
          description: "Protein shake with 1 banana & almond milk",
          calories: 300,
          protein: 25,
          carbs: 30,
          fat: 5,
          portions: 1
        },
        {
          name: "Nuts & Fruit",
          description: "20g almonds, 1 apple",
          calories: 200,
          protein: 6,
          carbs: 20,
          fat: 12,
          portions: 1
        }
      ]
    }
  },
  {
    calories: 2300,
    plan: {
      breakfast: {
        name: "Eggs & Sourdough Toast",
        description: "4 scrambled eggs, 1/2 avocado, 2 slices sourdough toast",
        calories: 550,
        protein: 30,
        carbs: 40,
        fat: 27,
        portions: 1
      },
      lunch: {
        name: "Grilled Chicken & Rice",
        description: "150g grilled chicken, 1 cup cooked rice, steamed carrots and broccoli",
        calories: 500,
        protein: 42,
        carbs: 50,
        fat: 10,
        portions: 1
      },
      dinner: {
        name: "Salmon & Quinoa",
        description: "150g salmon, 1 cup quinoa, 1 cup spinach with olive oil",
        calories: 550,
        protein: 40,
        carbs: 45,
        fat: 20,
        portions: 1
      },
      snacks: [
        {
          name: "Greek Yogurt with Honey",
          description: "Greek yogurt (150g) + 1 tbsp honey + berries",
          calories: 200,
          protein: 15,
          carbs: 25,
          fat: 2,
          portions: 1
        },
        {
          name: "Protein Shake",
          description: "Protein shake + 1 tbsp peanut butter + oat milk",
          calories: 300,
          protein: 25,
          carbs: 20,
          fat: 10,
          portions: 1
        }
      ]
    }
  },
  {
    calories: 2500,
    plan: {
      breakfast: {
        name: "High Protein Oats",
        description: "1 cup oats, 1 scoop whey protein, 1 banana, 1 tbsp almond butter",
        calories: 550,
        protein: 35,
        carbs: 65,
        fat: 15,
        portions: 1
      },
      lunch: {
        name: "Lean Beef & Sweet Potato",
        description: "150g lean beef, 1 cup sweet potato, 1 cup steamed green beans",
        calories: 500,
        protein: 42,
        carbs: 50,
        fat: 10,
        portions: 1
      },
      dinner: {
        name: "Chicken Thigh & Rice",
        description: "200g chicken thigh, 3/4 cup brown rice, mixed veggies sautéed in olive oil",
        calories: 550,
        protein: 45,
        carbs: 40,
        fat: 20,
        portions: 1
      },
      snacks: [
        {
          name: "Boiled Eggs & Nuts",
          description: "2 boiled eggs, 10 almonds",
          calories: 250,
          protein: 15,
          carbs: 5,
          fat: 18,
          portions: 1
        },
        {
          name: "Protein Bar & Fruit",
          description: "Protein bar (~200 cal), 1 apple",
          calories: 300,
          protein: 20,
          carbs: 35,
          fat: 7,
          portions: 1
        }
      ]
    }
  },
  {
    calories: 2700,
    plan: {
      breakfast: {
        name: "Eggs & Toast with Avocado",
        description: "3 eggs + 2 egg whites scrambled, 1/2 avocado, 2 slices whole grain toast, 1 orange",
        calories: 600,
        protein: 35,
        carbs: 45,
        fat: 30,
        portions: 1
      },
      lunch: {
        name: "Grilled Chicken & Rice",
        description: "150g grilled chicken, 1 cup white rice, grilled zucchini and bell pepper",
        calories: 550,
        protein: 45,
        carbs: 60,
        fat: 10,
        portions: 1
      },
      dinner: {
        name: "Baked Salmon & Potatoes",
        description: "150g baked salmon, 1/2 cup mashed potatoes, steamed asparagus",
        calories: 500,
        protein: 40,
        carbs: 30,
        fat: 22,
        portions: 1
      },
      snacks: [
        {
          name: "Protein Smoothie",
          description: "Protein smoothie (1 scoop whey, banana, oats, peanut butter)",
          calories: 350,
          protein: 30,
          carbs: 35,
          fat: 10,
          portions: 1
        },
        {
          name: "Cottage Cheese & Flax",
          description: "Cottage cheese (150g) + 1 tbsp flax seeds",
          calories: 200,
          protein: 24,
          carbs: 6,
          fat: 8,
          portions: 1
        }
      ]
    }
  },
  {
    calories: 2900,
    plan: {
      breakfast: {
        name: "Eggs & Toast with Cheese",
        description: "3 eggs + 3 egg whites, 1 slice cheese, 2 slices sourdough toast, 1 tbsp butter, 1 banana",
        calories: 650,
        protein: 40,
        carbs: 50,
        fat: 32,
        portions: 1
      },
      lunch: {
        name: "Chicken & Quinoa",
        description: "180g grilled chicken breast, 1 cup cooked quinoa, 1 cup roasted vegetables, olive oil drizzle",
        calories: 600,
        protein: 50,
        carbs: 50,
        fat: 20,
        portions: 1
      },
      dinner: {
        name: "Lean Beef & Sweet Potato",
        description: "180g lean beef, 1 cup sweet potato, 1 cup broccoli sautéed in coconut oil",
        calories: 550,
        protein: 45,
        carbs: 45,
        fat: 20,
        portions: 1
      },
      snacks: [
        {
          name: "Protein Shake",
          description: "Protein shake (scoop whey, oat milk, peanut butter, oats)",
          calories: 350,
          protein: 30,
          carbs: 30,
          fat: 10,
          portions: 1
        },
        {
          name: "Protein Snack",
          description: "1 boiled egg, 30g almonds, Greek yogurt (150g)",
          calories: 350,
          protein: 25,
          carbs: 10,
          fat: 25,
          portions: 1
        }
      ]
    }
  },
  {
    calories: 3100,
    plan: {
      breakfast: {
        name: "Protein Oatmeal & Eggs",
        description: "1 cup oats with 1 scoop whey, 1 banana, 1 tbsp peanut butter, 3 boiled eggs",
        calories: 700,
        protein: 50,
        carbs: 70,
        fat: 25,
        portions: 1
      },
      lunch: {
        name: "Turkey & Rice",
        description: "200g grilled turkey, 1 cup brown rice, grilled vegetables, 1 tbsp olive oil",
        calories: 650,
        protein: 55,
        carbs: 60,
        fat: 15,
        portions: 1
      },
      dinner: {
        name: "Salmon & Rice",
        description: "200g salmon, 1 cup white rice, mixed greens with dressing",
        calories: 600,
        protein: 45,
        carbs: 50,
        fat: 25,
 portions: 1
      },
      snacks: [
        {
          name: "Protein Smoothie",
          description: "Smoothie: banana, whey protein, almond milk, honey, oats",
          calories: 350,
          protein: 30,
          carbs: 40,
          fat: 8,
          portions: 1
        },
        {
          name: "Protein Bar & Fruit",
          description: "1 protein bar (~250 cal), 1 apple",
          calories: 350,
          protein: 20,
          carbs: 45,
          fat: 10,
          portions: 1
        },
        {
          name: "Yogurt & Berries",
          description: "Greek yogurt + berries + flax",
          calories: 200,
          protein: 15,
          carbs: 20,
          fat: 5,
          portions: 1
        }
      ]
    }
  },
  {
    calories: 3300,
    plan: {
      breakfast: {
        name: "High-Protein Breakfast",
        description: "3 eggs, 3 whites, 2 slices toast with butter, 1 banana, 1 scoop whey in water",
        calories: 700,
        protein: 55,
        carbs: 60,
        fat: 25,
        portions: 1
      },
      lunch: {
        name: "Chicken & Rice",
        description: "200g grilled chicken, 1.5 cups rice, 1 tbsp olive oil, side of spinach",
        calories: 700,
        protein: 50,
        carbs: 80,
        fat: 15,
        portions: 1
      },
      dinner: {
        name: "Beef & Potatoes",
        description: "200g beef, 1 cup mashed potatoes, 1 cup vegetables sautéed in olive oil",
        calories: 650,
        protein: 50,
        carbs: 50,
        fat: 25,
        portions: 1
      },
      snacks: [
        {
          name: "Protein Shake & Apple",
          description: "1 protein shake (whey, oats, PB, milk), 1 apple",
          calories: 450,
          protein: 35,
          carbs: 50,
          fat: 12,
          portions: 1
        },
        {
          name: "Nuts & Cottage Cheese",
          description: "30g almonds, cottage cheese (150g)",
          calories: 350,
          protein: 25,
          carbs: 10,
          fat: 25,
          portions: 1
        },
        {
          name: "Bedtime Snack",
          description: "Greek yogurt with honey + oats",
          calories: 250,
          protein: 15,
          carbs: 35,
          fat: 5,
          portions: 1
        }
      ]
    }
  },
  {
    calories: 3500,
    plan: {
      breakfast: {
        name: "High-Calorie Breakfast",
        description: "1 cup oats + whey + banana + PB, 3 whole eggs, 2 slices toast",
        calories: 800,
        protein: 60,
        carbs: 80,
        fat: 30,
        portions: 1
      },
      lunch: {
        name: "Salmon & Rice",
        description: "200g grilled salmon, 1.5 cups rice, 1 tbsp olive oil, steamed broccoli",
        calories: 700,
        protein: 50,
        carbs: 70,
        fat: 25,
        portions: 1
      },
      dinner: {
        name: "Beef Stir-Fry & Rice",
        description: "200g beef stir-fry, 1 cup rice, veggies in olive oil",
        calories: 700,
        protein: 50,
        carbs: 70,
        fat: 25,
        portions: 1
      },
      snacks: [
        {
          name: "Protein Shake & Bar",
          description: "Protein shake + granola bar",
          calories: 400,
          protein: 35,
          carbs: 40,
          fat: 10,
          portions: 1
        },
        {
          name: "Yogurt & Nuts",
          description: "Greek yogurt, 1 banana, 10 walnuts",
          calories: 350,
          protein: 20,
          carbs: 40,
          fat: 15,
          portions: 1
        },
        {
          name: "Bedtime Snack",
          description: "Cottage cheese + oats + berries",
          calories: 300,
          protein: 25,
          carbs: 30,
          fat: 10,
          portions: 1
        }
      ]
    }
  },
  {
    calories: 3700,
    plan: {
      breakfast: {
        name: "Bulking Breakfast",
        description: "4 eggs, 2 slices whole grain toast with butter, oats with banana, honey, PB",
        calories: 850,
        protein: 50,
        carbs: 80,
        fat: 40,
        portions: 1
      },
      lunch: {
        name: "Large Chicken & Rice",
        description: "220g grilled chicken, 2 cups rice, steamed vegetables with olive oil",
        calories: 750,
        protein: 60,
        carbs: 90,
        fat: 15,
        portions: 1
      },
      dinner: {
        name: "Beef & Sweet Potato",
        description: "220g beef, 1.5 cups sweet potato, greens with oil",
        calories: 700,
        protein: 55,
        carbs: 70,
        fat: 25,
        portions: 1
      },
      snacks: [
        {
          name: "Protein Shake & Granola Bar",
          description: "Protein shake with oats and milk, 1 granola bar",
          calories: 450,
          protein: 35,
          carbs: 50,
          fat: 12,
          portions: 1
        },
        {
          name: "High-Protein Snack",
          description: "2 boiled eggs, 30g almonds, 1 apple",
          calories: 400,
          protein: 20,
          carbs: 25,
          fat: 25,
          portions: 1
        },
        {
          name: "Yogurt & Almond Butter",
          description: "Greek yogurt with flax and fruit, 1 tbsp almond butter",
          calories: 350,
          protein: 20,
          carbs: 30,
          fat: 15,
          portions: 1
        },
        {
          name: "Casein Shake",
          description: "Casein shake or cottage cheese",
          calories: 200,
          protein: 25,
          carbs: 5,
          fat: 5,
          portions: 1
        }
      ]
    }
  }
];

// Function to get the nearest meal plan based on calorie needs
export function getNearestMealPlan(targetCalories: number): MealPlan {
  // Sort meal plans by how close they are to the target calories
  const sortedPlans = [...mealPlans].sort((a, b) => {
    return Math.abs(a.calories - targetCalories) - Math.abs(b.calories - targetCalories);
  });
  
  // Return the closest match
  return sortedPlans[0].plan;
}
