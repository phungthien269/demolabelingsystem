/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class', // Manual dark mode (though we default to dark)
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['ui-mono', 'monospace'], // Placeholder for ui-mono
            },
            colors: {
                // Semantic roles based on Design System
                annotator: {
                    primary: '#1fad93',
                },
                reviewer: {
                    primary: '#1fad93',
                },
                manager: {
                    primary: '#135bec',
                },
                admin: {
                    primary: '#135bec',
                },

                // Dark theme specific (default)
                dark: {
                    bg: {
                        base: '#0b0e14',   // Preference for [0]
                        canvas: '#0b0e14',
                    },
                    surface: {
                        panel: '#1c212b',  // Preference for [0]
                        toolbar: '#111318',
                    },
                    text: {
                        primary: '#ffffff',
                        secondary: '#9da6b9',
                        muted: '#64748b',
                    },
                    border: {
                        base: '#2d3544',
                        muted: 'rgba(255,255,255,0.08)',
                    }
                },

                // Light theme specific (if needed later)
                light: {
                    bg: { base: '#f2f2f2' },
                    surface: { panel: '#ffffff' },
                    text: { primary: '#0f172a', secondary: '#475569', muted: '#64748b' },
                    border: { base: '#e2e8f0' }
                }
            },
            borderRadius: {
                sm: '6px',
                md: '8px',
                lg: '12px',
                xl: '16px',
                pill: '9999px',
            },
            spacing: {
                // Extended spacing if needed, but Tailwind default covers many 4px intervals (1=4px)
            },
            fontSize: {
                h1: ['32px', { lineHeight: '40px', fontWeight: '800' }],
                h2: ['24px', { lineHeight: '32px', fontWeight: '800' }],
                h3: ['16px', { lineHeight: '24px', fontWeight: '700' }],
                body: ['14px', { lineHeight: '20px', fontWeight: '500' }],
                caption: ['12px', { lineHeight: '16px', fontWeight: '600' }],
                micro: ['10px', { lineHeight: '14px', fontWeight: '600' }],
            },
            letterSpacing: {
                wide: '0.05em', // Tracking for uppercase
            },
            transitionDuration: {
                fast: '150ms',
                base: '200ms',
                slow: '250ms',
            },
            transitionTimingFunction: {
                'ease-out': 'ease-out',
            }
        },
    },
    plugins: [],
}
