import { createRouter, createWebHashHistory } from 'vue-router'

const Recommend = () => import('@/views/recommend'/* webpackChunkName: "recommend" */)
const Singer = () => import('@/views/singer'/* webpackChunkName: "singer" */)
const Toplist = () => import('@/views/top-list'/* webpackChunkName: "top-list" */)
const Search = () => import('@/views/search'/* webpackChunkName: "search" */)
const UserCenter = () => import('@/views/user-center'/* webpackChunkName: "user-center" */)
const singerDetail = () => import('@/views/singer-detail'/* webpackChunkName: "singer-detail" */)
const Album = () => import('@/views/album'/* webpackChunkName: "album" */)
const TopDetail = () => import('@/views/top-detail'/* webpackChunkName: "top-detail" */)

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },

  {
    path: '/recommend',
    component: Recommend,
    children: [
      {
        path: ':id',
        component: Album
      }
    ]
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
    component: Toplist,
    children: [
      {
        path: ':id',
        component: TopDetail
      }
    ]
  },

  {
    path: '/search',
    component: Search,
    children: [
      {
        path: ':id',
        component: singerDetail
      }
    ]
  },
  {
    path: '/user',
    components: {
      user: UserCenter
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
