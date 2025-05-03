# 🗺️ Map Component with Neshan API (React + TypeScript)

This project provides a responsive and clean implementation of a map display using **Neshan Map API** in a **React + TypeScript** app. The map shows a location, retrieves address data, and provides a link to open in Google Maps.

---

## 🚀 Features

- 📍 Fetches static map image from Neshan API
- 🔁 Converts latitude/longitude to address using reverse geocoding
- 💻 Fully responsive: adapts to screen size for width/height
- 🕒 Shows loading indicator before map loads
- 🔗 Opens Google Maps for the coordinates on click
- 🎨 Styled using a powerful custom CSS (`custom.css`)

---

## 🔧 How to Run

```bash
git clone <your-repo-url>
cd map-component-app
npm install
npm start
```

Then open [http://localhost:3000](http://localhost:3000)

---

## 🧪 Mock Data

- Coordinates used: `lat=x`, `lng=y`
- Replace `YOUR_NESHAN_API_KEY` in `MapComponent.tsx` with your own key

---

## 📁 Project Structure

```
map-component-app/
├── public/
│   ├── index.html
│   └── custom.css
├── src/
│   ├── App.tsx
│   ├── index.tsx
│   ├── MapComponent.tsx
│   └── core/component/
│       ├── button/ButtonPanel.tsx
│       ├── Column.tsx
│       └── RowContainer.tsx
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚠️ Notes

- Be sure to replace the sample API key with your real **Neshan API key**
- For production use, secure your keys with environment variables

---
