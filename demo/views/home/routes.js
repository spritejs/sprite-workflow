export default [
  {
    title: '简介',
    path: '',
    component: () => import('./index.md')
  },
  {
    title: '安装',
    path: 'install',
    component: () => import('./pages/install.md')
  },
  {
    title: '开始',
    path: 'pie',
    component: () => import('./pages/start.md')
  },
  {
    title: '自定义Step',
    path: 'step',
    component: () => import('./pages/step.md')
  }
]
