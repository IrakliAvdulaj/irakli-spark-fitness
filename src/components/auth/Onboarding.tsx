
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export function Onboarding() {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    height: "",
    weight: "",
    age: "",
    sex: "",
    activityLevel: "",
    goal: ""
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // In a real app, this would save the data to a database
    setTimeout(() => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      localStorage.setItem(`onboarding-${user.email}`, "completed");
      localStorage.setItem(`userData-${user.email}`, JSON.stringify(userData));
      
      setLoading(false);
      toast({
        title: "Profile complete!",
        description: "Your fitness profile has been created successfully.",
      });
      navigate("/dashboard");
    }, 1500);
  };

  const handleNext = () => {
    if (step === 1) {
      if (!userData.height || !userData.weight || !userData.age || !userData.sex) {
        toast({
          title: "Missing information",
          description: "Please fill all required fields to continue.",
          variant: "destructive",
        });
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  return (
    <Card className="w-full max-w-lg mx-auto glass-card animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl text-gradient">Complete Your Profile</CardTitle>
        <CardDescription>
          We need some information to personalize your fitness journey
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="height" className="text-sm font-medium">Height (cm)</label>
                  <Input
                    id="height"
                    name="height"
                    type="number"
                    placeholder="175"
                    value={userData.height}
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
                    value={userData.weight}
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
                    value={userData.age}
                    onChange={handleChange}
                    required
                    className="bg-secondary/50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="sex" className="text-sm font-medium">Sex</label>
                  <Select
                    value={userData.sex}
                    onValueChange={(value) => handleSelectChange("sex", value)}
                  >
                    <SelectTrigger id="sex" className="bg-secondary/50">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="activityLevel" className="text-sm font-medium">Activity Level</label>
                <Select
                  value={userData.activityLevel}
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
                  value={userData.goal}
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
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step === 1 ? (
            <>
              <Button type="button" variant="outline" onClick={() => navigate("/login")}>
                Cancel
              </Button>
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            </>
          ) : (
            <>
              <Button type="button" variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button type="submit" disabled={loading || !userData.activityLevel || !userData.goal}>
                {loading ? "Processing..." : "Complete Profile"}
              </Button>
            </>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
