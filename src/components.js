import { Base } from './base'
import { Sprite, Polyline, Rect } from 'spritejs';
import { draggable } from 'sprite-draggable'
class Step extends Base {
  constructor(attrs) {
    super(attrs);
    this.attrs = Object.assign({}, attrs);
    const { pos } = attrs;
    this.container.attr({ pos, bgcolor: 'rgba(255,0,0,0.5)' });
    draggable(this.container)
    /*内置的Step 类型，有 ['rect','circle','triangle','star','diamond'] */
    this.type = attrs.type || 'rect';
  }
  draw() {
    let $rect = new Rect();
    $rect.attr({ size: [ 20, 20 ], bgcolor: 'rgba(0,255,0,0.2)' });
    this.container.append($rect);
    return this.container
  }
}

class Link extends Base {
  constructor(attrs, type) {
    super(attrs);
    /*属性，相关绘制属性等 */
    this.attrs = Object.assign({}, attrs);
    /*内置的Link 类型，有 ['solid','dash'] */
  }
  draw() {
    let $link = new Polyline();
    $link.attr({ points: [ [ 0, 0 ], [ 0, 20 ], [ 30, 10 ] ], lineWidth: 10, color: '#0f0', bgcolor: '#f00' });
    this.container.append($link);
    this.container.attr({ bgcolor: "rgba(255,0,0,0.2)", size: [ 0.1, 0.1 ], clipOverflow: false })
    return this.container;
  }
}
export { Step, Link }
