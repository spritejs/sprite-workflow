## 基本饼图

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

chart.setTitle('饼图', { color: 'red' })

setTimeout(() => {
  chart.setTitle('饼图', { color: 'green' })
}, 3000)

const emojis = ['😂', '😎', '🙃', '😯', '😝', '🤢', '🤪', '😫']

const pie = chart
  .pie({
    radius: 0.6,
    innerRadius: 0.2
  })
  .source(data)
  .setDataFields({ x: 'label', y: 'value' })
  .guide('text', (attrs, d, i) => {
    return { text: emojis[i] || emojis[0] }
  })
  .guide('line', (attrs, d, i) => {
    return { text: emojis[i] || emojis[0] }
  })
  .text({ color: '#fff' })
  .useStyle('normal', (attrs, d, i) => {
    return { color: '#fff', lineWidth: 2 }
  })
  .useStyle('hover', (attrs, data, i) => {
    if (i == 2) {
      return {
        outerRadius: attrs['outerRadius'] + 20,
        fillColor: 'red'
      }
    }

    return { opacity: 0.5, fillColor: 'red' }
  })

chart.addPlugin(
  new Tooltip({ lineHight: 22 }).formatter(
    data => `访问来源：\n${data.label}: ${data.value}%`
  )
)

setTimeout(() => {
  pie.data.push({ value: 1548, label: '百度一下' })

  setTimeout(() => {
    pie.data.splice(3, 2)
    setTimeout(() => {
      pie.data.push({ value: 1548, label: '辣鸡百度' })
    }, 3000)
  }, 3000)
}, 3000)

plot.addChart(chart)
plot.render()
```

:::

### 单色调

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

const plot = new Plot('.block-demo:nth-of-type(2) .demo', {
  viewport: [400, 360],
  displayRatio: 'auto'
})

const chart = new Chart()

chart.setTitle('单色调', { color: 'red' })

const pie = chart
  .pie({
    radius: 0.6,
    innerRadius: 0.2
  })
  .source(data)
  .setDataFields({ x: 'label', y: 'value' })
  .useStyle('normal', {
    color: '#fff',
    fillColor: '#00a1ff',
    lineWidth: 2
  })

plot.addChart(chart)
plot.render()
```

:::
