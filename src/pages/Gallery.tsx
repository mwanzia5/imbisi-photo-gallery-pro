
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Upload, Image as ImageIcon, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const images = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600",
      project: "Sarah & Mike Wedding",
      tags: ["wedding", "outdoor", "sunset"],
      uploadDate: "2024-01-15",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600",
      project: "Corporate Headshots",
      tags: ["corporate", "headshots", "professional"],
      uploadDate: "2024-01-10",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600",
      project: "Product Photography",
      tags: ["product", "fashion", "studio"],
      uploadDate: "2024-01-08",
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600",
      project: "Family Portrait Session",
      tags: ["family", "portrait", "beach"],
      uploadDate: "2024-01-05",
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600",
      project: "Urban Photography",
      tags: ["urban", "street", "architecture"],
      uploadDate: "2024-01-03",
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=600",
      project: "Nature Series",
      tags: ["nature", "landscape", "trees"],
      uploadDate: "2024-01-01",
    },
  ];

  const filteredImages = images.filter(image => 
    image.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
    image.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleUpload = () => {
    toast({
      title: "Upload Feature",
      description: "Image upload will be enabled when connected to Supabase storage.",
    });
  };

  const handleDownload = (imageUrl: string) => {
    toast({
      title: "Download Started",
      description: "The image is being downloaded to your device.",
    });
  };

  return (
    <div className="flex min-h-screen w-full bg-studio-dark">
      <AppSidebar />
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <SidebarTrigger className="text-white hover:bg-studio-midnight" />
            <div>
              <h1 className="text-3xl font-bold text-white">Gallery</h1>
              <p className="text-muted-foreground">Manage and view your photography collection</p>
            </div>
          </div>
          
          <Button 
            onClick={handleUpload}
            className="bg-gradient-to-r from-studio-blue to-studio-accent hover:from-studio-blue-light hover:to-studio-accent/80"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Images
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="glass-effect border-white/10 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Search className="w-5 h-5 text-studio-blue" />
              <span>Search & Filter</span>
            </CardTitle>
            <CardDescription>Find photos by project name or tags</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Input
                placeholder="Search projects or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-studio-midnight border-white/20 focus:border-studio-blue"
              />
              <Button variant="outline" className="border-studio-blue/30 text-studio-blue hover:bg-studio-blue hover:text-white">
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <Card key={image.id} className="glass-effect border-white/10 hover-lift group overflow-hidden">
              <div className="relative">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="cursor-pointer">
                      <img 
                        src={image.url} 
                        alt={image.project}
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
                      alt={image.project}
                      className="w-full h-auto max-h-[80vh] object-contain"
                    />
                    <div className="flex justify-between items-center mt-4">
                      <div>
                        <h3 className="text-white font-semibold">{image.project}</h3>
                        <p className="text-muted-foreground text-sm">{image.uploadDate}</p>
                      </div>
                      <Button 
                        onClick={() => handleDownload(image.url)}
                        className="bg-gradient-to-r from-studio-blue to-studio-accent"
                      >
                        Download
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold text-white mb-2">{image.project}</h3>
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
                <p className="text-xs text-muted-foreground">{image.uploadDate}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <Card className="glass-effect border-white/10">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <ImageIcon className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No images found</h3>
              <p className="text-muted-foreground text-center">
                Try adjusting your search terms or upload some new images to get started.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Gallery;
