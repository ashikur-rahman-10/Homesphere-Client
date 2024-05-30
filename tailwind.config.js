module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
  ],
  theme: {
    extend: {
      gradientColorStopPositions: {
        33: '33%',
      }
    },
  },
  plugins: [require('daisyui')],
}