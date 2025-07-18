
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Plus, Calendar, MapPin, User, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface Project {
  id: string;
  title: string;
  description: string | null;
  client_name: string | null;
  shoot_date: string | null;
  location: string | null;
  status: string;
  created_at: string;
  image_count?: number;
}

const Projects = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading) {
      if (user) {
        fetchProjects();
      } else {
        setProjects([]);
        setLoading(false);
      }
    }
  }, [user, authLoading]);

  const fetchProjects = async () => {
    if (!user) {
      console.log('No user authenticated for fetching projects');
      setProjects([]);
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      console.log('Fetching projects for demo user:', user.id);
      
      // For demo purposes, load projects from localStorage
      const storedProjects = localStorage.getItem(`projects-${user.id}`);
      if (storedProjects) {
        const projects = JSON.parse(storedProjects);
        // Also get image count for each project from localStorage
        const projectsWithImageCount = projects.map((project: Project) => {
          const storedImages = localStorage.getItem(`images-${user.id}-${project.id}`);
          const imageCount = storedImages ? JSON.parse(storedImages).length : 0;
          return { ...project, image_count: imageCount };
        });
        setProjects(projectsWithImageCount);
        console.log('Demo projects loaded:', projectsWithImageCount);
      } else {
        setProjects([]);
      }
    } catch (error) {
      console.error('Error loading demo projects:', error);
      setProjects([]);
    }
    setLoading(false);
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to create a project.",
        variant: "destructive",
      });
      return;
    }

    setCreating(true);
    const formData = new FormData(e.target as HTMLFormElement);
    
    // Create new project for demo
    const newProject: Project = {
      id: `project-${Date.now()}`,
      title: formData.get("title") as string,
      description: formData.get("description") as string || null,
      client_name: formData.get("client") as string || null,
      shoot_date: formData.get("date") as string || null,
      location: formData.get("location") as string || null,
      status: formData.get("status") as string || "In Progress",
      created_at: new Date().toISOString(),
      image_count: 0
    };

    console.log('Creating demo project:', newProject);

    try {
      // Store in localStorage for demo
      const existingProjects = JSON.parse(localStorage.getItem(`projects-${user.id}`) || '[]');
      existingProjects.unshift(newProject);
      localStorage.setItem(`projects-${user.id}`, JSON.stringify(existingProjects));

      console.log('Demo project created successfully:', newProject);
      toast({
        title: "Success",
        description: "Your new project has been created successfully.",
      });
      setIsDialogOpen(false);
      (e.target as HTMLFormElement).reset();
      fetchProjects(); // Refresh the list
    } catch (error) {
      console.error('Error creating demo project:', error);
      toast({
        title: "Error",
        description: "An error occurred while creating the project.",
        variant: "destructive",
      });
    }
    setCreating(false);
  };

  const handleViewProject = (projectId: string) => {
    // Navigate to gallery with project filter
    navigate(`/gallery?project=${projectId}`);
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

  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen w-full bg-studio-dark">
        <AppSidebar />
        <main className="flex-1 p-6 flex items-center justify-center">
          <div className="text-white">Loading projects...</div>
        </main>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen w-full bg-studio-dark">
        <AppSidebar />
        <main className="flex-1 p-6 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Authentication Required</h2>
            <p className="text-muted-foreground mb-6">Please sign in to manage your projects</p>
            <Button
              onClick={() => window.location.href = '/auth'}
              className="bg-gradient-to-r from-studio-blue to-studio-accent"
            >
              Sign In
            </Button>
          </div>
        </main>
      </div>
    );
  }

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
                    name="title"
                    placeholder="e.g., Wedding Photography"
                    className="bg-studio-dark border-white/20 focus:border-studio-blue"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client">Client Name</Label>
                  <Input 
                    id="client" 
                    name="client"
                    placeholder="e.g., John & Jane Doe"
                    className="bg-studio-dark border-white/20 focus:border-studio-blue"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Shoot Date</Label>
                    <Input 
                      id="date" 
                      name="date"
                      type="date"
                      className="bg-studio-dark border-white/20 focus:border-studio-blue"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select name="status" defaultValue="In Progress">
                      <SelectTrigger className="bg-studio-dark border-white/20 focus:border-studio-blue">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Editing">Editing</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Delivered">Delivered</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    name="location"
                    placeholder="e.g., Central Park"
                    className="bg-studio-dark border-white/20 focus:border-studio-blue"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    name="description"
                    placeholder="Brief description of the project..."
                    className="bg-studio-dark border-white/20 focus:border-studio-blue"
                    rows={3}
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={creating}
                  className="w-full bg-gradient-to-r from-studio-blue to-studio-accent hover:from-studio-blue-light hover:to-studio-accent/80"
                >
                  {creating ? "Creating..." : "Create Project"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="glass-effect border-white/10 hover-lift group overflow-hidden">
                <div className="relative h-48 bg-gradient-to-br from-studio-blue/20 to-studio-accent/20 flex items-center justify-center">
                  <Camera className="w-16 h-16 text-studio-blue/50" />
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
                  <CardDescription>{project.description || 'No description provided'}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  {project.client_name && (
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <User className="w-4 h-4" />
                      <span>{project.client_name}</span>
                    </div>
                  )}
                  {project.shoot_date && (
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(project.shoot_date).toLocaleDateString()}</span>
                    </div>
                  )}
                  {project.location && (
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{project.location}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <span className="text-sm text-muted-foreground">{project.image_count || 0} photos</span>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-studio-blue/30 text-studio-blue hover:bg-studio-blue hover:text-white"
                        onClick={() => handleViewProject(project.id)}
                      >
                        <ImageIcon className="w-4 h-4 mr-1" />
                        Gallery
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No projects yet</h3>
            <p className="text-muted-foreground mb-6">Create your first photography project to get started</p>
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="bg-gradient-to-r from-studio-blue to-studio-accent"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Project
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Projects;
