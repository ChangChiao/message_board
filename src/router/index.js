import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '../views/Login.vue';
import PostWall from '../views/PostWall.vue';
import PostDefault from '../views/PostDefault.vue';
import FollowList from '../views/FollowList.vue';
import UserInfo from '../views/UserInfo.vue';
import PoseLikeList from '../views/PoseLikeList.vue';
import PostAdd from '../views/PostAdd.vue';
import ChatRoomList from '../views/ChatRoomList';
import ChatRoom from '../views/ChatRoomView';
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/chat-room',
    name: 'ChatRoom',
    component: ChatRoom
  },
  {
    path: '/',
    name: 'postDefault',
    component: PostDefault,
    children: [
      {
        path: '/',
        name: 'postWall',
        component: PostWall
      },
      {
        path: '/post/:id',
        name: 'post',
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
      },
      {
        path: '/chatroomlist',
        name: 'ChatRoomList',
        component: ChatRoomList
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    !localStorage.getItem('token') && next('login');
  }

  next();
});

export default router;
