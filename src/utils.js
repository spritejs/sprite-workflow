/**
 * 获取类型
 * @param {any} value
 */
function getType(value) {
  const str = typeof value
  if (str === 'object') {
    return value === null ? null : toStr(value).toLowerCase()
  }
  return str
}
/**
 * 获取guid
 * @return guid
 */
function guid() {
  // 生产guid
  return 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0
    var v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
exoprt { getType, guid }