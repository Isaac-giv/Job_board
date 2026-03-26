# Job Board Platform

## Overview

A full-stack job board application that connects employers with job seekers. Employers can post job listings and manage applications, while job seekers can browse opportunities and apply with their resume and cover letter.

## Tech Stack

### Frontend
- **Framework**: React 19 with Vite
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios
- **Styling**: Custom CSS with human-centered design system
  - Glassmorphism effects with backdrop blur
  - Organic shapes and soft shadows
  - Multi-layered shadow system
  - Smooth cubic-bezier animations
  - Responsive mobile-first approach
  - Accessible focus states and ARIA support
  - Custom scrollbar styling
  - Smooth scroll behavior
  - Selection color customization
  - System font stack for native feel
  - CSS custom properties for theming
  - Animation utility classes
  - Hover lift effects on interactive elements
  - Status badges with color coding
  - Form validation styling
  - Loading states with spinner animations
  - Card-based layouts with organic rounded corners
  - Gradient accents and decorative elements
  - Typography hierarchy with proper spacing
  - Color palette: Primary (#667eea), Secondary (#764ba2), Success (#059669), Warning (#d97706), Error (#dc2626)
- **Build Tool**: Vite

### Backend
- **Runtime**: Node.js with Express
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) with bcryptjs
- **File Uploads**: Multer (for resume uploads)
- **Email**: Nodemailer
- **Environment**: dotenv for configuration

## Project Structure

```
Job_board/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── api/           # Axios configuration
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React Context (Auth)
│   │   ├── pages/         # Page components
│   │   └── assets/        # Static assets
│   └── public/            # Public files
└── server/                # Node.js Backend
    ├── config/            # Database configuration
    ├── middleware/        # Auth & upload middleware
    ├── models/            # Mongoose models
    ├── routes/            # API routes
    ├── uploads/           # Uploaded resumes
    └── utils/             # Utility functions
```

## CSS Architecture

### File Structure
- **`client/src/index.css`** - Global styles, design system, animations
  - CSS custom properties (variables)
  - Global reset and base styles
  - Typography system
  - Animation keyframes
  - Utility classes
  - Component base styles (cards, buttons, forms)
  
- **`client/src/App.css`** - Page-specific styles
  - Dashboard layout and components
  - Job detail page styling
  - My Applications grid
  - Status badges
  - Responsive overrides

### CSS Methodology
- **BEM-like naming**: Block-Element-Modifier pattern
- **Mobile-first**: Base styles for mobile, media queries for larger screens
- **Utility classes**: Reusable animation and spacing classes
- **Custom properties**: Centralized theming with CSS variables
- **Semantic naming**: Class names describe purpose, not appearance

### Key Features
- Glassmorphism navbar with backdrop blur
- Organic shape decorations with morphing animations
- Multi-layered shadows for depth
- Cubic-bezier easing for natural motion
- Accessible focus states
- Custom scrollbar styling
- Smooth scroll behavior

## Features

### User Authentication
- Registration with role selection (Employer/Job Seeker)
- JWT-based login system
- Protected routes based on user roles
- Password hashing with bcrypt

### For Employers
- Post new job listings
- View and manage posted jobs
- Review applications from job seekers
- Update application status (pending, reviewed, rejected)

### For Job Seekers
- Browse all available job listings
- View detailed job descriptions
- Apply to jobs with resume upload
- Track application status
- View application history

### Job Listings
- Title, company, location
- Detailed description and requirements
- Salary information
- Timestamp tracking
- Associated employer information

### Applications
- Resume upload (PDF/DOC support)
- Cover letter submission
- Application status tracking
- One application per job per seeker

## API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - User login

### Jobs (`/api/jobs`)
- `GET /` - Get all jobs
- `POST /` - Create new job (Employer only)
- `GET /:id` - Get job by ID
- `GET /:id/applications` - Get applications for a job (Employer only)

### Applications (`/api/applications`)
- `POST /` - Submit application (Seeker only)
- `GET /my` - Get user's applications
- `PATCH /:id/status` - Update application status (Employer only)

## Data Models

### User
- name (String, required)
- email (String, required, unique)
- password (String, required, hashed)
- role (Enum: 'employer' | 'seeker')
- timestamps

### Job
- title (String, required)
- company (String, required)
- location (String, required)
- description (String, required)
- requirements (String)
- salary (String)
- employer (Reference to User)
- timestamps

### Application
- job (Reference to Job)
- seeker (Reference to User)
- resume (String, file path)
- coverLetter (String)
- status (Enum: 'pending' | 'reviewed' | 'rejected', default: 'pending')
- timestamps
- Unique constraint: one application per job per seeker

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB instance
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Job_board
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   npm start
   ```

3. **Setup Frontend**
   ```bash
   cd client
   npm install
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

### Environment Variables

**Server (.env)**
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/job-board
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
```

## Screenshots

### Home Page
- Hero section with call-to-action buttons
- Job listings display
- Navigation based on user role

### Job Detail
- Full job description
- Apply button (for seekers)
- Company information

### Dashboard (Employer)
- Posted jobs overview
- Application statistics
- Job management interface

### My Applications (Seeker)
- Applied jobs list
- Application status tracking
- Resume management

## Design System

### Visual Design Philosophy
The application follows a **human-centered design** approach with organic shapes, soft shadows, and warm colors to create an inviting and approachable user experience.

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Primary | #667eea | Buttons, links, accents |
| Secondary | #764ba2 | Gradients, hover states |
| Success | #059669 | Approved, success messages |
| Warning | #d97706 | Pending status |
| Error | #dc2626 | Errors, rejected status |
| Background | #fafbfc | Page background |
| Card | #ffffff | Card backgrounds |
| Text Primary | #1a202c | Headings, important text |
| Text Secondary | #4a5568 | Body text |
| Text Muted | #718096 | Captions, hints |

### Typography
- **Font Family**: System font stack (Inter, -apple-system, Segoe UI, Roboto)
- **Base Size**: 16px
- **Line Height**: 1.6
- **Headings**: Bold weight (700), tight letter-spacing (-0.02em)
- **Body**: Regular weight (400), comfortable line-height

### Spacing System
- **Base Unit**: 0.25rem (4px)
- **Card Padding**: 1.75rem (28px)
- **Section Spacing**: 2rem - 4rem
- **Component Gap**: 1rem - 1.5rem

### Border Radius
- **Small** (buttons, inputs): 12px
- **Medium** (cards): 20px
- **Large** (hero, modals): 40px
- **Pill** (badges, tags): 9999px

### Shadows (Multi-layered)
```
shadow-soft:   0 2px 4px rgba(0,0,0,0.02), 0 4px 8px rgba(0,0,0,0.03), 0 8px 16px rgba(0,0,0,0.03)
shadow-medium: 0 4px 6px rgba(0,0,0,0.02), 0 10px 20px rgba(0,0,0,0.03), 0 20px 40px rgba(0,0,0,0.04)
shadow-large:  0 10px 20px rgba(0,0,0,0.03), 0 20px 40px rgba(0,0,0,0.04), 0 40px 80px rgba(0,0,0,0.05)
```

### Animations
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1) - Natural feel
- **Duration**: 0.3s for interactions, 0.5s-0.8s for page transitions
- **Types**: fadeIn, fadeInUp, scaleIn, slideIn, pulse, float, morph

### Components

#### Buttons
- **Primary**: Gradient background (#667eea → #764ba2), white text, shimmer hover effect
- **Secondary**: White background, colored border and text
- **Ghost**: Transparent with border, for secondary actions
- **Danger**: Red outline style for destructive actions

#### Cards
- White background with subtle border
- 20px border-radius
- Multi-layered soft shadow
- Hover: Lift effect with enhanced shadow

#### Forms
- **Inputs**: 12px radius, subtle border, focus glow effect
- **Labels**: Medium weight, muted color
- **File Upload**: Dashed border, highlight on hover
- **Select**: Custom dropdown arrow

#### Status Badges
- **Pending**: Yellow background (#fef3c7), amber text
- **Reviewed**: Green background (#d1fae5), emerald text
- **Rejected**: Red background (#fee2e2), red text
- All with pill shape (rounded-full)

### Responsive Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Accessibility Features
- Focus-visible outline (2px solid primary color)
- ARIA labels on interactive elements
- Semantic HTML structure
- Color contrast ratio >= 4.5:1
- Keyboard navigation support
- Screen reader friendly markup

## Future Enhancements

- [ ] Email notifications for application updates
- [ ] Advanced job search with filters
- [ ] Job categories and tags
- [ ] User profiles with skills
- [ ] Application notes and comments
- [ ] Bulk application actions
- [ ] Analytics dashboard for employers
- [ ] Mobile app version

## License

ISC

## Author
Isaac Excellence Akpan

