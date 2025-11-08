/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        // Garante que o Tailwind escaneie todos os arquivos React/TSX/JSX no app e components
        './src/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}