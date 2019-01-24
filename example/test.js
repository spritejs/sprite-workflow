import { SpriteWorkflow, Link, Step } from '../src/index';
import { Label } from 'spritejs'
let $wrap = document.querySelector("#workflow");
const width = $wrap.offsetWidth;
const height = $wrap.offsetHeight;
const getGuid = () => Math.random().toString(36).slice(2);

let steps = [
  { id: getGuid(), data: { a: 1 }, drawType: 'rect', pos: [ 300, 100 ], text: '成功利用漏洞' },
  { id: getGuid(), data: { a: 1 }, drawType: 'circle', pos: [ 100, 100 ], text: 'test' },
  { id: getGuid(), data: { a: 1 }, drawType: 'rect', pos: [ 200, 200 ], text: '成功处理' }
];

let links = [
  { startStepId: steps[ 0 ].id, endStepId: steps[ 1 ].id },
  { startStepId: steps[ 1 ].id, endStepId: steps[ 2 ].id },
]

let workflow = new SpriteWorkflow({ selector: '#workflow', size: [ width, height ] });
steps.forEach(object => {
  let step = new Step(object, {
    // draw: function () {
    //   const { draw, text } = this.attr();
    //   let $rect = new Label(text);
    //   $rect.attr({ bgcolor: 'rgba(0,255,0,0.8)', padding: [ 6, 10 ], borderRadius: [ 5, 5 ] });
    //   this.append($rect);
    // }
  });
  workflow.append(step);
})
links.forEach(object => {
  let link = new Link(object);
  workflow.append(link);
});

window.workflow = workflow;

//workflow.addStep({ id: getGuid(), data: { a: 1 }, draw: 'rect', pos: [ 200, 100 ] });