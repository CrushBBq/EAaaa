import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import households from '../components/HouseHolds.vue'
import addhouseholds from '../components/addhouseholds.vue'
import addyonghu from '../components/addyonghu.vue'

Vue.use(VueRouter)

const routes = [
  {
    // 默认出现在app.vue中
    path: '/',
    name: 'Home',
    component: Home,

    
  },
  {
    // 运行会跳转到about.vue
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    // 会让组件出现在about里
    children:[
      {
        path:'households',
        name:'HouseHolds',
        component:households
      },
      {
        path:'addhouseholds',
        name:'addHouseHolds',
        component:addhouseholds
      },
      {
        path:'addyonghu',
        name:'addyonghu',
        component:addyonghu
      },
      {
        path:'zhanghao',
        name:'zhanghao',
        component:()=>import('../components/zhanghao.vue')
      },{
        path:'shebei',
        name:'shebei',
        component:()=>import('../components/shebei')
      },{
        path:'gong',
        name:'gong',
        component:()=>import('../components/gong.vue')
      },{
        path:'suggest',
        name:'suggest',
        component:()=>import('../components/suggest.vue')
      },
      {
        path:'jihua',
        name:'jihua',
        component:()=>import('../components/jihua.vue')
      },
      {
        path:'tubiao',
        name:'tubiao',
        component:()=>import('../components/tubiao.vue')
      },
      {
        path:'qutongji',
        name:'qutongji',
        component:()=>import('../components/qutongji.vue')
      },
      {
        path:'addyonghu',
        name:'addyonghu',
        component:()=>import('../components/addyonghu.vue')
      },
      {
        path:'addyonghu/:tid/:hid',
        name:'addyonghu',
        component:()=>import('../components/addyonghu.vue')
      },
      {
        path:'aa',
        name:'aa',
        component:()=>import('../components/aaaa.vue')
      }
     
    ]
  }
]

const router = new VueRouter({
  routes
})
/* 全局前置守卫 */
// router.beforeEach((to,from,next)=>{
// 	/* console.log(this.$store.state.a); */
// 	//从sessionStorage中取isLogin变量的值
// 	var isLog=sessionStorage.getItem("LoginUser");
//   // 当前要进入的路径
// 	if(to.path=="/"){
// 		next();//允许访问 通过
// 	}else{
// 		if(isLog!=null&&isLog!=undefined){//登陆了
// 			next();
// 		}else{//没登录
// 			//去登录
// 			next({path:'/'})
// 		}
// 	}
	
// })

export default router
