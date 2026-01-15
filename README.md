Job Application Tracker / Career Dashboard

A full-stack Job Application Tracker built using Next.js, TypeScript, Tailwind CSS, and Node.js API routes, with Vercel KV (Redis) for persistent storage.

This application helps manage job applications, track their status, and visualize progress through a clean, intuitive dashboard.

Live Demo
https://job-application-tracker-alpha-wine.vercel.app/

⸻

Project Overview

	•	Full-stack career dashboard for tracking job applications
	•	Clean, professional UI with a consistent design system
	•	Real-world CRUD workflows backed by server APIs
	•	Deployed on Vercel with a managed KV database
	•	Designed to be easily extended with authentication and multi-user support

⸻

Features

Dashboard

	•	Total number of applications
	•	Status breakdown (Applied, Interviewing, Offer, etc.)
	•	Recently updated applications
	•	Real-time data loaded from server APIs

Application Management (CRUD)

	•	Create new job applications
	•	Edit existing applications
	•	Delete applications with confirmation
	•	View application details on a dedicated page

Search, Filter, and Sort

	•	Search by company name or role title
	•	Filter applications by status
	•	Automatically sort by most recently updated

Routing & Navigation

	•	Dynamic routes for application details and edit pages
	•	Clean navigation using Next.js App Router
	•	Programmatic navigation using router.push

Backend & Data Persistence

	•	Node.js API routes for data access
	•	Server-side validation for required fields
	•	Persistent storage using Vercel KV (Redis)
	•	No client-side LocalStorage dependency in production

⸻

Tech Stack

	•	Framework: Next.js (App Router)
	•	Language: TypeScript
	•	Styling: Tailwind CSS
	•	Frontend: React Hooks
	•	Backend: Node.js API routes
	•	Database: Vercel KV (Redis via REST API)
	•	Deployment: Vercel

⸻

Getting Started (Local Development)

Install dependencies

	npm install

Set up environment variables

Create a .env.local file and add:

	KV_REST_API_URL=your_kv_rest_url
	KV_REST_API_TOKEN=your_kv_rest_token

Start development server

	npm run dev

Open in browser

	http://localhost:3000

⸻

Key Technical Highlights

	•	Clear separation between client UI and server data access
	•	Type-safe data models using shared TypeScript interfaces
	•	Node.js API routes for scalable backend logic
	•	Persistent server-side storage using Redis (KV)
	•	Immutable update patterns for create, edit, and delete flows
	•	Derived state for filtering, searching, and sorting
	•	Production-ready deployment on Vercel

⸻

Future Enhancements

	•	Authentication and user accounts
	•	Multi-user support with per-user data isolation
	•	Analytics and visualizations (charts, pipeline metrics)
	•	Application reminders and follow-up tracking
	•	Export/import functionality
	•	Accessibility improvements and dark mode

⸻

Author

	•	Jayshri Aher
	•	Software Engineer
	•	Skills: React, Next.js, TypeScript, Tailwind CSS, Node.js, REST APIs

