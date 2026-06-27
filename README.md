<div align="center">

# MediCare Connect

### Premium Healthcare Appointment & Management Platform

A polished full-stack healthcare platform where patients can discover verified doctors, book appointments, manage payments and prescriptions, while doctors and administrators manage schedules, requests, users, and analytics.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Now-2ea44f?style=for-the-badge)](https://medicareconnectweb.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-Deployed-000?style=for-the-badge&logo=vercel&logoColor=white)](https://medicareconnectweb.vercel.app/)

</div>

---

## Preview

<p align="center">
  <img src="./public/preview1.png" alt="MediCare Connect preview 1" width="1000" style="margin-bottom: 20px" />
  <img src="./public/preview2.png" alt="MediCare Connect preview 2" width="1000" style="margin-bottom: 20px" />
  <img src="./public/preview3.png" alt="MediCare Connect preview 3" width="1000" />
</p>

> **Live Site:** [https://medicareconnectweb.vercel.app/](https://medicareconnectweb.vercel.app/)
> **Server API:** [https://medicareconnectwebserver.vercel.app/](https://medicareconnectwebserver.vercel.app/)
> **Server Repo:** [https://github.com/smRid/MediCare-Connect-Server](https://github.com/smRid/MediCare-Connect-Server)

---

## Features

| Feature | Description |
| :--- | :--- |
| **Doctor Discovery** | Browse, filter, and review verified doctors across multiple healthcare specializations. |
| **Appointment Booking** | Patients can choose a doctor, select available dates and slots, describe symptoms, and book appointments. |
| **Payment Workflow** | Appointment payments are created and recorded through the backend payment API. |
| **Patient Dashboard** | Patients can track appointments, payment history, reviews, and healthcare activity from one place. |
| **Doctor Dashboard** | Doctors can manage schedules, review appointment requests, maintain profiles, and create prescriptions. |
| **Admin Dashboard** | Admins can manage users, verify doctors, monitor appointments, review payments, handle contacts, and inspect analytics. |
| **Authentication Gate** | Better Auth powers email/password login, Google OAuth, sessions, and protected role-based routes. |
| **Responsive Interface** | Tailwind CSS, Framer Motion, Lucide icons, and theme support create a clean experience across devices. |
| **Analytics Ready** | Recharts-powered dashboard views help visualize payments, appointments, doctors, and platform activity. |

---

## Tech Stack

<div align="center">

| Technology | Purpose |
| :---: | :--- |
| **Next.js 16** | App Router framework for routing, rendering, metadata, and production builds. |
| **React 19** | Component-driven user interface and client-side interactions. |
| **Tailwind CSS 4** | Utility-first styling for responsive layouts and custom themes. |
| **Better Auth** | Authentication, sessions, users, Google OAuth, and protected app access. |
| **MongoDB** | Database used by the authentication layer and backend data workflows. |
| **Backend API** | External MediCare Connect server for doctors, appointments, payments, reviews, and analytics. |
| **Framer Motion** | Smooth transitions, page animations, and interactive UI motion. |
| **Recharts** | Data visualization for admin analytics and dashboard reporting. |
| **React Toastify** | User feedback for success, loading, and error states. |
| **Lucide React** | Consistent icon system throughout the application. |
| **Vercel** | Frontend deployment and production hosting. |

</div>

---

## Project Structure

```text
PHA10-MediCare-Connect/
|-- public/
|   |-- preview1.png
|   |-- preview2.png
|   |-- preview3.png
|   `-- favicon.svg
|-- src/
|   |-- app/
|   |   |-- (auth)/
|   |   |-- (main)/
|   |   |-- api/auth/[...all]/
|   |   |-- dashboard/
|   |   |-- layout.js
|   |   `-- page.js
|   |-- components/
|   |   |-- dashboardPage/
|   |   |-- doctors/
|   |   |-- homepage/
|   |   |-- payment/
|   |   |-- shared/
|   |   `-- ui/
|   |-- constants/
|   `-- lib/
|       |-- api/
|       |-- auth.jsx
|       |-- auth-client.jsx
|       `-- auth-context.jsx
|-- next.config.mjs
|-- package.json
`-- README.md
```

---

## Design Highlights

- **Healthcare-focused landing page** with a polished hero section, platform statistics, featured doctors, and service highlights.
- **Role-based dashboards** designed separately for patients, doctors, and administrators.
- **Responsive navigation** that adapts from desktop navigation to mobile-friendly menus and dashboard sidebars.
- **Modern visual system** using custom Tailwind tokens, light/dark theme support, cards, badges, status pills, and subtle motion.
- **Consistent interactions** with Lucide icons, animated actions, reusable UI components, and toast feedback.
- **Data-rich admin views** with charts, tables, status indicators, and management workflows.

---

## Environment Variables

Create a `.env.local` file in the project root and configure these values:

```env
# App URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000

# MongoDB
MONGODB_URI=mongodb://127.0.0.1:27017/medicare_connect
MONGODB_DB=medicare_connect

# Better Auth
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=replace-with-a-strong-secret
BETTER_AUTH_API_KEY=replace-with-your-better-auth-api-key

# Google OAuth
GOOGLE_CLIENT_ID=replace-with-google-client-id
GOOGLE_CLIENT_SECRET=replace-with-google-client-secret
```

Notes:

- `NEXT_PUBLIC_API_BASE_URL` may point to the backend origin or directly to its `/api` path. The client normalizes it automatically.
- `MONGO_DB_URI` is also supported as an alternative to `MONGODB_URI`.
- Google OAuth credentials are required only when Google sign-in is enabled.

For production, set:

```env
NEXT_PUBLIC_APP_URL=https://medicareconnectweb.vercel.app
NEXT_PUBLIC_API_BASE_URL=https://medicareconnectwebserver.vercel.app/api
BETTER_AUTH_URL=https://medicareconnectweb.vercel.app
```

---

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the app:

```text
http://localhost:3000
```

Run linting:

```bash
npm run lint
```

Build for production:

```bash
npm run build
```

Run the production server:

```bash
npm start
```

---

## Main Routes

| Route | Purpose |
| :--- | :--- |
| `/` | Home page |
| `/find-doctors` | Doctor browsing and search |
| `/doctors/[id]` | Doctor profile, reviews, and booking |
| `/about` | Platform overview |
| `/contact` | Contact form |
| `/login` | User sign-in |
| `/register` | User registration |
| `/dashboard/patient` | Patient dashboard |
| `/dashboard/doctor` | Doctor dashboard |
| `/dashboard/admin` | Admin dashboard |

---

## Deployment

The application is deployed on **Vercel**:

**Frontend Live URL:** [https://medicareconnectweb.vercel.app/](https://medicareconnectweb.vercel.app/)
**Backend Live URL:** [https://medicareconnectwebserver.vercel.app/](https://medicareconnectwebserver.vercel.app/)
**Backend Repository:** [https://github.com/smRid/MediCare-Connect-Server](https://github.com/smRid/MediCare-Connect-Server)

For deployment:

1. Add all production environment variables in Vercel project settings.
2. Set `BETTER_AUTH_URL` to `https://medicareconnectweb.vercel.app`.
3. Set `NEXT_PUBLIC_APP_URL` to `https://medicareconnectweb.vercel.app`.
4. Set `NEXT_PUBLIC_API_BASE_URL` to `https://medicareconnectwebserver.vercel.app/api`.
5. Configure Google OAuth authorized origins and redirect URLs for the production domain.
6. Allow Vercel/production access in MongoDB Atlas Network Access.
7. Redeploy after changing environment variables.

---

<div align="center">

**If you found this project useful, consider giving it a star.**

Made with care using Next.js, React, Tailwind CSS, Better Auth, MongoDB, and Vercel.

</div>
