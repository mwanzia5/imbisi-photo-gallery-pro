
# Imbisi Studio - Professional Photography Management Platform

Imbisi Studio is a comprehensive web-based photography management platform built for professional photographers to manage their projects, clients, bookings, and image galleries efficiently.

## Features

### 🔐 Authentication System
- **User Registration & Login**: Secure email/password authentication
- **Social Login**: Google and GitHub OAuth integration
- **Password Reset**: Email-based password recovery
- **Protected Routes**: Secure access to dashboard and features

### 📊 Dashboard
- **Real-time Statistics**: Overview of active projects, total images, and recent bookings
- **Quick Actions**: Fast access to create new projects and view recent activity
- **Recent Projects**: Display of latest photography projects
- **Activity Feed**: Recent bookings and project updates

### 🎯 Project Management
- **Create Projects**: Add new photography projects with client details
- **Project Details**: Track project status, client information, shoot dates, and locations
- **Status Tracking**: Monitor project progress (In Progress, Completed, Editing, Delivered)
- **Search & Filter**: Find projects quickly with search functionality

### 🖼️ Image Gallery
- **Image Upload**: Secure image upload to Supabase Storage
- **Gallery View**: Beautiful grid layout for viewing images
- **Project Organization**: Images organized by photography projects
- **Metadata Support**: Store and display image metadata and tags

### 📅 Booking System
- **Client Bookings**: Manage photography session bookings
- **Schedule Management**: Track shoot dates, times, and locations
- **Status Updates**: Monitor booking status (Pending, Approved, Rejected, Completed)
- **Client Information**: Store client contact details and requirements

## Technology Stack

### Frontend
- **React 18**: Modern React with functional components and hooks
- **TypeScript**: Type-safe JavaScript for better development experience
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Shadcn/UI**: High-quality, accessible UI components
- **React Router**: Client-side routing for navigation
- **Lucide React**: Beautiful icon library

### Backend & Database
- **Supabase**: Backend-as-a-Service platform
- **PostgreSQL**: Robust relational database
- **Row Level Security (RLS)**: Database-level security policies
- **Real-time Subscriptions**: Live data updates
- **File Storage**: Secure image storage and management

### Additional Tools
- **Vite**: Fast build tool and development server
- **TanStack Query**: Data fetching and caching
- **React Hook Form**: Form state management
- **Sonner**: Beautiful toast notifications

## Database Schema

### Tables
1. **users**: User profiles and authentication data
2. **projects**: Photography project information
3. **images**: Image metadata and file references
4. **bookings**: Client booking and scheduling data

### Security Features
- Row Level Security (RLS) policies on all tables
- User-specific data access controls
- Secure file upload policies
- Authentication-based route protection

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd imbisi-studio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Create a Supabase project at [supabase.com](https://supabase.com)
   - Update the Supabase configuration in `src/integrations/supabase/client.ts`

4. **Database Setup**
   - Run the SQL migrations in the Supabase SQL editor
   - Set up Row Level Security policies
   - Create storage bucket for images

5. **Start development server**
   ```bash
   npm run dev
   ```

### Configuration

#### Supabase Setup
1. **Authentication Configuration**:
   - Enable email/password authentication
   - Configure social login providers (Google, GitHub)
   - Set redirect URLs for your domain

2. **Database Tables**:
   - Run the provided SQL migrations
   - Ensure RLS policies are enabled
   - Test data access with sample users

3. **Storage Configuration**:
   - Create `project-images` storage bucket
   - Set up storage policies for file access
   - Configure file size and type restrictions

## User Guide

### For Photographers

1. **Getting Started**:
   - Register for an account or sign in
   - Complete your profile setup
   - Explore the dashboard

2. **Managing Projects**:
   - Create new photography projects
   - Add client details and shoot information
   - Track project status and progress
   - Upload and organize project images

3. **Client Management**:
   - View and manage client bookings
   - Update booking status
   - Communicate scheduling details

4. **Gallery Management**:
   - Upload images to projects
   - Organize photos by project
   - Add tags and metadata
   - Search and filter images

### For Clients

1. **Booking Process**:
   - Fill out booking forms
   - Provide shoot details and requirements
   - Receive booking confirmations
   - Track booking status

## Security Features

### Authentication
- Secure password hashing
- JWT token-based sessions
- Social OAuth integration
- Password reset functionality

### Data Protection
- Row Level Security (RLS) policies
- User-specific data access
- Secure file upload validation
- HTTPS enforcement

### Privacy
- User data isolation
- GDPR compliance ready
- Secure file storage
- Access logging

## API Documentation

### Supabase Integration
The platform uses Supabase as the backend service, providing:

- **Authentication API**: User management and session handling
- **Database API**: CRUD operations with real-time updates
- **Storage API**: File upload and management
- **Real-time API**: Live data synchronization

### Key Endpoints
- `/auth/*`: Authentication endpoints
- `/rest/v1/*`: Database REST API
- `/storage/v1/*`: File storage API
- `/realtime/v1/*`: Real-time subscriptions

## Development Notes

### Code Structure
```
src/
├── components/        # Reusable UI components
├── pages/            # Route components
├── contexts/         # React context providers
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
└── integrations/     # External service integrations
```

### Best Practices
- Component composition over inheritance
- Custom hooks for business logic
- Type-safe API interactions
- Responsive design principles
- Accessibility considerations

### Performance Optimizations
- Lazy loading for routes and components
- Image optimization and caching
- Database query optimization
- Real-time subscription management

## Troubleshooting

### Common Issues

1. **Authentication Problems**:
   - Check Supabase URL configuration
   - Verify redirect URLs in Supabase dashboard
   - Ensure RLS policies are correctly set up

2. **Image Upload Issues**:
   - Verify storage bucket exists
   - Check storage policies
   - Confirm file size and type restrictions

3. **Data Access Problems**:
   - Review RLS policies
   - Check user authentication status
   - Verify table permissions

### Support
For technical support or questions:
- Check the documentation
- Review error logs in the browser console
- Contact the development team

## Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Standards
- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Include tests for new features

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- Built with [Lovable](https://lovable.dev) - AI-powered web development
- Powered by [Supabase](https://supabase.com) - Open source Firebase alternative
- UI components from [Shadcn/UI](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)

---

**Imbisi Studio** - Empowering photographers with professional project management tools.
