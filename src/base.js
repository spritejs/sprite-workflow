import { Group, BaseNode } from 'spritejs'
import { getType, newObj } from './utils'
import JSONSchemaValidator from 'q-schema-validator'
import { Step, Link, Workflow } from './index'
import * as allSchema from './schema/index';
let attrs = Symbol('attrs');
class Base extends BaseNode {
  constructor(attrs) {
    super();
    this.sizeBox = [ 0, 0, 0, 0 ]; // group内部大小
    this.renderBox = [ 0, 0, 0, 0 ] // 对于外接容器大小
    this.container = new Group();
    this.container.attr({ bgcolor: 'rgba(255,255,255,0.01)', size: [ 0.01, 0.01 ], clipOverflow: false });// 将group设置成非常小，不影响其他dom，并且不clip内部元素
    this.validatorSchema(attrs);
    [ 'dragstart', 'drag', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop', 'click', 'dblclick', 'mouseenter', 'mouseleave', 'mousemove', 'mousedown' ].forEach(evt => { // 透传container上的事件
      this.container.on(evt, (e) => {
        this.dispatchEvent(evt, e);
      })
    });

    // workflow append 的时候触发mounted
    this.on('mounted', this.mounted);

    // 拖动的时候，修改renderBox
    this.on('drag', () => {
      const [ oX, oY ] = this.container.renderBox;
      this.renderBox = [ oX + this.sizeBox[ 0 ], oY + this.sizeBox[ 1 ], oX + this.sizeBox[ 2 ], oY + this.sizeBox[ 3 ] ];
    })
  }
  validatorSchema(attrs) {
    let curName = this.constructor.name.toLowerCase();
    let myClasses = newObj({
      'step': Step,
      'link': Link,
      'workflow': Workflow
    });
    let schema = null;
    let keys = Object.keys(myClasses);
    for (let i = 0; i < keys.length; i++) {
      let curKey = keys[ i ];
      let Klass = myClasses[ curKey ];
      if (this instanceof Klass) {
        schema = allSchema[ curKey ];
        break;
      }
    }
    var validator = new JSONSchemaValidator();
    let res = validator.validate(attrs, schema);
    if (res.length) {
      console.groupCollapsed('%c♥ %s params validation fail', 'color: red', curName);
      console.log('%c → validated message: ↵', 'color:#42b983')
      res.forEach(item => {
        console.log(item)
      });
      console.log('\n');
      console.log('%c → validated params: ↵', 'color:#42b983')
      console.log(attrs);
      console.log('\n');
      console.log('%c → validated schema: ↵', 'color:#42b983')
      console.log(schema)
      console.groupEnd()
    }
  }
  pointCollision() {
    return true;
  }
  /* 保持与spritejs 接口统一 */
  attr(name, value) {
    let oldAttr = newObj(this[ attrs ]);
    if (name === undefined && value === undefined) { // 获取全部属性 this.attr()
      return this[ attrs ];
    } else if (value === undefined && getType(name) === 'string') { // 获取属性 this.attr('color')
      return this[ attrs ][ name ];
    } else if (getType(name) === 'object') { // 对象属性赋值 this.attr({'color':'#f00'})
      this[ attrs ] = newObj({}, this[ attrs ], name);
      this.attrUpdate(newObj(name), oldAttr);
    } else if (getType(name) === 'string' && value !== undefined) { // 单一对象赋值 this.attr('color','#f00')
      this[ attrs ][ name ] = value;
      this.attrUpdate(newObj({ [ name ]: value }), oldAttr);
    }
  }
  attrUpdate(newAttrs, oldAttrs) {
  }
  append(sprites) {
    if (getType(sprites) === 'array') {
      sprites.forEach(sprite => { this.container.append(sprite) });
    } else {
      this.container.append(sprites)
    }
  }
  mounted() { // 渲染后，重新计算renderBox
    let [ xMin, yMin, xMax, yMax ] = this.sizeBox;
    this.renderBox = this.container.renderBox;
    const [ oX, oY ] = this.renderBox;
    if (this.container.children.length > 0) {
      this.container.children.forEach(sprite => {
        const renderBox = sprite.renderBox;
        xMin = Math.min(xMin, renderBox[ 0 ]);
        yMin = Math.min(yMin, renderBox[ 1 ]);
        xMax = Math.max(xMax, renderBox[ 2 ]);
        yMax = Math.max(yMax, renderBox[ 3 ]);
      })
    }
    this.sizeBox = [ xMin, yMin, xMax, yMax ];
    this.renderBox = [ oX + xMin, oY + yMin, oX + xMax, oY + yMax ];
  }
}
export { Base }
