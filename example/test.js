import { SpriteWorkflow } from '../src/index';
let $wrap = document.querySelector("#workflow");
const width = $wrap.offsetWidth;
const height = $wrap.offsetHeight;
let workflow = new SpriteWorkflow({ selector: '#workflow', steps: [ { data: { a: 1 }, type: 'rect', pos: [ 100, 100 ] } ], size: [ width, height ] });
window.workflow = workflow
workflow.addStep({ data: { a: 1 }, type: 'rect', pos: [ 200, 100 ] });