import { getType, guid } from './utils'
import { install } from 'sprite-extend-shapes'
import { Base } from './base'
import { Step } from './step'
import { Link } from './link'
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
  * **/
    this.attr(Object.assign({
      'selector': '',
      'size': [ 600, 400 ]
    }, attrs));
    const { selector, size } = this.attr();
    const scene = new Scene(selector, {
      viewport: this.attr('size'),
      displayRatio: 'auto'
    })
    this[ _steps ] = [];
    this[ _links ] = [];
    this.stage = scene.layer();
  }
  /**
   * 绘制步骤和连线
   */
  update() {

  }
  /**
   * 添加步骤
   * @param {step} Step
   */
  addStep(step) {
    step[ _workflow ] = this;
    this[ _steps ].push(step);
    let $dom = step.draw();
    this.stage.append($dom);

  }
  /**
   * 添加步骤连线
   * @param {link} 
   */
  addLink(link) {
    link[ _workflow ] = this;
    this[ _links ].push(link);
    let $dom = link.draw();
    this.stage.append($dom);
  }
}
export { SpriteWorkflow, Link, Step }