import { getType } from './utils'
import { _links, _workflow, _steps } from './symbolNames'
import { Step } from './step'
import { Link } from './link'

function refreshLink(params) { // [steps,links]根据step,link，更新link
  let sprites = params;
  if (getType(sprites) === 'array') { // 如果是数组，循环处理
    sprites.forEach(sprite => {
      refreshLinkBySprite(sprite);
    })
  } else {
    refreshLinkBySprite(sprites);
  }
  function refreshLinkBySprite(sprite) {
    if (sprite instanceof Step) { // 如果传入的对象是step，根据当前step对象的变化，刷新对应的link
      const links = sprite[ _workflow ][ _links ];
      links.forEach(link => {
        setLinkPoint(link, sprite);
      });
    } else if (sprite instanceof Link) { // 如果传入的对象是link，根据当前的link对象的数据，刷新link
      const steps = sprite[ _workflow ][ _steps ];
      steps.forEach(step => {
        setLinkPoint(sprite, step);
      });
    }
  }
  function setLinkPoint(link, step) {
    const { startStepId, endStepId } = link.attr();
    const stepId = step.attr("id");
    const [ x, y ] = step.container.attr('pos');
    const [ anchorX, anchorY ] = step.attr("anchorOffset");
    const targetPoint = [ x + anchorX, y + anchorY ];
    if (startStepId === stepId) {
      link.attr({ startPoint: targetPoint });
    } else if (endStepId === stepId) {
      link.attr({ endPoint: targetPoint });
    }
  }
}

export { refreshLink }
