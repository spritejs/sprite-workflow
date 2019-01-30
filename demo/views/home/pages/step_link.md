## 联动自定义step与link
当step自定义的时候，如果step的drawType为```[ 'rect', 'circle', 'triangle', 'star', 'diamond', 'polygon' ]```中的一种，或者drawType以这些名称开头，那么link会自动按照默认的内置类型来处理link，如果step自定义不属于以上类型，需要自定义link的更新方式。
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
const { Workflow, Link, Step ,functions} = window.spriteWorkflow;
const {getPolygonIntersectionPoint} = functions;
const {Polygon,Label,Polyline,Triangle} = window.spritejs;
let stepObject1 = {id: 'abc-123',pos:[ 100, 20 ],text: '我是矩形1'};
let stepObject2 = {id: 'abc-234',drawType:'polygon-abc',pos:[ 200, 200 ],text: '我是矩形2'};
let workflow = new Workflow({
  selector:'.block-demo .demo',size:[ 500, 460 ],
  zoom: false
});
let step1 = new Step(stepObject1); // 创建step
let step2 = new Step(stepObject2,{
  draw:function(){
    this.points = [[0,0],[100,0],[100,40],[50,100],[0,40]]; // 5点的任意多边形
    let $polygon = new Polygon(); // 创建一个多边形
    $polygon.attr({points:this.points,fillColor:'#f00'});
    let $label = new Label(this.attr('text')); // 为stepObject中的text
    this.append($polygon);
    this.append($label);
  }
});

let link = new Link({startStepId:'abc-123',drawType:'line-abc',endStepId:'abc-234'},{
  draw:function(){
    this.$link = new Polyline();
    this.$arrow = new Triangle();
    this.$label = new Label('线段文字');
    this.$label.attr({anchor:[0.5,0.5]})
    const { startPoint, endPoint } = this.attr();
    this.$link.attr({ points: [ startPoint, endPoint ], lineWidth: 1, color: '#0ff'});
    this.$arrow.attr({ color: '#0ff', pos: [ endPoint ], sides: [ 8, 8 ], angle: 45, fillColor: '#0ff' })
    this.append(this.$link);
    this.append(this.$arrow);
    this.append(this.$label);
  },
  update(e){
    const {newAttrs} = e;
    const endStep = this.getLinkedSteps('end')[ 0 ]; // 获取相关最后一个步骤
    const {startPoint,endPoint} = newAttrs; //表示link的两个原始点，及两个step的中心点
    if(endStep){ // 初始化的时候，link的update可能不存在step
      const [ox,oy] = endStep.renderBox; // 实际渲染的世界坐标位置
      let realPoints = endStep.points.map(point=>[point[0]+ox,point[1]+oy]); // 将多边形的点坐标转换成世界坐标
      let realEndPoint = getPolygonIntersectionPoint(realPoints,startPoint,endPoint); // 获取线段与多边形边的交点
      if(realEndPoint){ // 如果相交点存在
        this.$label.attr({'pos':[ (startPoint[0]+realEndPoint[0])/2, (startPoint[1]+realEndPoint[1])/2]});
      }
    }
  }
});
link.on('update',function(){
  console.log('cus-update')
});
link.on('click',function(){
  console.log('cus-link-click');
})

workflow.append(link);
workflow.append(step1);
workflow.append(step2);

console.log(workflow.children)

:::