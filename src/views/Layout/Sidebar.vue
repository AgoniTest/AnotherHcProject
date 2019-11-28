<template>
 <el-scrollbar class="el-scrollbar" style="height:100%">
    <el-menu class="el-menu-slide" :default-active="$router.currentRoute.path"  :collapse-transition="true" @mouseenter.native="collapseOpen" @mouseleave.native="collapseClose" :collapse="isCollapse" router >
      <template v-for="item in getRouters" v-if="item.hidden&&item.children&&item.children.length>0">
        <el-menu-item v-if="item.children.length==1" :index="item.children[0].path" :key="item.name" >
          <i v-if="item.children[0].meta.icon" :class="item.children[0].meta.icon"></i>
          <span slot="title">{{$t(item.children[0].meta.title)}}</span>
        </el-menu-item>
        <!-- 多个子元素 -->
        <el-submenu v-else :index="item.children[0].path" :key="item.name">
          <template slot="title">
            <i v-if="item.meta.icon" :class="item.meta.icon"></i>
            <span v-if="item.meta&&item.meta.title" slot="title">{{$t(item.meta.title)}}</span>
          </template>
          <el-menu-item v-for="child in item.children" :index="child.path" :key="child.name" >
            <i v-if="child.meta.icon" :class="child.meta.icon"></i>
            <span v-if="child.meta&&child.meta.title" slot="title">{{$t(child.meta.title)}}</span>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
import { State, Getter, Mutation, Action } from "vuex-class";
import Layout from './Index.vue';
import router from 'vue-router';
@Component({
  components: {}
})
export default class Sidebar extends Vue {
  @Getter("routers") getRouters: any;
  @Getter("user") getUser:any;
  @Provide() oneMenu:any=[];
  @Provide() isCollapse:boolean=true;
  @Provide() collapseBtnClick:boolean=false;
  created() {
    this.getData();
    
  }
  collanseStatus(){
    this.collapseBtnClick=this.isCollapse;
    this.isCollapse=!this.isCollapse;
  }
  collapseOpen(){
    if (this.collapseBtnClick) return;
    this.isCollapse=false;
  }
  collapseClose(){
    if (this.collapseBtnClick) return;
    this.isCollapse=true;  
    
  }
  getData(){
    (this as any).$axios.get("http://47.112.137.218:9986/Rest/TSvrMethods/GetUserModules/{'accountname':'hc','user_sid':'"+this.getUser.User_sid+"','obs_sid':'C1BDDE65-5639-4C9B-9658-8F0E86178813','mod_sid':'2A299CC4-A06C-4553-8017-23663AD614C0','gettype':'b','CallWay':'B*S','DelWebpart':'0'}")
    .then((res:any)=>{
       //解析接口返回结果
       let result=res.data.result;
       let data=JSON.parse(result);
       const menuList=data.data;
       //console.log(data);
      //后端的菜单数据
      if (!menuList) {
        return;
      }
      menuList.forEach((val:any,index:any)=>{
        //console.log(JSON.parse(val))
        let m=JSON.parse(val)
      })
      //过滤三个目录
      menuList.forEach((val:any)=>{
         //console.log(val);
        // console.log(index.length);
        // console.log(menuList.length)
        let menu=JSON.parse(val);
        // console.log(menu);
        for(var i=0;i<menuList.length;i++){
            if (menuList.parent_sid=='') {
              
            }
        }
      })
      menuList.filter(function(val:any,index:any) {
        // console.log(val);
        // console.log(index);
        //再一次解析结果
        let mlist=JSON.parse(val);
        // console.log(mlist);
        if (mlist.parent_sid=='') {
     
          return mlist
        }
      })
      var onelevel=menuList.filter(function(val:any){
           let mlist=JSON.parse(val);
           if (mlist.parent_sid=='') {
             return mlist
           }
         })
      var twolevel=menuList.filter(function(val:any){
         let mlist=JSON.parse(val);
         if (mlist.parent_sid&&mlist.rec_sid==''){
           
           return mlist
         }
      })
      var threelevel=menuList.filter(function(val:any){
        let mlist=JSON.parse(val);
         if (mlist.parent_sid&&mlist.rec_sid) {
           return mlist
         }
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.el-scrollbar {
  height: 100%;
  border-right: 1px solid #e6e6e6;
  background: #fff;
  .el-menu-slide {
    align-self: auto;;
    border-right: none;
    i {
      margin-right: 5px;
      width: 30px;
      text-align: center;
      font-size: 18px;
      
    }
  }
}

</style>
