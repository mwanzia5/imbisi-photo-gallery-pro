
# Photography Studio Management App

A modern, full-featured photography business management application built with React, TypeScript, and Supabase. This application helps photographers manage their projects, bookings, and client relationships with a sleek, professional interface.

## 🚀 Features

### Project Management
- Create and organize photography projects
- Track project status (In Progress, Editing, Completed, Delivered)
- Manage client information and shoot details
- Image gallery integration
- Project timeline tracking

### Dashboard
- Comprehensive overview of your business
- Active projects statistics
- Photo count tracking
- Pending bookings overview
- Quick action shortcuts

### Booking System
- Client booking management
- Shoot scheduling
- Location tracking
- Booking status management
- Client communication tools

### Image Gallery
- Upload and organize photos by project
- Tag and categorize images
- Metadata management
- Secure file storage

### Authentication
- Secure user authentication
- Demo mode for testing
- User profile management
- Protected routes

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: Shadcn/ui, Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **Backend**: Supabase (PostgreSQL, Authentication, Storage)
- **State Management**: React Context, TanStack Query
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Charts**: Recharts
- **Date Handling**: date-fns
- **Form Handling**: React Hook Form with Zod validation

## 🎨 Design System

The app features a professional dark theme with custom color palette:
- **Primary Colors**: Studio Blue (#3B82F6), Studio Accent (#8B5CF6)
- **Background**: Studio Dark (#0A0A0B), Studio Midnight (#1A1A1B)
- **Typography**: Clean, modern font hierarchy
- **Components**: Glass morphism effects, hover animations, responsive design

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/ui components
│   ├── AppSidebar.tsx  # Navigation sidebar
│   └── ProtectedRoute.tsx
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state
├── hooks/              # Custom hooks
│   └── use-toast.ts    # Toast notifications
├── integrations/       # Third-party integrations
│   └── supabase/       # Supabase client and types
├── pages/              # Application pages
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Projects.tsx    # Project management
│   ├── Gallery.tsx     # Image gallery
│   ├── Bookings.tsx    # Booking management
│   ├── AuthPage.tsx    # Authentication
│   └── Landing.tsx     # Landing page
└── lib/                # Utility functions
```

## 🗄️ Database Schema

### Projects Table
- **id**: UUID (Primary Key)
- **user_id**: UUID (Foreign Key to auth.users)
- **title**: Text (Required)
- **description**: Text (Optional)
- **client_name**: Text (Optional)
- **shoot_date**: Date (Optional)
- **location**: Text (Optional)
- **status**: Text (Default: 'In Progress')
- **created_at**: Timestamp
- **updated_at**: Timestamp

### Images Table
- **id**: UUID (Primary Key)
- **project_id**: UUID (Foreign Key to projects)
- **user_id**: UUID (Foreign Key to auth.users)
- **url**: Text (Required)
- **filename**: Text (Required)
- **tags**: Text Array (Optional)
- **metadata**: JSONB (Optional)
- **created_at**: Timestamp

### Bookings Table
- **id**: UUID (Primary Key)
- **user_id**: UUID (Foreign Key to auth.users)
- **client_name**: Text (Required)
- **client_email**: Text (Required)
- **shoot_date**: Date (Required)
- **shoot_time**: Time (Optional)
- **location**: Text (Optional)
- **shoot_type**: Text (Optional)
- **notes**: Text (Optional)
- **status**: Text (Default: 'Pending')
- **created_at**: Timestamp

## 🔐 Security Features

- **Row Level Security (RLS)**: All tables protected with user-specific policies
- **Authentication**: Supabase Auth with email/password
- **Protected Routes**: Authentication required for app access
- **Data Validation**: TypeScript types and Zod schemas
- **Secure Storage**: Supabase Storage with access policies

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd photography-studio-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new Supabase project
   - Run the SQL migrations from `supabase/migrations/`
   - Update `src/integrations/supabase/client.ts` with your project details

4. **Start the development server**
   ```bash
   npm run dev
   ```

### Environment Setup

The app uses Supabase with the following configuration:
- **URL**: Your Supabase project URL
- **Anon Key**: Your Supabase anonymous key
- **Database**: PostgreSQL with RLS enabled
- **Storage**: File uploads for project images

## 📱 Usage

### For Photographers

1. **Sign up/Login** to access your dashboard
2. **Create Projects** to organize your photography work
3. **Upload Images** and organize them by project
4. **Manage Bookings** from potential clients
5. **Track Progress** through project statuses
6. **View Analytics** on your dashboard

### Demo Mode

The app includes a demo mode for testing:
- Any email/password combination works
- Data is stored locally for demo purposes
- Full functionality available without backend setup

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Key Development Commands

```bash
# Install new dependencies
npm install <package-name>

# Run type checking
npx tsc --noEmit

# Generate Supabase types
npx supabase gen types typescript --local > src/integrations/supabase/types.ts
```

## 🎯 Features Roadmap

- [ ] Advanced image editing tools
- [ ] Client portal for viewing galleries
- [ ] Invoice generation and payment processing
- [ ] Calendar integration for shoot scheduling
- [ ] Email automation for client communication
- [ ] Mobile app version
- [ ] Advanced analytics and reporting
- [ ] Multi-photographer team support

## 🤝 Contributing

This is a photography business management application. Contributions are welcome! Please feel free to submit issues and enhancement requests.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Shadcn/ui** for the beautiful component library
- **Supabase** for the robust backend infrastructure
- **Tailwind CSS** for the utility-first styling approach
- **Lucide** for the consistent icon set
- **React Team** for the excellent framework

---

**Built with ❤️ for photographers by photographers**
