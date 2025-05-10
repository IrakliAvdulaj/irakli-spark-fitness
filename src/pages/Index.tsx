
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    
    if (user.email) {
      // If admin, redirect to admin dashboard
      if (user.email === "avdulajirakli@gmail.com") {
        navigate("/admin-dashboard");
        return;
      }
      
      // If user has completed onboarding, redirect to dashboard
      const hasCompletedOnboarding = localStorage.getItem(`onboarding-${user.email}`);
      if (hasCompletedOnboarding) {
        navigate("/dashboard");
      } else {
        navigate("/onboarding");
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h1 className="text-6xl font-bold text-gradient tracking-tight">
          CoachIrakli
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-lg mx-auto">
          Your personal coach for fitness goals, nutrition plans, and daily motivation.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button 
            size="lg" 
            className="px-8 py-6 text-lg"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="px-8 py-6 text-lg"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <FeatureCard 
            title="Personalized Nutrition" 
            description="Get meal plans and calorie targets tailored to your unique goals and body type."
          />
          <FeatureCard 
            title="Progress Tracking" 
            description="Monitor your fitness journey with easy-to-understand metrics and visualizations."
          />
          <FeatureCard 
            title="Daily Motivation" 
            description="Receive motivational content directly from Coach Irakli to keep you inspired."
          />
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard = ({ title, description }: FeatureCardProps) => {
  return (
    <div className="glass-card p-6 rounded-lg text-center">
      <h3 className="text-lg font-medium text-primary mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Index;
