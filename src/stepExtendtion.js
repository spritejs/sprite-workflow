import { Label, Circle } from 'spritejs'
const linkExtendtion = {
  'rect': {
    draw: function () {
      const { draw, text } = this.attr();
      let $rect = new Label(text);
      $rect.attr({ bgcolor: 'rgba(0,255,0,1)', padding: [ 6, 10 ], borderRadius: [ 5, 5 ] });
      this.append($rect);
    }
  },
  'circle': {
    draw: function () {
      const { draw, text } = this.attr();
      let r = 30;
      let $label = new Label(text);
      let $circle = new Circle();
      $label.attr({ pos: [ r, r ], anchor: [ 0.5, 0.5 ] })
      $circle.attr({ fillColor: "#f00", radius: r, pos: [ r, r ] })
      this.append($circle);
      this.append($label);
    }
  }
}
export { linkExtendtion }