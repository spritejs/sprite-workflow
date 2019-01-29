import { install } from 'sprite-extend-shapes'
import { Base } from './base'
import { Step } from './step'
import { Link } from './link'
import * as spritejs from 'spritejs'
import { _steps, _links, _workflow, _render } from './symbolNames'
import * as functions from './functions'
const { Scene } = spritejs;

spritejs.use(install);
class Workflow extends Base {
  constructor(attrs) {
    super(attrs);
    /*****
  * selector:css选择器
  * size:canvas大小
  * zoom:是否搜房
  * zoomMax:最大缩放
  * zoomMin:最小缩放
  * **/
    this.attr(Object.assign({
      'selector': '',
      'size': [ 600, 400 ],
      'zoom': [ 0.5, 2 ]
    }, attrs));
    const { selector, size } = this.attr();
    const scene = new Scene(selector, {
      viewport: size,
      displayRatio: 'auto'
    })
    this[ _steps ] = [];
    this[ _links ] = [];
    let layer = scene.layer();
    scene.delegateEvent('mousewheel', document); // sprite 元素侦听mousewheel事件
    layer.append(this.container);
    if (this.attr('zoom') !== false) {
      zoom.call(this, layer, this.container);
    }
    delete this.renderBox;
    delete this.sizeBox;
  }

  // 获取workflow的steps与links
  get children() {
    return {
      steps: this[ _steps ],
      links: this[ _links ]
    }
  }
  /**
   * workflow添加子对象 step link
   * @param {sprite} ['Step' 'Link']
   */
  append(sprite) {
    if (sprite === undefined) return;
    sprite[ _workflow ] = this;
    if (sprite instanceof Step) {
      this[ _steps ].push(sprite);
    } else if (sprite instanceof Link) {
      this[ _links ].push(sprite);
    }
    this.container.append(sprite[ _render ]());
    sprite.dispatchEvent('mounted', {});
  }
}
function zoom(layer, group) {
  let oX, oY;
  let startX, startY;
  let draged = false;
  layer.on('mousedown', (e) => {
    if (e.originalEvent.which === 3) {
      return;
    }
    let $target = e.target;
    if ($target === layer || $target === group) {
      oX = e.offsetX;
      oY = e.offsetY;
      [ startX, startY ] = group.attr('pos');
      draged = true;
    }
  });
  layer.on('mousemove', (e) => {
    if (draged) {
      let dx = e.offsetX - oX;
      let dy = e.offsetY - oY;
      group.transition(0.01).attr({ pos: [ startX + dx, startY + dy ] });
    }
  })
  layer.on('mouseup', (e) => {
    draged = false;
  });
  layer.on('mousewheel', (e) => {
    e.preventDefault();
    const [ scaleX ] = group.attr('scale');
    let [ w, h ] = group.attr('size');
    let direction = 1;
    if (e.originalEvent.wheelDelta < 0) { // 向下滚动
      direction = -1;
    }
    const dscale = 0.5 * direction;
    /** 计算以鼠标点为中心缩放 **/
    const [ oAnchorX, oAnchorY ] = group.attr('anchor');
    let pX = (oAnchorX * w + e.offsetX) / w; // 鼠标点相对占比
    let pY = (oAnchorY * h + e.offsetY) / h;
    const [ oX, oY ] = group.attr('pos');
    let dx = w * dscale * pX;
    let dy = h * dscale * pY;
    const zoom = this.attr('zoom');
    if (scaleX + dscale > zoom[ 0 ] && scaleX + dscale < zoom[ 1 ]) {
      group.transition(0.1).attr({ scale: [ scaleX + dscale, scaleX + dscale ], pos: [ oX - dx, oY - dy ] });
    }
  });
}

export { Workflow, Link, Step, functions }
