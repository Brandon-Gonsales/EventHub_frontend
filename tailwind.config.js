/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          primary: "#FFFFFF", // fondo principal, cards, fondo sections
          primary_h: "#E5E9F0", // hover cards, hover sections
          secondary: "#231942", // botones, links, iconos
          secondary_h: "#023047", // hover: botones, links, iconos
          tertiary: "#0077b6", // accentos, iconos
          tertiary_h: "#0077b6", // hover: accentos
          fourth: "#A3BAC3", //bordes, iconos
          fourth_h: "#A3BAC3", // hover: border, iconos
          success: "#28a745", // Verde éxito
          danger: "#dc3545",  // Rojo error
          warning: "#ffc107",//Amarillo advertencia
          black: "#000000", // texto, iconos
          white: "#FFFFFF", // texto, iconos
        },
        dark: {
          primary: "#121212",
          primary_h: "#282828", // Hover para fondos y tarjetas
          secondary: "#ffffff", // Mantiene el azul principal para botones y links
          secondary_h: "#ffffff", // Mantiene el hover del azul principal
          tertiary: "#0077b6", // Mantiene el color de acento, que funciona bien en dark mode
          tertiary_h: "#0077b6", // Mantiene el hover de acento
          fourth: "#575757", // Bordes más suaves para contrastar con el fondo oscuro
          fourth_h: "#575757", // Hover para bordes
          success: "#28a745", // Verde de éxito (mismo valor)
          danger: "#dc3545", // Rojo de error (mismo valor)
          warning: "#ffc107", // Amarillo de advertencia (mismo valor)
          black: "#FFFFFF", // Se invierte a blanco para el texto principal
          white: "#1E2024",
        },
      },
    },
  },
  plugins: [],
}

