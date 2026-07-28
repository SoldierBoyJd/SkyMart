export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                void: '#080809',
                surface: '#0f0f11',
                raised: '#161618',
                overlay: '#1c1c1f',
                outline: 'rgba(255,255,255,0.07)',
                lime: {
                    vivid: '#D9FF00',
                    soft: '#C8EF00',
                    dim: '#B2D600',
                    glow: 'rgba(217,255,0,0.18)',
                },
                ink: {
                    primary: '#FFFFFF',
                    secondary: '#C0C0C8',
                    muted: '#72727A',
                    faint: '#3A3A42',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
            },
            fontSize: {
                '2xs': ['0.65rem', { lineHeight: '1rem' }],
            },
            borderRadius: {
                sm: '6px',
                DEFAULT: '10px',
                md: '12px',
                lg: '16px',
                xl: '20px',
                '2xl': '24px',
                '3xl': '32px',
                pill: '9999px',
            },
            boxShadow: {
                'lime-sm': '0 0 12px rgba(217,255,0,0.15)',
                'lime-md': '0 0 28px rgba(217,255,0,0.22)',
                'lime-lg': '0 0 60px rgba(217,255,0,0.3)',
                'lift': '0 8px 32px rgba(0,0,0,0.55)',
                'lift-lg': '0 16px 56px rgba(0,0,0,0.7)',
                'inset-top': 'inset 0 1px 0 rgba(255,255,255,0.06)',
            },
            backgroundImage: {
                'noise': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
                'lime-ray': 'radial-gradient(ellipse 60% 40% at 70% 0%, rgba(217,255,0,0.12) 0%, transparent 65%)',
                'lime-spot': 'radial-gradient(circle 400px at 50% 0%, rgba(217,255,0,0.08) 0%, transparent 70%)',
                'grid-lines': "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            },
            backgroundSize: {
                grid: '48px 48px',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-lime': 'pulse-lime 2.5s ease-in-out infinite',
                'slide-in': 'slideIn 0.38s cubic-bezier(0.16,1,0.3,1)',
                'fade-up': 'fadeUp 0.45s cubic-bezier(0.16,1,0.3,1)',
                'shimmer': 'shimmer 1.6s linear infinite',
                'spin-slow': 'spin 3s linear infinite',
            },
            keyframes: {
                float: {
                    '0%,100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'pulse-lime': {
                    '0%,100%': { boxShadow: '0 0 20px rgba(217,255,0,0.2)' },
                    '50%': { boxShadow: '0 0 40px rgba(217,255,0,0.45)' },
                },
                slideIn: {
                    from: { transform: 'translateX(100%)' },
                    to: { transform: 'translateX(0)' },
                },
                fadeUp: {
                    from: { opacity: '0', transform: 'translateY(18px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-600px 0' },
                    '100%': { backgroundPosition: '600px 0' },
                },
            },
            transitionTimingFunction: {
                spring: 'cubic-bezier(0.16, 1, 0.3, 1)',
            },
        },
    },
    plugins: [],
}
