import { Label, Circle, Polygon } from 'spritejs'
import { getType, newObj } from './utils'
const stepExtendtion = {
  'rect': {
    draw: function () {
      const { text, fillColor, textAttrs } = this.attr();
      addLabel.call(this, text, newObj(textAttrs, { bgcolor: fillColor, anchor: [ 0.5, 0.5 ], clipOverflow: false }))
    }
  },
  'circle': {
    draw: function () {
      const { text, textAttrs, fillColor } = this.attr();
      let $circle = new Circle();
      $circle.attr({ fillColor, radius: 30, pos: [ 0, 0 ] })
      this.append($circle);
      addLabel.call(this, text, newObj(textAttrs, { anchor: [ 0.5, 0.5 ], clipOverflow: false }))
    },
  },
  'star': {
    draw: function () {
      const { text, fillColor, textAttrs } = this.attr();
      this.points = [ [ 14.106846055019354, -15.596747752497684 ], [ 38.042260651806146, -8.541019662496844 ], [ 22.825356391083687, 11.236067977499793 ], [ 23.511410091698927, 36.180339887498945 ], [ 0, 27.819660112501055 ], [ -23.51141009169892, 36.180339887498945 ], [ -22.825356391083684, 11.236067977499793 ], [ -38.042260651806146, -8.541019662496836 ], [ -14.106846055019357, -15.59674775249768 ], [ -7.105427357601002e-15, -36.180339887498945 ] ];
      // 五角星十个顶点的数据坐标，extend-shapes中star坐标有bug
      let $sprite = new Polygon();
      $sprite.attr({
        points: this.points,
        fillColor: fillColor
      });
      this.append($sprite);
      addLabel.call(this, text, newObj(textAttrs, { anchor: [ 0.5, 0.5 ], clipOverflow: false }))
    },
  },
  'triangle': {
    draw: function () {
      const { text, fillColor, textAttrs } = this.attr();
      const side = 40; // 正三角形边长一半
      const sqrt3 = Math.sqrt(3);
      this.points = [ [ 0, side / sqrt3 - side * sqrt3 ], [ side, side / sqrt3 ], [ -side, side / sqrt3 ] ];
      let $sprite = new Polygon();
      $sprite.attr({ points: this.points, fillColor })
      this.append($sprite);
      addLabel.call(this, text, newObj(textAttrs, { anchor: [ 0.5, 0.5 ], clipOverflow: false }))
    },
  },
  'diamond': {
    draw: function () {
      const { text, fillColor, textAttrs } = this.attr();
      const side = 30;
      this.points = [ [ 0, side ], [ side * Math.sqrt(3), 0 ], [ 0, -side ], [ -side * Math.sqrt(3), 0 ] ];
      this.$sprite = new Polygon();
      this.$sprite.attr({
        points: this.points,
        fillColor: fillColor
      });
      this.append(this.$sprite);
      addLabel.call(this, text, newObj(textAttrs, { anchor: [ 0.5, 0.5 ], clipOverflow: false }))
    }
  }
}
function addLabel(text, textAttrs) {
  if (getType(text) === 'string') {
    let $label = new Label(text);
    $label.attr(newObj(textAttrs, { anchor: [ 0.5, 0.5 ], clipOverflow: false }))
    this.append($label);
  }
}
export { stepExtendtion }
