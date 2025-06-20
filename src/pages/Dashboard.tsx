
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Camera, Upload, Image as ImageIcon, Calendar, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { title: "Active Projects", value: "12", icon: Camera, color: "from-studio-blue to-studio-accent" },
    { title: "Total Photos", value: "1,247", icon: ImageIcon, color: "from-studio-accent to-studio-blue" },
    { title: "Pending Bookings", value: "5", icon: Calendar, color: "from-purple-500 to-pink-500" },
    { title: "Storage Used", value: "2.3 GB", icon: Upload, color: "from-green-500 to-emerald-500" },
  ];

  const recentProjects = [
    { 
      title: "Sarah & Mike Wedding", 
      client: "Sarah Johnson", 
      date: "2024-01-15", 
      status: "In Progress",
      photos: 156 
    },
    { 
      title: "Corporate Headshots", 
      client: "TechCorp Inc.", 
      date: "2024-01-10", 
      status: "Completed",
      photos: 45 
    },
    { 
      title: "Product Photography", 
      client: "Fashion Brand", 
      date: "2024-01-08", 
      status: "Editing",
      photos: 89 
    },
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
              <p className="text-muted-foreground">Welcome back to your photography studio</p>
            </div>
          </div>
          <Button 
            onClick={() => navigate("/projects")}
            className="bg-gradient-to-r from-studio-blue to-studio-accent hover:from-studio-blue-light hover:to-studio-accent/80"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
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
              <CardTitle className="text-white">Recent Projects</CardTitle>
              <CardDescription>Your latest photography projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProjects.map((project, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-studio-midnight/50 hover:bg-studio-midnight transition-colors">
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{project.title}</h4>
                      <p className="text-sm text-muted-foreground">{project.client}</p>
                      <p className="text-xs text-muted-foreground">{project.photos} photos</p>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={project.status === "Completed" ? "default" : "secondary"}
                        className={project.status === "Completed" 
                          ? "bg-green-500/20 text-green-400 border-green-500/30" 
                          : project.status === "In Progress"
                          ? "bg-studio-blue/20 text-studio-blue border-studio-blue/30"
                          : "bg-orange-500/20 text-orange-400 border-orange-500/30"
                        }
                      >
                        {project.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{project.date}</p>
                    </div>
                  </div>
                ))}
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
