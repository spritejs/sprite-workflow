import { Label, Circle, Polygon } from 'spritejs'
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
    },
  },
  'triangle': {
    draw: function () {
      const { draw, text } = this.attr();
      const side = 80; //正三角形边长
      const distance = side / 2 * Math.sqrt(3);
      this.points = [ [ side / 2, 0 ], [ side, distance ], [ 0, distance ] ];
      let $polygon = new Polygon();
      $polygon.attr({ points: this.points, fillColor: 'rgba(255,255,0,1)' })
      let $label = new Label(text);
      $label.attr({ pos: [ 40, 40 ], textAlign: 'center', anchor: [ 0.5, 0.5 ] })
      this.append($polygon);
      this.append($label);
    },
  },
}
export { linkExtendtion }