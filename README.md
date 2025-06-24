# 3D Room Designer

A modern, interactive web application for designing and customizing 3D room layouts directly in your browser. Built with React, Three.js, Zustand, and Tailwind CSS.

---

## 🚀 Features
- **3D Room Visualization:** Real-time rendering of customizable rooms and furniture.
- **Furniture Management:** Add, select, color, and remove furniture from categorized options.
- **Room Customization:** Change wall and floor colors, apply room presets, and clear the room.
- **Camera Controls:** Orbit, pan, zoom, and switch between multiple camera views.
- **Responsive UI:** Works seamlessly on desktop and mobile.
- **No Sign-Up Required:** All features are available instantly, no account needed.

---

## 🖥️ Tech Stack
- **Frontend:** React + TypeScript
- **3D Engine:** Three.js via @react-three/fiber & @react-three/drei
- **State Management:** Zustand
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Backend:** None (client-side only)

---

## 📦 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/JacobKayembekazadi/3d-zone1.git
   cd 3d-zone1
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
4. **Open in your browser:**
   Visit [http://localhost:5173](http://localhost:5173)

---

## 🧩 Project Structure

```
├── src/
│   ├── components/         # UI and 3D scene components
│   ├── store/              # Zustand state management
│   ├── types/              # TypeScript data models
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── public/
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── ...
```

---

## 📚 Documentation
- **[Architectural Overview](architectural_document.md)**
- **[Data Model](DATA_MODEL.md)**
- **[Product Requirements](product_requirements_document.md)**
- **[Architecture Decision Records](ADR-001.md)**

---

## 📝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 🛡️ License
MIT
