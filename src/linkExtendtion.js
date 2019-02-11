import { Polyline, Triangle } from 'spritejs'
import { getPointByDistance, getPolygonIntersectionPoint, getAngleByPoints } from './functions'
const linkExtendtion = {
  'draw': {
    line: function () { // 直线直接连接
      this.$link = new Polyline();
      this.$arrow = new Triangle();
      const { startPoint, endPoint } = this.attr();
      this.$link.attr({ points: [ startPoint, endPoint ], lineWidth: 2, color: '#eee', bgcolor: '#f00' });
      this.$arrow.attr({ color: '#ccc', pos: [ endPoint ], sides: [ 8, 8 ], angle: 45, fillColor: '#ccc' })
      this.append(this.$link);
      this.append(this.$arrow);
    },
    polyline: function () { // 折线连接
      this.$link = new Polyline();
      this.$arrow = new Triangle();
      const { startPoint, endPoint } = this.attr();
      let insertPoint = [ endPoint[ 0 ], startPoint[ 1 ] ];
      if (Math.abs(endPoint[ 1 ] - startPoint[ 1 ]) < Math.abs(endPoint[ 0 ] - startPoint[ 0 ])) {
        insertPoint = [ startPoint[ 0 ], endPoint[ 1 ] ];
      }
      this.$link.attr({ points: [ startPoint, insertPoint, endPoint ], lineWidth: 2, color: '#eee', bgcolor: '#f00' });
      this.$arrow.attr({ color: '#ccc', pos: [ endPoint ], sides: [ 8, 8 ], angle: 45, fillColor: '#ccc' })
      this.append(this.$link);
      this.append(this.$arrow);
    }
  },
  'attrUpdate': function (points, theta) {
    if (points && points.length) {
      if (this.$link) {
        this.$link.attr({ points: points });
      }
      if (this.$arrow) {
        let endPoint = points[ points.length - 1 ];
        this.$arrow.attr({ pos: endPoint, rotate: theta + (180 - 22.5) })
      }
    }
  },
  'update': {
    rect: function (newAttrs, oldAttrs) { // 矩形框处理剪头指向位置处理
      const endStep = this.getLinkedSteps('end')[ 0 ];
      const [ xMin, yMin, xMax, yMax ] = endStep.sizeBox;
      endStep.points = [ [ xMin, yMin ], [ xMax, yMin ], [ xMax, yMax ], [ xMin, yMax ] ]; // 构造多边形的顶点
      linkExtendtion.update.polygon.call(this, newAttrs, oldAttrs); // 用通用多边形逻辑来处理
    },
    circle: function (newAttrs, oldAttrs) { // 圆形框处理剪头指向位置处理
      const endStep = this.getLinkedSteps('end')[ 0 ];
      const { startPoint, endPoint, theta } = newAttrs;
      const [ xMin, yMin, xMax, yMax ] = endStep.renderBox;
      const r = Math.max(xMax - xMin, yMin - yMax) / 2;
      if (this.drawType === 'line') {
        let linkEndPoint = getPointByDistance(endPoint, startPoint, r) // 4为保护距离到实际点的空隙
        if (linkEndPoint) {
          linkEndPoint = getPointByDistance(linkEndPoint, startPoint, 4);
          linkExtendtion.attrUpdate.call(this, [ startPoint, linkEndPoint ], theta);
        }
      } else {
        let insertPoint = [ endPoint[ 0 ], startPoint[ 1 ] ];
        if (Math.abs(endPoint[ 1 ] - startPoint[ 1 ]) < Math.abs(endPoint[ 0 ] - startPoint[ 0 ])) {
          insertPoint = [ startPoint[ 0 ], endPoint[ 1 ] ];
        }
        let linkEndPoint = getPointByDistance(endPoint, insertPoint, r + 4) // 4为保护距离到实际点的空隙
        const { theta } = getAngleByPoints(insertPoint, linkEndPoint);
        linkExtendtion.attrUpdate.call(this, [ startPoint, insertPoint, linkEndPoint ], theta);
      }
    },
    star: function (newAttrs, oldAttrs) {
      linkExtendtion.update.polygon.call(this, newAttrs, oldAttrs);
    },
    triangle: function (newAttrs, oldAttrs) { // 圆形框处理剪头指向位置处理
      linkExtendtion.update.polygon.call(this, newAttrs, oldAttrs);
    },
    diamond: function (newAttrs, oldAttrs) {
      linkExtendtion.update.polygon.call(this, newAttrs, oldAttrs);
    },
    polygon: function (newAttrs, oldAttrs) {
      const endStep = this.getLinkedSteps('end')[ 0 ];
      const { startPoint, endPoint, theta } = newAttrs;
      const [ xMin, yMin ] = endStep.container.attr('pos');
      const realPoints = endStep.points.map(point => { return [ xMin + point[ 0 ], yMin + point[ 1 ] ] })
      if (this.drawType.indexOf('polyline') === 0) {
        updatePolygonByPolyline.call(this, realPoints, startPoint, endPoint)
      } else {
        updatePolygonByline.call(this, realPoints, startPoint, endPoint, theta);
      }
    }
  }
}
function updatePolygonByline(points, startPoint, endPoint, theta) {
  let linkEndPoint = getPolygonIntersectionPoint(points, startPoint, endPoint);
  // console.log('aaa', linkEndPoint)
  if (linkEndPoint) {
    linkEndPoint = getPointByDistance(linkEndPoint, startPoint, 4);
    linkExtendtion.attrUpdate.call(this, [ startPoint, linkEndPoint ], theta);
  }
}
function updatePolygonByPolyline(points, startPoint, endPoint) {
  let insertPoint = [ endPoint[ 0 ], startPoint[ 1 ] ];
  if (Math.abs(endPoint[ 1 ] - startPoint[ 1 ]) < Math.abs(endPoint[ 0 ] - startPoint[ 0 ])) {
    insertPoint = [ startPoint[ 0 ], endPoint[ 1 ] ];
  }
  let linkEndPoint = getPolygonIntersectionPoint(points, insertPoint, endPoint);
  if (linkEndPoint) {
    linkEndPoint = getPointByDistance(linkEndPoint, insertPoint, 4);
    const { theta } = getAngleByPoints(insertPoint, linkEndPoint);
    linkExtendtion.attrUpdate.call(this, [ startPoint, insertPoint, linkEndPoint ], theta);
  }
}
export { linkExtendtion }
