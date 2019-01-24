import { Base } from './base'
import { Polyline, Triangle } from 'spritejs';
import { newObj } from './utils'
import { refreshLink, getRelativeStep, getIntersectionPoint, getPointsDistance } from './functions'
import { _render } from './symbolNames'
import { linkExtendtion } from './linkExtendtion'
class Link extends Base {
  constructor(attrs) {
    super(attrs);
    /*属性，相关绘制属性等 */
    this.attr({
      startPoint: [ 0, 0 ],
      endPoint: [ 0, 0 ]
    })
    this.attr(newObj(attrs));
    this.on('update', this.update);
    //读取默认link绘制方
    this.draw = linkExtendtion.draw.default;
  }
  attrUpdate(newAttrs, oldAttrs) {
    let needFreshLink = false;
    let keys = Object.keys(newAttrs);
    if (keys.indexOf('startPoint') !== -1 || keys.indexOf('endPoint') !== -1) {
      const { startPoint, endPoint, startOffset, endOffset } = this.attr();
      const r = getPointsDistance(startPoint, endPoint);
      let angle = Math.atan2((endPoint[ 1 ] - startPoint[ 1 ]), (endPoint[ 0 ] - startPoint[ 0 ])) //弧度
      let theta = angle * (180 / Math.PI); //角度  
      this.dispatchEvent('update', newObj({ startPoint, endPoint, angle, theta }, newAttrs), oldAttrs);
    }
  }
  update(newAttrs, oldAttrs) {
    const endStep = this.getLinkSteps('end')[ 0 ];
    if (endStep.type.indexOf('rect') === 0) {
      linkExtendtion.update.rect.call(this, newAttrs, oldAttrs)
    }
  }
  /**
   * 获取link相关步骤
   * @param {*} type ['start','end']
   */
  getLinkSteps(type) {
    return getRelativeStep(this, type);
  }
  [ _render ]() {
    this.draw();
    //link的container容器高宽为0，原始坐标为[0,0],内部元素的坐标相对世界坐标，group只起打包作用
    this.container.attr({ bgcolor: 'rgba(255,0,0,1)', size: [ 0.1, 0.1 ] })
    refreshLink(this);
    return this.container;
  }
  draw() { }
}
export { Link }