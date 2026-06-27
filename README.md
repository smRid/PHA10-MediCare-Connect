<div align="center">

# MediCare Connect

### The Premium Platform for Healthcare Management

A polished full-stack healthcare platform where patients can find verified doctors, book appointments, manage their health journey, and where doctors can manage their schedules and prescriptions.

[![Live Demo](https://img.shields.io/badge/?_Live_Demo-Visit_Now-2ea44f?style=for-the-badge)](https://medicareconnectweb.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-Deployed-000?style=for-the-badge&logo=vercel&logoColor=white)](https://medicareconnectweb.vercel.app/)

</div>

---

## ?? Preview

<p align="center">
  <img src="./public/preview1.png" alt="MediCare Connect Preview 1" width="1000" style="margin-bottom: 20px" />
  <img src="./public/preview2.png" alt="MediCare Connect Preview 2" width="1000" style="margin-bottom: 20px" />
  <img src="./public/preview3.png" alt="MediCare Connect Preview 3" width="1000" />
</p>

> **?? Live Site:** [https://medicareconnectweb.vercel.app/](https://medicareconnectweb.vercel.app/)
> **?? Server API:** [https://medicareconnectwebserver.vercel.app/](https://medicareconnectwebserver.vercel.app/)
> **?? Server Repo:** [https://github.com/smRid/MediCare-Connect-Server](https://github.com/smRid/MediCare-Connect-Server)

---

## ? Features

| Feature                         | Description                                                                                  |
| :------------------------------ | :------------------------------------------------------------------------------------------- |
| ?? **Doctor Discovery**          | Browse, filter, and search for verified expert doctors across various specialties            |
| ?? **Appointment Booking**       | Seamlessly book online sessions at your convenience with Stripe payment integration          |
| ????? **Doctor Dashboard**          | Doctors can manage their schedules, view appointment requests, and write prescriptions       |
| ?? **Patient Profiles**          | Dedicated dashboards to track medical history, view prescriptions, and manage payments       |
| ?? **Admin Analytics**           | Comprehensive admin dashboard with real-time Recharts analytics and user/doctor management   |
| ?? **Authentication Gate**       | Secure JWT and Google OAuth authentication for role-based access control                     |
| ?? **Modern UI/UX**              | Smooth Framer Motion animations, glassmorphism, and subtle gradients                         |
| ?? **Responsive UI**             | Responsive layouts optimized for desktop, tablet, mobile, and large screens                  |
| ?? **Performance Optimized**     | Built on Next.js App Router for optimal page loading speeds and SEO                          |

---

## ??? Tech Stack

<div align="center">

|        Technology         |                              Purpose                               |
| :-----------------------: | :----------------------------------------------------------------: |
|       **Next.js 15**      |          React framework for server-side rendering and routing     |
|       **React 19**        |                    Component-driven frontend UI                    |
|     **Tailwind CSS 4**    |             Utility-first responsive application styling           |
|       **Framer Motion**   |             Fluid page transitions and UI micro-animations         |
|        **MongoDB**        |             NoSQL database for flexible data modeling              |
|        **Express**        |                         Backend API server                         |
|        **Stripe**         |                  Secure payment processing gateway                 |
|       **Recharts**        |             Data visualization for admin analytics                 |
|   **React Hot Toast**     |            User feedback for saves, errors, and actions            |
|     **Lucide React**      |             Consistent icon system across the workspace            |
|       **Vercel**          |                  Frontend and backend deployment                   |

</div>

---

## ?? Project Structure

\\\	ext
PHA10-MediCare-Connect/
+-- public/
¦   +-- preview1.png
¦   +-- preview2.png
¦   +-- preview3.png
+-- src/
¦   +-- app/
¦   ¦   +-- (auth)/
¦   ¦   +-- (main)/
¦   ¦   +-- dashboard/
¦   ¦   +-- layout.jsx
¦   ¦   +-- page.jsx
¦   +-- components/
¦   ¦   +-- dashboardPage/
¦   ¦   +-- homepage/
¦   ¦   +-- ui/
¦   ¦   +-- shared/
¦   +-- lib/
¦   ¦   +-- api/
¦   ¦   +-- auth-context.jsx
+-- package.json
+-- README.md
\\\

---

## ?? Design Highlights

- **MediCare landing page** with a polished hero section, dynamic statistics, and animated feature highlights
- **Role-based Dashboards** specifically tailored for Patients, Doctors, and Administrators
- **Responsive navigation** that adapts seamlessly from mobile hamburger menus to desktop navigation bars
- **Modern aesthetics** using glassmorphism, subtle gradients, and customized Tailwind styling
- **Consistent interaction language** using lucide icons, animated buttons, and toast feedback
- **Real-time Analytics** beautifully rendered with customized Area and Bar charts

---

## ?? Environment Variables

Create a \.env\ file in the project root and configure these values:

\\\env
# API Base URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Stripe Public Key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Firebase Config (If applicable)
NEXT_PUBLIC_FIREBASE_API_KEY=...
\\\

For production, set:

\\\env
NEXT_PUBLIC_API_URL=https://medicareconnectwebserver.vercel.app/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
\\\

---

## ?? Getting Started

Install dependencies:

\\\ash
npm install
\\\

Run the development server:

\\\ash
npm run dev
\\\

Open the app:

\\\	ext
http://localhost:3000
\\\

Build for production:

\\\ash
npm run build
\\\

Run the production server:

\\\ash
npm start
\\\

---

## ?? Deployment

The application is deployed on **Vercel**:

**Frontend Live URL:** [https://medicareconnectweb.vercel.app/](https://medicareconnectweb.vercel.app/)
**Backend Live URL:** [https://medicareconnectwebserver.vercel.app/](https://medicareconnectwebserver.vercel.app/)
**Backend Repository:** [https://github.com/smRid/MediCare-Connect-Server](https://github.com/smRid/MediCare-Connect-Server)

For deployment:

1. Add all production environment variables in Vercel project settings.
2. Ensure the backend API URL points to the live server.
3. Configure Stripe webhooks and keys for production mode.
4. Allow Vercel/production access in MongoDB Atlas Network Access.
5. Redeploy after changing environment variables.

---

<div align="center">

**? If you found this project useful, consider giving it a star!**

Made with ?? using Next.js, React, Tailwind CSS, MongoDB, and Vercel

</div>
