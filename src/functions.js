import { _links, _workflow, _steps } from './symbolNames'
import { getType } from './utils'

import { Step } from './step'
import { Link } from './link'


/**
 * 根据传入的link找到相关的step
 * @param {*} link Link
 * @param {*} type ['start','end'],link start部位的step与link end 部位的step
 */
function getRelativeStep(link, type) {
  if (!(link instanceof Link)) {
    console.error('function getRelativeStep params error');
  }
  let res = [];
  const { startStepId, endStepId } = link.attr();
  if (link[ _workflow ]) {
    let steps = link[ _workflow ][ _steps ];
    if (type === undefined) {
      res = steps.filter(step => step.id === startStepId || step.id === endStepId)
    } else if (type === 'start') {
      res = steps.filter(step => step.id === startStepId)
    } else if (type === 'end') {
      res = steps.filter(step => step.id === endStepId)
    }
  }
  return res;
}

function refreshLink(params) { // [steps,links]根据step,link，更新link
  let sprites = params;
  if (getType(sprites) === 'array') { // 如果是数组，循环处理
    sprites.forEach(sprite => {
      refreshLinkBySprite(sprite);
    })
  } else {
    refreshLinkBySprite(sprites);
  }
  function refreshLinkBySprite(sprite) {
    if (sprite instanceof Step) { // 如果传入的对象是step，根据当前step对象的变化，刷新对应的link
      const links = sprite[ _workflow ][ _links ];
      links.forEach(link => {
        setLinkPoint(link, sprite);
      });
    } else if (sprite instanceof Link) { // 如果传入的对象是link，根据当前的link对象的数据，刷新link
      const steps = sprite[ _workflow ][ _steps ];
      steps.forEach(step => {
        setLinkPoint(sprite, step);
      });
    }
  }
  function setLinkPoint(link, step) {
    const { startStepId, endStepId } = link.attr();
    const stepId = step.attr('id');
    const [ xMin, yMin ] = step.container.attr('pos');
    const targetPoint = [ xMin, yMin ];
    if (startStepId === stepId) {
      link.attr({ startPoint: targetPoint });
    } else if (endStepId === stepId) {
      link.attr({ endPoint: targetPoint });
    }
  }
}

/**
 * 已知两点的直线，求两点间的任一点的坐标，知道该点的x或者y坐标
 * @param {*} point1 起始点
 * @param {*} points 终点
 */
// function getPointByXY(point1, point2, targetPoint) {
//   const [ x1, y1 ] = point1;
//   const [ x2, y2 ] = point2;
//   const [ x, y ] = targetPoint;
//   let res = [ x, y ];
//   if (x === undefined && y === undefined) {
//     return;
//   }
//   if (x === undefined) {
//     res[ 0 ] = (x2 - x1) / (y2 - y1) * (y - y1) + x1;
//   } else if (y === undefined) {
//     res[ 1 ] = (y2 - y1) / (x2 - x1) * (x - x1) + y1;
//   }
//   return res;
// }

/**
 * 获取直线上到point1距离为d的点坐标
 * @param {*} point1 直线开始坐标
 * @param {*} point2 直线结束坐标
 * @param {*} distance 直线上一点到point1点的距离
 */
function getPointByDistance(point1, point2, distance) {
  const [ x1, y1 ] = point1;
  const [ x2, y2 ] = point2;
  const r = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
  const x = (distance * (x2 - x1)) / r + x1;
  const y = (distance * (y2 - y1)) / r + y1;
  return [ x, y ];
}

/**
 *判断线段ab与线段cd是否相交，如果相交，返回交点坐标
 * @param {*} a 线段ab上的a点
 * @param {*} b
 * @param {*} c 线段cd上的c点
 * @param {*} d
 */
function segmentsIntersectionPoint(a, b, c, d) {
  // 判断每一条线段的两个端点是否都在另一条线段的两侧, 是则求出两条线段所在直线的交点, 否则不相交
  // 三角形abc 面积的2倍
  var areaAbc = (a[ 0 ] - c[ 0 ]) * (b[ 1 ] - c[ 1 ]) - (a[ 1 ] - c[ 1 ]) * (b[ 0 ] - c[ 0 ]);
  // 三角形abd 面积的2倍
  var areaAbd = (a[ 0 ] - d[ 0 ]) * (b[ 1 ] - d[ 1 ]) - (a[ 1 ] - d[ 1 ]) * (b[ 0 ] - d[ 0 ]);
  // 面积符号相同则两点在线段同侧,不相交 (对点在线段上的情况,本例当作不相交处理);
  if (areaAbc * areaAbd > 0) {
    return false;
  }
  // 三角形cda 面积的2倍
  var areaCda = (c[ 0 ] - a[ 0 ]) * (d[ 1 ] - a[ 1 ]) - (c[ 1 ] - a[ 1 ]) * (d[ 0 ] - a[ 0 ]);
  // 三角形cdb 面积的2倍
  // 注意: 这里有一个小优化.不需要再用公式计算面积,而是通过已知的三个面积加减得出.
  var areaCdb = areaCda + areaAbc - areaAbd;
  if (areaCda * areaCdb > 0) {
    return false;
  }
  // 计算交点坐标
  let t = areaCda / (areaAbd - areaAbc);
  let dx = t * (b[ 0 ] - a[ 0 ]);

  let dy = t * (b[ 1 ] - a[ 1 ]);
  return [ a[ 0 ] + dx, a[ 1 ] + dy ];
}
/**
 *求多边形与边与线段的交点坐标
 * @param {*} points polygon的点
 * @param {*} startPoint 开始点
 * @param {*} endPoint 结束点
 * @param {*} multi 是否返回多个点
 */
function getPolygonIntersectionPoint(points, startPoint, endPoint, multi = false) {
  let arrRes = [];
  for (let i = 0; i < points.length; i++) {
    let res = [];
    if (i === 0) {
      res = segmentsIntersectionPoint(points[ points.length - 1 ], points[ 0 ], startPoint, endPoint);
    } else {
      res = segmentsIntersectionPoint(points[ i - 1 ], points[ i ], startPoint, endPoint);
    }
    if (res) {
      arrRes.push(res);
      if (!multi) {
        break;
      }
    }
  }
  if (multi) {
    return arrRes;
  } else {
    return arrRes[ 0 ];
  }
}

function getAngleByPoints(point1, point2) {
  let angle = Math.atan2((point2[ 1 ] - point1[ 1 ]), (point2[ 0 ] - point1[ 0 ])) // 弧度
  let theta = angle * (180 / Math.PI); // 角度
  return { angle, theta }
}

export { refreshLink, getRelativeStep, getPointByDistance, getPolygonIntersectionPoint, getAngleByPoints }
