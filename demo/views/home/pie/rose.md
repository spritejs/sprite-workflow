## 玫瑰图

:::demo

```javascript
const data = [
  {
    year: '2001',
    population: 41.8
  },
  {
    year: '2002',
    population: 38
  },
  {
    year: '2003',
    population: 33.7
  },
  {
    year: '2004',
    population: 30.7
  },
  {
    year: '2005',
    population: 25.8
  },
  {
    year: '2006',
    population: 31.7
  },
  {
    year: '2007',
    population: 33
  },
  {
    year: '2008',
    population: 46
  },
  {
    year: '2009',
    population: 38.3
  },
  {
    year: '2010',
    population: 28
  },
  {
    year: '2011',
    population: 42.5
  },
  {
    year: '2012',
    population: 30.3
  }
]
const { Plot, Chart, Tooltip } = qchart

const plot = new Plot('.block-demo .demo', {
  viewport: [400, 360],
  displayRatio: 'auto'
})

const chart = new Chart()

chart.setTitle('玫瑰图')

chart
  .pie({
    rose: true
  })
  .source(data)
  .setDataFields({ x: 'year', y: 'population' })

chart.addPlugin(
  new Tooltip({ lineHight: 22 }).formatter(
    data => `居民负债比：${data.year}: ${data.population}%`
  )
)

plot.addChart(chart)
plot.render()
```

:::
