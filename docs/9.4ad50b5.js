(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{54:function(s,t,a){"use strict";a.r(t);var n={components:{}},r=a(8),e=Object(r.a)(n,function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("section",[a("h2",[s._v("联动自定义step与link")]),s._v(" "),s._m(0),s._v(" "),s._m(1),s._v(" "),a("block-demo",{attrs:{tip:"",source:"const { Workflow, Link, Step ,functions} = window.spriteWorkflow;\nconst {getPolygonIntersectionPoint} = functions;\nconst {Polygon,Label,Polyline,Triangle} = window.spritejs;\nlet stepObject1 = {id: &#39;abc-123&#39;,pos:[ 100, 20 ],text: &#39;我是矩形1&#39;};\nlet stepObject2 = {id: &#39;abc-234&#39;,drawType:&#39;polygon-abc&#39;,pos:[ 200, 200 ],text: &#39;我是梯形&#39;};\nlet workflow = new Workflow({\n  selector:&#39;.block-demo .demo&#39;,size:[ 500, 460 ],\n  zoom: false\n});\nlet step1 = new Step(stepObject1); // 创建step\nlet step2 = new Step(stepObject2,{\n  draw:function(){\n    this.points =  [[-10,-10],[80,-10],[100,40],[-30,40]]; // 5点的任意多边形，中心点非中心位置\n    let $polygon = new Polygon(); // 创建一个多边形\n    $polygon.attr({points:this.points,fillColor:&#39;#f00&#39;});\n    let $label = new Label(this.attr(&#39;text&#39;)); // 为stepObject中的text\n    this.append($polygon);\n    this.append($label);\n  }\n});\n\nlet link = new Link({startStepId:&#39;abc-123&#39;,drawType:&#39;line-abc&#39;,endStepId:&#39;abc-234&#39;},{\n  draw:function(){\n    this.$link = new Polyline();\n    this.$arrow = new Triangle();\n    this.$label = new Label(&#39;线段文字&#39;);\n    this.$label.attr({anchor:[0.5,0.5]})\n    const { startPoint, endPoint } = this.attr();\n    this.$link.attr({ points: [ startPoint, endPoint ], lineWidth: 1, color: &#39;#0ff&#39;});\n    this.$arrow.attr({ color: &#39;#0ff&#39;, pos: [ endPoint ], sides: [ 8, 8 ], angle: 45, fillColor: &#39;#0ff&#39; })\n    this.append(this.$link);\n    this.append(this.$arrow);\n    this.append(this.$label);\n  },\n  update(e){\n    const {newAttrs} = e;\n    const endStep = this.getLinkedSteps(&#39;end&#39;)[ 0 ]; // 获取相关最后一个步骤\n    const {startPoint,endPoint} = newAttrs; //表示link的两个原始点，及两个step的中心点\n    if(endStep){ // 初始化的时候，link的update可能不存在step\n      const [ox,oy] = endStep.renderBox; // 实际渲染的世界坐标位置\n      let realPoints = endStep.points.map(point=>[point[0]+ox,point[1]+oy]); // 将多边形的点坐标转换成世界坐标\n      let realEndPoint = getPolygonIntersectionPoint(realPoints,startPoint,endPoint); // 获取线段与多边形边的交点\n      if(realEndPoint){ // 如果相交点存在\n        this.$label.attr({&#39;pos&#39;:[ (startPoint[0]+realEndPoint[0])/2, (startPoint[1]+realEndPoint[1])/2]});\n      }\n    }\n  }\n});\nlink.on(&#39;update&#39;,function(){\n  console.log(&#39;cus-update&#39;)\n});\nlink.on(&#39;click&#39;,function(){\n  console.log(&#39;cus-link-click&#39;);\n})\n\nworkflow.append(link);\nworkflow.append(step1);\nworkflow.append(step2);\n\nconsole.log(workflow.children)\n\n"}},[a("pre",{pre:!0},[a("code",{pre:!0,attrs:{"v-pre":"",class:"language-javascript"}},[a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" { Workflow, Link, Step ,functions} = "),a("span",{pre:!0,attrs:{class:"hljs-built_in"}},[s._v("window")]),s._v(".spriteWorkflow;\n"),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" {getPolygonIntersectionPoint} = functions;\n"),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" {Polygon,Label,Polyline,Triangle} = "),a("span",{pre:!0,attrs:{class:"hljs-built_in"}},[s._v("window")]),s._v(".spritejs;\n"),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("let")]),s._v(" stepObject1 = {"),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("id")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'abc-123'")]),s._v(","),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("pos")]),s._v(":[ "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("100")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("20")]),s._v(" ],"),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("text")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'我是矩形1'")]),s._v("};\n"),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("let")]),s._v(" stepObject2 = {"),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("id")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'abc-234'")]),s._v(","),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("drawType")]),s._v(":"),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'polygon-abc'")]),s._v(","),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("pos")]),s._v(":[ "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("200")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("200")]),s._v(" ],"),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("text")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'我是梯形'")]),s._v("};\n"),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("let")]),s._v(" workflow = "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" Workflow({\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("selector")]),s._v(":"),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'.block-demo .demo'")]),s._v(","),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("size")]),s._v(":[ "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("500")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("460")]),s._v(" ],\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("zoom")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-literal"}},[s._v("false")]),s._v("\n});\n"),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("let")]),s._v(" step1 = "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" Step(stepObject1); "),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// 创建step")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("let")]),s._v(" step2 = "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" Step(stepObject2,{\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("draw")]),s._v(":"),a("span",{pre:!0,attrs:{class:"hljs-function"}},[a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),a("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(")")]),s._v("{\n    "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".points =  [["),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("-10")]),s._v(","),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("-10")]),s._v("],["),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("80")]),s._v(","),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("-10")]),s._v("],["),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("100")]),s._v(","),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("40")]),s._v("],["),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("-30")]),s._v(","),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("40")]),s._v("]]; "),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// 5点的任意多边形，中心点非中心位置")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("let")]),s._v(" $polygon = "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" Polygon(); "),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// 创建一个多边形")]),s._v("\n    $polygon.attr({"),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("points")]),s._v(":"),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".points,"),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("fillColor")]),s._v(":"),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'#f00'")]),s._v("});\n    "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("let")]),s._v(" $label = "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" Label("),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".attr("),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'text'")]),s._v(")); "),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// 为stepObject中的text")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".append($polygon);\n    "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".append($label);\n  }\n});\n\n"),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("let")]),s._v(" link = "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" Link({"),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("startStepId")]),s._v(":"),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'abc-123'")]),s._v(","),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("drawType")]),s._v(":"),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'line-abc'")]),s._v(","),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("endStepId")]),s._v(":"),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'abc-234'")]),s._v("},{\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("draw")]),s._v(":"),a("span",{pre:!0,attrs:{class:"hljs-function"}},[a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),a("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(")")]),s._v("{\n    "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".$link = "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" Polyline();\n    "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".$arrow = "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" Triangle();\n    "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".$label = "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" Label("),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'线段文字'")]),s._v(");\n    "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".$label.attr({"),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("anchor")]),s._v(":["),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0.5")]),s._v(","),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0.5")]),s._v("]})\n    "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" { startPoint, endPoint } = "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".attr();\n    "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".$link.attr({ "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("points")]),s._v(": [ startPoint, endPoint ], "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("lineWidth")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("1")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("color")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'#0ff'")]),s._v("});\n    "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".$arrow.attr({ "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("color")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'#0ff'")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("pos")]),s._v(": [ endPoint ], "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("sides")]),s._v(": [ "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("8")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("8")]),s._v(" ], "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("angle")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("45")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("fillColor")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'#0ff'")]),s._v(" })\n    "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".append("),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".$link);\n    "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".append("),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".$arrow);\n    "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".append("),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".$label);\n  },\n  update(e){\n    "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" {newAttrs} = e;\n    "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" endStep = "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".getLinkedSteps("),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'end'")]),s._v(")[ "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0")]),s._v(" ]; "),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// 获取相关最后一个步骤")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" {startPoint,endPoint} = newAttrs; "),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("//表示link的两个原始点，及两个step的中心点")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("if")]),s._v("(endStep){ "),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// 初始化的时候，link的update可能不存在step")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" [ox,oy] = endStep.renderBox; "),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// 实际渲染的世界坐标位置")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("let")]),s._v(" realPoints = endStep.points.map("),a("span",{pre:!0,attrs:{class:"hljs-function"}},[a("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("point")]),s._v("=>")]),s._v("[point["),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0")]),s._v("]+ox,point["),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("1")]),s._v("]+oy]); "),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// 将多边形的点坐标转换成世界坐标")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("let")]),s._v(" realEndPoint = getPolygonIntersectionPoint(realPoints,startPoint,endPoint); "),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// 获取线段与多边形边的交点")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("if")]),s._v("(realEndPoint){ "),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// 如果相交点存在")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".$label.attr({"),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'pos'")]),s._v(":[ (startPoint["),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0")]),s._v("]+realEndPoint["),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0")]),s._v("])/"),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("2")]),s._v(", (startPoint["),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("1")]),s._v("]+realEndPoint["),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("1")]),s._v("])/"),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("2")]),s._v("]});\n      }\n    }\n  }\n});\nlink.on("),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'update'")]),s._v(","),a("span",{pre:!0,attrs:{class:"hljs-function"}},[a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),a("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(")")]),s._v("{\n  "),a("span",{pre:!0,attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".log("),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'cus-update'")]),s._v(")\n});\nlink.on("),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'click'")]),s._v(","),a("span",{pre:!0,attrs:{class:"hljs-function"}},[a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),a("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(")")]),s._v("{\n  "),a("span",{pre:!0,attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".log("),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'cus-link-click'")]),s._v(");\n})\n\nworkflow.append(link);\nworkflow.append(step1);\nworkflow.append(step2);\n\n"),a("span",{pre:!0,attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".log(workflow.children)\n\n")])])])],1)},[function(){var s=this.$createElement,t=this._self._c||s;return t("p",[this._v("当step自定义的时候，如果step的drawType为"),t("code",{pre:!0},[this._v("[ 'rect', 'circle', 'triangle', 'star', 'diamond', 'polygon' ]")]),this._v("中的一种，或者drawType以这些名称开头，那么link会自动按照默认的内置类型来处理link，如果step自定义不属于以上类型，需要自定义link的更新方式。")])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("pre",{pre:!0},[a("code",{pre:!0,attrs:{"v-pre":"",class:"language-javascript"}},[s._v(" "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("let")]),s._v(" link = "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" Link({…},{\n   "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("draw")]),s._v(":"),a("span",{pre:!0,attrs:{class:"hljs-function"}},[a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),a("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(")")]),s._v("{\n    "),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// 此处自定义draw方法")]),s._v("\n   },\n   "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("update")]),s._v(":"),a("span",{pre:!0,attrs:{class:"hljs-function"}},[a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),a("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("newAttrs,oldAttrs")]),s._v(")")]),s._v("{\n     "),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// 此处自定义link的更新方法")]),s._v("\n   }\n });\n")])])}],!1,null,null,null);t.default=e.exports}}]);