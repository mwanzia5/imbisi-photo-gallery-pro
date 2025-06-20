
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Clock, MapPin, User, Plus, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Bookings = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const bookings = [
    {
      id: 1,
      clientName: "Emily Rodriguez",
      email: "emily@email.com",
      shootType: "Wedding Photography",
      date: "2024-02-15",
      time: "14:00",
      location: "Garden Venue, Brooklyn",
      status: "Pending",
      notes: "Outdoor ceremony followed by indoor reception. Need both photo and video coverage.",
      submittedAt: "2024-01-20",
    },
    {
      id: 2,
      clientName: "Marcus Thompson",
      email: "marcus@techcorp.com",
      shootType: "Corporate Headshots",
      date: "2024-02-10",
      time: "10:00",
      location: "Tech Corp Offices, Manhattan",
      status: "Approved",
      notes: "Headshots for 15 executives. Professional attire required.",
      submittedAt: "2024-01-18",
    },
    {
      id: 3,
      clientName: "Sarah Kim",
      email: "sarah@fashionco.com",
      shootType: "Product Photography",
      date: "2024-02-08",
      time: "09:00",
      location: "Studio B",
      status: "Completed",
      notes: "New spring collection catalog shoot. 50+ products to photograph.",
      submittedAt: "2024-01-15",
    },
    {
      id: 4,
      clientName: "David Wilson",
      email: "david@email.com",
      shootType: "Family Portrait",
      date: "2024-02-20",
      time: "16:00",
      location: "Central Park",
      status: "Rejected",
      notes: "Family of 5 with young children. Golden hour preferred.",
      submittedAt: "2024-01-22",
    },
  ];

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Booking Submitted",
      description: "Your booking request has been submitted successfully.",
    });
    setIsDialogOpen(false);
  };

  const handleStatusChange = (bookingId: number, newStatus: string) => {
    toast({
      title: "Status Updated",
      description: `Booking has been ${newStatus.toLowerCase()}.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
      case "Completed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Pending":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "Rejected":
        return "bg-red-500/20 text-red-400 border-red-500/30";
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
              <h1 className="text-3xl font-bold text-white">Bookings</h1>
              <p className="text-muted-foreground">Manage client booking requests</p>
            </div>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-studio-blue to-studio-accent hover:from-studio-blue-light hover:to-studio-accent/80">
                <Plus className="w-4 h-4 mr-2" />
                New Booking
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-studio-midnight border-white/10 max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-white">Create New Booking</DialogTitle>
                <DialogDescription>
                  Submit a new photography booking request
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmitBooking} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientName">Client Name</Label>
                    <Input 
                      id="clientName" 
                      placeholder="Full name"
                      className="bg-studio-dark border-white/20 focus:border-studio-blue"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email"
                      placeholder="client@email.com"
                      className="bg-studio-dark border-white/20 focus:border-studio-blue"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="shootType">Shoot Type</Label>
                  <Select>
                    <SelectTrigger className="bg-studio-dark border-white/20 focus:border-studio-blue">
                      <SelectValue placeholder="Select shoot type" />
                    </SelectTrigger>
                    <SelectContent className="bg-studio-midnight border-white/10">
                      <SelectItem value="wedding">Wedding Photography</SelectItem>
                      <SelectItem value="corporate">Corporate Headshots</SelectItem>
                      <SelectItem value="product">Product Photography</SelectItem>
                      <SelectItem value="portrait">Portrait Session</SelectItem>
                      <SelectItem value="event">Event Photography</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Preferred Date</Label>
                    <Input 
                      id="date" 
                      type="date"
                      className="bg-studio-dark border-white/20 focus:border-studio-blue"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Preferred Time</Label>
                    <Input 
                      id="time" 
                      type="time"
                      className="bg-studio-dark border-white/20 focus:border-studio-blue"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    placeholder="Venue or address"
                    className="bg-studio-dark border-white/20 focus:border-studio-blue"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Any special requirements or details..."
                    className="bg-studio-dark border-white/20 focus:border-studio-blue"
                    rows={3}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-studio-blue to-studio-accent hover:from-studio-blue-light hover:to-studio-accent/80"
                >
                  Submit Booking Request
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {bookings.map((booking) => (
            <Card key={booking.id} className="glass-effect border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <User className="w-6 h-6 text-studio-blue" />
                    <div>
                      <CardTitle className="text-white">{booking.clientName}</CardTitle>
                      <CardDescription>{booking.email}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status}
                    </Badge>
                    {booking.status === "Pending" && (
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleStatusChange(booking.id, "Approved")}
                          className="bg-green-500 hover:bg-green-600 text-white"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleStatusChange(booking.id, "Rejected")}
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="w-4 h-4 text-studio-blue" />
                    <span className="text-muted-foreground">Date:</span>
                    <span className="text-white">{new Date(booking.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="w-4 h-4 text-studio-blue" />
                    <span className="text-muted-foreground">Time:</span>
                    <span className="text-white">{booking.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="w-4 h-4 text-studio-blue" />
                    <span className="text-muted-foreground">Location:</span>
                    <span className="text-white">{booking.location}</span>
                  </div>
                </div>
                
                <div className="border-t border-white/10 pt-4">
                  <h4 className="font-medium text-white mb-2">Shoot Type</h4>
                  <Badge variant="outline" className="border-studio-accent/30 text-studio-accent">
                    {booking.shootType}
                  </Badge>
                </div>
                
                {booking.notes && (
                  <div className="border-t border-white/10 pt-4">
                    <h4 className="font-medium text-white mb-2">Notes</h4>
                    <p className="text-muted-foreground text-sm">{booking.notes}</p>
                  </div>
                )}
                
                <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    Submitted: {new Date(booking.submittedAt).toLocaleDateString()}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-studio-blue/30 text-studio-blue hover:bg-studio-blue hover:text-white"
                  >
                    View Details
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

export default Bookings;
