## 个性化

如果需要对图表某部分进行个性化定义，只需要在该处的回调函数（方法签名为：`(attrs, data, i) => any`）处 `return false` 即可，其他自定义。

:::demo

```javascript
const data = [
  {
    sex: '男',
    proportion: 0.58
  },
  {
    sex: '女',
    proportion: 0.42
  }
]

const { Plot, Chart, Tooltip } = qchart

const plot = new Plot('.block-demo .demo', {
  viewport: [400, 360],
  displayRatio: 'auto'
})

const chart = new Chart()

chart.setTitle('个性化', { color: 'red' })

const oDemo = document.querySelector('.block-demo .demo')

const pie = chart
  .pie({
    radius: 0.6,
    innerRadius: 0.2
  })
  .source(data)
  .setDataFields({ x: 'sex', y: 'proportion' })
  .guide('text', (attrs, d, i) => {
    const { dataOrigin, pos, startAngle, endAngle } = attrs
    const isFemale = dataOrigin.sex === '女'

    const img = document.createElement('img')
    img.style.position = 'absolute'
    img.style.left = (isFemale ? pos[0] - 32 : pos[0]) + 'px'
    img.style.top = pos[1] - 32 / 2 + 'px'
    img.style.width = 32 + 'px'
    img.style.height = 32 + 'px'

    img.src = isFemale
      ? 'https://user-images.githubusercontent.com/26452939/51729951-b08eeb00-20b0-11e9-87fb-1b4360c79ec4.png'
      : 'https://user-images.githubusercontent.com/26452939/51741061-c44a4980-20d0-11e9-8666-08075f5de98a.png'

    oDemo.appendChild(img)
    return false // 返回 false ，图表便不会进行该部分的渲染
  })
  .guide('line', true)
  .text({ color: '#fff' })

chart.addPlugin(
  new Tooltip({ lineHight: 22 }).formatter(
    data => `男女员工占比：\n${data.sex} ${(data.proportion * 100).toFixed(0)}%`
  )
)

plot.addChart(chart)
plot.render()
```
