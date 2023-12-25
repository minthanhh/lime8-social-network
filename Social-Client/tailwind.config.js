/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  important: true,
  theme: {
    extend: {
      animation: {
        animateSpin: 'spin 1s linear'
      },
      fill: {
        dark: '#1B1D2A',
        light: '#FFFFFF'
      },
      boxShadow: {
        shadowMain: '0px 1px 8px 1px rgba(0, 0, 0, 0.10)',
        shadowInner: 'inset 0px 1px 8px 1px rgba(0, 0, 0, 0.10)'
      },
      aspectRatio: {
        '2/1': '2 / 1'
      },
      colors: {
        dark: '#1B1D2A',
        light: '#FFFFFF'
      },
      backgroundColor: {
        chatBoxLight: '#F5F5F5',
        chatBoxDark: '#1B1D2A',
        messageLight: '#F5F5F5',
        messageDark: '#1B1D2A',
        inputLight: '#F5F5F5',
        inputDark: '#343746',
        inputLightSecondary: '#77757580',
        light: '#FFFFFF',
        dark: '#1B1D2A',
        lightMain: '#F5F6FC',
        darkMain: '#0C0F1D',
        darkMessage: '#0B0F22'
      },
      textColor: {
        dark: '#1B1D2A',
        light: '#FFFFFF'
      },
      width: {
        main: '1200px'
      },
      height: {
        header: 'var(--header-height)'
      },
      maxWidth: {
        '1/5': '20%'
      }
    }
  },
  plugins: []
}
