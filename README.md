# 🏖️ StayFindr – Modern Accommodation Booking App

Welcome to **StayFindr**, a modern and responsive front-end accommodation booking application built as part of the **FED2 Exam Project** at Noroff. StayFindr allows travelers to search and book unique stays, while venue managers can register and manage properties and bookings.

**🔗 Live site:** [https://stayfindr.netlify.app](https://stayfindr.netlify.app)  
**📦 GitHub repo:** [https://github.com/Panida287/StayFindr](https://github.com/yourusername/holidaze)

---

## 📚 Project Overview

StayFindr is a full-featured single-page application (SPA) built with **React**, **TypeScript**, and **Tailwind CSS**, integrating with the official **Noroff Holidaze API v2**. 

The application includes:

- A public-facing customer booking interface
- An admin dashboard for venue managers to list, edit, and manage properties
- Real-time availability via a booking calendar
- Account management, profile customization, and responsive layout

This project meets all user stories outlined in the official exam brief and demonstrates full-stack integration, responsive design, and modern development practices.

---

## 🚀 Features

### 🧭 Public/Visitor Features
- Browse all venues
- Search by city or venue name
- Filter by amenities, guest count, and availability
- View venue detail pages with image gallery and map
- Register with a `@stud.noroff.no` email (Traveler or Manager)

### ✈️ Customer (Traveler) Features
- Secure login and logout
- Make venue bookings with date range and guest count
- View upcoming and past bookings
- Edit avatar and bio

### 🏨 Venue Manager Features
- Create, edit, and delete own venues
- View bookings made on owned venues
- Manage listing media, descriptions, amenities
- Responsive admin dashboard and booking tools

---

## 🛠️ Tech Stack

| Category        | Tools & Technologies              |
|----------------|-----------------------------------|
| Framework       | React + Vite + TypeScript         |
| CSS Framework   | Tailwind CSS                      |
| State Mgmt      | Zustand                           |
| Maps            | Leaflet.js                        |
| Forms & Date    | React Hook Form, React Datepicker |
| UI & Toasts     | Lucide Icons, React Hot Toast     |
| Hosting         | Netlify                           |
| API             | Noroff Holidaze API               |
| Planning        | GitHub Projects (Kanban + Gantt)  |
| Design          | Figma (Style Guide + Prototype)   |


---

## 📁 Project Structure

```plaintext
src/
├── components/          # UI Components (shared, venues, bookings)
├── hooks/               # Custom React hooks (CRUD, auth, API)
├── pages/               # All page views (user/admin/venue)
├── store/               # Zustand stores (profile, venue, bookings)
├── utilities/           # Helper functions
├── css/                 # Tailwind + global styles
├── constants.ts         # API keys, URLs, and fallback assets
└── main.tsx             # App entry point
```

---

## 🧪 Installation & Setup

### 🖥️ Clone the project:

```bash
git clone git@github.com:Panida287/StayFindr.git
cd StayFindr
```

### 📦 Install dependencies:

```bash
npm install
```

### 🔑 Configure API key:

1. Create a `.env` file:
   ```bash
   touch .env
   ```

2. Add your Noroff API key:
   ```env
   VITE_API_KEY=your-api-key-here
   ```

> Replace `your-api-key-here` with your personal key from [docs.noroff.dev](https://docs.noroff.dev/docs/v2/auth/api-key)

3. Restart the dev server:
   ```bash
   npm run dev
   ```

---

## ✨ Design & Accessibility

- WCAG-compliant color palette
- Responsive layout for all devices
- Accessible form validation and navigation
- Figma design system includes:
  - Logo, fonts, color palette
  - Components and layouts for mobile & desktop

---

## 📂 Deployment

The project is deployed using **Netlify**  
🔗 [stayfindr.netlify.app](https://stayfindr.netlify.app)

---

## 📄 License

This project is created for educational purposes as part of Noroff’s curriculum and is not intended for commercial use.
