## 组合

:::demo

```javascript
const data = [
  {
    type: '风象星座',
    value: 1
  },

  {
    type: '土象星座',
    value: 1
  },

  {
    type: '水象星座',
    value: 1
  },

  {
    type: '火象星座',
    value: 1
  }
]

const data2 = [
  {
    name: '水瓶',
    type: '风向星座',
    value: 1
  },
  {
    name: '双子',
    type: '风向星座',
    value: 1
  },
  {
    name: '天平',
    type: '风向星座',
    value: 1
  },

  {
    name: '摩羯',
    type: '土象星座',
    value: 1
  },
  {
    name: '金牛',
    type: '土象星座',
    value: 1
  },
  {
    name: '处女',
    type: '土象星座',
    value: 1
  },

  {
    name: '天蝎',
    type: '水象星座',
    value: 1
  },
  {
    name: '巨蟹',
    type: '水象星座',
    value: 1
  },
  {
    name: '双鱼',
    type: '水象星座',
    value: 1
  },

  {
    name: '狮子',
    type: '火象星座',
    value: 1
  },
  {
    name: '白羊',
    type: '火象星座',
    value: 1
  },
  {
    name: '射手',
    type: '火象星座',
    value: 1
  }
]

const { Plot, Chart, Tooltip } = qchart

const plot = new Plot('.block-demo .demo', {
  viewport: [400, 360],
  displayRatio: 'auto'
})

const chart = new Chart()

chart.setTitle('图表组合', { color: 'red' })

chart
  .pie({
    radius: 0.4,
    innerRadius: 0
  })
  .source(data)
  .setDataFields({ x: 'type', y: 'value' })
  .text(true)

chart
  .pie({
    radius: 0.7,
    innerRadius: 0.5
  })
  .source(data2)
  .setDataFields({ x: 'name', y: 'value' })
  .text({ color: '#fff' })

plot.addChart(chart)
plot.render()
```

:::
