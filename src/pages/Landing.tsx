
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, Image as ImageIcon } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleGetStarted = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Smooth transition
    navigate("/auth");
    setIsLoading(false);
  };

  const features = [
    {
      icon: Camera,
      title: "Project Management",
      description: "Organize your photography projects with clients, dates, and locations"
    },
    {
      icon: Upload,
      title: "Image Upload",
      description: "Secure cloud storage with instant preview and gallery organization"
    },
    {
      icon: ImageIcon,
      title: "Client Access",
      description: "Give clients secure access to view and download their photos"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-studio-dark via-studio-midnight to-studio-slate">
      {/* Header */}
      <header className="border-b border-white/10 glass-effect">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-studio-blue to-studio-accent rounded-xl flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold gradient-text">Imbisi Studio</h1>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate("/auth")}
              className="border-studio-blue text-studio-blue hover:bg-studio-blue hover:text-white transition-all duration-300"
            >
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-6 bg-studio-blue/20 text-studio-blue border-studio-blue/30">
            Professional Photography Management
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Manage Your Photography
            <span className="gradient-text block">Projects with Style</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Streamline your photography workflow with professional project management, 
            secure client galleries, and seamless booking systems.
          </p>
          <Button 
            size="lg" 
            onClick={handleGetStarted}
            disabled={isLoading}
            className="bg-gradient-to-r from-studio-blue to-studio-accent hover:from-studio-blue-light hover:to-studio-accent/80 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-2xl hover-lift"
          >
            {isLoading ? "Loading..." : "Start Your Journey"}
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything You Need to <span className="gradient-text">Succeed</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="glass-effect hover-lift border-white/10">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-studio-blue to-studio-accent rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <Card className="glass-effect border-white/10 hover-lift">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Transform Your <span className="gradient-text">Photography Business?</span>
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Join photographers worldwide who trust Imbisi Studio for their project management needs.
              </p>
              <Button 
                size="lg"
                onClick={handleGetStarted}
                disabled={isLoading}
                className="bg-gradient-to-r from-studio-blue to-studio-accent hover:from-studio-blue-light hover:to-studio-accent/80 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-2xl"
              >
                Get Started Free
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>&copy; 2024 Imbisi Studio. Crafted with passion for photographers.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
