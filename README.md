Job Application Tracker / Career Dashboard 

A Job Application Tracker built using Next.js, TypeScript, and Tailwind CSS.
This application helps manage job applications, track their status, and visualize progress through a simple dashboard interface.

Live Demo:

https://job-application-tracker-alpha-wine.vercel.app/

⸻

Project Overview

	•	Single-page career dashboard for tracking job applications
	•	Focused on clean UI, predictable state management, and real-world workflows
	•	Designed to be extended later with authentication and a backend

⸻

Features

	•	Dashboard overview
	•	Total number of applications
	•	Breakdown by application status (Applied, Interviewing, Offer)
	•	Recently updated applications
	•	Application management (CRUD)
	•	Create new job applications
	•	Edit existing applications
	•	Delete applications with confirmation
	•	View application details on a dedicated page
	•	Search, filter, and sort
	•	Search by company name or role title
	•	Filter applications by status
	•	Automatically sort by most recently updated
	•	Routing
	•	Dynamic routes for application details and edit pages
	•	Clean navigation using Next.js App Router
	•	Data persistence
	•	Uses browser LocalStorage
	•	No backend dependency for core functionality

⸻

Tech Stack

	•	Framework: Next.js (App Router)
	•	Language: TypeScript
	•	Styling: Tailwind CSS
	•	State Management: React Hooks
	•	Routing: Next.js dynamic routing
	•	Storage: Browser LocalStorage
	•	Deployment: Vercel

⸻

Getting Started (Local Development)

	•	Install dependencies

npm install

	•	Start development server

npm run dev

	•	Open in browser

http://localhost:3000


⸻

Key Technical Highlights

	•	Strong use of TypeScript interfaces to define data models
	•	Separation of concerns using lib/ for types and storage logic
	•	Immutable update patterns for add, edit, and delete flows
	•	Derived state for filtering, searching, and sorting
	•	Client-side routing with programmatic navigation (router.push)
	•	Dashboard built using computed statistics instead of hardcoded values

⸻

Project Structure (High Level)

	•	app/
		  page.tsx — Career dashboard
	•	applications/
	    page.tsx — Applications list
	    new/page.tsx — Create application
	    [id]/page.tsx — Application details
	    [id]/edit/page.tsx — Edit application
	 lib/
	  types.ts — TypeScript models
	  storage.ts — LocalStorage helpers

⸻

Future Enhancements

	•	Replace LocalStorage with a persistent backend (Supabase / Prisma / MongoDB)
	•	Authentication and user accounts
	•	Analytics and visualization (charts, funnel metrics)
	•	Application reminders and follow-up tracking
	•	Export and import functionality
	•	Accessibility and dark mode improvements

⸻

Author

	•	Name: Jayshri Aher
	•	Role: Frontend Developer
	•	Skills: React, Next.js, TypeScript, Tailwind CSS
