module.exports = file => () => {
  if (file.startWith('@/')) {
    return import(file + '.vue')
  } else {
    return import('@/module-' + file + '.vue')
  }
}
