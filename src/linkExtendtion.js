import { Polyline, Triangle, Label, Polycurve } from 'spritejs'
import { getPointByDistance, getPolygonIntersectionPoint, getAngleByPoints, getRelativeStep, getDistansceByPoints } from './functions'
import { getType, newObj } from './utils'
const linkExtendtion = {
  'draw': {
    line: function () { // 直线直接连接
      this.$line = new Polyline();
      this.$arrow = new Triangle();
      const { startPoint, endPoint, text, textAttrs, lineAttrs } = this.attr();
      let mergeLinkAttrs = newObj({ lineWidth: 1, color: '#eee', bgcolor: '#f00' }, lineAttrs, { points: [ startPoint, endPoint ] });
      this.$line.attr(mergeLinkAttrs);
      this.$arrow.attr({ color: mergeLinkAttrs.color, pos: [ endPoint ], sides: [ 8, 8 ], angle: 45, fillColor: mergeLinkAttrs.color })
      this.append(this.$line);
      this.append(this.$arrow);
      if (getType(text) === 'string') {
        this.$label = new Label(text);
        this.$label.attr(newObj({}, textAttrs, { anchor: [ 0.5, 0.5 ], clipOverflow: false }))
        this.append(this.$label);
      }
    },
    curve: function() {
      this.$line = new Polycurve();
      const { points, lineAttrs } = this.attr();
      let mergeLinkAttrs = newObj({ lineWidth: 1, color: '#eee' }, lineAttrs, { points: points });
      this.$line.attr(mergeLinkAttrs);
      this.append(this.$line)
    },
    polyline: function () { // 折线连接
      this.$line = new Polyline();
      this.$arrow = new Triangle();
      const { startPoint, endPoint, text, textAttrs, lineAttrs } = this.attr();
      const { lineWidth = 1 } = lineAttrs;
      let insertPoint = [ endPoint[ 0 ], startPoint[ 1 ] ];
      if (Math.abs(endPoint[ 1 ] - startPoint[ 1 ]) < Math.abs(endPoint[ 0 ] - startPoint[ 0 ])) {
        insertPoint = [ startPoint[ 0 ], endPoint[ 1 ] ];
      }
      let lineEndPoint = getPointByDistance(endPoint, insertPoint, lineWidth)
      let mergeLinkAttrs = newObj({ lineWidth: 1, color: '#eee', bgcolor: '#f00' }, lineAttrs, { points: [ startPoint, insertPoint, lineEndPoint ] });
      this.$line.attr(mergeLinkAttrs);
      this.$arrow.attr({ color: mergeLinkAttrs.color, pos: [ endPoint ], sides: [ 8 + lineWidth, 8 + lineWidth ], angle: 45, fillColor: mergeLinkAttrs.color });
      this.append(this.$line);
      this.append(this.$arrow);
      if (getType(text) === 'string') {
        this.$label = new Label(text);
        this.$label.attr(newObj({}, textAttrs, { anchor: [ 0.5, 0.5 ], clipOverflow: false }))
        this.append(this.$label);
      }
    }
  },
  'attrUpdate': function (points, theta, attrs) {
    if (points && points.length > 1) {
      let { lineAttrs: { lineWidth = 1, branchOffset = 0 } } = this.attr();
      let len = points.length;
      if (this.$line) {
        if (this.drawType === 'curve') {
          let startStep = getRelativeStep(this, 'start')[0];
          let endStep = getRelativeStep(this, 'end')[0]
          let startOffset = (startStep.sizeBox[2] - startStep.sizeBox[0]) / 2;
          let endOffset = (endStep.sizeBox[2] - endStep.sizeBox[0]) / 2;
          let startPoint = startStep.container.attr('pos');
          let endPoint = endStep.container.attr('pos');

          if (startPoint[0] > endPoint[0]) {
            startOffset = -startOffset;
            endOffset = -endOffset;
            branchOffset = -branchOffset;
          }
          let stageHeight = this.container.layer.viewport[0]
          let perDis = Math.abs(startPoint[1] - endPoint[1]) / stageHeight / 2; // [0~0.5]
          let offsetDis = perDis * (startPoint[0] - endPoint[0]);
          startPoint = [startPoint[0] + startOffset, startPoint[1]];
          endPoint = [endPoint[0] - endOffset, endPoint[1]];
          let centerPoint = [(startPoint[0] + branchOffset + endPoint[0]) / 2 + offsetDis * 0.5, (startPoint[1] + endPoint[1]) / 2];
          let insertSpoint = [centerPoint[0], startPoint[1]]
          let insertEpoint = [centerPoint[0], endPoint[1]]
          let curvePoints = [];
          if (branchOffset !== undefined) {
            curvePoints.push([startPoint[0], startPoint[1], startPoint[0] + startOffset, startPoint[1], startPoint[0] + branchOffset, startPoint[1]]);
            curvePoints.push([startPoint[0] + branchOffset, startPoint[1], insertSpoint[0], insertSpoint[1], centerPoint[0], centerPoint[1]]);
            curvePoints.push([centerPoint[0], centerPoint[1], insertEpoint[0], insertEpoint[1], endPoint[0], endPoint[1]]);
          } else {
            curvePoints[0] = [startPoint[0] + startOffset, startPoint[1], insertSpoint[0], insertSpoint[1], centerPoint[0], centerPoint[1]];
            curvePoints[1] = [centerPoint[0], centerPoint[1], insertEpoint[0], insertEpoint[1], endPoint[0], endPoint[1]];
          }
          this.$line.attr({ startPoint: startPoint, points: curvePoints });
        } else {
          let endPoint = getPointByDistance(points[ len - 1 ], points[ len - 2 ], lineWidth);
          let newPoints = points.concat();
          newPoints[ len - 1 ] = endPoint;
          this.$line.attr({ points: newPoints });
        }
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
          if (theta > 90) { theta = theta - 180 } else if (theta < -90) {
            theta = theta + 180
          }
          this.$label.attr({ rotate: theta })
        }
      }
    }
  },
  'update': {
    ellipse: function (newAttrs, oldAttrs) {
      const endStep = this.getLinkedSteps('end')[ 0 ];
      const { startPoint, endPoint, theta, angle } = newAttrs;
      const { shapeAttrs } = endStep.attr();
      const { radiusX, radiusY } = shapeAttrs;
      const pos = endStep.container.attr('pos');
      if (this.drawType === 'line') {
        const [ targetX, targetY ] = geteElipsePoint(radiusX, radiusY, angle)
        let linkEndPoint = [ pos[ 0 ] + targetX, pos[ 1 ] + targetY ];
        linkEndPoint = getPointByDistance(linkEndPoint, startPoint, 4);
        linkExtendtion.attrUpdate.call(this, [ startPoint, linkEndPoint ], theta, newAttrs);
      } else {
        let insertPoint = getInsertPoint(startPoint, endPoint);
        const { angle, theta } = getAngleByPoints(insertPoint, endPoint);
        const [ targetX, targetY ] = geteElipsePoint(radiusX, radiusY, angle)
        let linkEndPoint = [ pos[ 0 ] + targetX, pos[ 1 ] + targetY ];
        linkEndPoint = getPointByDistance(linkEndPoint, insertPoint, 4);
        linkExtendtion.attrUpdate.call(this, [ startPoint, insertPoint, linkEndPoint ], theta, newAttrs);
      }
    },
    polygon: function (newAttrs, oldAttrs) {
      const endStep = this.getLinkedSteps('end')[ 0 ];
      const { startPoint, endPoint, theta } = newAttrs;
      const [ xMin, yMin ] = endStep.container.attr('pos');
      const realPoints = endStep.points.map(point => { return [ xMin + point[ 0 ], yMin + point[ 1 ] ] })
      if (this.drawType.indexOf('polyline') !== 0) {
        updatePolygonByline.call(this, realPoints, startPoint, endPoint, theta, newAttrs);
      } else {
        updatePolygonByPolyline.call(this, realPoints, startPoint, endPoint, newAttrs)
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
function getInsertPoint(startPoint, endPoint) {
  let insertPoint = [ endPoint[ 0 ], startPoint[ 1 ] ];
  if (Math.abs(endPoint[ 1 ] - startPoint[ 1 ]) < Math.abs(endPoint[ 0 ] - startPoint[ 0 ])) {
    insertPoint = [ startPoint[ 0 ], endPoint[ 1 ] ];
  }
  return insertPoint;
}
function geteElipsePoint(radiusX, radiusY, angle) {
  const tan = 1 / Math.tan(angle);
  let targetY = Math.sqrt((radiusX * radiusX * radiusY * radiusY) / (radiusX * radiusX + radiusY * radiusY * tan * tan));
  targetY = angle > 0 ? -targetY : targetY;
  let targetX = targetY * tan;
  if (targetY === 0) {
    targetX = angle > 0 ? radiusX : -radiusX
  }

  return [ targetX, targetY ]
}
export { linkExtendtion }
