
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Camera, Upload, Image as ImageIcon, Calendar, Plus, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Project {
  id: string;
  title: string;
  client_name: string | null;
  shoot_date: string | null;
  status: string;
  created_at: string;
  image_count?: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [stats, setStats] = useState({
    activeProjects: 0,
    totalPhotos: 0,
    pendingBookings: 0,
    storageUsed: "0 MB"
  });

  useEffect(() => {
    if (user) {
      fetchProjects();
      fetchStats();
    }
  }, [user]);

  const fetchProjects = async () => {
    if (!user) return;
    
    const { data: projectsData, error } = await supabase
      .from('projects')
      .select(`
        id,
        title,
        client_name,
        shoot_date,
        status,
        created_at,
        images(count)
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(3);

    if (error) {
      console.error('Error fetching projects:', error);
      return;
    }

    if (projectsData) {
      const projectsWithCount = projectsData.map(project => ({
        ...project,
        image_count: project.images?.[0]?.count || 0
      }));
      setProjects(projectsWithCount);
    }
  };

  const fetchStats = async () => {
    if (!user) return;

    // Get active projects count
    const { count: activeProjectsCount } = await supabase
      .from('projects')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .in('status', ['In Progress', 'Editing']);

    // Get total photos count
    const { count: totalPhotosCount } = await supabase
      .from('images')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    // Get pending bookings count
    const { count: pendingBookingsCount } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'Pending');

    setStats({
      activeProjects: activeProjectsCount || 0,
      totalPhotos: totalPhotosCount || 0,
      pendingBookings: pendingBookingsCount || 0,
      storageUsed: "0 MB" // This would need storage API to calculate
    });
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  const statsCards = [
    { title: "Active Projects", value: stats.activeProjects.toString(), icon: Camera, color: "from-studio-blue to-studio-accent" },
    { title: "Total Photos", value: stats.totalPhotos.toString(), icon: ImageIcon, color: "from-studio-accent to-studio-blue" },
    { title: "Pending Bookings", value: stats.pendingBookings.toString(), icon: Calendar, color: "from-purple-500 to-pink-500" },
    { title: "Storage Used", value: stats.storageUsed, icon: Upload, color: "from-green-500 to-emerald-500" },
  ];

  return (
    <div className="flex min-h-screen w-full bg-studio-dark">
      <AppSidebar />
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <SidebarTrigger className="text-white hover:bg-studio-midnight" />
            <div>
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user?.user_metadata?.full_name || user?.email}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button 
              onClick={() => navigate("/projects")}
              className="bg-gradient-to-r from-studio-blue to-studio-accent hover:from-studio-blue-light hover:to-studio-accent/80"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
            <Button 
              onClick={handleSignOut}
              variant="outline"
              className="border-white/20 text-white hover:bg-studio-midnight"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <Card key={index} className="glass-effect border-white/10 hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass-effect border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                Recent Projects
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/projects")}
                  className="text-studio-blue hover:text-studio-blue-light"
                >
                  View All
                </Button>
              </CardTitle>
              <CardDescription>Your latest photography projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.length > 0 ? projects.map((project) => (
                  <div 
                    key={project.id} 
                    className="flex items-center justify-between p-3 rounded-lg bg-studio-midnight/50 hover:bg-studio-midnight transition-colors cursor-pointer"
                    onClick={() => navigate("/projects")}
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{project.title}</h4>
                      <p className="text-sm text-muted-foreground">{project.client_name || 'No client assigned'}</p>
                      <p className="text-xs text-muted-foreground">{project.image_count || 0} photos</p>
                    </div>
                    <div className="text-right">
                      <Badge 
                        className={
                          project.status === "Completed" || project.status === "Delivered"
                            ? "bg-green-500/20 text-green-400 border-green-500/30" 
                            : project.status === "In Progress"
                            ? "bg-studio-blue/20 text-studio-blue border-studio-blue/30"
                            : "bg-orange-500/20 text-orange-400 border-orange-500/30"
                        }
                      >
                        {project.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {project.shoot_date ? new Date(project.shoot_date).toLocaleDateString() : 'No date set'}
                      </p>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8">
                    <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No projects yet</p>
                    <Button
                      onClick={() => navigate("/projects")}
                      className="mt-2 bg-gradient-to-r from-studio-blue to-studio-accent"
                    >
                      Create Your First Project
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
              <CardDescription>Commonly used features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/projects")}
                  className="h-20 flex-col space-y-2 border-studio-blue/30 hover:bg-studio-blue/10"
                >
                  <Camera className="w-6 h-6" />
                  <span>New Project</span>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/gallery")}
                  className="h-20 flex-col space-y-2 border-studio-accent/30 hover:bg-studio-accent/10"
                >
                  <Upload className="w-6 h-6" />
                  <span>Upload Photos</span>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/bookings")}
                  className="h-20 flex-col space-y-2 border-purple-500/30 hover:bg-purple-500/10"
                >
                  <Calendar className="w-6 h-6" />
                  <span>View Bookings</span>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/gallery")}
                  className="h-20 flex-col space-y-2 border-green-500/30 hover:bg-green-500/10"
                >
                  <ImageIcon className="w-6 h-6" />
                  <span>Browse Gallery</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
