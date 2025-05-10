
import { AuthForm } from "@/components/auth/AuthForm";
import { HomeButton } from "@/components/navigation/HomeButton";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="absolute top-4 left-4">
        <HomeButton />
      </div>
      
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gradient mb-2">CoachIrakli</h1>
          <p className="text-muted-foreground">Log in to access your personalized fitness journey</p>
        </div>
        <AuthForm isLogin={true} />
      </div>
    </div>
  );
};

export default Login;
