
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Image as ImageIcon, Search, X, FolderOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useSearchParams, useNavigate } from "react-router-dom";

interface Image {
  id: string;
  url: string;
  filename: string;
  tags: string[] | null;
  created_at: string;
  project_id: string;
  project_title?: string;
}

interface Project {
  id: string;
  title: string;
}

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState<string>("all");
  const [images, setImages] = useState<Image[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchImages();
      fetchProjects();
      
      // Check if we have a project filter from URL
      const projectParam = searchParams.get('project');
      if (projectParam) {
        setSelectedProject(projectParam);
      }
    }
  }, [user, searchParams]);

  const fetchImages = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      console.log('Fetching images for user:', user.id);
      
      // For demo purposes, load images from localStorage across all projects
      const allImages: Image[] = [];
      const storedProjects = localStorage.getItem(`projects-${user.id}`);
      
      if (storedProjects) {
        const projects = JSON.parse(storedProjects);
        for (const project of projects) {
          const storedImages = localStorage.getItem(`images-${user.id}-${project.id}`);
          if (storedImages) {
            const projectImages = JSON.parse(storedImages).map((img: any) => ({
              ...img,
              project_title: project.title
            }));
            allImages.push(...projectImages);
          }
        }
      }
      
      // Sort by created_at descending
      allImages.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setImages(allImages);
      console.log('Demo images loaded:', allImages);
    } catch (error) {
      console.error('Unexpected error fetching images:', error);
      setImages([]);
    }
    setLoading(false);
  };

  const fetchProjects = async () => {
    if (!user) return;
    
    try {
      // For demo purposes, load projects from localStorage
      const storedProjects = localStorage.getItem(`projects-${user.id}`);
      if (storedProjects) {
        const projects = JSON.parse(storedProjects);
        setProjects(projects);
      } else {
        setProjects([]);
      }
    } catch (error) {
      console.error('Unexpected error fetching projects:', error);
      setProjects([]);
    }
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0 || !user) return;
    
    if (projects.length === 0) {
      toast({
        title: "No Projects Found",
        description: "Please create a project first before uploading images.",
        variant: "destructive",
      });
      return;
    }

    // If a specific project is selected, use it; otherwise use the first project
    const targetProjectId = selectedProject !== "all" ? selectedProject : projects[0].id;
    const targetProject = projects.find(p => p.id === targetProjectId) || projects[0];

    setUploading(true);
    
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        // Create a mock URL for demo purposes (in production, this would be Supabase Storage)
        const mockUrl = URL.createObjectURL(file);
        
        // Create image object for demo
        const newImage: Image = {
          id: `img-${Date.now()}-${Math.random().toString(36).substring(7)}`,
          url: mockUrl,
          filename: file.name,
          project_id: targetProject.id,
          project_title: targetProject.title,
          tags: ['uploaded'],
          created_at: new Date().toISOString()
        };

        // Store in localStorage for demo
        const existingImages = JSON.parse(localStorage.getItem(`images-${user.id}-${targetProject.id}`) || '[]');
        existingImages.unshift(newImage);
        localStorage.setItem(`images-${user.id}-${targetProject.id}`, JSON.stringify(existingImages));

        return true;
      });

      const results = await Promise.all(uploadPromises);
      const successCount = results.filter(Boolean).length;
      
      if (successCount > 0) {
        toast({
          title: "Upload Successful",
          description: `${successCount} image(s) uploaded to ${targetProject.title}.`,
        });
        fetchImages(); // Refresh the gallery
      }
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to upload images. Please try again.",
        variant: "destructive",
      });
    }
    
    setUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const filteredImages = images.filter(image => {
    const matchesSearch = image.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.project_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesProject = selectedProject === "all" || image.project_id === selectedProject;
    
    return matchesSearch && matchesProject;
  });

  const handleDownload = async (imageUrl: string, filename: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "Download Started",
        description: "The image is being downloaded to your device.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download the image.",
        variant: "destructive",
      });
    }
  };

  const selectedProjectData = projects.find(p => p.id === selectedProject);

  if (loading) {
    return (
      <div className="flex min-h-screen w-full bg-studio-dark">
        <AppSidebar />
        <main className="flex-1 p-6 flex items-center justify-center">
          <div className="text-white">Loading gallery...</div>
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
              <h1 className="text-3xl font-bold text-white">Gallery</h1>
              <p className="text-muted-foreground">
                {selectedProject !== "all" && selectedProjectData 
                  ? `Managing images for ${selectedProjectData.title}`
                  : "Manage and view your photography collection"
                }
              </p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            {selectedProject !== "all" && (
              <Button 
                variant="outline"
                onClick={() => {
                  setSelectedProject("all");
                  navigate('/gallery');
                }}
                className="border-white/20 text-white hover:bg-white/10"
              >
                <FolderOpen className="w-4 h-4 mr-2" />
                View All Projects
              </Button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileUpload(e.target.files)}
              className="hidden"
            />
            <Button 
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading || projects.length === 0}
              className="bg-gradient-to-r from-studio-blue to-studio-accent hover:from-studio-blue-light hover:to-studio-accent/80"
            >
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? "Uploading..." : "Upload Images"}
            </Button>
          </div>
        </div>

        {projects.length === 0 && (
          <Card className="glass-effect border-white/10 mb-6">
            <CardContent className="flex flex-col items-center justify-center py-8">
              <FolderOpen className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No Projects Found</h3>
              <p className="text-muted-foreground text-center mb-4">
                You need to create a project before you can upload images.
              </p>
              <Button
                onClick={() => navigate('/projects')}
                className="bg-gradient-to-r from-studio-blue to-studio-accent"
              >
                Create Your First Project
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Search and Filters */}
        {projects.length > 0 && (
          <Card className="glass-effect border-white/10 mb-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Search className="w-5 h-5 text-studio-blue" />
                <span>Search & Filter</span>
              </CardTitle>
              <CardDescription>Find photos by project name, filename, or tags</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <Input
                  placeholder="Search images..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-studio-midnight border-white/20 focus:border-studio-blue"
                />
                <Select value={selectedProject} onValueChange={setSelectedProject}>
                  <SelectTrigger className="w-48 bg-studio-midnight border-white/20 focus:border-studio-blue">
                    <SelectValue placeholder="All Projects" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Projects</SelectItem>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Image Gallery */}
        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <Card key={image.id} className="glass-effect border-white/10 hover-lift group overflow-hidden">
                <div className="relative">
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="cursor-pointer">
                        <img 
                          src={image.url} 
                          alt={image.filename}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                          onClick={() => setSelectedImage(image.url)}
                        />
                        <div className="absolute inset-0 bg-studio-dark/0 group-hover:bg-studio-dark/20 transition-colors duration-300 flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl bg-studio-midnight/95 border-white/10">
                      <img 
                        src={image.url} 
                        alt={image.filename}
                        className="w-full h-auto max-h-[80vh] object-contain"
                      />
                      <div className="flex justify-between items-center mt-4">
                        <div>
                          <h3 className="text-white font-semibold">{image.project_title || 'Untitled Project'}</h3>
                          <p className="text-muted-foreground text-sm">{new Date(image.created_at).toLocaleDateString()}</p>
                        </div>
                        <Button 
                          onClick={() => handleDownload(image.url, image.filename)}
                          className="bg-gradient-to-r from-studio-blue to-studio-accent"
                        >
                          Download
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-semibold text-white mb-2 truncate">{image.filename}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{image.project_title || 'Untitled Project'}</p>
                  {image.tags && image.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {image.tags.map((tag, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary"
                          className="text-xs bg-studio-blue/20 text-studio-blue border-studio-blue/30"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">{new Date(image.created_at).toLocaleDateString()}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="glass-effect border-white/10">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <ImageIcon className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                {images.length === 0 ? "No images uploaded yet" : "No images found"}
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                {images.length === 0 
                  ? selectedProject !== "all" && selectedProjectData
                    ? `Upload your first images to ${selectedProjectData.title}.`
                    : "Upload your first images to get started with your gallery."
                  : "Try adjusting your search terms or filters."
                }
              </p>
              {images.length === 0 && projects.length > 0 && (
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gradient-to-r from-studio-blue to-studio-accent"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Your First Images
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Gallery;
