import { SpriteWorkflow } from '../src/index';
let $wrap = document.querySelector("#workflow");
const width = $wrap.offsetWidth;
const height = $wrap.offsetHeight;
const getGuid = () => Math.random().toString(36).slice(2);

let steps = [
  { id: getGuid(), data: { a: 1 }, draw: 'rect', pos: [ 200, 100 ] },
  { id: getGuid(), data: { a: 1 }, draw: 'rect', pos: [ 100, 100 ] }
];

let links = [
  { startStepId: steps[ 0 ].id, endStepId: steps[ 1 ].id }
]

let workflow = new SpriteWorkflow({ selector: '#workflow', steps, links, size: [ width, height ] });
window.workflow = workflow;

//workflow.addStep({ id: getGuid(), data: { a: 1 }, draw: 'rect', pos: [ 200, 100 ] });