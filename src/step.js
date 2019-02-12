import { Base } from './base'
import { draggable } from 'sprite-draggable'
import { refreshLink } from './functions'
import { newObj } from './utils'
import { _render } from './symbolNames';
import { stepExtendtion } from './stepExtendtion'
class Step extends Base {
  constructor(attrs, option) {
    super(attrs);
    let mergeAttrs = newObj({
      fillColor: 'rgba(0,255,0,1)',
      pos: [ 0, 0 ],
      text: '步骤',
      padding: [ 6, 10 ],
      shapeAttrs: {}
    }, attrs);
    let { textAttrs } = attrs;
    if (textAttrs && textAttrs.fontSize && !textAttrs.font) { // 如果有fontSize，没有font，label不支持fontSize属性
      textAttrs.font = `${textAttrs.fontSize}px "宋体"`
    }
    mergeAttrs = newObj(mergeAttrs, { textAttrs: textAttrs });
    this.attr(mergeAttrs);
    const { pos } = mergeAttrs;
    this.container.attr({ pos, zIndex: 100 });
    this.draggable();
    /* 内置的Step 类型，有 ['rect','circle','triangle','star','diamond'],默认rect */
    this.on('dragstart', (e) => {
      this.container.attr({ zIndex: 110 });
    });
    this.on('drag', (e) => {
      refreshLink(this);
    });
    this.on('dragend', (e) => {
      this.container.attr({ zIndex: 100 });
    });
    // 如果外部重写draw方法，用外部方法覆盖,并将step的类型设置成custom
    if (option && option.draw) {
      this.drawType = attrs.drawType || 'custom';
      this.draw = option.draw;
    } else {
      this.drawType = attrs.drawType || 'rect';
      this.draw = stepExtendtion[ this.drawType ].draw;
    }
  }

  append(sprite) {
    this.container.append(sprite);
  }
  draggable(option) {
    draggable(this.container, option);
  }
  /**
   * step被workflow调用时渲染方法，通过调用自己的draw()来实现渲染，并且返回container
   */
  [ _render ]() {
    this.draw();
    return this.container
  }
  mounted() {
    super.mounted()
    if (this.drawType === 'polygon_rect') { // 如果是rect，伪造成polygon处理
      const [ xMin, yMin, xMax, yMax ] = this.sizeBox;
      this.points = [ [ xMin, yMin ], [ xMax, yMin ], [ xMax, yMax ], [ xMin, yMax ] ]; // 构造多边形的顶点
    }
    refreshLink(this);
  }
  draw() {
    console.error('you must overwrite this function step.draw()')
  }
}
export { Step }
