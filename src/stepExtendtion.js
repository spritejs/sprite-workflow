import { Label, Polygon, Ellipse } from 'spritejs'
import { getType, newObj } from './utils'
const stepExtendtion = {
  'rect': {
    draw: function () {
      this.drawType = 'polygon_rect'; // 利用polygon来构建rect
      const { text, fillColor, textAttrs, padding } = this.attr();
      this.points = this.points || []
      addLabel.call(this, text, newObj({ bgcolor: fillColor, padding }, textAttrs))
    }
  },
  'circle': {
    draw: function () {
      this.drawType = 'ellipse_circle';
      const { shapeAttrs } = this.attr();
      const radius = shapeAttrs.radius || 30;
      let mergeShapeAttr = newObj({
        radiusX: radius,
        radiusY: radius
      }, shapeAttrs);
      this.attr({ shapeAttrs: mergeShapeAttr });
      stepExtendtion.ellipse.draw.call(this)
    },
  },
  'ellipse': {
    draw: function () {
      const { text, fillColor, textAttrs, shapeAttrs } = this.attr();
      let $ellipse = new Ellipse();
      let mergeShapeAttr = newObj({
        fillColor,
        radiusX: 50,
        radiusY: 24,
      }, shapeAttrs);
      this.attr({ shapeAttrs: mergeShapeAttr });
      $ellipse.attr(mergeShapeAttr)
      this.append($ellipse);
      addLabel.call(this, text, textAttrs)
    }
  },
  'star': {
    draw: function () {
      this.drawType = 'polygon_start';
      const { text, fillColor, textAttrs, shapeAttrs } = this.attr();
      this.points = [ [ 14.1, -15.6 ], [ 38.0, -8.5 ], [ 22.8, 11.2 ], [ 23.5, 36.2 ], [ 0, 27.8 ], [ -23.5, 36.2 ], [ -22.8, 11.2 ], [ -38.0, -8.5 ], [ -14.1, -15.6 ], [ 0, -36.2 ] ];
      // 五角星十个顶点的数据坐标，extend-shapes中star坐标有bug
      let $sprite = new Polygon();
      $sprite.attr(newObj({ points: this.points, fillColor }, shapeAttrs));
      this.append($sprite);
      addLabel.call(this, text, textAttrs)
    },
  },
  'triangle': {
    draw: function () {
      this.drawType = 'polygon_triangle';
      const { text, fillColor, textAttrs, shapeAttrs } = this.attr();
      const side = 40; // 正三角形边长一半
      const sqrt3 = Math.sqrt(3);
      this.points = [ [ 0, side / sqrt3 - side * sqrt3 ], [ side, side / sqrt3 ], [ -side, side / sqrt3 ] ];
      let $sprite = new Polygon();
      $sprite.attr(newObj({ points: this.points, fillColor }, shapeAttrs))
      this.append($sprite);
      addLabel.call(this, text, textAttrs)
    },
  },
  'diamond': {
    draw: function () {
      this.drawType = 'polygon_diamond';
      const { text, fillColor, textAttrs, shapeAttrs } = this.attr();
      const side = 30;
      this.points = [ [ 0, side ], [ side * Math.sqrt(3), 0 ], [ 0, -side ], [ -side * Math.sqrt(3), 0 ] ];
      this.$sprite = new Polygon();
      this.$sprite.attr(newObj({ points: this.points, fillColor }, shapeAttrs));
      this.append(this.$sprite);
      addLabel.call(this, text, textAttrs)
    }
  },
  'polygon': {
    draw: function () {
      const { text, fillColor, textAttrs, shapeAttrs } = this.attr();
      this.points = shapeAttrs.points;
      this.$sprite = new Polygon();
      this.$sprite.attr(newObj({ points: this.points, fillColor }, shapeAttrs));
      this.append(this.$sprite);
      addLabel.call(this, text, textAttrs)
    }
  }
}
function addLabel(text, textAttrs) {
  if (getType(text) === 'string') {
    let $label = new Label(text);
    $label.attr(newObj({}, { anchor: [ 0.5 ], clipOverflow: false }, textAttrs))
    this.append($label);
  }
}
export { stepExtendtion }
