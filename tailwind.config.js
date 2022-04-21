module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      body: ['Noto Sans TC', 'sans-serif']
    },
    extend: {
      colors: {
        primary: '#03438D',
        secondary: '#EFECE7',
        black: '#000400',
        gray: '#9B9893',
        yellow: '#EEC32A',
        sky: '#E2EDFA',
        red: '#F57375'
      },
      boxShadow: {
        normal: '0px 3px 0px #000400',
        '3D': '-2px 2px 0px #000400',
        light: '-8px 8px 0px #00040029'
      }
    }
  },
  plugins: []
};
