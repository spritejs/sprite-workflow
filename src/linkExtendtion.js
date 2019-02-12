import { Polyline, Triangle, Label } from 'spritejs'
import { getPointByDistance, getPolygonIntersectionPoint, getAngleByPoints } from './functions'
import { getType, newObj } from './utils'
const linkExtendtion = {
  'draw': {
    line: function () { // 直线直接连接
      this.$link = new Polyline();
      this.$arrow = new Triangle();
      const { startPoint, endPoint, text, textAttrs, lineAttrs } = this.attr();
      let mergeLinkAttrs = newObj({ lineWidth: 2, color: '#eee', bgcolor: '#f00' }, lineAttrs, { points: [ startPoint, endPoint ] });
      this.$link.attr(mergeLinkAttrs);
      this.$arrow.attr({ color: mergeLinkAttrs.color, pos: [ endPoint ], sides: [ 8, 8 ], angle: 45, fillColor: mergeLinkAttrs.color })
      this.append(this.$link);
      this.append(this.$arrow);
      if (getType(text) === 'string') {
        this.$label = new Label(text);
        this.$label.attr(newObj({}, textAttrs, { anchor: [ 0.5, 0.5 ], clipOverflow: false }))
        this.append(this.$label);
      }
    },
    polyline: function () { // 折线连接
      this.$link = new Polyline();
      this.$arrow = new Triangle();
      const { startPoint, endPoint, text, textAttrs, lineAttrs } = this.attr();
      let insertPoint = [ endPoint[ 0 ], startPoint[ 1 ] ];
      if (Math.abs(endPoint[ 1 ] - startPoint[ 1 ]) < Math.abs(endPoint[ 0 ] - startPoint[ 0 ])) {
        insertPoint = [ startPoint[ 0 ], endPoint[ 1 ] ];
      }
      let mergeLinkAttrs = newObj({ lineWidth: 2, color: '#eee', bgcolor: '#f00' }, lineAttrs, { points: [ startPoint, insertPoint, endPoint ] });
      this.$link.attr(mergeLinkAttrs);
      this.$arrow.attr({ color: mergeLinkAttrs.color, pos: [ endPoint ], sides: [ 8, 8 ], angle: 45, fillColor: mergeLinkAttrs.color });
      this.append(this.$link);
      this.append(this.$arrow);
      if (getType(text) === 'string') {
        this.$label = new Label(text);
        this.$label.attr(newObj({}, textAttrs, { anchor: [ 0.5, 0.5 ], clipOverflow: false }))
        this.append(this.$label);
      }
    }
  },
  'attrUpdate': function (points, theta, attrs) {
    if (points && points.length) {
      if (this.$link) {
        this.$link.attr({ points: points });
      }
      if (this.$arrow) {
        let endPoint = points[ points.length - 1 ];
        this.$arrow.attr({ pos: endPoint, rotate: theta + (180 - 22.5) })
      }
      if (this.$label) {
        if (points.length === 2) { // 如果是直接连接
          const { startPoint, endPoint } = attrs;
          let pos = [ (startPoint[ 0 ] + endPoint[ 0 ]) / 2, (startPoint[ 1 ] + endPoint[ 1 ]) / 2 ]
          this.$label.attr({ pos: pos });
        } else { // 否则取中间点
          let point = points[ Math.ceil(points.length % 2) ]
          this.$label.attr({ pos: point });
        }
        const { textAttrs } = this.attr();
        if (textAttrs.autoRotate === 'auto') {
          this.$label.attr({ rotate: theta })
        }
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
          linkExtendtion.attrUpdate.call(this, [ startPoint, linkEndPoint ], theta, newAttrs);
        }
      } else {
        let insertPoint = [ endPoint[ 0 ], startPoint[ 1 ] ];
        if (Math.abs(endPoint[ 1 ] - startPoint[ 1 ]) < Math.abs(endPoint[ 0 ] - startPoint[ 0 ])) {
          insertPoint = [ startPoint[ 0 ], endPoint[ 1 ] ];
        }
        let linkEndPoint = getPointByDistance(endPoint, insertPoint, r + 4) // 4为保护距离到实际点的空隙
        const { theta } = getAngleByPoints(insertPoint, linkEndPoint);
        linkExtendtion.attrUpdate.call(this, [ startPoint, insertPoint, linkEndPoint ], theta, newAttrs);
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
        updatePolygonByPolyline.call(this, realPoints, startPoint, endPoint, newAttrs)
      } else {
        updatePolygonByline.call(this, realPoints, startPoint, endPoint, theta, newAttrs);
      }
    }
  }
}
function updatePolygonByline(points, startPoint, endPoint, theta, newAttrs) {
  let linkEndPoint = getPolygonIntersectionPoint(points, startPoint, endPoint);
  if (linkEndPoint) {
    linkEndPoint = getPointByDistance(linkEndPoint, startPoint, 4);
    linkExtendtion.attrUpdate.call(this, [ startPoint, linkEndPoint ], theta, newAttrs);
  }
}
function updatePolygonByPolyline(points, startPoint, endPoint, newAttrs) {
  let insertPoint = [ endPoint[ 0 ], startPoint[ 1 ] ];
  if (Math.abs(endPoint[ 1 ] - startPoint[ 1 ]) < Math.abs(endPoint[ 0 ] - startPoint[ 0 ])) {
    insertPoint = [ startPoint[ 0 ], endPoint[ 1 ] ];
  }
  let linkEndPoint = getPolygonIntersectionPoint(points, insertPoint, endPoint);
  if (linkEndPoint) {
    linkEndPoint = getPointByDistance(linkEndPoint, insertPoint, 4);
    const { theta } = getAngleByPoints(insertPoint, linkEndPoint);
    linkExtendtion.attrUpdate.call(this, [ startPoint, insertPoint, linkEndPoint ], theta, newAttrs);
  }
}
export { linkExtendtion }
