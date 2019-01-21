import { Base } from './base'
import { Sprite, Polyline, Rect } from 'spritejs';
import { draggable } from 'sprite-draggable'
import { emptyObj, getType, getLinePoint } from './utils'
import { _links, _workflow, _steps } from './symbolNames'
class Step extends Base {
  constructor(attrs) {
    super(attrs);
    this.attr({ anchorPoint: [ 0, 0 ] }); //连线的点，默认Step的anchor点，渲染的时候，会设置这个点
    this.attr(emptyObj(attrs));
    const { pos } = attrs;
    this.container.attr({ pos, bgcolor: 'rgba(255,0,0,0.5)', zIndex: 101 });
    draggable(this.container)
    /*内置的Step 类型，有 ['rect','circle','triangle','star','diamond'] */
    this.type = attrs.type || 'rect';
    this.container.on('drag', (e) => {
      let curId = this.attr('id');
      refreshLink(this);
    });
  }
  draw() {
    let $rect = new Rect();
    $rect.attr({ size: [ 20, 20 ], bgcolor: 'rgba(0,255,0,0.8)', zIndex: 101 });
    this.attr({ anchorPoint: [ 10, 10 ] })
    this.container.append($rect);
    refreshLink(this);
    return this.container
  }
}
class Link extends Base {
  constructor(attrs, type) {
    super(attrs);
    /*属性，相关绘制属性等 */
    this.attr({
      startPoint: [ 0, 0 ],
      endPoint: [ 0, 0 ],
      startOffset: 0,
      endOffset: 0
    })
    this.attr(emptyObj(attrs));

    /*内置的Link 类型，有 ['solid','dash'] */
  }
  attrUpdate(newAttrs, oldAttrs) {
    let needFreshLink = false;
    let keys = Object.keys(newAttrs);
    if (keys.indexOf('startPoint') || keys.indexOf('endPoint')) {
      const { startPoint, endPoint, startOffset, endOffset } = this.attr();
      const linkStartPoint = getLinePoint(startPoint, endPoint, startOffset);
      const linkEndPoint = getLinePoint(endPoint, startPoint, startOffset);
      this.update(Object.assign({ linkStartPoint, linkEndPoint }, newAttrs), oldAttrs);
    }
  }
  update(newAttrs, oldAttrs) {
    const { linkStartPoint, linkEndPoint } = newAttrs;
    if (this.$link) {
      this.$link.attr({ points: [ linkStartPoint, linkEndPoint ] });
    }
  }
  draw() {
    let $link = new Polyline();
    this.$link = $link;
    const { startPoint, endPoint } = this.attr()
    $link.attr({ points: [ startPoint, endPoint ], lineWidth: 2, color: '#eee', bgcolor: '#f00' });
    this.container.append($link);
    this.container.attr({ bgcolor: "rgba(255,0,0,0.2)", size: [ 0.1, 0.1 ], clipOverflow: false })
    refreshLink(this);
    return this.container;
  }
}

function refreshLink(params) { // [steps,links]根据step,link，更新link
  let sprites = params;
  if (getType(sprites) === 'array') { // 如果是数组，循环处理
    sprites.forEach(sprite => {
      refreshLinkBySprite(sprite);
    })
  } else {
    refreshLinkBySprite(sprites);
  }
  function refreshLinkBySprite(sprite) {
    if (sprite instanceof Step) { // 如果传入的对象是step，根据当前step对象的变化，刷新对应的link
      const links = sprite[ _workflow ][ _links ];
      links.forEach(link => {
        setLinkPoint(link, sprite);
      });
    } else if (sprite instanceof Link) { // 如果传入的对象是link，根据当前的link对象的数据，刷新link
      const steps = sprite[ _workflow ][ _steps ];
      steps.forEach(step => {
        setLinkPoint(sprite, step);
      });
    }
  }
  function setLinkPoint(link, step) {
    const { startStepId, endStepId } = link.attr();
    const stepId = step.attr("id");
    const [ x, y ] = step.container.attr('pos');
    const [ anchorX, anchorY ] = step.attr("anchorPoint");
    const targetPoint = [ x + anchorX, y + anchorY ];
    if (startStepId === stepId) {
      link.attr({ startPoint: targetPoint });
    } else if (endStepId === stepId) {
      link.attr({ endPoint: targetPoint });
    }
  }
}

export { Step, Link }
