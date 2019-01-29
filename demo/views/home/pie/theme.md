## 主题切换

:::demo

```javascript
const data = [
  { value: 3350, label: '直接访问' },
  { value: 3100, label: '邮件营销' },
  { value: 2340, label: '联盟广告' },
  { value: 1350, label: '视频广告' },
  { value: 1548, label: '搜索引擎' }
]

const { Plot, Chart, Tooltip } = qchart

const plot = new Plot('.block-demo .demo', {
  viewport: [400, 360],
  displayRatio: 'auto'
})

const chart = new Chart()

chart.setTitle('主题切换')

const pie = chart
  .pie({
    radius: 0.6,
    innerRadius: 0.2
  })
  .source(data)
  .setDataFields({ x: 'label', y: 'value' })

const step = () => {
  setTimeout(() => {
    chart.setTheme('dark')
    setTimeout(() => {
      chart.setTheme('light')
      requestAnimationFrame(step)
    }, 3000)
  }, 3000)
}

requestAnimationFrame(step)

plot.addChart(chart)
plot.render()
```

:::
