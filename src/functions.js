import { _links, _workflow, _steps } from './symbolNames'
import { getType } from './utils'
import { Circle } from 'spritejs';
import { Step } from './step'
import { Link } from './link'

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
    const [ x, y ] = step.container.attr('pos');
    const [ anchorX, anchorY ] = step.attr("anchorOffset");
    const targetPoint = [ x + anchorX, y + anchorY ];
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
function getPointInLine(point1, point2, targetPoint) {
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


/**
 * 获取连接线与容器的交点坐标
 * @param {*} area // 相交的范围 [ xMin, yMin, xMax, yMax ]
 * @param {*} theta //两个点的角度
 * @param {*} startPoint //目标点，及anchor的位置
 * @param {*} endPoint //第二个点坐标点
 */
function getIntersectionPoint(area, theta, startPoint, endPoint, distance) {
  const [ xMin, yMin, xMax, yMax ] = area;
  let targetY = theta > 0 ? yMin : yMax;
  let targetX = Math.abs(theta) < 90 ? xMin : xMax;
  let point1 = getPointInLine(startPoint, endPoint, [ targetX ]);
  let point2 = getPointInLine(startPoint, endPoint, [ , targetY ]);
  let targetPoint = point1;
  // 相交会有两个点，取到目标点距离小的点
  if (getPointsDistance(endPoint, point1) > getPointsDistance(endPoint, point2)) {
    targetPoint = point2;
  }
  let dist = distance;
  if (getType(distance) !== 'number') {
    dist = 4;
  }
  targetPoint = getLinePoint(targetPoint, startPoint, dist)
  return targetPoint;
}

export { refreshLink, getRelativeStep, getLinePoint, getPointsDistance, getPointInLine, getIntersectionPoint }
