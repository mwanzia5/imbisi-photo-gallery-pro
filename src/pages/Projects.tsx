
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Camera, Plus, Calendar, MapPin, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Projects = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const projects = [
    {
      id: 1,
      title: "Sarah & Mike Wedding",
      description: "Beautiful outdoor wedding ceremony and reception",
      client: "Sarah Johnson",
      date: "2024-01-15",
      location: "Central Park, NYC",
      status: "In Progress",
      photos: 156,
      coverImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400"
    },
    {
      id: 2,
      title: "Corporate Headshots",
      description: "Professional headshots for tech company executives",
      client: "TechCorp Inc.",
      date: "2024-01-10",
      location: "Downtown Office",
      status: "Completed",
      photos: 45,
      coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400"
    },
    {
      id: 3,
      title: "Product Photography",
      description: "Fashion brand product catalog shoot",
      client: "Fashion Brand Co.",
      date: "2024-01-08",
      location: "Studio A",
      status: "Editing",
      photos: 89,
      coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400"
    },
    {
      id: 4,
      title: "Family Portrait Session",
      description: "Annual family photos at the beach",
      client: "The Anderson Family",
      date: "2024-01-05",
      location: "Santa Monica Beach",
      status: "Delivered",
      photos: 67,
      coverImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400"
    },
  ];

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Project Created",
      description: "Your new project has been created successfully.",
    });
    setIsDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
      case "Delivered":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "In Progress":
        return "bg-studio-blue/20 text-studio-blue border-studio-blue/30";
      case "Editing":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-studio-dark">
      <AppSidebar />
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <SidebarTrigger className="text-white hover:bg-studio-midnight" />
            <div>
              <h1 className="text-3xl font-bold text-white">Projects</h1>
              <p className="text-muted-foreground">Manage your photography projects</p>
            </div>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-studio-blue to-studio-accent hover:from-studio-blue-light hover:to-studio-accent/80">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-studio-midnight border-white/10">
              <DialogHeader>
                <DialogTitle className="text-white">Create New Project</DialogTitle>
                <DialogDescription>
                  Add a new photography project to your portfolio
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateProject} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input 
                    id="title" 
                    placeholder="e.g., Wedding Photography"
                    className="bg-studio-dark border-white/20 focus:border-studio-blue"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client">Client Name</Label>
                  <Input 
                    id="client" 
                    placeholder="e.g., John & Jane Doe"
                    className="bg-studio-dark border-white/20 focus:border-studio-blue"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Shoot Date</Label>
                    <Input 
                      id="date" 
                      type="date"
                      className="bg-studio-dark border-white/20 focus:border-studio-blue"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      placeholder="e.g., Central Park"
                      className="bg-studio-dark border-white/20 focus:border-studio-blue"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Brief description of the project..."
                    className="bg-studio-dark border-white/20 focus:border-studio-blue"
                    rows={3}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-studio-blue to-studio-accent hover:from-studio-blue-light hover:to-studio-accent/80"
                >
                  Create Project
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="glass-effect border-white/10 hover-lift group overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.coverImage} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-studio-dark/80 to-transparent" />
                <Badge 
                  className={`absolute top-4 right-4 ${getStatusColor(project.status)}`}
                >
                  {project.status}
                </Badge>
              </div>
              
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Camera className="w-5 h-5 text-studio-blue" />
                  <span>{project.title}</span>
                </CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span>{project.client}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(project.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-sm text-muted-foreground">{project.photos} photos</span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-studio-blue/30 text-studio-blue hover:bg-studio-blue hover:text-white"
                  >
                    View Project
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Projects;
