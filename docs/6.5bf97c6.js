(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{181:function(t,v,_){"use strict";_.r(v);var d={components:{}},e=_(26),r=Object(e.a)(d,function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this,v=t.$createElement,_=t._self._c||v;return _("section",[_("h2",[t._v("Workflow")]),t._v(" "),_("h4",[t._v("参数属性：")]),t._v(" "),_("table",[_("thead",[_("tr",[_("th",[t._v("参数")]),t._v(" "),_("th",[t._v("说明")]),t._v(" "),_("th",[t._v("类型")]),t._v(" "),_("th",[t._v("可选值")]),t._v(" "),_("th",[t._v("默认值")])])]),t._v(" "),_("tbody",[_("tr",[_("td",[t._v("selector")]),t._v(" "),_("td",[t._v("选择器，要绘制的dom")]),t._v(" "),_("td"),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td")]),t._v(" "),_("tr",[_("td",[t._v("zoom")]),t._v(" "),_("td",[t._v("舞台是否可以缩放挪动")]),t._v(" "),_("td",[t._v("Array")]),t._v(" "),_("td",[t._v("[0.5,2] , false")]),t._v(" "),_("td",[t._v("[0.5, 2]")])]),t._v(" "),_("tr",[_("td",[t._v("size")]),t._v(" "),_("td",[t._v("绘图区域大小")]),t._v(" "),_("td",[t._v("Array")]),t._v(" "),_("td",[t._v("-")]),t._v(" "),_("td",[t._v("[ 600, 400 ]")])])])]),t._v(" "),_("h4",[t._v("方法：")]),t._v(" "),_("table",[_("thead",[_("tr",[_("th",[t._v("方法名")]),t._v(" "),_("th",[t._v("说明")]),t._v(" "),_("th",[t._v("类型")]),t._v(" "),_("th",[t._v("可选值")]),t._v(" "),_("th",[t._v("默认值")])])]),t._v(" "),_("tbody",[_("tr",[_("td",[t._v("append")]),t._v(" "),_("td",[t._v("添加Step或Link")]),t._v(" "),_("td"),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td")]),t._v(" "),_("tr",[_("td",[t._v("clear")]),t._v(" "),_("td",[t._v("清除workflow里面的所有step与link")]),t._v(" "),_("td"),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td")]),t._v(" "),_("tr",[_("td",[t._v("get children")]),t._v(" "),_("td",[t._v("获取workflow中的Step和LInk")]),t._v(" "),_("td",[t._v("Object")]),t._v(" "),_("td",[t._v("{Step,Link}")]),t._v(" "),_("td")])])]),t._v(" "),_("h2",[t._v("Step")]),t._v(" "),_("h4",[t._v("参数属性：")]),t._v(" "),_("table",[_("thead",[_("tr",[_("th",[t._v("参数")]),t._v(" "),_("th",[t._v("说明")]),t._v(" "),_("th",[t._v("类型")]),t._v(" "),_("th",[t._v("可选值")]),t._v(" "),_("th",[t._v("默认值")])])]),t._v(" "),_("tbody",[_("tr",[_("td",[t._v("id*")]),t._v(" "),_("td",[t._v("步骤id")]),t._v(" "),_("td"),t._v(" "),_("td",[t._v("必填")]),t._v(" "),_("td")]),t._v(" "),_("tr",[_("td",[t._v("fillColor")]),t._v(" "),_("td",[t._v("图形填充颜色")]),t._v(" "),_("td"),t._v(" "),_("td"),t._v(" "),_("td")]),t._v(" "),_("tr",[_("td",[t._v("pos")]),t._v(" "),_("td",[t._v("图形的位置")]),t._v(" "),_("td"),t._v(" "),_("td"),t._v(" "),_("td")]),t._v(" "),_("tr",[_("td",[t._v("text")]),t._v(" "),_("td",[t._v("步骤显示文本")]),t._v(" "),_("td"),t._v(" "),_("td"),t._v(" "),_("td")]),t._v(" "),_("tr",[_("td",[t._v("linkReject")]),t._v(" "),_("td",[t._v("连接斥力，当两个step该值都为数字时，产生斥力")]),t._v(" "),_("td"),t._v(" "),_("td",[t._v("1")]),t._v(" "),_("td")]),t._v(" "),_("tr",[_("td",[t._v("textAttrs")]),t._v(" "),_("td",[t._v("步骤显示文本样式")]),t._v(" "),_("td"),t._v(" "),_("td",[t._v("{ padding: [ 0, 0, 20 ], color: '#f00' }")]),t._v(" "),_("td")]),t._v(" "),_("tr",[_("td",[t._v("shapeAttrs")]),t._v(" "),_("td",[t._v("步骤图形样式属性(不同类型，设置值不同，参考extend-shapes属性)")]),t._v(" "),_("td"),t._v(" "),_("td",[t._v("{ radiusX: 60, radiusY: 30 } drawType为ellipse时，设置椭圆大小")]),t._v(" "),_("td")]),t._v(" "),_("tr",[_("td",[t._v("drawType")]),t._v(" "),_("td",[t._v("绘制类型")]),t._v(" "),_("td",[t._v("String")]),t._v(" "),_("td",[t._v("['rect','circle','triangle','star','diamond','ellipse','polygon']")]),t._v(" "),_("td",[t._v("rect")])]),t._v(" "),_("tr",[_("td",[t._v("option.draw")]),t._v(" "),_("td",[t._v("绘制方法")]),t._v(" "),_("td",[t._v("Function")]),t._v(" "),_("td"),t._v(" "),_("td")])])]),t._v(" "),_("h4",[t._v("方法：")]),t._v(" "),_("table",[_("thead",[_("tr",[_("th",[t._v("方法名")]),t._v(" "),_("th",[t._v("说明")]),t._v(" "),_("th",[t._v("类型")]),t._v(" "),_("th",[t._v("可选值")]),t._v(" "),_("th",[t._v("默认值")])])]),t._v(" "),_("tbody",[_("tr",[_("td",[t._v("append")]),t._v(" "),_("td",[t._v("添加")]),t._v(" "),_("td"),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td")]),t._v(" "),_("tr",[_("td",[t._v("remove")]),t._v(" "),_("td",[t._v("从workflow中删除自己，包含与自己相关的link")]),t._v(" "),_("td"),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td")]),t._v(" "),_("tr",[_("td",[t._v("attr")]),t._v(" "),_("td",[t._v("设置属性")]),t._v(" "),_("td"),t._v(" "),_("td"),t._v(" "),_("td")])])]),t._v(" "),_("h2",[t._v("Link")]),t._v(" "),_("h4",[t._v("参数属性：")]),t._v(" "),_("table",[_("thead",[_("tr",[_("th",[t._v("参数")]),t._v(" "),_("th",[t._v("说明")]),t._v(" "),_("th",[t._v("类型")]),t._v(" "),_("th",[t._v("可选值")]),t._v(" "),_("th",[t._v("默认值")])])]),t._v(" "),_("tbody",[_("tr",[_("td",[t._v("startStepId *")]),t._v(" "),_("td",[t._v("开始步骤id")]),t._v(" "),_("td"),t._v(" "),_("td",[t._v("必填")]),t._v(" "),_("td")]),t._v(" "),_("tr",[_("td",[t._v("endStepId *")]),t._v(" "),_("td",[t._v("结束步骤id")]),t._v(" "),_("td"),t._v(" "),_("td",[t._v("必填")]),t._v(" "),_("td")]),t._v(" "),_("tr",[_("td",[t._v("text")]),t._v(" "),_("td",[t._v("link显示文本")]),t._v(" "),_("td"),t._v(" "),_("td"),t._v(" "),_("td")]),t._v(" "),_("tr",[_("td",[t._v("textAttrs")]),t._v(" "),_("td",[t._v("link显示文本样式")]),t._v(" "),_("td"),t._v(" "),_("td",[t._v("{ padding: [ 0, 0, 20 ], color: '#f00', autoRotate: 'auto' }")]),t._v(" "),_("td",[_("code",{pre:!0},[t._v("autoRotate")]),t._v("表示是否跟随link角度旋转")])]),t._v(" "),_("tr",[_("td",[t._v("lineAttrs")]),t._v(" "),_("td",[t._v("link显示连接线line样式")]),t._v(" "),_("td"),t._v(" "),_("td",[t._v("{ color: '#f0f', lineDash: [ 6, 6 ]}")]),t._v(" "),_("td")]),t._v(" "),_("tr",[_("td",[t._v("drawType")]),t._v(" "),_("td",[t._v("绘制类型")]),t._v(" "),_("td",[t._v("String")]),t._v(" "),_("td",[t._v("['line','polyline'] 直线，折线")]),t._v(" "),_("td",[t._v("'line'")])]),t._v(" "),_("tr",[_("td",[t._v("option.draw")]),t._v(" "),_("td",[t._v("绘制方法")]),t._v(" "),_("td",[t._v("Function")]),t._v(" "),_("td"),t._v(" "),_("td")]),t._v(" "),_("tr",[_("td",[t._v("option.update")]),t._v(" "),_("td",[t._v("更新方法")]),t._v(" "),_("td",[t._v("Function(newAttrs,oldAttrs)")]),t._v(" "),_("td"),t._v(" "),_("td")])])]),t._v(" "),_("h4",[t._v("方法：")]),t._v(" "),_("table",[_("thead",[_("tr",[_("th",[t._v("方法名")]),t._v(" "),_("th",[t._v("说明")]),t._v(" "),_("th",[t._v("类型")]),t._v(" "),_("th",[t._v("可选值")]),t._v(" "),_("th",[t._v("默认值")])])]),t._v(" "),_("tbody",[_("tr",[_("td",[t._v("append")]),t._v(" "),_("td",[t._v("添加")]),t._v(" "),_("td"),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td")]),t._v(" "),_("tr",[_("td",[t._v("remove")]),t._v(" "),_("td",[t._v("从workflow中删除自己")]),t._v(" "),_("td"),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td")]),t._v(" "),_("tr",[_("td",[t._v("getLinkedSteps(['end' , 'start'])")]),t._v(" "),_("td",[t._v("获取相关步骤")]),t._v(" "),_("td"),t._v(" "),_("td"),t._v(" "),_("td")]),t._v(" "),_("tr",[_("td",[t._v("attr")]),t._v(" "),_("td"),t._v(" "),_("td"),t._v(" "),_("td",[t._v("设置属性")]),t._v(" "),_("td")])])]),t._v(" "),_("h2",[t._v("functions")]),t._v(" "),_("p",[t._v("sprite-workflow提供一些方法，方便来处理自定义图形与线的问题")]),t._v(" "),_("h4",[t._v("方法：")]),t._v(" "),_("table",[_("thead",[_("tr",[_("th",[t._v("方法名")]),t._v(" "),_("th",[t._v("说明")]),t._v(" "),_("th",[t._v("类型")]),t._v(" "),_("th",[t._v("可选值")]),t._v(" "),_("th",[t._v("默认值")])])]),t._v(" "),_("tbody",[_("tr",[_("td",[t._v("getAngleByPoints(point1, point2)")]),t._v(" "),_("td",[t._v("获取两点间夹角")]),t._v(" "),_("td"),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td")]),t._v(" "),_("tr",[_("td",[t._v("getPointByDistance(point1, point2, distance)")]),t._v(" "),_("td",[t._v("获取直线上到point1距离为d的点坐标")]),t._v(" "),_("td"),t._v(" "),_("td"),t._v(" "),_("td")]),t._v(" "),_("tr",[_("td",[t._v("getPolygonIntersectionPoint(points, startPoint, endPoint, multi = false)")]),t._v(" "),_("td",[t._v("多边形与边与线段的交点坐标，multi表示是否返回多点")]),t._v(" "),_("td"),t._v(" "),_("td"),t._v(" "),_("td")]),t._v(" "),_("tr",[_("td",[t._v("getRelativeStep(link, type)")]),t._v(" "),_("td",[t._v("根据传入的link找到相关的step,type为 [start，end ，空]")]),t._v(" "),_("td"),t._v(" "),_("td"),t._v(" "),_("td")]),t._v(" "),_("tr",[_("td",[t._v("refreshLink([steps,links])")]),t._v(" "),_("td",[t._v("根据传入的 step,link，更新link")]),t._v(" "),_("td"),t._v(" "),_("td"),t._v(" "),_("td")])])])])}],!1,null,null,null);v.default=r.exports}}]);