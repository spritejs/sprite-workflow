import { Base } from './base'
import { newObj } from './utils'
import { refreshLink, getRelativeStep, getAngleByPoints } from './functions'
import { _render, _links, _workflow } from './symbolNames'
import { linkExtendtion } from './linkExtendtion'
class Link extends Base {
  constructor(attrs, option) {
    super(attrs);
    /* 属性，相关绘制属性等 */
    this.attr({
      startPoint: [ 0, 0 ],
      endPoint: [ 0, 0 ]
    })
    let mergeAttrs = newObj({ lineAttrs: {}, textAttrs: {} }, attrs);
    if (mergeAttrs.textAttrs.fontSize) { // 如果有fontSize，没有font，label不支持fontSize属性
      if (!mergeAttrs.textAttrs.font) {
        mergeAttrs.textAttrs.font = `${parseInt(mergeAttrs.textAttrs.fontSize)}px "宋体"`
      }
      delete mergeAttrs.textAttrs.fontSize;
    }
    this.attr(newObj({ lineAttrs: {}, textAttrs: {} }, attrs));

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
        [ 'ellipse', 'polygon' ].forEach(type => {
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
    this.container.clear()
    this.draw();
    return this.container;
  }
  remove() {
    let myWorkflow = this[ _workflow ];
    let links = myWorkflow[ _links ];
    for (let i = 0; i < links.length; i++) {
      if (links[ i ] === this) {
        myWorkflow.container.removeChild(links[ i ].container)
        links.splice(i, 1)
      }
    }
  }
  mounted() {
    super.mounted()
    refreshLink(this)
  }
  draw() { }
}
export { Link }
