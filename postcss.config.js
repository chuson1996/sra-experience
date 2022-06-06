const partialProcess = require('postcss-partial-process');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const prependSelector = require('postcss-prepend-selector');

module.exports = {
  // plugins: {
  //   'postcss-partial-process': {
  //     plugins: [prependSelector({ selector: '.tw ' })],
  //   },
  //   tailwindcss: {},
  //   autoprefixer: {},
  // }
  plugins: [
    tailwindcss('./tailwind.config.js'),
    partialProcess({
      plugins: [
        prependSelector({ selector: '.tw ' }),
      ],
    }),
  ]
}