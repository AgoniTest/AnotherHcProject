import {ActionTree} from 'vuex';
import jwt_decode from 'jwt-decode';
import { asyncRouterMap } from '../router';
const actions:ActionTree<any,any>={
 async setUser({state,commit},user:any){
     //const decoded:any=jwt_decode(user)
     //const decoded:any=localStorage.user
     commit('SET_USER',user);
    //  const{human_name}=decoded;
    //  let accessedRouters=filterAsyncRouter(asyncRouterMap, human_name);
    //  commit('SET_ROUTERS', accessedRouters);
 }
 };
 /**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap 所有路由表
 * @param human_name 当前角色
 */
// function hasPermission(roles: string, route: any) {
//     if (route.meta && route.meta.roles) {
//       // 如果meta.roles是否包含角色的key值,如果包含那么就是有权限,否则无权限
//       return route.meta.roles.some((role: string) => role.indexOf(roles) >= 0);
//     } else {
//       // 默认不设置有权限
//       return true;
//     }
//   }
// function filterAsyncRouter(asyncRouterMap: Array<any>, roles: string) {
//     const accessedRouters = asyncRouterMap.filter(route => {
//       // console.log(route);
//       if (hasPermission(roles, route)) {
//         if (route.children && route.children.length) {
//           route.children = filterAsyncRouter(route.children, roles);
//         }
//         return true;
//       }
//       return false;
//     });
  
//     return accessedRouters;
//   }


export default actions;