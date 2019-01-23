import { Base } from './base'
import { Polyline, Triangle } from 'spritejs';
import { newObj } from './utils'
import { refreshLink, getRelativeStep, getIntersectionPoint, getLinePoint, getPointsDistance, getPointInLine } from './functions'
class Link extends Base {
  constructor(attrs) {
    super(attrs);
    /*属性，相关绘制属性等 */
    this.attr({
      startPoint: [ 0, 0 ],
      endPoint: [ 0, 0 ],
      startOffset: 0,
      endOffset: 0
    })
    this.attr(newObj(attrs));
    this.on('update', this.update);
  }
  attrUpdate(newAttrs, oldAttrs) {
    let needFreshLink = false;
    let keys = Object.keys(newAttrs);
    if (keys.indexOf('startPoint') !== -1 || keys.indexOf('endPoint') !== -1) {
      const { startPoint, endPoint, startOffset, endOffset } = this.attr();
      const r = getPointsDistance(startPoint, endPoint);
      let angle = Math.atan2((endPoint[ 1 ] - startPoint[ 1 ]), (endPoint[ 0 ] - startPoint[ 0 ])) //弧度  0.6435011087932844
      let theta = angle * (180 / Math.PI); //角度  36.86989764584402
      this.dispatchEvent('update', newObj({ startPoint, endPoint, angle, theta }, newAttrs), oldAttrs);
    }
  }
  update(newAttrs, oldAttrs) {
    const endStep = getRelativeStep(this, 'end')[ 0 ];
    const startStep = getRelativeStep(this, 'start')[ 0 ];
    let { startPoint, endPoint, angle, theta } = newAttrs;
    const [ xMin, yMin, xMax, yMax ] = endStep.container.renderBox;
    let linkEndPoint = getIntersectionPoint(endStep.container.renderBox, theta, startPoint, endPoint);
    if (this.$link) {
      this.$link.attr({ points: [ startPoint, linkEndPoint ] });
    }
    if (this.$arrow) {
      let [ x, y ] = linkEndPoint;
      this.$arrow.attr({ pos: [ linkEndPoint[ 0 ], linkEndPoint[ 1 ] ], rotate: theta + (180 - 22.5) })
    }
  }
  draw() {
    this.$link = new Polyline();
    this.$arrow = new Triangle();
    const { startPoint, endPoint } = this.attr()
    this.$link.attr({ points: [ startPoint, endPoint ], lineWidth: 2, color: '#eee', bgcolor: '#f00' });
    this.$arrow.attr({ color: 'red', pos: [ endPoint ], sides: [ 8, 8 ], angle: 45, fillColor: 'red' });
    this.container.append(this.$link);
    this.container.append(this.$arrow);
    //link的container容器高宽为0，原始坐标为[0,0],内部元素的坐标相对世界坐标，group只起打包作用
    this.container.attr({ bgcolor: 'rgba(255,0,0,1)', size: [ 0.1, 0.1 ] })
    refreshLink(this);
    return this.container;
  }
}
export { Link }