module.exports = (file) => {
  if (file.indexOf('@/') === 0 || file.indexOf('.') === 0) {
    return require(file + '.vue').default
  } else {
    return require('@/module-' + file + '.vue').default
  }
}
