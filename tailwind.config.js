/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#1337ec",
                "secondary": "#7c3aed",
                "background-light": "#f6f6f8",
                "background-dark": "#0d1117",
                "surface-dark": "#161b22",
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"],
                "sans": ["Inter", "sans-serif"],
            },
            backgroundImage: {
                'glow-gradient': 'radial-gradient(circle at center, rgba(19, 55, 236, 0.15) 0%, rgba(13, 17, 23, 0) 70%)',
                'card-gradient': 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
            }
        },
    },
    plugins: [],
}
