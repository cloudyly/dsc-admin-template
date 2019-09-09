export const generateOptions = (map, labelName, valueName) => {
  const list = []
  const keys = Object.keys(map)
  if (!keys || keys.length <= 0) {
    return list
  }
  keys.forEach(key => {
    const item = {}
    item[labelName] = map[key]
    item[valueName] = key
    list.push(item)
  })
  return list
}

export const generateMap = (list, keyName, valueName) => {
  const map = {}
  if (!list || list.length <= 0) {
    return map
  }
  list.forEach(item => {
    const key = item[keyName]
    map[key] = item[valueName]
  })
  return map
}
