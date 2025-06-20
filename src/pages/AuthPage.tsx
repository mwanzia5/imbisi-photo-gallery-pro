
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuth = async (type: "signin" | "signup") => {
    setIsLoading(true);
    
    // Simulate authentication - in real app, this would use Supabase
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: type === "signin" ? "Welcome back!" : "Account created!",
      description: type === "signin" ? "Successfully signed in to your account." : "Your account has been created successfully.",
    });
    
    navigate("/dashboard");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-studio-dark via-studio-midnight to-studio-slate flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-studio-blue to-studio-accent rounded-2xl mb-4">
            <Camera className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold gradient-text">Imbisi Studio</h1>
          <p className="text-muted-foreground mt-2">Professional Photography Management</p>
        </div>

        <Card className="glass-effect border-white/10">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome</CardTitle>
            <CardDescription>
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-studio-midnight">
                <TabsTrigger value="signin" className="data-[state=active]:bg-studio-blue">Sign In</TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-studio-blue">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
                <form onSubmit={(e) => { e.preventDefault(); handleAuth("signin"); }} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your email"
                      className="bg-studio-midnight border-white/20 focus:border-studio-blue"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Enter your password"
                      className="bg-studio-midnight border-white/20 focus:border-studio-blue"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-studio-blue to-studio-accent hover:from-studio-blue-light hover:to-studio-accent/80"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={(e) => { e.preventDefault(); handleAuth("signup"); }} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        placeholder="John"
                        className="bg-studio-midnight border-white/20 focus:border-studio-blue"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        placeholder="Doe"
                        className="bg-studio-midnight border-white/20 focus:border-studio-blue"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your email"
                      className="bg-studio-midnight border-white/20 focus:border-studio-blue"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Create a password"
                      className="bg-studio-midnight border-white/20 focus:border-studio-blue"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-studio-blue to-studio-accent hover:from-studio-blue-light hover:to-studio-accent/80"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 text-center">
              <Button 
                variant="link" 
                className="text-studio-blue hover:text-studio-blue-light"
                onClick={() => navigate("/")}
              >
                ← Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
