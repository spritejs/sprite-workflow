
import { Group } from 'spritejs'
import { getType } from './utils'
import JSONSchemaValidator from 'q-schema-validator'
let attrs = Symbol('attrs');
class Base {
  constructor(attrs) {
    this.container = new Group();
    this.validatorSchema(attrs);
  }
  validatorSchema(attrs) {
    let curName = this.constructor.name.toLowerCase();
    let schema = require("./schema/" + curName + ".json.js");
    console.log(schema)
    var validator = new JSONSchemaValidator();
    let res = validator.validate(attrs, schema.default);
    if (res.length) {
      console.error(`${curName} data validator fail`, '\n', JSON.stringify(res, null, 2))
    }
  }
  /*保持与spritejs 接口统一 */
  attr(name, value) {
    if (name === undefined && value === undefined) { //获取全部属性 this.attr()
      return this[ attrs ];
    } else if (value === undefined && getType(name) === 'string') { //获取属性 this.attr('color')
      return this[ attrs ][ name ];
    } else if (getType(name) === 'object') { //对象属性赋值 this.attr({'color':'#f00'})
      this[ attrs ] = Object.assign({}, this[ attrs ], name);
    } else if (getType(name) === 'string' && value !== undefined) { //单一对象赋值 this.attr('color','#f00')
      this[ attrs ][ name ] = value;
    }
  }
  append(sprites) {
    if (getType(sprites) === 'array') {
      sprites.forEach(sprite => { this.container.append(sprite) });
    } else {
      this.container.append(sprites)
    }
  }
}
export { Base }