import { getType, guid } from './utils'
import { install } from 'sprite-extend-shapes'
import { Base } from './base'
import { Step } from './step'
import { Link } from './link'
import * as spritejs from 'spritejs'
import { _steps, _links, _workflow, _render } from './symbolNames'
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
   * 
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
    this.stage.append(sprite[ _render ]());
  }
}
export { SpriteWorkflow, Link, Step }