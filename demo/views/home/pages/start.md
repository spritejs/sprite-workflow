## 开始
如下：在页面中引入spritejs与sprite-workflow后，你可以非常简单得开始使用sprite-workflow
``` html
  <script src="https://unpkg.com/spritejs/dist/spritejs.min.js"></script>
  <script src="https://unpkg.com/sprite-workflow/lib/index.js"></script>
  ```
:::demo

```javascript
const { Workflow, Link, Step } = window.spriteWorkflow;
const width = 600;
const height = 460;
const getGuid = () => Math.random().toString(36).slice(2);
// 内置的Step 类型，有 ['rect','circle','triangle','star','diamond','ellipse','polygon'],默认rect */
let steps = [
  { id: getGuid(),linkReject: 1, data: { a: 1 }, fillColor: '#f00', drawType: 'rect', text: '我是矩形', textAttrs: { fontSize: 12, borderRadius: 5, padding: [ 10, 10 ] }, pos: [ 100, 400 ] },
      { id: getGuid(),linkReject: 1, data: { a: 1 }, fillColor: '#ff0', drawType: 'circle', pos: [ 100, 40 ], text: '圆', textAttrs: { fontSize: 18, color: '#f00' } },
      { id: getGuid(),linkReject: 1, data: { a: 1 }, fillColor: '#f0f', drawType: 'triangle', pos: [ 200, 160 ], text: '三角', textAttrs: { fontSize: 16 } },
      { id: getGuid(),linkReject: 1, data: { a: 1 }, fillColor: '#0ff', drawType: 'star', pos: [ 400, 180 ], text: '五角', textAttrs: { fontSize: 18, color: '#ff0' } },
      { id: getGuid(),linkReject: 1, data: { a: 1 }, drawType: 'diamond', pos: [ 400, 300 ], text: '这里是一个菱形，文字换行', textAttrs: { width: 100, lineBreak: 'normal' } },
      { id: getGuid(), linkReject: 0.7,data: { a: 1 }, fillColor: '#faf', drawType: 'ellipse', pos: [ 400, 400 ], text: '椭圆', textAttrs: { lineBreak: 'normal' }, shapeAttrs: { radiusX: 60, radiusY: 30 } },
];
// 内置的link 类型，有 ['line','polyline'],line 直线 polyline 折线默认line */
let links = [
   { startStepId: steps[ 1 ].id, drawType: 'line', endStepId: steps[ 0 ].id, text: '连接线', textAttrs: { padding: [ 0, 0, 20 ], color: '#f00', autoRotate: 'auto' }, lineAttrs: { lineDash: [ 6, 6 ], lineDashOffset: 6, color: '#0ff' } },
      { startStepId: steps[ 1 ].id, drawType: 'line', endStepId: steps[ 2 ].id, text: '连接０', textAttrs: { color: '#0f0' }, lineAttrs: { lineDash: [ 6, 6 ], lineDashOffset: 6, color: '#f00' } },
      { startStepId: steps[ 2 ].id, drawType: 'line', endStepId: steps[ 3 ].id, text: '连接1', textAttrs: { padding: [ 0, 0, 20 ], color: '#f00' }, lineAttrs: { color: '#f0f', lineDash: [ 6, 6 ], } },
      { startStepId: steps[ 3 ].id, drawType: 'line', endStepId: steps[ 4 ].id, text: '连接２', textAttrs: { padding: [ 0, 0, 20 ], color: '#f00' }, lineAttrs: { color: '#00f' } },
      { startStepId: steps[ 4 ].id, drawType: 'line', endStepId: steps[ 0 ].id, lineAttrs: { color: '#0f0' } },
      { startStepId: steps[ 5 ].id, drawType: 'line', endStepId: steps[ 4 ].id, lineAttrs: { color: '#faf' } },
      { startStepId: steps[ 0 ].id, drawType: 'polyline', endStepId: steps[ 5 ].id, lineAttrs: { color: '#faf',lineDash: [ 6, 6 ] } },
]
let workflow = new Workflow({ selector: '.block-demo .demo', size: [ width, height ], zoom: [ 1, 1 ] });
steps.forEach(object => {
  let step = new Step(object);
  workflow.append(step);
})
links.forEach(object => {
  let link = new Link(object);
  
  if (object.drawType === 'polyline') {
        link.on('mounted', function () {
          // link.$line表示link的线sprite对象 link.$arrow表示箭头的sprite对象
          link.$line.animate([ { lineDashOffset: -800 } ], {
            duration: 16000,
            iterations: Infinity,
          });
        })
      }
      workflow.append(link);
});
console.log(workflow.children)
:::

