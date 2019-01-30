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
    path: 'start',
    component: () => import('./pages/start.md')
  },
  {
    title: '自定义Step',
    path: 'step',
    component: () => import('./pages/step.md')
  },
  {
    title: '自定义Link',
    path: 'link',
    component: () => import('./pages/link.md')
  },
  {
    title: 'Step与Link联动',
    path: 'step_link',
    component: () => import('./pages/step_link.md')
  },
  {
    title: 'Step与Link事件',
    path: 'event',
    component: () => import('./pages/event.md')
  },
  {
    title: '相关接口',
    path: 'props',
    component: () => import('./pages/props.md')
  }
]
