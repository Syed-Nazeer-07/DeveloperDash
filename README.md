#  DeveloperDash

A modern productivity dashboard built with Next.js, TypeScript, Tailwind CSS, Zustand, and Shadcn UI.

DeveloperDash is a responsive SaaS-style project management platform designed to help teams organize projects, track tasks, monitor productivity, and visualize progress through an intuitive dashboard experience.

---

##  Features

### 📊 Dashboard
- Interactive statistics cards
- Productivity overview
- Recent project activity
- Progress tracking
- Activity timeline

### 📁 Project Management
- Create projects
- Edit projects
- Delete projects
- Project detail pages
- Progress tracking
- Status management
- Search and filtering

### ✅ Task Management
- Create tasks
- Edit tasks
- Delete tasks
- Status updates
- Priority management
- Assignee tracking
- Search and filtering
- Sorting options

### 🔔 Notifications
- Notification center
- Unread counters
- Mark as read
- Mark all as read
- Delete notifications

### 📈 Analytics
- Task status distribution
- Project progress visualization
- Productivity trends
- Real-time chart updates

### ⚙️ Settings
- User profile management
- Theme preferences
- Notification preferences
- Application settings

### 🎨 User Experience
- Dark / Light Mode
- Mobile Responsive Design
- Accessible Components
- Loading States
- Empty States
- Interactive Navigation

---

## 🛠️ Tech Stack

### Frontend
- Next.js 15
- React
- TypeScript

### Styling
- Tailwind CSS
- Shadcn UI
- Lucide Icons

### State Management
- Zustand

### Forms & Validation
- React Hook Form
- Zod

### Charts & Analytics
- Recharts

### Notifications
- Sonner

---

## 📂 Project Structure

```text
src/
│
├── app/
│   ├── analytics/
│   ├── projects/
│   ├── tasks/
│   ├── settings/
│   └── page.tsx
│
├── components/
│   ├── dashboard/
│   ├── layout/
│   ├── projects/
│   ├── tasks/
│   ├── shared/
│   └── ui/
│
├── data/
├── store/
├── types/
├── lib/
└── hooks/
```

---

## 📸 Screenshots

### Dashboard

Insert dashboard screenshot here

### Projects

Insert projects screenshot here

### Tasks

Insert tasks screenshot here

### Analytics

Insert analytics screenshot here

### Settings

Insert settings screenshot here

---

## 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/Syed-Nazeer-07/DeveloperDash.git
```

### Navigate to Project

```bash
cd DeveloperDash
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

### Open Browser

```text
http://localhost:3000
```

---

## 📱 Responsive Design

DeveloperDash is optimized for:

- Desktop
- Laptop
- Tablet
- Mobile Devices

---

## 🎯 Internship Task Coverage

This project was developed as part of a Full Stack Development Internship.

Implemented requirements include:

- Dashboard Landing Page
- Navigation System
- User Profile Section
- Project Cards
- Task Cards
- Progress Indicators
- Search Functionality
- Filter Functionality
- Responsive Design
- Loading States
- Empty States
- Reusable Component Architecture

---

## 🔮 Future Enhancements

### Backend Integration
- REST API
- Authentication
- Authorization

### Database
- MongoDB
- PostgreSQL
- MySQL

### AI Features
- AI Task Generation
- AI Project Summaries
- Productivity Recommendations
- Smart Prioritization

---

## 👨‍💻 Author

**Syed Nazeer**

GitHub:
https://github.com/Syed-Nazeer-07

---

## 📄 License

This project is intended for educational and portfolio purposes.

## Week 3 Summary
- Integrated a dedicated API client layer in \src/lib/api.ts\ for data fetching.
- Updated the Zustand store to fetch users, projects, and tasks from the backend instead of using mock data.
- Updated the \DashboardLayout.tsx\ and components to properly reflect loading and error states.
- Connected \CreateProjectModal\, \CreateTaskModal\, and \TaskCard\ to the live API for creating, updating, and deleting operations.
- Fixed TypeScript strict errors relating to the newly integrated models and \
ull\ user cases.
