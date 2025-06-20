/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    // Gradientes para las cards
    'bg-gradient-to-r',
    'from-blue-500',
    'to-blue-700',
    'from-green-500',
    'to-green-700',
    'from-purple-500',
    'to-purple-700',
    'from-red-500',
    'to-red-700',
    'from-indigo-500',
    'to-indigo-700',
    'from-gray-500',
    'to-gray-700',
    // Colores de categoría
    'bg-blue-100',
    'text-blue-800',
    'bg-green-100',
    'text-green-800',
    'bg-purple-100',
    'text-purple-800',
    'bg-red-100',
    'text-red-800',
    'bg-indigo-100',
    'text-indigo-800',
    'bg-gray-100',
    'text-gray-800',
  ],
}
