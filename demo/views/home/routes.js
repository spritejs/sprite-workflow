// import PieRoutes from './pie/routes'

export default [
  {
    title: '饼图',
    path: 'pie',
    component: () => import('./pie/index.vue'),
    // children: PieRoutes
  }
]
