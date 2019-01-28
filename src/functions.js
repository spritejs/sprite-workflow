import { _links, _workflow, _steps } from './symbolNames'
import { getType } from './utils'
import { Circle } from 'spritejs';
import { Step } from './step'
import { Link } from './link'
//import { start } from 'repl';

/**
 * 根据传入的link找到相关的step
 * @param {*} link Link
 * @param {*} type ['start','end'],link start部位的step与link end 部位的step
 */
function getRelativeStep(link, type) {
  if (!link instanceof Link) {
    console.error('function getRelativeStep params error');
  }
  let res = [];
  const { startStepId, endStepId } = link.attr();
  let steps = link[ _workflow ][ _steps ];
  if (type === undefined) {
    res = steps.filter(step => step.id === startStepId || step.id === endStepId)
  } else if (type === 'start') {
    res = steps.filter(step => step.id === startStepId)
  } else if (type === 'end') {
    res = steps.filter(step => step.id === endStepId)
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
    const stepId = step.attr("id");
    const [ xMin, yMin, xMax, yMax ] = step.renderBox;
    const targetPoint = [ (xMin + xMax) / 2, (yMin + yMax) / 2 ];
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
function getPointByXY(point1, point2, targetPoint) {
  const [ x1, y1 ] = point1;
  const [ x2, y2 ] = point2;
  const [ x, y ] = targetPoint;
  let res = [ x, y ];
  if (x === undefined && y === undefined) {
    return;
  }
  if (x === undefined) {
    res[ 0 ] = (x2 - x1) / (y2 - y1) * (y - y1) + x1;
  } else if (y === undefined) {
    res[ 1 ] = (y2 - y1) / (x2 - x1) * (x - x1) + y1;
  }
  return res;
}

/**
 * 获取直线上任一点的坐标，知道该点到一个端点的距离
 * @param {*} point1 直线开始坐标
 * @param {*} point2 直线结束坐标
 * @param {*} d 直线上一点到point1点的距离
 */
function getPointByDistance(point1, point2, d) {
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
function getDistanceByPoints(point1, point2) {
  const [ x1, y1 ] = point1;
  const [ x2, y2 ] = point2;
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

/**
 *判断线段ab与线段cd是否相交，如果相交，返回交点坐标
 * @param {*} a 线段ab上的a点
 * @param {*} b
 * @param {*} c 线段cd上的c点
 * @param {*} d
 */
function segmentsIntersectionPoint(a, b, c, d) {
  /** 1 解线性方程组, 求线段交点. **/
  // 如果分母为0 则平行或共线, 不相交
  // 判断每一条线段的两个端点是否都在另一条线段的两侧, 是则求出两条线段所在直线的交点, 否则不相交
  // 三角形abc 面积的2倍
  var area_abc = (a[ 0 ] - c[ 0 ]) * (b[ 1 ] - c[ 1 ]) - (a[ 1 ] - c[ 1 ]) * (b[ 0 ] - c[ 0 ]);
  // 三角形abd 面积的2倍
  var area_abd = (a[ 0 ] - d[ 0 ]) * (b[ 1 ] - d[ 1 ]) - (a[ 1 ] - d[ 1 ]) * (b[ 0 ] - d[ 0 ]);
  // 面积符号相同则两点在线段同侧,不相交 (对点在线段上的情况,本例当作不相交处理);
  if (area_abc * area_abd >= 0) {
    return false;
  }
  // 三角形cda 面积的2倍
  var area_cda = (c[ 0 ] - a[ 0 ]) * (d[ 1 ] - a[ 1 ]) - (c[ 1 ] - a[ 1 ]) * (d[ 0 ] - a[ 0 ]);
  // 三角形cdb 面积的2倍
  // 注意: 这里有一个小优化.不需要再用公式计算面积,而是通过已知的三个面积加减得出.
  var area_cdb = area_cda + area_abc - area_abd;
  if (area_cda * area_cdb >= 0) {
    return false;
  }
  //计算交点坐标
  var t = area_cda / (area_abd - area_abc);
  var dx = t * (b[ 0 ] - a[ 0 ]),
    dy = t * (b[ 1 ] - a[ 1 ]);
  return [ a[ 0 ] + dx, a[ 1 ] + dy ];
}
/**
 * 
 * @param {*} points polygon的点
 * @param {*} startPoint 开始点
 * @param {*} endPoint 结束点
 * @param {*} distance 偏移量
 * @param {*} multi 是否返回多个点
 */
function getPolygonIntersectionPoint(points, startPoint, endPoint, multi) {
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

export { refreshLink, getRelativeStep, getPointByDistance, getDistanceByPoints, getPointByXY, getPolygonIntersectionPoint }
