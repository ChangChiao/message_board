import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '../views/Login.vue';
import PostWall from '../views/PostWall.vue';
import PostDefault from '../views/PostDefault.vue';
import FollowList from '../views/FollowList.vue';
import UserInfo from '../views/UserInfo.vue';
import PoseLikeList from '../views/PoseLikeList.vue';
import PostAdd from '../views/PostAdd.vue';
const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/post',
    name: 'postDefault',
    component: PostDefault,
    children: [
      {
        path: '/postwall',
        name: 'postWall',
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
      },
      {
        path: '/postadd',
        name: 'PostAdd',
        component: PostAdd
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
