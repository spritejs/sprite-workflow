export default [
  {
    title: '简介',
    path: '',
    component: () => import('./index.md')
  },
  {
    title: '介绍',
    path: 'pie',
    component: () => import('./pages/pie.md')
  },
  {
    title: '开始',
    path: 'pie1',
    component: () => import('./pages/rose.md')
  }
]
