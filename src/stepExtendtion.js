import { Label, Circle, Polygon, Star } from 'spritejs'
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
  'star': {
    draw: function () {
      const { draw, text } = this.attr();
      this.points = [ [ 52.1491067068255, 20.58359213500126 ], [ 76.08452130361229, 27.639320225002102 ], [ 60.86761704288983, 47.41640786499874 ], [ 61.55367074350507, 72.36067977499789 ], [ 38.042260651806146, 64 ], [ 14.530850560107226, 72.36067977499789 ], [ 15.216904260722462, 47.41640786499874 ], [ 0, 27.63932022500211 ], [ 23.93541459678679, 20.583592135001265 ], [ 38.04226065180614, 0 ] ];
      //五角星十个顶点的数据坐标，extend-shapes中star坐标有bug
      let $label = new Label(text);
      $label.attr({ pos: [ 20, 30 ], anchor: [ 0, 0 ] })
      this.$star = new Polygon();
      this.$star.attr({
        points: this.points,
        fillColor: '#0ff'
      });
      this.append(this.$star);
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