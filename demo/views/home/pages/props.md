## Workflow

#### 参数属性：
| 参数     | 说明                 | 类型  | 可选值          | 默认值       |
| -------- | -------------------- | ----- | --------------- | ------------ |
| selector | 选择器，要绘制的dom  |       | —              |              |
| zoom     | 舞台是否可以缩放挪动 | Array | [0.5,2] , false | [0.5, 2]     |
| size     | 绘图区域大小         | Array | -               | [ 600, 400 ] |


#### 方法：
| 方法名       | 说明                       | 类型   | 可选值      | 默认值 |
| ------------ | -------------------------- | ------ | ----------- | ------ |
| append       | 添加Step或Link             |        | —          |        |
| get children | 获取workflow中的Step和LInk | Object | {Step,Link} |        |

## Step

#### 参数属性：
| 参数        | 说明     | 类型     | 可选值                                        | 默认值 |
| ----------- | -------- | -------- | --------------------------------------------- | ------ |
| id*         | 步骤id   |          | 必填                                          |        |
| drawType    | 绘制类型 | String   | ['rect','circle','triangle','star','diamond'] | rect   |
| option.draw | 绘制方法 | Function |                                               |        |


#### 方法：
| 方法名 | 说明           | 类型 | 可选值 | 默认值 |
| ------ | -------------- | ---- | ------ | ------ |
| append | 添加Step或Link |      | —     |        |
| attr   | 设置属性       |      |        |        |


## Link

#### 参数属性：
| 参数          | 说明       | 类型                        | 可选值                         | 默认值 |
| ------------- | ---------- | --------------------------- | ------------------------------ | ------ |
| startStepId * | 开始步骤id |                             | 必填                           |        |
| endStepId *   | 结束步骤id |                             | 必填                           |        |
| drawType      | 绘制类型   | String                      | ['line','polyline'] 直线，折线 | 'line' |
| option.draw   | 绘制方法   | Function                    |                                |        |
| option.update | 更新方法   | Function(newAttrs,oldAttrs) |                                |        |



#### 方法：
| 方法名                            | 说明           | 类型 | 可选值   | 默认值 |
| --------------------------------- | -------------- | ---- | -------- | ------ |
| append                            | 添加Step或Link |      | —       |        |
| getLinkedSteps(['end' , 'start']) | 获取相关步骤   |      |          |        |
| attr                              |                |      | 设置属性 |        |  |  |


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