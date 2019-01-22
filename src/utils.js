/**
 * 获取类型
 * @param {any} 
 * @return {String} 
 */
function getType(value) {
  const str = typeof value
  if (str === 'object') {
    return value === null ? null : Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
  }
  return str
}
/**
 * 获取guid
 * @return {String} guid
 */
function guid() {
  // 生产guid
  return 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0
    var v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * 返回空对象，创建新对象
 * @param {Object}
 * @return {Object}
 */
function newObj(obj) {
  let resObj = Object.create(null);
  if (obj !== undefined) {
    resObj = Object.assign(resObj, Object.assign.apply(this, arguments));
  }
  return resObj;
}


/**
 * 获取直线上任一点的坐标，知道该点到一个断点的距离
 * @param {*} point1 直线开始坐标
 * @param {*} point2 直线结束坐标
 * @param {*} d 直线上一点到point0点的距离
 */
function getLinePoint(point1, point2, d) {
  const [ x1, y1 ] = point1;
  const [ x2, y2 ] = point2;
  const r = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
  const x = (d * (x2 - x1)) / r + x1;
  const y = (d * (y2 - y1)) / r + y1;
  return [ x, y ];
}

/**
 * 求两个坐标点的距离
 * @param {*} point1 起始点
 * @param {*} points 终点
 */
function getPointsDistance(point1, point2) {
  const [ x1, y1 ] = point1;
  const [ x2, y2 ] = point2;
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

export { getType, guid, newObj, getLinePoint, getPointsDistance }