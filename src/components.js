import { Base } from './base'
import { Sprite, Polyline, Rect, Label, Triangle } from 'spritejs';
import { draggable } from 'sprite-draggable'
import { newObj, getType, getLinePoint, getPointsDistance } from './utils'
import { _links, _workflow, _steps } from './symbolNames'
class Step extends Base {
  constructor(attrs) {
    super(attrs);
    this.attr(newObj({ anchorOffset: [ 0, 0 ] }, attrs));//anchorOffset连线的点，默认Step的anchor点，渲染的时候，会设置这个点
    const { pos } = attrs;
    this.container.attr({ pos, zIndex: 101 });
    draggable(this.container)
    /*内置的Step 类型，有 ['rect','circle','triangle','star','diamond'] */
    this.type = attrs.type || 'rect';
    this.container.on('drag', (e) => {
      let curId = this.attr('id');
      refreshLink(this);
    });
  }
  draw() {
    const { draw, text } = this.attr();
    let $rect = new Label(text);
    $rect.attr({ bgcolor: 'rgba(0,255,0,0.8)', padding: [ 6, 10 ], borderRadius: [ 5, 5 ] });
    console.log(this.container)
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
    this.attr(newObj(attrs));

    /*内置的Link 类型，有 ['solid','dash'] */
  }
  attrUpdate(newAttrs, oldAttrs) {
    let needFreshLink = false;
    let keys = Object.keys(newAttrs);
    if (keys.indexOf('startPoint') !== -1 || keys.indexOf('endPoint') !== -1) {
      const { startPoint, endPoint, startOffset, endOffset } = this.attr();
      const r = getPointsDistance(startPoint, endPoint);
      let linkStartPoint = [ 0, 0 ];
      let linkEndPoint = [ 0, 0 ];
      if (r > (startOffset + endOffset)) {
        linkStartPoint = getLinePoint(startPoint, endPoint, startOffset);
        linkEndPoint = getLinePoint(endPoint, startPoint, endOffset);
      }
      this.update(newObj({ linkStartPoint, linkEndPoint }, newAttrs), oldAttrs);
    }
  }
  update(newAttrs, oldAttrs) {
    const { linkStartPoint, linkEndPoint } = newAttrs;
    if (this.$link) {
      this.$link.attr({ points: [ linkStartPoint, linkEndPoint ] });
    }
    if (this.$arrow) {
      let angle = Math.atan2((linkEndPoint[ 1 ] - linkStartPoint[ 1 ]), (linkEndPoint[ 0 ] - linkStartPoint[ 0 ])) //弧度  0.6435011087932844
      let theta = angle * (180 / Math.PI); //角度  36.86989764584402
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
    this.container.on('click', () => {
      console.log('click')
    })
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
    const [ anchorX, anchorY ] = step.attr("anchorOffset");
    const targetPoint = [ x + anchorX, y + anchorY ];
    if (startStepId === stepId) {
      link.attr({ startPoint: targetPoint });
    } else if (endStepId === stepId) {
      link.attr({ endPoint: targetPoint });
    }
  }
}

export { Step, Link }
