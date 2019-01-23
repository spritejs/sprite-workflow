import { Base } from './base'
import { Sprite, Polyline, Rect, Label, Triangle } from 'spritejs';
import { draggable } from 'sprite-draggable'
import { refreshLink } from './functions'
import { newObj, getType, getLinePoint, getPointsDistance } from './utils'

class Step extends Base {
  constructor(attrs) {
    super(attrs);
    this.attr(newObj({ anchorOffset: [ 0, 0 ] }, attrs));//anchorOffset连线的点，默认Step的anchor点，渲染的时候，会设置这个点
    const { pos } = attrs;
    this.container.attr({ pos, zIndex: 100 });
    this.draggable();
    /*内置的Step 类型，有 ['rect','circle','triangle','star','diamond'] */
    this.type = attrs.type || 'rect';
    this.container.on('drag', (e) => {
      let curId = this.attr('id');
      this.container.attr({ zIndex: 101 });
      refreshLink(this);
    });
    this.container.on('dragend', (e) => {
      this.container.attr({ zIndex: 100 });
    });
    this.dispatchEvent('ready', { a: 1 });
    let me = this;

  }
  draggable(option) {
    draggable(this.container, option);
  }
  draw() {
    const { draw, text } = this.attr();
    let $rect = new Label(text);
    $rect.attr({ bgcolor: 'rgba(0,255,0,0.8)', padding: [ 6, 10 ], borderRadius: [ 5, 5 ] });
    this.container.append($rect);
    refreshLink(this);
    return this.container
  }
}
export { Step }