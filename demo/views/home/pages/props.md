## Workflow

#### 参数属性：
| 参数     | 说明                 | 类型  | 可选值          | 默认值       |
| -------- | -------------------- | ----- | --------------- | ------------ |
| selector | 选择器，要绘制的dom  |       | —              |              |
| zoom     | 舞台是否可以缩放挪动 | Array | [0.5,2] , false | [0.5, 2]     |
| size     | 绘图区域大小         | Array | -               | [ 600, 400 ] |


#### 方法：
| 方法名       | 说明                             | 类型   | 可选值      | 默认值 |
| ------------ | -------------------------------- | ------ | ----------- | ------ |
| append       | 添加Step或Link                   |        | —          |        |
| clear        | 清除workflow里面的所有step与link |        | —          |        |
| get children | 获取workflow中的Step和LInk       | Object | {Step,Link} |        |

## Step

#### 参数属性：
| 参数        | 说明                                                          | 类型     | 可选值                                                            | 默认值 |
| ----------- | ------------------------------------------------------------- | -------- | ----------------------------------------------------------------- | ------ |
| id*         | 步骤id                                                        |          | 必填                                                              |        |
| fillColor   | 图形填充颜色                                                  |          |                                                                   |        |
| pos         | 图形的位置                                                    |          |                                                                   |        |
| text        | 步骤显示文本                                                  |          |                                                                   |        |
| linkReject  | 连接斥力，当两个step该值都为数字时，产生斥力                  |          | 1                                                                 |        |
| textAttrs   | 步骤显示文本样式                                              |          | { padding: [ 0, 0, 20 ], color: '#f00' }                          |        |
| shapeAttrs  | 步骤图形样式属性(不同类型，设置值不同，参考extend-shapes属性) |          | { radiusX: 60, radiusY: 30 } drawType为ellipse时，设置椭圆大小    |        |
| drawType    | 绘制类型                                                      | String   | ['rect','circle','triangle','star','diamond','ellipse','polygon'] | rect   |
| option.draw | 绘制方法                                                      | Function |                                                                   |        |


#### 方法：
| 方法名 | 说明                                       | 类型 | 可选值 | 默认值 |
| ------ | ------------------------------------------ | ---- | ------ | ------ |
| append | 添加                                       |      | —     |        |
| remove | 从workflow中删除自己，包含与自己相关的link |      | —     |        |
| attr   | 设置属性                                   |      |        |        |


## Link

#### 参数属性：
| 参数          | 说明                   | 类型                        | 可选值                                                       | 默认值                               |
| ------------- | ---------------------- | --------------------------- | ------------------------------------------------------------ | ------------------------------------ |
| startStepId * | 开始步骤id             |                             | 必填                                                         |                                      |
| endStepId *   | 结束步骤id             |                             | 必填                                                         |                                      |
| text          | link显示文本           |                             |                                                              |                                      |
| textAttrs     | link显示文本样式       |                             | { padding: [ 0, 0, 20 ], color: '#f00', autoRotate: 'auto' } | `autoRotate`表示是否跟随link角度旋转 |
| lineAttrs     | link显示连接线line样式 |                             | { color: '#f0f', lineDash: [ 6, 6 ]}                         |                                      |
| drawType      | 绘制类型               | String                      | ['line','polyline'] 直线，折线                               | 'line'                               |
| option.draw   | 绘制方法               | Function                    |                                                              |                                      |
| option.update | 更新方法               | Function(newAttrs,oldAttrs) |                                                              |                                      |



#### 方法：
| 方法名                            | 说明                 | 类型 | 可选值   | 默认值 |
| --------------------------------- | -------------------- | ---- | -------- | ------ |
| append                            | 添加                 |      | —       |        |
| remove                            | 从workflow中删除自己 |      | —       |        |
| getLinkedSteps(['end' , 'start']) | 获取相关步骤         |      |          |        |
| attr                              |                      |      | 设置属性 |        |  |  |


## functions
sprite-workflow提供一些方法，方便来处理自定义图形与线的问题

#### 方法：
| 方法名                                                                   | 说明                                                  | 类型 | 可选值 | 默认值 |
| ------------------------------------------------------------------------ | ----------------------------------------------------- | ---- | ------ | ------ |
| getAngleByPoints(point1, point2)                                         | 获取两点间夹角                                        |      | —     |        |
| getPointByDistance(point1, point2, distance)                             | 获取直线上到point1距离为d的点坐标                     |      |        |        |
| getPolygonIntersectionPoint(points, startPoint, endPoint, multi = false) | 多边形与边与线段的交点坐标，multi表示是否返回多点     |
| getRelativeStep(link, type)                                              | 根据传入的link找到相关的step,type为 [start，end ，空] |
| refreshLink([steps,links])                                               | 根据传入的 step,link，更新link                        |