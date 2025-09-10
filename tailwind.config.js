/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          bg: "#F8F9FA", // azul clarito
          bg_h: "#F8F9FA", // azul clarito
          primary: "#1C2541", // azul principal
          primary_h: "#1C2541", // azul principal
          secondary: "#8A2BE2", // azul oscuro
          secondary_h: "#8A2BE2", // azul oscuro
          border: "#f3f4f6", // azul oscuro
          border_h: "#f3f4f6", // azul oscuro
          accent: "#61DAFB", // un color suelto (rosa fuerte)
          accent_h: "#61DAFB", // un color suelto (rosa fuerte)
          success: "#28a745", // Verde éxito
          danger: "#dc3545",  // Rojo error
          warning: "#ffc107",
        },
        dark: {
          bg: "#1A1B1E", // azul clarito
          bg_h: "#151519", // azul clarito
          primary: "#FFFFFF", // azul principal
          primary_h: "#FFFFFF", // azul principal
          secondary: "#2A3964", // azul oscuro
          secondary_h: "#2A3964", // azul oscuro
          border: "#f3f4f6", // azul oscuro
          border_h: "#B0B0B0", // azul oscuro
          accent: "#E47400", // un color suelto (rosa fuerte)
          accent_h: "#E47400", // un color suelto (rosa fuerte)ç
          success: "#28a745", // Verde éxito
          danger: "#dc3545",  // Rojo error
          warning: "#ffc107",
        },
      },
    },
  },
  plugins: [],
}

