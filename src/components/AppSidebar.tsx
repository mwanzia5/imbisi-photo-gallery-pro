
import { Camera, Upload, Image as ImageIcon, Calendar } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Camera,
  },
  {
    title: "Projects",
    url: "/projects",
    icon: Upload,
  },
  {
    title: "Gallery",
    url: "/gallery",
    icon: ImageIcon,
  },
  {
    title: "Bookings",
    url: "/bookings",
    icon: Calendar,
  },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sidebar className="bg-studio-dark border-r border-white/10">
      <SidebarHeader className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-studio-blue to-studio-accent rounded-xl flex items-center justify-center">
            <Camera className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold gradient-text">Imbisi Studio</h1>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground text-sm font-medium">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      onClick={() => navigate(item.url)}
                      className={`
                        w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                        ${isActive 
                          ? 'bg-gradient-to-r from-studio-blue to-studio-accent text-white shadow-lg' 
                          : 'hover:bg-studio-midnight text-muted-foreground hover:text-white'
                        }
                      `}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-6">
        <div className="text-xs text-muted-foreground text-center">
          © 2024 Imbisi Studio
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
