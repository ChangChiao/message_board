import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '../views/Login.vue';
import PostWall from '../views/PostWall.vue';
import PostDefault from '../views/PostDefault.vue';
import FollowList from '../views/FollowList.vue';
import UserInfo from '../views/UserInfo.vue';
import PoseLikeList from '../views/PoseLikeList.vue';
const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/post',
    name: 'postdefault',
    component: PostDefault,
    children: [
      {
        path: '/postwall',
        name: 'postwall',
        component: PostWall
      },
      {
        path: '/follow',
        name: 'follow',
        component: FollowList
      },
      {
        path: '/userInfo',
        name: 'userInfo',
        component: UserInfo
      },
      {
        path: '/likes',
        name: 'poseLikeList',
        component: PoseLikeList
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
