import { install } from 'sprite-extend-shapes'
import { Base } from './base'
import { Step } from './step'
import { Link } from './link'
import * as spritejs from 'spritejs'
import { _steps, _links, _workflow, _render, _isDragging, _hasLinkReject } from './symbolNames'
import * as functions from './functions'
import { getType } from './utils'
import { Ticks } from './ticks'

const { Scene } = spritejs;
spritejs.use(install);
class Workflow extends Base {
  constructor(attrs) {
    super(attrs);
    /*****
  * selector:css选择器
  * size:canvas大小
  * zoom:是缩放
  * **/
    this.ticks = new Ticks(); // 自身的ticks函数处理
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
  clear() {
    this[ _steps ] = [];
    this[ _links ] = [];
    this.container.clear();
  }
  /**
   * workflow添加子对象 step link
   * @param {sprite} ['Step' 'Link']
   */
  append(sprite) {
    if (sprite === undefined) return;
    sprite[ _workflow ] = this;
    sprite[ '$parent' ] = this.container;
    if (sprite instanceof Step) {
      let steps = this[ _steps ];
      let curId = sprite.attr('id');
      for (let i = 0; i < steps.length; i++) { // 如果存在相同id的step，删除开始的一个
        let myId = steps[i].attr('id');
        if (myId === curId) {
          console.warn(`exist the same Step(id:${curId}),please remove it first `);
          return;
        }
      }
      steps.push(sprite);
    } else if (sprite instanceof Link) {
      let links = this[ _links ];
      let { startStepId: startId, endStepId: endId } = sprite.attr();
      for (let i = 0; i < links.length; i++) { // 如果存在相同id的link，删除开始的一个
        let { startStepId, endStepId } = links[i].attr();
        if (startStepId === startId && endId === endStepId) {
          console.warn(`exist the same Link(startStepId:${startStepId},endStepId:${endStepId}),please remove it first `);
          return;
        }
      }
      if (startId === endId) { // 如果有相同的link
        console.warn(`the  Link(startStepId:${startId}),has the same startStepId and endStepId `);
        return;
      }
      links.push(sprite);
    }
    this.container.append(sprite[ _render ]());
    sprite.dispatchEvent('mounted', {});
    linkReject.call(this);
  }
}
function ticks() {
  let steps = this[ _steps ];
  let ticksStep = [];
  for (let i = 0; i < steps.length; i++) {
    let curStep = steps[ i ];
    let linkReject = curStep.attr('linkReject');
    if (getType(linkReject) === 'number') {
      ticksStep.push(curStep);
      for (let j = i + 1; j < steps.length; j++) {
        let nextStep = steps[ j ];
        let nextLinkReject = nextStep.attr('linkReject');
        if (getType(nextLinkReject) === 'number') {
          moveStep(curStep, nextStep, linkReject, nextLinkReject)
        }
      }
    }
  }
}
function linkReject() {
  let workflow = this;
  if (workflow[ _hasLinkReject ]) return; // 如果改ticks已经执行，跳过
  workflow[ _hasLinkReject ] = true;
  ticks.tagame = 'linkReject';
  this.ticks.add(ticks.bind(this)); // 互斥ticks处理
  let steps = this[ _steps ];
  let ticksStep = [];
  for (let i = 0; i < steps.length; i++) {
    let curStep = steps[ i ];
    let linkReject = curStep.attr('linkReject');
    if (getType(linkReject) === 'number') {
      ticksStep.push(curStep);
    }
  }
  if (ticksStep.length <= 1 && workflow.ticks.tasks.length) { // 如果只有一个step有互斥，取消ticks
    workflow.ticks.clear();
    delete workflow[ _hasLinkReject ];
  }
}
function moveStep(curStep, nextStep, lr, nlr, angle) {
  let dis1 = curStep.forceDistance;
  let dis2 = nextStep.forceDistance;
  let pos1 = curStep.container.attr('pos');
  let pos2 = nextStep.container.attr('pos');
  let currentDis = functions.getDistansceByPoints(pos1, pos2);
  if (currentDis === 0) {
    let pos = [ pos1[ 0 ] + 1, pos1[ 1 ] ];
    curStep.container.attr({ pos: pos });
    return;
  }
  let targetDis = dis1 * lr + dis2 * nlr;
  if (currentDis < targetDis + 1) {
    let diffDis = Math.abs(currentDis - targetDis);
    if (curStep[ _isDragging ] || nextStep[ _isDragging ]) { // 如果存在dragging的情况
      let myStep = curStep;
      let pos = pos1;
      if (curStep[ _isDragging ]) {
        myStep = nextStep;
        pos = pos2;
        pos2 = pos1;
      }
      let point = functions.getPointByDistance(pos, pos2, -diffDis / 2); // 缓动，每次移动目标距离的一半
      myStep.container.attr({ pos: point });
      functions.refreshLink(myStep);
    } else {
      let move1 = diffDis * dis1 * lr / targetDis;
      let move2 = diffDis * dis2 * nlr / targetDis;
      if (Math.abs(move1) > 1) {
        let point1 = functions.getPointByDistance(pos1, pos2, -move1 / 2); // 缓动，每次移动目标距离的一半
        curStep.container.attr({ pos: point1 });
        functions.refreshLink(curStep);
      }
      if (Math.abs(move2) > 1) {
        let point2 = functions.getPointByDistance(pos2, pos1, -move2 / 2);
        nextStep.container.attr({ pos: point2 });
        functions.refreshLink(nextStep)
      }
    }
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
      group.transition(0).attr({ pos: [ startX + dx, startY + dy ] });
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
    const dscale = 0.3 * direction;
    /** 计算以鼠标点为中心缩放 **/
    const [ oAnchorX, oAnchorY ] = group.attr('anchor');
    let pX = (oAnchorX * w + e.offsetX) / w; // 鼠标点相对占比
    let pY = (oAnchorY * h + e.offsetY) / h;
    const [ oX, oY ] = group.attr('pos');
    let dx = w * dscale * pX;
    let dy = h * dscale * pY;
    const zoom = this.attr('zoom');
    if (scaleX + dscale > zoom[ 0 ] && scaleX + dscale < zoom[ 1 ]) {
      group.transition(0).attr({ scale: [ scaleX + dscale, scaleX + dscale ], pos: [ oX - dx, oY - dy ] });
    }
  });
}

export { Workflow, Link, Step, functions }
