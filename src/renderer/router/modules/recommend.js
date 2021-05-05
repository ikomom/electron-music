const recommendRoutes = [
  {
    path: "/home",
    component: () =>
      import(/* webpackChunkName: "home" */ "@/views/Home/index.vue"),
    name: "home",
    meta: {
      title: "发现音乐",
      icon: "music",
      iconStyle: {
        fontSize: '18px'
      }
    },
  },
  {
    path: "/private_fm",
    component: () =>
      import(/* webpackChunkName: "private_fm" */ "@/views/Fm/index.vue"),
    name: "private_fm",
    meta: {
      title: "私人FM",
      icon: "balance",
      auth: true,
    },
  },
  {
    path: "/mv",
    component: () =>
      import(/* webpackChunkName: "mv" */ "@/views/Video/mv.vue"),
    name: "mv",
    meta: {
      title: "视频",
      icon: "tower",
      iconStyle: {
        fontSize: '18px'
      }
    },
  },
  // {
  //     path: "/events",
  //     component: () =>
  //         import(
  //             /* webpackChunkName: "events" */ "@/views/User/Events/index.vue"
  //         ),
  //     name: "events",
  //     meta: {
  //         title: "动态",
  //         icon: "friend",
  //         auth: true,
  //     },
  // },
];

const recommendMap = recommendRoutes.map((route) => ({
  path: route.path,
  name: route.name,
  meta: route.meta,
}));

export {recommendRoutes, recommendMap};
