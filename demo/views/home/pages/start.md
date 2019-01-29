## 基本饼图

:::demo

```javascript
const { Workflow, Link, Step } = window.spriteWorkflow;
    const width = 600;
    const height = 460;
    const getGuid = () => Math.random().toString(36).slice(2);
    // 内置的Step 类型，有 ['rect','circle','triangle','star','diamond'],默认rect */
    let steps = [
      { id: getGuid(), data: { a: 1 }, drawType: 'rect', pos: [ 450, 110 ], text: '我是矩形' },
      { id: getGuid(), data: { a: 1 }, drawType: 'circle', pos: [ 100, 100 ], text: '圆' },
      { id: getGuid(), data: { a: 1 }, drawType: 'triangle', pos: [ 200, 200 ], text: '三角' },
      { id: getGuid(), data: { a: 1 }, drawType: 'star', pos: [ 340, 240 ], text: '五角' },
      { id: getGuid(), data: { a: 1 }, drawType: 'diamond', pos: [ 340, 400 ], text: '菱形' },
    ];
    // 内置的link 类型，有 ['line','polyline'],line 直线 polyline 折线默认line */
    let links = [
      // { startStepId: steps[ 0 ].id, drawType: 'polyline', endStepId: steps[ 1 ].id },
      // { startStepId: steps[ 1 ].id, drawType: 'polyline', endStepId: steps[ 2 ].id },
      // { startStepId: steps[ 2 ].id, drawType: 'polyline', endStepId: steps[ 3 ].id },
      // { startStepId: steps[ 3 ].id, drawType: 'polyline', endStepId: steps[ 4 ].id },
      // { startStepId: steps[ 4 ].id, drawType: 'polyline', endStepId: steps[ 0 ].id },
      { startStepId: steps[ 0 ].id, drawType: 'line', endStepId: steps[ 1 ].id },
      { startStepId: steps[ 1 ].id, drawType: 'line', endStepId: steps[ 2 ].id },
      { startStepId: steps[ 2 ].id, drawType: 'line', endStepId: steps[ 3 ].id },
      { startStepId: steps[ 3 ].id, drawType: 'line', endStepId: steps[ 4 ].id },
      { startStepId: steps[ 4 ].id, drawType: 'line', endStepId: steps[ 0 ].id },
    ]

    let workflow = new Workflow({ selector: '.block-demo .demo', size: [ width, height ], zoom: [ 0.5, 2 ] });
    steps.forEach(object => {
      let step = new Step(object);
      workflow.append(step);
    })
    links.forEach(object => {
      let link = new Link(object);
      workflow.append(link);
    });

:::

