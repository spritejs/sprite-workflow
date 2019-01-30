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
// 内置的Step 类型，有 ['rect','circle','triangle','star','diamond'],默认rect */
let steps = [
  { id: getGuid(), data: { a: 1 }, drawType: 'rect', pos: [ 450, 20 ], text: '我是矩形' },
  { id: getGuid(), data: { a: 1 }, drawType: 'circle', pos: [ 100, 10 ], text: '圆' },
  { id: getGuid(), data: { a: 1 }, drawType: 'triangle', pos: [ 100, 200 ], text: '三角' },
  { id: getGuid(), data: { a: 1 }, drawType: 'star', pos: [ 240, 240 ], text: '五角' },
  { id: getGuid(), data: { a: 1 }, drawType: 'diamond', pos: [ 340, 300 ], text: '菱形' },
];
// 内置的link 类型，有 ['line','polyline'],line 直线 polyline 折线默认line */
let links = [
  { startStepId: steps[ 0 ].id, drawType: 'polyline', endStepId: steps[ 1 ].id },
  { startStepId: steps[ 1 ].id, drawType: 'polyline', endStepId: steps[ 2 ].id },
  { startStepId: steps[ 2 ].id, drawType: 'line', endStepId: steps[ 3 ].id },
  { startStepId: steps[ 3 ].id, drawType: 'polyline', endStepId: steps[ 4 ].id },
  { startStepId: steps[ 4 ].id, drawType: 'line', endStepId: steps[ 0 ].id }
]

let workflow = new Workflow({ selector: '.block-demo .demo', size: [ width, height ], zoom: [1, 1 ] });
steps.forEach(object => {
  let step = new Step(object); // 创建step
  workflow.append(step); // 添加step到workflow中
})
links.forEach(object => {
  let link = new Link(object);
  workflow.append(link);
});
console.log(workflow.children)

:::

