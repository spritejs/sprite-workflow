import { Workflow, Link, Step } from '../lib/index';
import { Label } from 'spritejs'
let $wrap = document.querySelector("#workflow");
const width = $wrap.offsetWidth;
const height = $wrap.offsetHeight;
const getGuid = () => Math.random().toString(36).slice(2);

let steps = [
  { id: getGuid(), data: { a: 1 }, drawType: 'rect', pos: [ 300, 100 ], text: '我是矩形' },
  { id: getGuid(), data: { a: 1 }, drawType: 'circle', pos: [ 100, 100 ], text: '圆' },
  { id: getGuid(), data: { a: 1 }, drawType: 'triangle', pos: [ 200, 200 ], text: '三角' },
  { id: getGuid(), data: { a: 1 }, drawType: 'star', pos: [ 340, 240 ], text: '五角' },
  { id: getGuid(), data: { a: 1 }, drawType: 'diamond', pos: [ 340, 400 ], text: '菱形' },
];

let links = [
  { startStepId: steps[ 0 ].id, endStepId: steps[ 1 ].id },
  { startStepId: steps[ 1 ].id, endStepId: steps[ 2 ].id },
  { startStepId: steps[ 2 ].id, endStepId: steps[ 3 ].id },
  { startStepId: steps[ 3 ].id, endStepId: steps[ 4 ].id }
]

let workflow = new Workflow({ selector: '#workflow', size: [ width, height ] });
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
