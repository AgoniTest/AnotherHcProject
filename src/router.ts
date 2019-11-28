import Vue from 'vue'
import Router from 'vue-router'
import Layout from './views/Layout/Index.vue';
Vue.use(Router)
// 添加这下面一段代码，就可以解决报错 
// const originalPush = Router.prototype.push;
// Router.prototype.push = function push(location:any) {
//   return originalPush.call(this, location).catch((err as any) => err)
// };
/**
* hidden: true                   如果hidden为true则在左侧菜单栏展示，否则不显示
* name:'router-name'             路由名称，必须填写
* meta : {
    title: 'title'               对应路由在左侧菜单栏的标题名称
    icon: 'icon-class'           对应路由在左侧菜单栏的图标样式，样式使用fontawesome图标库
  }
**/
export const asyncRouterMap = [
  {
    path: '/',
    name: 'dashboard',
    component: Layout,
    hidden: true,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        meta: { title: 'commen.Home Page', icon: 'fa fa-home' ,requireAuth: true },
        component: () => import('@/views/Home.vue')
      }
    ]
  },
  {
    path: '/dataManage',
    name: 'dataManage',
    hidden: true,
    meta: { title: 'commen.Data Manage', icon: 'fa fa-database' ,requireAuth: true },
    component: Layout,
    redirect: '/tableData',
    children: [
      {
        path: '/tableData',
        name: 'tableData',
        meta: { title: 'commen.Table Manage', icon: 'fa fa-table' ,requireAuth: true },
        component: () => import('@/views/DataManage/TableData.vue')
      },
      {
        path: '/chartsData',
        name: 'chartsData',
        meta: { title: 'commen.Chart Manage', icon: 'fa fa-bar-chart' ,requireAuth: true },
        component: () => import('@/views/DataManage/ChartsData.vue')
      },
      {
        path: '/formData',
        name: 'formData',
        meta: {
          title: 'commen.FormData Manage',
          icon: 'fa fa-file-text-o',
          requireAuth: true 
        },
        component: () => import('@/views/DataManage/FormData.vue')
      }
    ]
  },
  {
    path:'/chartsManage',
    name:'chartsManage',
    component:Layout,
    hidden:true,
    meta:{title:'commen.Echarts Data',icon:'fa fa-cny',requireAuth: true},
    redirect:'/turnOverCharts',
    children:
    [
     {
       path:'/turnOverCharts',
       name:'turnOverCharts',
       meta:{title:'commen.Turnover',icon:'fa fa-line-chart',requireAuth: true},
       component:()=>import('@/views/ChartsManage/TurnOverCharts.vue')
     },
     {
        path:'/collectionCharts',
        name:'collectionCharts',
        meta:{title:'commen.Income',icon:'fa fa-pie-chart',requireAuth: true},
        component:()=>import('@/views/ChartsManage/CollectionCharts.vue')
      },
      {
        path:'/parmentCharts',
        name:'parmentCharts',
        meta:{title:'commen.Payoff',icon:'fa fa-area-chart',requireAuth: true},
        component:()=>import('@/views/ChartsManage/PaymentCharts.vue')
      }
      
    ]
},
   {
     path:"/portalManage",
     name:"portalManage",
     component:Layout,
     hidden:true,
     meta:{title:"commen.PortalManage",icon:'fa fa-cubes',requireAuth:true},
     children:[
       {
         path:"/groupPortal",
         name:"groupPortal",
         meta:{title:'commen.GroupPortal',icon:'fa fa-cube',requireAuth:true},
         component:()=>import('@/views/PortalManage/GroupPortal.vue')
       },
       {
         path:'/businessPortal',
         name:'businessPortal',
         meta:{title:"commen.BusinessPortal",icon:'fa fa-cube',requireAuth:true},
         component:()=>import('@/views/PortalManage/BusinessPortal.vue')
       },
       {
         path:"/projectPortal",
         name:'projectPortal',
         meta:{title:'commen.ProjectPortal',icon:'fa fa-cube',requireAuth:true},
         component:()=>import('@/views/PortalManage/ProjectPortal.vue')
       }
     ]
   },
  {
    path: '/userManage',
    name: 'userManage',
    component: Layout,
    hidden: true,
    redirect: '/accountData',
    children: [
      {
        path: '/accountData',
        name: 'accountData',
        meta: { title: 'commen.Accout Manage', icon: 'fa fa-user-plus',requireAuth: true  },
        component: () => import('@/views/UserManage/AccountData.vue')
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/userInfo',
    hidden: false,
    children: [
      {
        path: '/userInfo',
        name: 'userInfo',
        meta: { title: 'commen.Personal Center' ,requireAuth: true },
        component: () => import('@/views/UserManage/UserInfo.vue')
      },
      {
        path:'/userbase',
        name:'base',
        hidden:false,
        meta:{title:'commen.Change Password',requireAuth: true },
        component: () => import('@/views/UserManage/UserBase.vue')
      }
    ]
  },
  {
    path: '/Schedule',
    component: Layout,
    redirect: '/inoffice',
    children: [
      {
        path: '/inoffice',
        name: 'inoffice',
        component: () => import('@/views/Schedule/InOffice.vue')
      },
      {
        path: '/overoffice',
        name: 'overoffice',
        component: () => import('@/views/Schedule/OverOffice.vue')
      },
      {
        path:'/approvalpending',
        name:'approvalpending',
        component:()=> import('@/views/Schedule/ApprovalPending.vue')
      },{
         path:'/approveddrawing',
         name:'approveddrawing',
         component:()=> import('@/views/Schedule/ApprovedDrawing.vue')
      },
      {
           path:'/cheakreading',
           name:'cheakreading',
           component:()=> import('@/views/Schedule/CheakReading.vue')
      },{
        path:'/cheakedreading',
        name:'cheakedreading',
        component:()=>import('@/views/Schedule/CheakedReading.vue')
      },{
        path:'/myinoffice',
        name:'myinoffice',
        component:()=>import('@/views/Schedule/MyInOffice.vue')
      }
      
    ]
  }, 
  {
    path:'/System',
    component:Layout,
    redirect:'/System',
    children:[
      {
        path:'/system',
        name:'system',
        component:()=> import('@/views/System/System.vue')
      }
    ]
  },

  {
    path: '/404',
    name: '404',
    hidden: false,
    meta: { title: '404' },
    component: () => import('@/views/404.vue')
  },
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/login',
    name: 'login',
    hidden: false,
    meta: { title: '系统登录' },
    component: () => import('@/views/Login/Login.vue')
  },
  {
    path: '/password',
    name: 'password',
    hidden: false,
    meta: { title: '找回密码' },
    component: () => import('@/views/Login/Password.vue')
  }
];

const router: any = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: asyncRouterMap
});
router.beforeEach((to:any,form:any,next:any)=>{
  // before(state);
   //before();
     if (to.matched.some((res:any)=>res.meta.requireAuth)) {
       //before(state)
       //   Loading.service({
       //   lock:true,
       //   text:'拼命加载中',
       //   background:'rgba(0,0,0,0.5)'
       // })
         const Token = sessionStorage.Token?true:false
        
         if (to.path=='/login') {
             //before(state);
             //after()
             next();
             //after(state);
         }
         else{
             Token?next():next({path:'/login',query:{redirect:to.fullPath}})
             // next({
             //     path:'/login',
             //     query:{redirect:to.fullPath}
             // })
         }
     }else{
         next();
         
     }
 })
export default router;
