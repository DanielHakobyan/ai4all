# AI4ALL Frontend

Welcome to the **AI4ALL** frontend! This is a modern, interactive web application built to showcase the mission, projects, news, and media of the AI4ALL initiative. The design is clean, minimalist, and highly interactive, with a focus on accessibility and user engagement.

---

## 🚀 Project Overview
AI4ALL aims to democratize artificial intelligence in Armenia by empowering youth, teachers, and creators with accessible AI tools, workshops, and educational resources. This frontend is the public face of the initiative, featuring:
- Animated hero and mission sections
- Interactive project, news, and media pages
- Modern UI/UX with smooth transitions
- Integrated chatbot assistant
- Responsive design for all devices

---

## ✨ Features
- **Animated Matrix Rain**: Eye-catching matrix effect in hero and news sections
- **Mission Slider**: Horizontally scrollable mission statement
- **Stats Flip Cards**: Interactive statistics with card flip animation
- **Media & News**: Embedded YouTube videos and dynamic news cards
- **Projects Gallery**: Modern, filterable project showcase
- **Chatbot**: Floating AI assistant powered by OpenRouter
- **Modern Footer**: Social links, contact info, and copyright

---

## 🛠️ Tech Stack
- **React** (with TypeScript)
- **Vite** (for fast development)
- **Tailwind CSS** (utility-first styling)
- **Framer Motion** (animations)
- **Lucide React** (icon set)
- **React Router** (routing)

---

## 📦 Folder Structure
```
ai4all-frontend/
├── public/
│   └── animations/         # Robot animation and static assets
├── src/
│   ├── components/         # Reusable UI components
│   ├── data/               # Static data (news, etc.)
│   ├── pages/              # Main pages (home, about, projects, news, media, etc.)
│   ├── services/           # API and backend service logic
│   ├── assets/             # Images, SVGs, etc.
│   └── ...
├── App.tsx                # Main app shell
├── index.html              # HTML entry point
├── tailwind.config.js      # Tailwind CSS config
├── vite.config.ts          # Vite config
└── ...
```

---

## ⚡ Getting Started

### 1. **Install dependencies**
```bash
npm install
```

### 2. **Run the development server**
```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### 3. **Build for production**
```bash
npm run build
```

### 4. **Preview production build**
```bash
npm run preview
```

---

## 📝 Customization
- **Project/News/Media Content**: Edit files in `src/data/` or `src/pages/` to update content.
- **Branding/Colors**: Adjust `tailwind.config.js` for custom color schemes.
- **Chatbot API**: Update the API key and endpoint in `src/pages/home.tsx` for your own chatbot integration.
- **Social Links**: Update footer links in each page for your organization’s real social media URLs.

---


## © {new Date().getFullYear()} Daniel Hakobyan. All rights reserved.
