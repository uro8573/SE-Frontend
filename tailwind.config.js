/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'h1-heading': ['clamp(3rem, 6vw, 7.5rem)', {
          lineHeight: '100%',
          fontWeight: '600',
        }],
        'h2-heading': ['clamp(2.5rem, 5vw, 5.75rem)', {
          lineHeight: '120%',
          fontWeight: '700',
        }],
        'h3-heading': ['clamp(1.5rem, 3.5vw, 2.5rem)', {
          lineHeight: '120%',
          fontWeight: '700',
        }],
        'h4-heading': ['clamp(1.25rem, 2.5vw, 1.5rem)', {
          lineHeight: '120%',
          fontWeight: '700',
        }],
        'h5-heading': ['clamp(1.125rem, 2vw, 1.25rem)', {
          lineHeight: '120%',
          fontWeight: '500',
        }],
        'hs-heading': ['clamp(2.5rem, 5vw, 4rem)', {
          lineHeight: '120%',
          fontWeight: '700',
        }],
        'p1-paragraphy-large': ['clamp(1.125rem, 2vw, 1.375rem)', {
          lineHeight: '110%',
          fontWeight: '400',
        }],
        'p2-paragraphy-medium': ['clamp(1rem, 1.8vw, 1.25rem)', {
          lineHeight: '110%',
          fontWeight: '400',
        }],
        'p3-paragraphy-small': ['clamp(0.875rem, 1.5vw, 1.125rem)', {
          lineHeight: '110%',
          fontWeight: '400',
        }],
        'ui-label-semi-bold': ['clamp(0.875rem, 1.5vw, 1rem)', {
          lineHeight: '110%',
          fontWeight: '600',
        }],
        'ui-label-medium': ['clamp(0.875rem, 1.5vw, 1rem)', {
          lineHeight: '110%',
          fontWeight: '500',
        }],
        'ui-label-regular': ['clamp(0.875rem, 1.5vw, 1rem)', {
          lineHeight: '110%',
          fontWeight: '400',
        }],
        'c1-comment-large': ['clamp(1rem, 1.7vw, 1.125rem)', {
          lineHeight: '130%',
          fontWeight: '400',
        }],
        'i1-info-large': ['clamp(0.875rem, 1.5vw, 1rem)', {
          lineHeight: '110%',
          fontWeight: '400',
        }],
      },
      colors: {
        'primary-orange': '#F49B4A',
        'secondary-orange': '#F3E5D9',
        'primary-dark': '#0A0C10',
        'ct-light-dark': '#424345',
        'ct-dark-grey': '#7D7E80',
        'ct-grey': '#B9B9B9',
        'ct-light-grey': '#D8D8D8',
        'ct-white': '#FBFBFB',
        'transparent-stroke': 'rgba(0, 0, 0, 0.2)',
        'transparent-bg': 'rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
