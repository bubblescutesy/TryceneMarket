/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6F2EE',
          100: '#C1E0D6',
          200: '#98CDBA',
          300: '#6EB99E',
          400: '#50A889',
          500: '#2D6A4F', // Main primary color
          600: '#286247',
          700: '#22573D',
          800: '#1B4C34',
          900: '#11392B',
        },
        secondary: {
          50: '#FCF3F1',
          100: '#FAE2DC',
          200: '#F5CFC5',
          300: '#F1BCAD',
          400: '#EC9B82',
          500: '#E76F51', // Main secondary color
          600: '#D15A3C',
          700: '#BC4E2F',
          800: '#A74226',
          900: '#8A3518',
        },
        accent: {
          50: '#FDEEE1',
          100: '#FBD6B4',
          200: '#F8BD83',
          300: '#F6A452',
          400: '#F4A261', // Main accent color
          500: '#F38E30',
          600: '#E0812B',
          700: '#CD7125',
          800: '#B9611F',
          900: '#994514',
        },
        success: {
          50: '#E7F5EB',
          100: '#C2E5CD',
          200: '#99D4AC',
          300: '#6DC386',
          400: '#49B567',
          500: '#1D9940',
          600: '#198C3A',
          700: '#147C33',
          800: '#0F6D2C',
          900: '#085020',
        },
        warning: {
          50: '#FEF7EA',
          100: '#FCECC9',
          200: '#FADF9F',
          300: '#F8D275',
          400: '#F6C94A',
          500: '#F4BA18',
          600: '#E0AA15',
          700: '#CC9812',
          800: '#B8870E',
          900: '#A4760A',
        },
        error: {
          50: '#FEEAEA',
          100: '#FBC9C9',
          200: '#F9A7A7',
          300: '#F68585',
          400: '#F46363',
          500: '#E53535',
          600: '#D03030',
          700: '#BC2A2A',
          800: '#A82525',
          900: '#871D1D',
        },
        neutral: {
          50: '#F8F9FA',
          100: '#E9ECEF',
          200: '#DEE2E6',
          300: '#CED4DA',
          400: '#ADB5BD',
          500: '#6C757D',
          600: '#495057',
          700: '#343A40',
          800: '#212529',
          900: '#0F1419',
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
        heading: [
          'Poppins',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-in-out',
        'slide-down': 'slideDown 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};