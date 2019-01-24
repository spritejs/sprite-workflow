import { Label } from 'spritejs'
const linkExtendtion = {
  'rect': {
    draw: function () {
      const { draw, text } = this.attr();
      let $rect = new Label(text);
      $rect.attr({ bgcolor: 'rgba(0,255,0,1)', padding: [ 6, 10 ], borderRadius: [ 5, 5 ] });
      this.append($rect);
    }
  }
}
export { linkExtendtion }