import { Polyline, Triangle } from 'spritejs'
import { getIntersectionPoint } from './functions'
const linkExtendtion = {
  'draw': {
    default: function () {
      this.$link = new Polyline();
      this.$arrow = new Triangle();
      const { startPoint, endPoint } = this.attr();
      this.$link.attr({ points: [ startPoint, endPoint ], lineWidth: 2, color: '#eee', bgcolor: '#f00' });
      this.$arrow.attr({ color: '#ccc', pos: [ endPoint ], sides: [ 8, 8 ], angle: 45, fillColor: '#ccc' })
      this.append(this.$link);
      this.append(this.$arrow);
    }
  },
  'update': {
    rect: function (newAttrs, oldAttrs) {
      const endStep = this.getLinkSteps('end')[ 0 ];
      let { startPoint, endPoint, angle, theta } = newAttrs;
      const [ xMin, yMin, xMax, yMax ] = endStep.container.renderBox;
      let linkEndPoint = getIntersectionPoint(endStep.container.renderBox, theta, startPoint, endPoint);
      if (this.$link) {
        this.$link.attr({ points: [ startPoint, linkEndPoint ] });
      }
      if (this.$arrow) {
        let [ x, y ] = linkEndPoint;
        this.$arrow.attr({ pos: [ linkEndPoint[ 0 ], linkEndPoint[ 1 ] ], rotate: theta + (180 - 22.5) })
      }
    }
  }
}
export { linkExtendtion }