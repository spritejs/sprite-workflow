(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{193:function(s,t,a){"use strict";a.r(t);var r={components:{}},e=a(27),n=Object(e.a)(r,function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("section",[a("h2",[s._v("事件")]),s._v(" "),s._m(0),s._v(" "),a("block-demo",{attrs:{tip:"",source:"const { Workflow, Link, Step } = window.spriteWorkflow;\nconst {Polygon,Label,Sprite} = window.spritejs;\nlet stepObject = {id: &#39;abc-123&#39;,drawType:&#39;polygon-my&#39;,pos:[ 100, 80 ],text: &#39;我是矩形3&#39;};\nlet stepObject1 = {id: &#39;abc-234&#39;,drawType:&#39;star&#39;,pos:[ 350, 200 ],text: &#39;五角&#39;};\nlet workflow = new Workflow({\n  selector:&#39;.block-demo .demo&#39;,size:[ 600,460 ],\n  zoom: false\n});\nlet step = new Step(stepObject,{\n  draw:function(){\n    const $sprite = new Sprite(&#39;https://p5.ssl.qhimg.com/t01c33383c0e168c3c4.png&#39;);\n    $sprite.attr({size:[100,130],pos:[-50,-65]})\n    this.append($sprite);\n  }\n}); // 创建step\nlet step1 = new Step(stepObject1);\nlet link = new Link({startStepId:&#39;abc-123&#39;,drawType:&#39;polyline&#39;,endStepId:&#39;abc-234&#39;,lineAttrs:{color:&#39;#f00&#39;,lineDash:[6,6]}})\nstep.on(&#39;drag&#39;,function(e){ //drag事件，同样可以支持，click等等鼠标事件\n  console.log(e);\n});\n\nstep.on(&#39;dragend&#39;,function(e){ //drag事件，同样可以支持，click等等鼠标事件\n  console.log(e);\n});\n\nstep.on(&#39;click&#39;,function(e){\n  console.log(e);\n})\n\nworkflow.append(step); // 添加step到workflow中\nworkflow.append(step1);\nworkflow.append(link);\n\nconsole.log(workflow.children)\n\n"}},[a("pre",{pre:!0},[a("code",{pre:!0,attrs:{"v-pre":"",class:"language-javascript"}},[a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" { Workflow, Link, Step } = "),a("span",{pre:!0,attrs:{class:"hljs-built_in"}},[s._v("window")]),s._v(".spriteWorkflow;\n"),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" {Polygon,Label,Sprite} = "),a("span",{pre:!0,attrs:{class:"hljs-built_in"}},[s._v("window")]),s._v(".spritejs;\n"),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("let")]),s._v(" stepObject = {"),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("id")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'abc-123'")]),s._v(","),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("drawType")]),s._v(":"),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'polygon-my'")]),s._v(","),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("pos")]),s._v(":[ "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("100")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("80")]),s._v(" ],"),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("text")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'我是矩形3'")]),s._v("};\n"),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("let")]),s._v(" stepObject1 = {"),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("id")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'abc-234'")]),s._v(","),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("drawType")]),s._v(":"),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'star'")]),s._v(","),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("pos")]),s._v(":[ "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("350")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("200")]),s._v(" ],"),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("text")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'五角'")]),s._v("};\n"),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("let")]),s._v(" workflow = "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" Workflow({\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("selector")]),s._v(":"),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'.block-demo .demo'")]),s._v(","),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("size")]),s._v(":[ "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("600")]),s._v(","),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("460")]),s._v(" ],\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("zoom")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-literal"}},[s._v("false")]),s._v("\n});\n"),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("let")]),s._v(" step = "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" Step(stepObject,{\n  "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("draw")]),s._v(":"),a("span",{pre:!0,attrs:{class:"hljs-function"}},[a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),a("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(")")]),s._v("{\n    "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" $sprite = "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" Sprite("),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'https://p5.ssl.qhimg.com/t01c33383c0e168c3c4.png'")]),s._v(");\n    $sprite.attr({"),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("size")]),s._v(":["),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("100")]),s._v(","),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("130")]),s._v("],"),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("pos")]),s._v(":["),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("-50")]),s._v(","),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("-65")]),s._v("]})\n    "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".append($sprite);\n  }\n}); "),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// 创建step")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("let")]),s._v(" step1 = "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" Step(stepObject1);\n"),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("let")]),s._v(" link = "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" Link({"),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("startStepId")]),s._v(":"),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'abc-123'")]),s._v(","),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("drawType")]),s._v(":"),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'polyline'")]),s._v(","),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("endStepId")]),s._v(":"),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'abc-234'")]),s._v(","),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("lineAttrs")]),s._v(":{"),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("color")]),s._v(":"),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'#f00'")]),s._v(","),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("lineDash")]),s._v(":["),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("6")]),s._v(","),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("6")]),s._v("]}})\nstep.on("),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'drag'")]),s._v(","),a("span",{pre:!0,attrs:{class:"hljs-function"}},[a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),a("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("e")]),s._v(")")]),s._v("{ "),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("//drag事件，同样可以支持，click等等鼠标事件")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".log(e);\n});\n\nstep.on("),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'dragend'")]),s._v(","),a("span",{pre:!0,attrs:{class:"hljs-function"}},[a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),a("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("e")]),s._v(")")]),s._v("{ "),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("//drag事件，同样可以支持，click等等鼠标事件")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".log(e);\n});\n\nstep.on("),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'click'")]),s._v(","),a("span",{pre:!0,attrs:{class:"hljs-function"}},[a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),a("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("e")]),s._v(")")]),s._v("{\n  "),a("span",{pre:!0,attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".log(e);\n})\n\nworkflow.append(step); "),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// 添加step到workflow中")]),s._v("\nworkflow.append(step1);\nworkflow.append(link);\n\n"),a("span",{pre:!0,attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".log(workflow.children)\n\n")])])])],1)},[function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("p",[s._v("sprite-workflow中包含"),a("code",{pre:!0},[s._v("Link")]),s._v("与"),a("code",{pre:!0},[s._v("Step")]),s._v(",这两个对象的实例，对于常见的鼠标事件，都能支持，如："),a("code",{pre:!0},[s._v("'click', 'dblclick', 'mouseenter', 'mouseleave', 'mousemove', 'mousedown'")]),s._v(",其中，step 支持拖动，有拖动的相关事件支持，该拖动参考："),a("a",{attrs:{href:"https://github.com/spritejs/sprite-draggable"}},[s._v("sprite-draggable")])])}],!1,null,null,null);t.default=n.exports}}]);