## 自定义Link显示内容
默认的Link的drawType有 ```['line','polyline']```类型，可以对应的绘制直线，折线，当然如果使用场景中，这两种满足不了要求，可以自定义Link的draw与update方法，方式与自定义Step的draw方法类似。如果link的连接方式与默认相同，可通过drawType 来指定连接类型，如下例中如果drawType为`polyline`开头，连接线与折线
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
const {Polygon,Label,Polyline,Triangle} = window.spritejs;
let stepObject1 = {id: 'abc-123',pos:[ 100, 20 ],text: '我是矩形1',fillColor:'#f00'};
let stepObject2 = {id: 'abc-234',pos:[ 200, 200 ],text: '我是矩形2'};
let workflow = new Workflow({
  selector:'.block-demo .demo',size:[ 400, 300 ],
  zoom: false
});
let step1 = new Step(stepObject1); // 创建step
let step2 = new Step(stepObject2);

//let linkObject = {startStepId:'abc-123',drawType:'line-abc',endStepId:'abc-234'};
let linkObject = {startStepId:'abc-123',drawType:'polyline-abc',endStepId:'abc-234'};
let link = new Link(linkObject,{
  draw:function(){
    this.$line = new Polyline();
    this.$arrow = new Triangle();
    const { startPoint, endPoint } = this.attr();
    this.$line.attr({lineDash:[6,6],lineDashOffset:6,points: [ startPoint, endPoint ], lineWidth: 1, color: '#0ff'});
    this.$arrow.attr({ color: '#0ff', pos: [ endPoint ], sides: [ 8, 8 ], angle: 45, fillColor: '#0ff' })
    this.append(this.$line);
    this.append(this.$arrow);
  }
});

workflow.append(link);
workflow.append(step1);
workflow.append(step2);

console.log(workflow.children)

:::