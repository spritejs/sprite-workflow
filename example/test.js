import { SpriteWorkflow } from '../src/index';
let workflow = new SpriteWorkflow({ selector: '#workflow' });
window.workflow = workflow
workflow.addStep({ a: 1, type: 'rect' });