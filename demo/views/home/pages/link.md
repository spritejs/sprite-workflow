## 自定义Link显示内容
默认的Link的drawType有 ```['line','polyline']```类型，可以对应的绘制直线，折线，当然如果使用场景中，这两种满足不了要求，可以自定义Link的draw与update方法，方式与自定义Step的draw方法类似。
```javascript
 let link = new Link({…},{
   draw:function(){
    // 此处自定义draw方法
   },
   update:function(newAttrs,oldAttrs){
     // 此处自定义link的更新方法
   }
 });
```
:::demo

```javascript
const { Workflow, Link, Step } = window.spriteWorkflow;
const {Polygon,Label} = window.spritejs;
let stepObject = {id: 'abc-123',pos:[ 100, 20 ],text: '我是矩形3'};
let workflow = new Workflow({
  selector:'.block-demo .demo',size:[ 400, 300 ],
  zoom: false
});
let step = new Step(stepObject,{
  draw:function(){
    this.points = [[0,0],[100,0],[100,40],[0,40]]; // 四个点组成矩形
    let $polygon = new Polygon(); // 创建一个多边形
    $polygon.attr({points:this.points,fillColor:'#f00'});
    let $label = new Label(this.attr('text')); // 为stepObject中的text
    this.append($polygon);
    this.append($label);
  }
}); // 创建step
step.on('drag',function(e){ //drag事件，同样可以支持，click等等鼠标事件
  console.log(e);
})

workflow.append(step); // 添加step到workflow中

console.log(workflow.children)

:::