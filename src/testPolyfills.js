// This files contains various test polyfills

// maybe TEMP until https://github.com/facebookincubator/create-react-app/issues/3199
export const raf = (global.requestAnimationFrame = cb => {
  setTimeout(cb, 0)
})
