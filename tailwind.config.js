/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                navy: {
                    900: '#1e3a8a',
                },
                slate: {
                    900: '#0f172a',
                },
                orange: {
                    500: '#f97316',
                    600: '#ea580c',
                },
                blue: {
                    500: '#3b82f6',
                },
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Poppins', 'sans-serif'],
                thai: ['Sarabun', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
