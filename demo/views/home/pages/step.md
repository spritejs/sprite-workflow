## 自定义Step显示内容
默认的Step的drawType有 ```['rect','circle','triangle','star','diamond']```类型，对应可以将步骤绘制出圆、矩形、三角、五角星等，但是可能还是满足不了你的需求。Step有自定义绘制功能。创建step实例的时候，第二个参数，传入draw自定义Step的draw方法，其中sprite-workflow已经打包了<a href="https://github.com/spritejs/sprite-extend-shapes">sprite-extend-shapes</a>，在绘制图形时，你可以直接使用sprite-extend-shapes的相关特性，当然，你也可以不用。下面示例中的```Polygon```即为sprite-extend-shapes的示例。

注：如果重写了Step的draw方法，1.绘制的图必须中心对齐(例，如果绘制边长为20的正方形：对应坐标为`[[-10,10],[10,10],[10,-10],[-10,10]]`),表示该图形的中心在`[0,0]`;
2.对应的link的update方法，可能也要重写，以保证连线位置的正确性，详细见后面的例子。
```javascript
 let step = new Step({…},{
   draw:function(){
   // 此处自定义draw方法
   }
 });
```
:::demo

```javascript
const { Workflow, Link, Step } = window.spriteWorkflow;
const {Polygon,Label,Sprite} = window.spritejs;
let stepObject = {id: 'abc-123',drawType:'polygon-my',pos:[ 100, 20 ],text: '我是矩形3'};
let workflow = new Workflow({
  selector:'.block-demo .demo',size:[ 400, 300 ],
  zoom: false
});
let step = new Step(stepObject,{
  draw:function(){
    this.points = [[-50,-20],[50,-20],[50,20],[-50,20]]; // 四个点组成矩形,中心点在[0,0]
    let $polygon = new Polygon(); // 创建一个多边形
    $polygon.attr({points:this.points,fillColor:'#0ff'});
    let $label = new Label(this.attr('text')); // 为stepObject中的text
    $label.attr({anchor:[0.5]});// anchor设置为居中对其
    //加入一张图片
    const $sprite = new Sprite('https://p5.ssl.qhimg.com/t01a2bd87890397464a.png');
    $sprite.attr({size:[50,50],anchor:[0.5]}) // anchor设置为居中对其
    this.append($polygon);
    this.append($label);
    this.append($sprite);
  }
}); // 创建step
step.on('drag',function(e){ //drag事件，同样可以支持，click等等鼠标事件
  console.log(e);
})

workflow.append(step); // 添加step到workflow中

console.log(workflow.children)

:::