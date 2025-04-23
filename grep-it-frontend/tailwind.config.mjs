/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                'terminal-bg': '#282C34',
                'terminal-text': '#ABB2BF',
                'terminal-green': '#98C379',
                'terminal-yellow': '#E5C07B',
                'terminal-red': '#E06C75',
                'terminal-blue': '#61AFEF',
                'terminal-purple': '#C678DD',
                'terminal-border': '#3E4452',
                'terminal-comment': '#5C6370',
                'terminal-dark': '#1E2127',
            },
            fontFamily: {
                mono: ['JetBrains Mono', 'monospace'],
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}