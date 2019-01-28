import { Base } from './base'
import { Polyline, Triangle } from 'spritejs';
import { newObj } from './utils'
import { refreshLink, getRelativeStep } from './functions'
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
      let angle = Math.atan2((endPoint[ 1 ] - startPoint[ 1 ]), (endPoint[ 0 ] - startPoint[ 0 ])) //弧度
      let theta = angle * (180 / Math.PI); //角度
      this.dispatchEvent('update', { newAttrs: newObj({ startPoint, endPoint, angle, theta }, newAttrs), oldAttrs });
    }
  }
  update(event) {
    const { newAttrs, oldAttrs } = event;
    const endStep = this.getLinkedSteps('end')[ 0 ];
    [ 'rect', 'circle', 'triangle', 'star', 'diamond' ].forEach(type => {
      if (endStep.drawType.indexOf(type) === 0) {
        linkExtendtion.update[ type ].call(this, newAttrs, oldAttrs)
      }
    })
  }
  /**
   * 获取link相关步骤
   * @param {*} type ['start','end']
   */
  getLinkedSteps(type) {
    return getRelativeStep(this, type);
  }
  [ _render ]() {
    this.draw();
    refreshLink(this);
    return this.container;
  }
  draw() { }
}
export { Link }