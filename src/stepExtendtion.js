import { Label, Circle, Polygon } from 'spritejs'
const stepExtendtion = {
  'rect': {
    draw: function () {
      const { text, bgcolor, padding, borderRadius, size, color, font } = this.attr();
      this.$sprite = new Label(text);
      this.$sprite.attr({ bgcolor: bgcolor, anchor: [ 0.5, 0.5 ], padding, borderRadius, size, font: font, color, clipOverflow: false });
      this.append(this.$sprite);
    }
  },
  'circle': {
    draw: function () {
      const { text } = this.attr();
      let r = 30;
      let $label = new Label(text);
      let $circle = new Circle();
      $label.attr({ anchor: [ 0.5, 0.5 ] })
      $circle.attr({ fillColor: '#f00', radius: r, pos: [ 0, 0 ] })
      this.append($circle);
      this.append($label);
    },
  },
  'star': {
    draw: function () {
      const { text } = this.attr();
      this.points = [ [ 14.106846055019354, -15.596747752497684 ], [ 38.042260651806146, -8.541019662496844 ], [ 22.825356391083687, 11.236067977499793 ], [ 23.511410091698927, 36.180339887498945 ], [ 0, 27.819660112501055 ], [ -23.51141009169892, 36.180339887498945 ], [ -22.825356391083684, 11.236067977499793 ], [ -38.042260651806146, -8.541019662496836 ], [ -14.106846055019357, -15.59674775249768 ], [ -7.105427357601002e-15, -36.180339887498945 ] ];
      // 五角星十个顶点的数据坐标，extend-shapes中star坐标有bug
      let $label = new Label(text);
      $label.attr({ anchor: [ 0.5, 0.5 ] })
      let $sprite = new Polygon();
      $sprite.attr({
        points: this.points,
        fillColor: '#0ff'
      });
      this.append($sprite);
      this.append($label);
    },
  },
  'triangle': {
    draw: function () {
      const { text, color, font } = this.attr();
      const side = 40; // 正三角形边长一半
      const sqrt3 = Math.sqrt(3);
      this.points = [ [ 0, side / sqrt3 - side * sqrt3 ], [ side, side / sqrt3 ], [ -side, side / sqrt3 ] ];
      let $sprite = new Polygon();
      $sprite.attr({ points: this.points, fillColor: 'rgba(255,255,0,1)' })
      let $label = new Label(text);
      $label.attr({ anchor: [ 0.5, 0.5 ], zIndex: 1, color, font })
      this.append($sprite);
      this.append($label);
    },
  },
  'diamond': {
    draw: function () {
      const { text, bgcolor } = this.attr();
      const side = 30;
      this.points = [ [ 0, side ], [ side * Math.sqrt(3), 0 ], [ 0, -side ], [ -side * Math.sqrt(3), 0 ] ];
      let $label = new Label(text);
      $label.attr({ pos: [ side * Math.sqrt(3), 0 ], anchor: [ 0.5, 0.5 ], clipOverflow: false, textAlign: 'center', lineBreak: 'normal' })
      this.$sprite = new Polygon();
      this.$sprite.attr({
        points: this.points,
        fillColor: bgcolor
      });
      this.append(this.$sprite);
      this.append($label);
    }
  }
}
export { stepExtendtion }
