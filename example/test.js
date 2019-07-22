import { Workflow, Step, Link } from '../lib/index.js';

let $wrap = document.querySelector('#workflow');
const width = $wrap.offsetWidth;
const height = $wrap.offsetHeight;
const getGuid = () => Math.random().toString(36).slice(2);

// 内置的Step 类型，有 ['rect','circle','triangle','star','diamond'],默认rect */
let steps = [
  { id: 'aaaaaaa', linkReject: 1, data: { a: 1 }, fillColor: '#f00', drawType: 'rect', pos: [ 100, 400 ], text: '我是矩形', textAttrs: { fontSize: 12, borderRadius: 5, padding: [ 10, 10 ] } },
  // { id: 'aaaaaaa', linkReject: 1, data: { a: 1 }, fillColor: '#f00', drawType: 'rect', pos: [ 200, 400 ], text: '我是矩形1', textAttrs: { fontSize: 12, borderRadius: 5, padding: [ 10, 10 ] } },
  { id: getGuid(), linkReject: 1, data: { a: 1 }, fillColor: '#ff0', drawType: 'circle', pos: [ 100, 100 ], text: '圆', textAttrs: { fontSize: 18, color: '#f00' } },
  { id: getGuid(), linkReject: 1, data: { a: 1 }, fillColor: '#f0f', drawType: 'triangle', pos: [ 200, 200 ], text: '三角', textAttrs: { fontSize: 16 } },
  { id: getGuid(), linkReject: 1, data: { a: 1 }, fillColor: '#0ff', drawType: 'star', pos: [ 400, 280 ], text: '五角', textAttrs: { fontSize: 18, color: '#ff0' } },
  { id: getGuid(), linkReject: 1, data: { a: 1 }, drawType: 'diamond', pos: [ 400, 400 ], text: '这里是一个菱形，文字换行', textAttrs: { width: 100, lineBreak: 'normal' } },
  { id: 'bbbbbb', linkReject: 1, data: { a: 1 }, fillColor: '#faf', drawType: 'ellipse', pos: [ 400, 500 ], text: '椭圆', textAttrs: { lineBreak: 'normal' }, shapeAttrs: { radiusX: 60, radiusY: 30 } },
  // { id: getGuid(), data: { a: 1 }, fillColor: '#faf', drawType: 'polygon', pos: [ 200, 530 ], text: '自定义多边形', textAttrs: { lineBreak: 'normal' }, shapeAttrs: { points: [ [ -40, -40 ], [ 40, -40 ], [ 40, 40 ], [ -40, 40 ] ] } },
];
// 内置的link 类型，有 ['line','polyline'],line 直线 polyline 折线默认line */
let links = [
  { startStepId: steps[ 1 ].id, drawType: 'line', endStepId: steps[ 0 ].id, text: '连接线', textAttrs: { padding: [ 0, 0, 20 ], color: '#f00', autoRotate: 'auto' }, lineAttrs: { lineDash: [ 6, 6 ], lineDashOffset: 6, color: '#0ff' } },
  { startStepId: steps[ 1 ].id, drawType: 'line', endStepId: steps[ 2 ].id, text: '连接０', textAttrs: { color: '#0f0' }, lineAttrs: { lineDash: [ 6, 6 ], lineDashOffset: 6, color: '#f00' } },
  { startStepId: steps[ 2 ].id, drawType: 'line', endStepId: steps[ 3 ].id, text: '连接1', textAttrs: { padding: [ 0, 0, 20 ], color: '#f00' }, lineAttrs: { color: '#f0f', lineDash: [ 6, 6 ], } },
  { startStepId: steps[ 3 ].id, drawType: 'line', endStepId: steps[ 4 ].id, text: '连接２', textAttrs: { padding: [ 0, 0, 20 ], color: '#f00' }, lineAttrs: { color: '#00f' } },
  { startStepId: steps[ 4 ].id, drawType: 'line', endStepId: steps[ 0 ].id, lineAttrs: { color: '#0f0' } },
  { startStepId: 'bbbbbb', drawType: 'line', endStepId: steps[ 4 ].id, lineAttrs: { color: '#faf' } },
  // { startStepId: steps[ 5 ].id, drawType: 'line', endStepId: steps[ 4 ].id, lineAttrs: { color: '#0ff' } },
  { startStepId: steps[ 0 ].id, drawType: 'polyline', endStepId: 'bbbbbb', lineAttrs: { color: '#faf', lineWidth: 5, lineDash: [ 6, 12 ] } },
]
let arrSteps = [];
let arrLinks = [];
let workflow = new Workflow({ selector: '#workflow', size: [ width, height ], zoom: [ 0.5, 2 ] });
steps.forEach(object => {
  let step = new Step(object);
  arrSteps.push(step)
  workflow.append(step);
})
links.forEach(object => {
  let link = new Link(object);
  arrLinks.push(link);
  if (object.drawType === 'polyline') {
    link.on('mounted', function () {
      link.$line.animate([ { lineDashOffset: -40 } ], {
        duration: 400,
        iterations: Infinity,
      });
    })
  }
  workflow.append(link);
});
