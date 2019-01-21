import { getType, guid } from './utils'
import { install } from 'sprite-extend-shapes'
import { Base } from './base'
import { Step, Link } from './components'
import * as spritejs from 'spritejs'
import { _steps, _links, _workflow } from './symbolNames'
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
    const { selector, size } = this.attr();
    const scene = new Scene(selector, {
      viewport: this.attr('size'),
      displayRatio: 'auto'
    })
    this[ _steps ] = [];
    this[ _links ] = [];
    this.layer = scene.layer();
    //this.addChildren();
    //this.draw()
  }
  /**
   * 绘制步骤和连线
   */
  draw() {
    const { steps, links } = this.attr();
    steps.forEach(object => {
      this.addStep(object)
    });
    links.forEach(object => {
      this.addLink(object)
    });
  }
  update() {

  }
  /**
   * 添加步骤
   * @param {step} Step
   */
  addStep(object, draw, update) {
    let steps = this.attr('steps');
    if (steps.indexOf(object) === -1) {
      steps.push(object);
    }
    let step = new Step(object)
    step[ _workflow ] = this;
    this[ _steps ].push(step);
    let cDraw = null;
    if (cDraw && getType(cDraw) === 'function') {
      step.draw = cDraw;
    } else {
      let $dom = step.draw();
      this.layer.append($dom);
    }
  }
  /**
   * 添加步骤连线
   * @param {link} Link
   */
  addLink(object, create, update) {
    let links = this.attr('links');
    if (links.indexOf(object) === -1) {
      links.push(object);
    }
    let link = new Link(object)
    link[ _workflow ] = this;
    this[ _links ].push(link);
    link.workflowData = this.attr();
    let draw = null;
    if (draw && getType(draw) === 'function') {
      link.draw = draw;
    } else {
      let $dom = link.draw();
      this.layer.append($dom);
    }
  }
}
export { SpriteWorkflow }