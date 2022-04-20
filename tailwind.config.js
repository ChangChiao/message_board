module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#03438D',
        secondary: '#EFECE7',
        black: '#000400',
        gray: '#9B9893',
        yellow: '#EEC32A',
        red: '#F57375',
      },
      boxShadow: {
        normal: '0px 3px 0px #000400',
        '3D': '-2px 2px 0px #000400',
      },
    },
  },
  plugins: [],
};
