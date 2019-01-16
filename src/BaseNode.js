import { Group } from spritejs;
class BaseNode extend Group{
  public attrs = Object.create(null);
  constructor(attrs) {
    super();
    this.attr(Object.assign({ clicpOverflow: false }, attrs));
  }
  get attr(name) {
    if (name === 'undefined') {
      return this.attrs;
    } else {
      return this.attrs[ name ]
    }
  }
  set attr(name, value) {
    if (getType(name) === 'object') {
      Object.assign(this.attrs, name);
    } else {
      this.attrs[ name ] = value;
    }
  }
}
export { BaseNode }