import { Base } from './base'
import { newObj } from './utils'
import { refreshLink, getRelativeStep, getAngleByPoints } from './functions'
import { _render } from './symbolNames'
import { linkExtendtion } from './linkExtendtion'
class Link extends Base {
  constructor(attrs, option) {
    super(attrs);
    /* 属性，相关绘制属性等 */
    this.attr({
      startPoint: [ 0, 0 ],
      endPoint: [ 0, 0 ]
    })
    this.attr(newObj(attrs));
    // 内置的Step 类型，有 ['line','polyline']
    if (option && option.draw) {
      this.draw = option.draw;
      this.drawType = attrs.drawType || 'custom';
    } else {
      this.drawType = attrs.drawType || 'line';
      this.draw = linkExtendtion.draw[ this.drawType ];
    }
    if (option && option.update) {
      this.update = option.update;
    }
    this.on('update', this.update);
  }
  attrUpdate(newAttrs, oldAttrs) {
    let keys = Object.keys(newAttrs);
    if (keys.indexOf('startPoint') !== -1 || keys.indexOf('endPoint') !== -1) {
      const { startPoint, endPoint } = this.attr();
      const { angle, theta } = getAngleByPoints(startPoint, endPoint);
      let mergeAttrs = newObj({ startPoint, endPoint, angle, theta }, newAttrs);
      const endStep = this.getLinkedSteps('end')[ 0 ];
      if (endStep) {
        [ 'rect', 'circle', 'triangle', 'star', 'diamond', 'polygon' ].forEach(type => {
          if (endStep.drawType.indexOf(type) === 0) {
            linkExtendtion.update[ type ].call(this, mergeAttrs, oldAttrs)
          }
        })
      }
      this.dispatchEvent('update', { newAttrs: mergeAttrs, oldAttrs });
    }
  }
  update(event) { }
  /**
   * 获取link相关步骤
   * @param {*} type ['start','end']
   */
  getLinkedSteps(type) {
    return getRelativeStep(this, type);
  }
  [ _render ]() {
    this.draw();
    return this.container;
  }
  mounted() {
    super.mounted()
    refreshLink(this)
  }
  draw() { }
}
export { Link }
