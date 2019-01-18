import { getType, guid } from './utils'
import { install } from 'sprite-extend-shapes'
import { Base } from './base'
import { Step, Link } from './plugin'
import * as spritejs from 'spritejs'
const { Scene, Layer } = spritejs;
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
    this.draw()
  }
  draw() {
    console.log('draw')
  }
  addStep(object, render) {
    let steps = this.attr('steps');
    steps.push(object);
    if (render && getType(render) === 'function') {
      render(this);
    } else {
      let $step = new Step(object, render).render();
      console.log()
      this.append(new Step(object, render).render());
    }
  }
  addLink(object, render) {
    let links = this.attr('links');
    links.push(object);
    if (render && getType(render) === 'function') {
      render(this);
    } else {
      this.append(new Link(object, render).render());
    }
  }
}
export { SpriteWorkflow }