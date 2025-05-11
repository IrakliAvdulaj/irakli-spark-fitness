
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

type AuthFormProps = {
  isLogin?: boolean;
};

export function AuthForm({ isLogin = true }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isLogin) {
        // Handle login
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (error) throw error;
        
        // Store user data in localStorage for future reference
        localStorage.setItem("user", JSON.stringify(data.user));
        
        // Check if admin email - convert to lowercase for case-insensitive comparison
        if (email.toLowerCase() === "avdulajirakli@gmail.com") {
          // Set admin flag in localStorage for future auth checks
          localStorage.setItem("isAdmin", "true");
          
          toast({
            title: "Welcome back, Coach Irakli!",
            description: "You've been logged in as an administrator.",
          });
          navigate("/admin-dashboard");
          return;
        } else {
          // Not admin, clear any admin flags
          localStorage.removeItem("isAdmin");
        }
        
        toast({
          title: "Welcome back!",
          description: "You've been logged in successfully.",
        });
        
        // Check if user has completed onboarding
        const { data: profileData } = await supabase
          .from('user_profiles')
          .select('id')
          .eq('user_id', data.user.id)
          .single();
        
        if (profileData) {
          navigate("/dashboard");
        } else {
          // Check legacy localStorage
          const hasCompletedOnboarding = localStorage.getItem(`onboarding-${email}`);
          if (hasCompletedOnboarding) {
            navigate("/dashboard");
          } else {
            navigate("/onboarding");
          }
        }
      } else {
        // Handle registration
        const { data, error } = await supabase.auth.signUp({
          email,
          password
        });
        
        if (error) throw error;
        
        // Store user data for future reference
        localStorage.setItem("user", JSON.stringify(data.user));
        
        toast({
          title: "Account created!",
          description: "Your account has been created successfully.",
        });
        navigate("/onboarding");
      }
    } catch (error: any) {
      toast({
        title: "Authentication error",
        description: error.error_description || error.message || "An error occurred during authentication",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto glass-card animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl text-gradient">
          {isLogin ? "Login to CoachIrakli" : "Create an Account"}
        </CardTitle>
        <CardDescription>
          {isLogin 
            ? "Enter your credentials to access your fitness journey"
            : "Join CoachIrakli's fitness community today"
          }
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-secondary/50"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-secondary/50"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate(isLogin ? "/register" : "/login")}
            className="border-primary/50 hover:bg-primary/10 text-foreground"
          >
            {isLogin ? "Create account" : "Back to login"}
          </Button>
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-[#222222] hover:bg-[#333333] text-white"
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Register"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
