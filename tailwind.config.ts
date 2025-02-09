module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#1a1a1a',
        lightGray: '#b3b3b3',
        white: '#ffffff',
        backgroundMain: '#151515',
        textHigh: '#ffffff',
        textLow: '#a7a6a6',
        baseBlock: '#212121',
        blue: '#3b82f6',
      },
      borderRadius: {
        lg: '0.75rem',
      },
    },
  },
}
