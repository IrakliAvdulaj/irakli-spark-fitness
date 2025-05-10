
import { Onboarding } from "@/components/auth/Onboarding";

const OnboardingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gradient mb-2">CoachIrakli</h1>
          <p className="text-muted-foreground">Let's personalize your fitness journey</p>
        </div>
        <Onboarding />
      </div>
    </div>
  );
};

export default OnboardingPage;
