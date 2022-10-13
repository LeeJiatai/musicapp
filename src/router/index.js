import { createRouter, createWebHashHistory } from 'vue-router'

const Recommend = () => import('@/views/recommend')
const Singer = () => import('@/views/singer')
const Toplist = () => import('@/views/top-list')
const Search = () => import('@/views/search')
const singerDetail = () => import('@/views/singer-detail')

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },

  {
    path: '/recommend',
    component: Recommend
  },

  {
    path: '/singer',
    component: Singer,
    children: [
      {
        path: ':id',
        component: singerDetail
      }
    ]
  },

  {
    path: '/top-list',
    component: Toplist
  },

  {
    path: '/search',
    component: Search
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
