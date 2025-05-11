
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    
    if (user.email) {
      // If admin, redirect to admin dashboard
      if (user.email === "avdulajirakli@gmail.com" || localStorage.getItem("isAdmin") === "true") {
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
    <div className="min-h-screen flex flex-col items-center bg-background">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-br from-[#1A1F2C] to-[#2E1065] py-24 px-4 flex items-center justify-center">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <div className="animate-fade-in-up">
            <h1 className="text-7xl font-extrabold text-gradient tracking-tight mb-4">
              CoachIrakli
            </h1>
            <p className="text-2xl text-white/90 max-w-2xl mx-auto">
              AI-Powered Fitness Coaching Tailored to Your Unique Body and Goals
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 animate-fade-in-up animation-delay-200">
            <Button 
              size="lg" 
              className="px-8 py-6 text-lg bg-[#222222] hover:bg-[#333333] text-white border border-white/30"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button 
              size="lg" 
              className="px-8 py-6 text-lg bg-[#222222] hover:bg-[#333333] text-white border border-white/30"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </Button>
          </div>
          
          <div className="mt-16 animate-bounce flex flex-col items-center">
            <p className="text-white/70 mb-2">Discover More</p>
            <ArrowDown className="text-white/70" size={24} />
          </div>
        </div>
      </div>
      
      {/* Transformation Carousel Section */}
      <div className="py-12 px-4 w-full max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gradient mb-4">Real Transformations</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See the incredible results our clients have achieved with Coach Irakli's plans
          </p>
        </div>
        
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1 h-full">
                <div className="glass-card rounded-lg overflow-hidden h-full flex flex-col">
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1611672585731-fa10603fb9e0?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3" 
                      alt="Before and after transformation" 
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <p className="text-white text-lg font-bold">John's Journey</p>
                      <p className="text-white/80 text-sm">Lost 15kg in 6 months</p>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1 h-full">
                <div className="glass-card rounded-lg overflow-hidden h-full flex flex-col">
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3" 
                      alt="Before and after transformation" 
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <p className="text-white text-lg font-bold">Sarah's Story</p>
                      <p className="text-white/80 text-sm">Gained muscle definition in 3 months</p>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1 h-full">
                <div className="glass-card rounded-lg overflow-hidden h-full flex flex-col">
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1594882645126-14020914d58d?q=80&w=3085&auto=format&fit=crop&ixlib=rb-4.0.3" 
                      alt="Before and after transformation" 
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <p className="text-white text-lg font-bold">Mike's Progress</p>
                      <p className="text-white/80 text-sm">Transformed body composition in 4 months</p>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="left-0 lg:-left-12" />
          <CarouselNext className="right-0 lg:-right-12" />
        </Carousel>
      </div>
      
      {/* Features Section */}
      <div className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gradient mb-4">Powered by Advanced Technology</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our platform combines cutting-edge AI with proven fitness science to create personalized experiences
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <FeatureCard 
            title="AI-Driven Nutrition Analysis" 
            description="Our machine learning algorithms analyze thousands of food combinations to create perfectly balanced meals that match your exact caloric needs."
            icon="🧠"
          />
          <FeatureCard 
            title="Precise Macro Tracking" 
            description="Visual tracking of macronutrients with our intuitive circular graphs shows exactly how your diet breaks down to support your fitness goals."
            icon="📊"
          />
          <FeatureCard 
            title="Personalized Daily Motivation" 
            description="Receive curated motivational content crafted by Coach Irakli to keep you inspired and accountable on your fitness journey."
            icon="💪"
          />
        </div>
      </div>
      
      {/* How It Works Section */}
      <div className="w-full bg-gradient-to-br from-[#E5DEFF] to-[#D6BCFA] dark:from-[#2E1065] dark:to-[#1A1F2C] py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gradient mb-4">How It Works</h2>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Your fitness journey in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <StepCard 
              number="1"
              title="Complete Your Profile" 
              description="Enter your body metrics, activity level, and specific fitness goals."
            />
            <StepCard 
              number="2"
              title="Get Your Personalized Plan" 
              description="Receive an instantly calculated nutrition plan with exact macronutrients."
            />
            <StepCard 
              number="3"
              title="Track & Adjust" 
              description="Update your profile as you progress to keep your plan optimal for your changing goals."
            />
          </div>
          
          <div className="flex justify-center mt-16">
            <Button 
              size="lg" 
              className="px-8 py-6 text-lg bg-[#8B5CF6] hover:bg-[#7E69AB] text-white"
              onClick={() => navigate("/register")}
            >
              Start Your Journey Now
            </Button>
          </div>
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gradient mb-4">Success Stories</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands who've transformed their fitness with Coach Irakli
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard 
            quote="The personalized meal plans completely changed how I approach nutrition. I've lost 12kg in 3 months!"
            name="Maria K."
            role="Lost 12kg in 3 months"
          />
          <TestimonialCard 
            quote="As an athlete, precise macros are critical. This app delivers exactly what I need to perform at my best."
            name="David T."
            role="Professional swimmer"
          />
          <TestimonialCard 
            quote="The daily motivational posts keep me going. It's like having Coach Irakli in my pocket every day!"
            name="Sophia J."
            role="Gained muscle mass"
          />
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="w-full bg-gradient-to-r from-[#6E59A5] to-[#8B5CF6] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Fitness?</h2>
          <p className="text-xl mb-8">Join CoachIrakli today and get your personalized nutrition and fitness plan in minutes.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="px-8 py-5 text-lg bg-[#222222] hover:bg-[#333333] text-white border border-white/30"
              onClick={() => navigate("/register")}
            >
              Sign Up Now
            </Button>
            <Button 
              size="lg" 
              className="px-8 py-5 text-lg bg-[#222222] hover:bg-[#333333] text-white border border-white/30"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="w-full py-8 px-4 bg-background border-t">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-lg font-semibold text-gradient mb-4 md:mb-0">CoachIrakli</p>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} CoachIrakli. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
  return (
    <div className="glass-card p-8 rounded-lg text-center transition-transform hover:scale-105 duration-300">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-medium text-primary mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

interface StepCardProps {
  number: string;
  title: string;
  description: string;
}

const StepCard = ({ number, title, description }: StepCardProps) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="h-16 w-16 rounded-full bg-[#8B5CF6] text-white text-2xl font-bold flex items-center justify-center mb-4">
        {number}
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
}

const TestimonialCard = ({ quote, name, role }: TestimonialCardProps) => {
  return (
    <div className="glass-card p-6 rounded-lg">
      <p className="text-lg mb-4">"{quote}"</p>
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </div>
  );
};

export default Index;
