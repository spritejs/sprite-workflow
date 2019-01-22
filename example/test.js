import { SpriteWorkflow, Link, Step } from '../src/index';
let $wrap = document.querySelector("#workflow");
const width = $wrap.offsetWidth;
const height = $wrap.offsetHeight;
const getGuid = () => Math.random().toString(36).slice(2);

let steps = [
  { id: getGuid(), data: { a: 1 }, draw: 'rect', pos: [ 200, 100 ], text: '成功利用漏洞' },
  { id: getGuid(), data: { a: 1 }, draw: 'rect', pos: [ 100, 100 ], text: '成功分析' },
  { id: getGuid(), data: { a: 1 }, draw: 'rect', pos: [ 200, 200 ], text: '成功处理' }
];

let links = [
  { startStepId: steps[ 0 ].id, endStepId: steps[ 1 ].id, startOffset: 30, endOffset: 45 },
  { startStepId: steps[ 1 ].id, endStepId: steps[ 2 ].id, startOffset: 30, endOffset: 30 },
  { startStepId: steps[ 2 ].id, endStepId: steps[ 0 ].id, startOffset: 30, endOffset: 35 },
]

let workflow = new SpriteWorkflow({ selector: '#workflow', size: [ width, height ] });
steps.forEach(object => {
  let step = new Step(object);
  workflow.addStep(step);
})
links.forEach(object => {
  let link = new Link(object);
  workflow.addLink(link);
});


window.workflow = workflow;

//workflow.addStep({ id: getGuid(), data: { a: 1 }, draw: 'rect', pos: [ 200, 100 ] });