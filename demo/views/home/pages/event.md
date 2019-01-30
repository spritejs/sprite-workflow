## 事件
sprite-workflow中包含`Link`与`Step`,这两个对象的实例，对于常见的鼠标事件，都能支持，如：`'click', 'dblclick', 'mouseenter', 'mouseleave', 'mousemove', 'mousedown'`,其中，step 支持拖动，有拖动的相关事件支持，该拖动参考：<a href="https://github.com/spritejs/sprite-draggable">sprite-draggable</a>

:::demo

```javascript
const { Workflow, Link, Step } = window.spriteWorkflow;
const {Polygon,Label,Sprite} = window.spritejs;
let stepObject = {id: 'abc-123',drawType:'polygon-my',pos:[ 100, 20 ],text: '我是矩形3'};
let stepObject1 = {id: 'abc-234',drawType:'star',pos:[ 350, 200 ],text: '五角'};
let workflow = new Workflow({
  selector:'.block-demo .demo',size:[ 600,460 ],
  zoom: false
});
let step = new Step(stepObject,{
  draw:function(){
    const $sprite = new Sprite('https://p5.ssl.qhimg.com/t01c33383c0e168c3c4.png');
    $sprite.attr({size:[100,130]})
    this.append($sprite);
  }
}); // 创建step
let step1 = new Step(stepObject1);
let link = new Link({startStepId:'abc-123',drawType:'polyline',endStepId:'abc-234'})
step.on('drag',function(e){ //drag事件，同样可以支持，click等等鼠标事件
  console.log(e);
});

step.on('dragend',function(e){ //drag事件，同样可以支持，click等等鼠标事件
  console.log(e);
});

step.on('click',function(e){
  console.log(e);
})

workflow.append(step); // 添加step到workflow中
workflow.append(step1);
workflow.append(link);

console.log(workflow.children)

:::