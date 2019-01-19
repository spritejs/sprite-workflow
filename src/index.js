import { getType, guid } from './utils'
import { install } from 'sprite-extend-shapes'
import { Base } from './base'
import { Step, Link } from './components'
import * as spritejs from 'spritejs'
const { Scene, Layer } = spritejs;
const _render = Symbol('render');
spritejs.use(install);

class SpriteWorkflow extends Base {
  constructor(attrs) {
    super(attrs);
    /*****
  * selector:css选择器
  * size:canvas大小
  * steps:步骤数据存储位置
  * links:连接线数据存储位置
  * **/
    this.attr(Object.assign({
      'selector': '',
      'size': [ 600, 400 ],
      'steps': [],
      'links': []
    }, attrs));
    const { selector, size } = this.attr();
    const scene = new Scene(selector, {
      viewport: this.attr('size'),
      displayRatio: 'auto'
    })
    this.layer = scene.layer();
    this.draw()
  }
  draw() {
    const { steps, links } = this.attr();
    steps.forEach(object => {
      this.addStep(object)
    });
    links.forEach(object => {
      this.addLink(object)
    });
  }
  addStep(object) {
    let steps = this.attr('steps');
    steps.push(object);
    let $step = new Step(object)
    $step.workflowData = this.attr();
    let draw = object.draw;
    if (draw && getType(draw) === 'function') {
      draw($step);
    } else {
      let $dom = $step.draw();
      this.layer.append($dom);
    }
  }
  addLink(object) {
    let links = this.attr('links');
    links.push(object);
    let $link = new Link(object)
    $link.workflowData = this.attr();
    let draw = object.draw;
    if (draw && getType(draw) === 'function') {
      draw($link);
    } else {
      let $dom = $link.draw();
      this.layer.append($dom);
    }
  }
}
export { SpriteWorkflow }