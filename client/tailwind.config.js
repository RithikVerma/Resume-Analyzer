/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#8B5CF6',
                    light: '#A78BFA',
                    dark: '#7C3AED',
                },
                secondary: {
                    DEFAULT: '#3B82F6',
                    light: '#60A5FA',
                },
                bg: {
                    primary: '#0F172A',
                    secondary: '#1E293B',
                    tertiary: '#334155',
                    card: 'rgba(30, 41, 59, 0.6)',
                },
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Space Grotesk', 'sans-serif'],
            },
            animation: {
                'float': 'float 20s ease-in-out infinite',
                'spin-slow': 'spin 3s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translate(0, 0)' },
                    '50%': { transform: 'translate(50px, 50px)' },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [],
}
