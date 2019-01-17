import { BaseNode } from './BaseNode'
import { Sprite } from spritejs;
class Step extend BaseNode{
  public attrs = {

  }
  constructor(attrs) {
    super();
  }
  render(){
    var $sprite = new Sprite();
    $sprite.attr({ size: [ 20, 20 ], bgcolor: '#f00' });
    this.append($sprite);
  }
}