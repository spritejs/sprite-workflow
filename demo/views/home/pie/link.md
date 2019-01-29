## 图表联动

:::demo

```javascript
const data = [
  { value: 3350, label: '直接访问' },
  { value: 3100, label: '邮件营销' },
  { value: 2340, label: '联盟广告' },
  { value: 1350, label: '视频广告' },
  { value: 1548, label: '搜索引擎' }
]

const data2 = [
  { value: 2350, label: '直接访问' },
  { value: 1100, label: '邮件营销' },
  { value: 340, label: '联盟广告' },
  { value: 1350, label: '视频广告' },
  { value: 548, label: '搜索引擎' }
]

const { Plot, Chart, Tooltip } = qchart

const plot = new Plot('.block-demo .demo', {
  viewport: [400, 360],
  displayRatio: 'auto'
})

const chart1 = new Chart()
chart1
  .pie({
    radius: 0.7
  })
  .source(data)
  .setDataFields({ x: 'label', y: 'value' })
  .useStyle('normal', (d, i) => {
    return { color: '#fff', lineWidth: 2 }
  })
chart1.addPlugin(
  new Tooltip({ lineHight: 22 }).formatter(
    data => `访问来源：\n${data.label}: ${data.value}%`
  )
)

const chart2 = new Chart()
chart2
  .pie({
    radius: 0.7,
    innerRadius: 0.2
  })
  .source(data2)
  .setDataFields({ x: 'label', y: 'value' })
  .useStyle('normal', (d, i) => {
    return { color: '#fff', lineWidth: 2 }
  })
chart2.addPlugin(
  new Tooltip({ lineHight: 14 }).formatter(
    data => `访问来源：\n${data.label}: ${data.value}%`
  )
)

chart1.on('tooltip:show', e => {
  chart2.emit('tooltip:show', {
    offsetX: e.offsetX + 200,
    offsetY: e.offsetY + 180,
    data: data2[e.index]
  })
})

plot.subPlot(0, 0, 200, 360).addChart(chart1)
plot.subPlot(200, 0, 200, 360).addChart(chart2)

plot.render()
```

:::
