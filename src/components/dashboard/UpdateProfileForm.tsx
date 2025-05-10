
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { calculateFitnessData } from "@/utils/fitnessCalculator";

interface UpdateProfileFormProps {
  userData: any;
  onUpdateComplete: (updatedData: any) => void;
  onCancel: () => void;
}

export function UpdateProfileForm({ userData, onUpdateComplete, onCancel }: UpdateProfileFormProps) {
  const [formData, setFormData] = useState({
    height: userData.height || "",
    weight: userData.weight || "",
    age: userData.age || "",
    sex: userData.sex || "",
    activityLevel: userData.activityLevel || "",
    goal: userData.goal || "",
    goalAmount: userData.goalAmount || "0"
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Get current authenticated user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("Not authenticated");
      }
      
      // Update user data in Supabase
      const { error } = await supabase.from('user_profiles').update({
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        age: parseInt(formData.age),
        sex: formData.sex,
        activity_level: formData.activityLevel,
        goal: formData.goal,
        goal_amount: parseFloat(formData.goalAmount)
      }).eq('user_id', user.id);
      
      if (error) {
        throw error;
      }
      
      // Update in localStorage for backward compatibility
      localStorage.setItem(`userData-${user.email}`, JSON.stringify(formData));
      
      // Calculate new fitness data
      const newFitnessData = calculateFitnessData(formData);
      
      toast({
        title: "Profile updated!",
        description: "Your fitness profile has been updated successfully.",
      });
      
      onUpdateComplete(formData);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const renderGoalAmountField = () => {
    if (!formData.goal || formData.goal === "maintain") return null;
    
    let label = "", placeholder = "", description = "";
    
    switch (formData.goal) {
      case "lose":
        label = "Weight to lose per week";
        placeholder = "0.5";
        description = "kg (0.1 to 1.2 kg)";
        break;
      case "gain":
        label = "Weight to gain per week";
        placeholder = "0.5";
        description = "kg (0.1 to 1.2 kg)";
        break;
      default:
        return null;
    }
    
    return (
      <div className="space-y-2">
        <label htmlFor="goalAmount" className="text-sm font-medium">{label}</label>
        <div className="flex items-center">
          <Input
            id="goalAmount"
            name="goalAmount"
            type="number"
            placeholder={placeholder}
            value={formData.goalAmount}
            onChange={handleChange}
            min="0.1"
            max="1.2"
            step="0.1"
            className="bg-secondary/50"
          />
          <span className="ml-2 text-sm text-muted-foreground">{description}</span>
        </div>
      </div>
    );
  };

  return (
    <Card className="glass-card animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl text-gradient">Update Your Profile</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="height" className="text-sm font-medium">Height (cm)</label>
              <Input
                id="height"
                name="height"
                type="number"
                placeholder="175"
                value={formData.height}
                onChange={handleChange}
                required
                className="bg-secondary/50"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="weight" className="text-sm font-medium">Weight (kg)</label>
              <Input
                id="weight"
                name="weight"
                type="number"
                placeholder="70"
                value={formData.weight}
                onChange={handleChange}
                required
                className="bg-secondary/50"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="age" className="text-sm font-medium">Age</label>
              <Input
                id="age"
                name="age"
                type="number"
                placeholder="30"
                value={formData.age}
                onChange={handleChange}
                required
                className="bg-secondary/50"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="sex" className="text-sm font-medium">Sex</label>
              <Select
                value={formData.sex}
                onValueChange={(value) => handleSelectChange("sex", value)}
              >
                <SelectTrigger id="sex" className="bg-secondary/50">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="activityLevel" className="text-sm font-medium">Activity Level</label>
            <Select
              value={formData.activityLevel}
              onValueChange={(value) => handleSelectChange("activityLevel", value)}
            >
              <SelectTrigger id="activityLevel" className="bg-secondary/50">
                <SelectValue placeholder="Select your activity level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                <SelectItem value="light">Lightly active (light exercise 1-3 days/week)</SelectItem>
                <SelectItem value="moderate">Moderately active (moderate exercise 3-5 days/week)</SelectItem>
                <SelectItem value="active">Very active (hard exercise 6-7 days/week)</SelectItem>
                <SelectItem value="extreme">Extremely active (very hard exercise, physical job or training twice a day)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="goal" className="text-sm font-medium">Fitness Goal</label>
            <Select
              value={formData.goal}
              onValueChange={(value) => handleSelectChange("goal", value)}
            >
              <SelectTrigger id="goal" className="bg-secondary/50">
                <SelectValue placeholder="Select your goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lose">Lose Weight</SelectItem>
                <SelectItem value="maintain">Maintain Weight</SelectItem>
                <SelectItem value="gain">Gain Weight</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {renderGoalAmountField()}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
