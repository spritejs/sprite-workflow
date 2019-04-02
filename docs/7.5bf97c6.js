(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{184:function(s,t,a){"use strict";a.r(t);var r={components:{}},l=a(26),e=Object(l.a)(r,function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("section",[a("h2",[s._v("开始")]),s._v(" "),a("p",[s._v("如下：在页面中引入spritejs与sprite-workflow后，你可以非常简单得开始使用sprite-workflow")]),s._v(" "),s._m(0),s._v(" "),a("block-demo",{attrs:{tip:"",source:"const { Workflow, Link, Step } = window.spriteWorkflow;\nconst width = 600;\nconst height = 460;\nconst getGuid = () => Math.random().toString(36).slice(2);\n// 内置的Step 类型，有 [&#39;rect&#39;,&#39;circle&#39;,&#39;triangle&#39;,&#39;star&#39;,&#39;diamond&#39;,&#39;ellipse&#39;,&#39;polygon&#39;],默认rect */\nlet steps = [\n  { id: getGuid(),linkReject: 1, data: { a: 1 }, fillColor: &#39;#f00&#39;, drawType: &#39;rect&#39;, text: &#39;我是矩形&#39;, textAttrs: { fontSize: 12, borderRadius: 5, padding: [ 10, 10 ] }, pos: [ 100, 400 ] },\n      { id: getGuid(),linkReject: 1, data: { a: 1 }, fillColor: &#39;#ff0&#39;, drawType: &#39;circle&#39;, pos: [ 100, 40 ], text: &#39;圆&#39;, textAttrs: { fontSize: 18, color: &#39;#f00&#39; } },\n      { id: getGuid(),linkReject: 1, data: { a: 1 }, fillColor: &#39;#f0f&#39;, drawType: &#39;triangle&#39;, pos: [ 200, 160 ], text: &#39;三角&#39;, textAttrs: { fontSize: 16 } },\n      { id: getGuid(),linkReject: 1, data: { a: 1 }, fillColor: &#39;#0ff&#39;, drawType: &#39;star&#39;, pos: [ 400, 180 ], text: &#39;五角&#39;, textAttrs: { fontSize: 18, color: &#39;#ff0&#39; } },\n      { id: getGuid(),linkReject: 1, data: { a: 1 }, drawType: &#39;diamond&#39;, pos: [ 400, 300 ], text: &#39;这里是一个菱形，文字换行&#39;, textAttrs: { width: 100, lineBreak: &#39;normal&#39; } },\n      { id: getGuid(), linkReject: 0.7,data: { a: 1 }, fillColor: &#39;#faf&#39;, drawType: &#39;ellipse&#39;, pos: [ 400, 400 ], text: &#39;椭圆&#39;, textAttrs: { lineBreak: &#39;normal&#39; }, shapeAttrs: { radiusX: 60, radiusY: 30 } },\n];\n// 内置的link 类型，有 [&#39;line&#39;,&#39;polyline&#39;],line 直线 polyline 折线默认line */\nlet links = [\n   { startStepId: steps[ 1 ].id, drawType: &#39;line&#39;, endStepId: steps[ 0 ].id, text: &#39;连接线&#39;, textAttrs: { padding: [ 0, 0, 20 ], color: &#39;#f00&#39;, autoRotate: &#39;auto&#39; }, lineAttrs: { lineDash: [ 6, 6 ], lineDashOffset: 6, color: &#39;#0ff&#39; } },\n      { startStepId: steps[ 1 ].id, drawType: &#39;line&#39;, endStepId: steps[ 2 ].id, text: &#39;连接０&#39;, textAttrs: { color: &#39;#0f0&#39; }, lineAttrs: { lineDash: [ 6, 6 ], lineDashOffset: 6, color: &#39;#f00&#39; } },\n      { startStepId: steps[ 2 ].id, drawType: &#39;line&#39;, endStepId: steps[ 3 ].id, text: &#39;连接1&#39;, textAttrs: { padding: [ 0, 0, 20 ], color: &#39;#f00&#39; }, lineAttrs: { color: &#39;#f0f&#39;, lineDash: [ 6, 6 ], } },\n      { startStepId: steps[ 3 ].id, drawType: &#39;line&#39;, endStepId: steps[ 4 ].id, text: &#39;连接２&#39;, textAttrs: { padding: [ 0, 0, 20 ], color: &#39;#f00&#39; }, lineAttrs: { color: &#39;#00f&#39; } },\n      { startStepId: steps[ 4 ].id, drawType: &#39;line&#39;, endStepId: steps[ 0 ].id, lineAttrs: { color: &#39;#0f0&#39; } },\n      { startStepId: steps[ 5 ].id, drawType: &#39;line&#39;, endStepId: steps[ 4 ].id, lineAttrs: { color: &#39;#faf&#39; } },\n      { startStepId: steps[ 0 ].id, drawType: &#39;polyline&#39;, endStepId: steps[ 5 ].id, lineAttrs: { color: &#39;#faf&#39;,lineDash: [ 6, 6 ] } },\n]\nlet workflow = new Workflow({ selector: &#39;.block-demo .demo&#39;, size: [ width, height ], zoom: [ 1, 1 ] });\nsteps.forEach(object => {\n  let step = new Step(object);\n  workflow.append(step);\n})\nlinks.forEach(object => {\n  let link = new Link(object);\n  \n  if (object.drawType === &#39;polyline&#39;) {\n        link.on(&#39;mounted&#39;, function () {\n          // link.$line表示link的线sprite对象 link.$arrow表示箭头的sprite对象\n          link.$line.animate([ { lineDashOffset: -800 } ], {\n            duration: 16000,\n            iterations: Infinity,\n          });\n        })\n      }\n      workflow.append(link);\n});\nconsole.log(workflow.children)\n"}},[a("pre",{pre:!0},[a("code",{pre:!0,attrs:{"v-pre":"",class:"language-javascript"}},[a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" { Workflow, Link, Step } = "),a("span",{pre:!0,attrs:{class:"hljs-built_in"}},[s._v("window")]),s._v(".spriteWorkflow;\n"),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" width = "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("600")]),s._v(";\n"),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" height = "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("460")]),s._v(";\n"),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("const")]),s._v(" getGuid = "),a("span",{pre:!0,attrs:{class:"hljs-function"}},[a("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("()")]),s._v(" =>")]),s._v(" "),a("span",{pre:!0,attrs:{class:"hljs-built_in"}},[s._v("Math")]),s._v(".random().toString("),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("36")]),s._v(").slice("),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("2")]),s._v(");\n"),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// 内置的Step 类型，有 ['rect','circle','triangle','star','diamond','ellipse','polygon'],默认rect */")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("let")]),s._v(" steps = [\n  { "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("id")]),s._v(": getGuid(),"),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("linkReject")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("1")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("data")]),s._v(": { "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("a")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("1")]),s._v(" }, "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("fillColor")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'#f00'")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("drawType")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'rect'")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("text")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'我是矩形'")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("textAttrs")]),s._v(": { "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("fontSize")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("12")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("borderRadius")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("5")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("padding")]),s._v(": [ "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("10")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("10")]),s._v(" ] }, "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("pos")]),s._v(": [ "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("100")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("400")]),s._v(" ] },\n      { "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("id")]),s._v(": getGuid(),"),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("linkReject")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("1")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("data")]),s._v(": { "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("a")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("1")]),s._v(" }, "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("fillColor")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'#ff0'")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("drawType")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'circle'")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("pos")]),s._v(": [ "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("100")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("40")]),s._v(" ], "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("text")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'圆'")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("textAttrs")]),s._v(": { "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("fontSize")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("18")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("color")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'#f00'")]),s._v(" } },\n      { "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("id")]),s._v(": getGuid(),"),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("linkReject")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("1")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("data")]),s._v(": { "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("a")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("1")]),s._v(" }, "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("fillColor")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'#f0f'")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("drawType")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'triangle'")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("pos")]),s._v(": [ "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("200")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("160")]),s._v(" ], "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("text")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'三角'")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("textAttrs")]),s._v(": { "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("fontSize")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("16")]),s._v(" } },\n      { "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("id")]),s._v(": getGuid(),"),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("linkReject")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("1")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("data")]),s._v(": { "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("a")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("1")]),s._v(" }, "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("fillColor")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'#0ff'")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("drawType")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'star'")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("pos")]),s._v(": [ "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("400")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("180")]),s._v(" ], "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("text")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'五角'")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("textAttrs")]),s._v(": { "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("fontSize")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("18")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("color")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'#ff0'")]),s._v(" } },\n      { "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("id")]),s._v(": getGuid(),"),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("linkReject")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("1")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("data")]),s._v(": { "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("a")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("1")]),s._v(" }, "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("drawType")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'diamond'")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("pos")]),s._v(": [ "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("400")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("300")]),s._v(" ], "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("text")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'这里是一个菱形，文字换行'")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("textAttrs")]),s._v(": { "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("width")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("100")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("lineBreak")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'normal'")]),s._v(" } },\n      { "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("id")]),s._v(": getGuid(), "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("linkReject")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0.7")]),s._v(","),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("data")]),s._v(": { "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("a")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("1")]),s._v(" }, "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("fillColor")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'#faf'")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("drawType")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'ellipse'")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("pos")]),s._v(": [ "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("400")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("400")]),s._v(" ], "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("text")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'椭圆'")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("textAttrs")]),s._v(": { "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("lineBreak")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'normal'")]),s._v(" }, "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("shapeAttrs")]),s._v(": { "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("radiusX")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("60")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("radiusY")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("30")]),s._v(" } },\n];\n"),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// 内置的link 类型，有 ['line','polyline'],line 直线 polyline 折线默认line */")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("let")]),s._v(" links = [\n   { "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("startStepId")]),s._v(": steps[ "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("1")]),s._v(" ].id, "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("drawType")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'line'")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("endStepId")]),s._v(": steps[ "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0")]),s._v(" ].id, "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("text")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'连接线'")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("textAttrs")]),s._v(": { "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("padding")]),s._v(": [ "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("20")]),s._v(" ], "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("color")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'#f00'")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("autoRotate")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'auto'")]),s._v(" }, "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("lineAttrs")]),s._v(": { "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("lineDash")]),s._v(": [ "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("6")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("6")]),s._v(" ], "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("lineDashOffset")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("6")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("color")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'#0ff'")]),s._v(" } },\n      { "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("startStepId")]),s._v(": steps[ "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("1")]),s._v(" ].id, "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("drawType")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'line'")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("endStepId")]),s._v(": steps[ "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("2")]),s._v(" ].id, "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("text")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'连接０'")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("textAttrs")]),s._v(": { "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("color")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'#0f0'")]),s._v(" }, "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("lineAttrs")]),s._v(": { "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("lineDash")]),s._v(": [ "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("6")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("6")]),s._v(" ], "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("lineDashOffset")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("6")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("color")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'#f00'")]),s._v(" } },\n      { "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("startStepId")]),s._v(": steps[ "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("2")]),s._v(" ].id, "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("drawType")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'line'")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("endStepId")]),s._v(": steps[ "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("3")]),s._v(" ].id, "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("text")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'连接1'")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("textAttrs")]),s._v(": { "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("padding")]),s._v(": [ "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("20")]),s._v(" ], "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("color")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'#f00'")]),s._v(" }, "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("lineAttrs")]),s._v(": { "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("color")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'#f0f'")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("lineDash")]),s._v(": [ "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("6")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("6")]),s._v(" ], } },\n      { "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("startStepId")]),s._v(": steps[ "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("3")]),s._v(" ].id, "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("drawType")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'line'")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("endStepId")]),s._v(": steps[ "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("4")]),s._v(" ].id, "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("text")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'连接２'")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("textAttrs")]),s._v(": { "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("padding")]),s._v(": [ "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("20")]),s._v(" ], "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("color")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'#f00'")]),s._v(" }, "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("lineAttrs")]),s._v(": { "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("color")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'#00f'")]),s._v(" } },\n      { "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("startStepId")]),s._v(": steps[ "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("4")]),s._v(" ].id, "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("drawType")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'line'")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("endStepId")]),s._v(": steps[ "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0")]),s._v(" ].id, "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("lineAttrs")]),s._v(": { "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("color")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'#0f0'")]),s._v(" } },\n      { "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("startStepId")]),s._v(": steps[ "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("5")]),s._v(" ].id, "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("drawType")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'line'")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("endStepId")]),s._v(": steps[ "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("4")]),s._v(" ].id, "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("lineAttrs")]),s._v(": { "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("color")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'#faf'")]),s._v(" } },\n      { "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("startStepId")]),s._v(": steps[ "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0")]),s._v(" ].id, "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("drawType")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'polyline'")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("endStepId")]),s._v(": steps[ "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("5")]),s._v(" ].id, "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("lineAttrs")]),s._v(": { "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("color")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'#faf'")]),s._v(","),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("lineDash")]),s._v(": [ "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("6")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("6")]),s._v(" ] } },\n]\n"),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("let")]),s._v(" workflow = "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" Workflow({ "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("selector")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'.block-demo .demo'")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("size")]),s._v(": [ width, height ], "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("zoom")]),s._v(": [ "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("1")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("1")]),s._v(" ] });\nsteps.forEach("),a("span",{pre:!0,attrs:{class:"hljs-function"}},[a("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("object")]),s._v(" =>")]),s._v(" {\n  "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("let")]),s._v(" step = "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" Step(object);\n  workflow.append(step);\n})\nlinks.forEach("),a("span",{pre:!0,attrs:{class:"hljs-function"}},[a("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("object")]),s._v(" =>")]),s._v(" {\n  "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("let")]),s._v(" link = "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" Link(object);\n  \n  "),a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("if")]),s._v(" (object.drawType === "),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'polyline'")]),s._v(") {\n        link.on("),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'mounted'")]),s._v(", "),a("span",{pre:!0,attrs:{class:"hljs-function"}},[a("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" ("),a("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(") ")]),s._v("{\n          "),a("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// link.$line表示link的线sprite对象 link.$arrow表示箭头的sprite对象")]),s._v("\n          link.$line.animate([ { "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("lineDashOffset")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("-800")]),s._v(" } ], {\n            "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("duration")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("16000")]),s._v(",\n            "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("iterations")]),s._v(": "),a("span",{pre:!0,attrs:{class:"hljs-literal"}},[s._v("Infinity")]),s._v(",\n          });\n        })\n      }\n      workflow.append(link);\n});\n"),a("span",{pre:!0,attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".log(workflow.children)\n")])])])],1)},[function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("pre",{pre:!0},[a("code",{pre:!0,attrs:{"v-pre":"",class:"language-html"}},[s._v("  "),a("span",{pre:!0,attrs:{class:"hljs-tag"}},[s._v("<"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[s._v("script")]),s._v(" "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("src")]),s._v("="),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v('"https://unpkg.com/spritejs/dist/spritejs.min.js"')]),s._v(">")]),a("span",{pre:!0,attrs:{class:"undefined"}}),a("span",{pre:!0,attrs:{class:"hljs-tag"}},[s._v("</"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[s._v("script")]),s._v(">")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"hljs-tag"}},[s._v("<"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[s._v("script")]),s._v(" "),a("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("src")]),s._v("="),a("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v('"https://unpkg.com/sprite-workflow/lib/index.js"')]),s._v(">")]),a("span",{pre:!0,attrs:{class:"undefined"}}),a("span",{pre:!0,attrs:{class:"hljs-tag"}},[s._v("</"),a("span",{pre:!0,attrs:{class:"hljs-name"}},[s._v("script")]),s._v(">")]),s._v("\n")])])}],!1,null,null,null);t.default=e.exports}}]);