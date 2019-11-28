<template>
  <div class="home">
     <div  class="layout-header">
          <div class="system-info">
              <img class="logo" src="@/assets/logo.png" alt/>
          </div>
            <span class="toolbar">
            <el-menu  class="el-menu-demo" background-color="#409EFF" text-color="#409EFF" active-text-color="#409EFF" mode="horizontal">
                <el-menu-item index="2" v-popover:popover-my>
                  <span class="userinfo">
             <img :src="require('@/assets/admin.jpg')" alt/>
             {{getUser.human_name}}
          </span>
                <el-popover ref="popover-my" placement="bottom-start" trigger="click">
                      <div class="my-item" @click="$router.push('/user')"><i class="fa fa-address-card-o">{{$t("commen.My Information")}}</i></div>
                      <div class="my-item" @click="$router.push('/userbase')"><i class="fa fa-key">{{$t("commen.Change Password")}}</i></div>
                      <div class="my-item" @click="systemsetting"><i class="fa fa-gears">{{$t("commen.Setting")}}</i></div>
                      <div class="my-item" @click="deptchange"><i class="fa fa-sitemap">{{$t("commen.Change Dept")}}</i></div>
                      <div class="my-item" v-if="isFull" @click="full"><img class="opFull" v-if="isFull" src="../../assets/quanping.png" />{{$t("commen.Full Screen")}}</div>
                      <div class="my-item" v-if="!isFull" @click="exsitfull"><img class="exFull" v-if="!isFull" src="../../assets/tuichuquanping.png"/>{{$t("commen.Exit Full Screen")}}</div>
                      <div class="my-item" @click="$router.push('/system')"><i class="fa fa-gg">{{$t("commen.About System")}}</i></div>
                      <div class="my-item" @click="logout"><i class="fa fa-power-off">{{$t("commen.Login Out")}}</i></div>
                   </el-popover>
                </el-menu-item>
            </el-menu>
          </span>
             <span class="toolbar">
            <!-- 系统通知 -->
          <el-menu  class="el-menu-demo" background-color="#409EFF" text-color="#FFF" active-text-color="#FFF" mode="horizontal">
               <el-menu-item index="1" v-popover:popover-notice>
              <el-badge  :value="4" :max="99" class="item">
            <li style="color:#fff;" class="fa fa-bell-o fa-lg"></li>
              </el-badge>
              <el-popover ref="popover-notice" placement="bottom-end" trigger="click">
                  <Notice></Notice>
              </el-popover>
               </el-menu-item>
          </el-menu>
        </span> 
          <span class="toolbar">
            <!-- 语言切换 -->
              <el-menu  class="el-menu-demo" background-color="#409EFF" text-color="#FFF" active-text-color="#FFF" mode="horizontal">
                 <el-menu-item index="2" v-popover:popover-lang>
                       <li style="color:#fff;" class="fa fa-language fa-lg"></li>
                       <el-popover ref="popover-lang" v-model="langVisible">
                           <div class="lang-item" @click="langChange('zh')">{{$t('commen.Chinese')}}</div>
                           <div class="lang-item" @click="langChange('en')">English</div>
                       </el-popover>
                 </el-menu-item>
              </el-menu>
          </span>  
     <el-drawer
    title="系统设置"
    size="17%"
    :modal="false"
    :visible.sync="drawer"
    :direction="direction">
    <div class="switch1">
       <div class="switname">菜单栏显示</div>
       <el-switch
       class="switch"  
    v-model="show"
    >
    </el-switch>
    </div>
    <div class="switch1">
      <div class="switname">面包屑显示</div>
    <el-switch
    class="switch" 
    v-model="isshow"
    >
    </el-switch>
    </div>
    </el-drawer>
  </div>

  <el-container class="layout-content">
     <!-- 左侧菜单-->
      <el-scrollbar class="el-scrollbar" style="height:100%">
    <el-menu  class="el-menu-slide" 
     :default-active="$router.currentRoute.path" 
      :collapse-transition="false" @open="handleOpen" @close="handleClose" 
      :collapse="isCollapse" v-if="show" router >
      <template v-for="item in getRouters" v-if="item.hidden&&item.children&&item.children.length>0">
        <el-menu-item class="menu-item" v-if="item.children.length==1" :index="item.children[0].path" :key="item.name" >
          <i v-if="item.children[0].meta.icon" :class="item.children[0].meta.icon"></i>
          <span slot="title">{{$t(item.children[0].meta.title)}}</span>
        </el-menu-item>
        <!-- 多个子元素 -->
        <el-submenu v-else :index="item.children[0].path" :key="item.name">
          <template slot="title">
            <i v-if="item.meta.icon" :class="item.meta.icon"></i>
            <span v-if="item.meta&&item.meta.title" slot="title">{{$t(item.meta.title)}}</span>
          </template>
          <el-menu-item v-for="child in item.children" :index="child.path" :key="child.name">
            <i v-if="child.meta.icon" :class="child.meta.icon"></i>
            <span v-if="child.meta&&child.meta.title" slot="title">{{$t(child.meta.title)}}</span>
          </el-menu-item>
          <!-- <el-submenu v-else :index="item.children.children[0].path" :key="item.children.children">
          </el-submenu> -->
        </el-submenu>
      </template>
    </el-menu>
  </el-scrollbar>
    <el-main>
    <!--面包屑-->
    <div class="top" v-if="isshow">
        <!-- <el-button icon="fa fa-reorder" style="margin-left: 16px;" @click="drawer = true"></el-button> -->
        <el-button size="medium" type="text" :icon="isCollapse ? 'fa fa-indent' : 'fa fa-outdent'" @click="toggleCollapsed"></el-button>
        <el-breadcrumb class="breadcrumb" separator="/">
          <el-breadcrumb-item v-for="(item,index) in breadCrumbItems" 
          :key="index" 
          :to="{path:item.path}">
          {{$t(item.title)}}
          </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="content">
        <slot name="content"></slot>
    </div>
    </el-main>
  </el-container>
  </div>
</template>

<script lang="ts">
import {Component,Vue,Provide,Watch, Prop} from "vue-property-decorator";
import { State, Getter, Mutation, Action } from "vuex-class";
import Layout from './Index.vue';
import router from 'vue-router';
import { Message } from 'element-ui';
import Notice from  './Notice.vue'
@Component({
  components:{
      Notice
  }
})
export default class Cotnent extends Vue{
  @Getter("user") getUser:any;
  @Getter("routers") getRouters: any;
  @Provide() value:boolean=true;
  @Provide() drawer:boolean=false;
  @Provide() isshow:boolean=true;
  @Provide() isFull:boolean=true;
  @Provide() show:boolean=true;
  @Provide() isCollapse:boolean=false;
  @Provide() collapsed:boolean=false;
  @Provide() langVisible:boolean=false;
  @Provide() direction:string='rtl'
  @Provide() breadCrumbItems:any;//面包屑的数组
  @Watch("$route") handleRouteChange(to:any){
    this.initBradCrumbItem(to);
  }
  langChange(lang:any){
     if(this.$i18n.locale==lang){
      this.$i18n.locale=lang
      this.$notify({
        title:this.$i18n.locale=='en' ? '!!!':'!!!',
        message: this.$i18n.locale=='en' ?'The current language is English!':'当前语言已经是中文了!',
        type:'warning',
      })
      this.langVisible=false;
     }else{
        this.$i18n.locale=lang
     }
  }
       handleOpen(key:any, keyPath:any) {
        //console.log(key, keyPath);
      }
      handleClose(key:any, keyPath:any) {
        //console.log(key, keyPath);
      }
toggleCollapsed(){
  this.isCollapse=!this.isCollapse;
}
  changeDept(){
    this.$message('功能未完成，敬请期待~~')
  }
   logout(){
     this.$confirm("是否注销?",'提示！',{
        cancelButtonText: 'Cancel',
        confirmButtonText: 'OK',
        type: 'warning'
      }).then(()=>{
      localStorage.removeItem("Token");
       this.$router.replace("/login");
      })
  }
  full(){
    var docEle=document.documentElement;
    this.isFull=false;
    docEle.requestFullscreen();
  }
  exsitfull(){
    var docEle=document.documentElement;
    this.isFull=true;
    document.exitFullscreen();
  }
  systemsetting(){
     this.drawer=true;
  }
  deptchange(){
    this.$message('功能未完成，敬请期待~~')
  }
isHidden(){
  this.show=!this.show
}
created(){
  this.initBradCrumbItem(this.$router);
  this.getData();
  //console.log(this.getUser.User_sid);
}

  initBradCrumbItem(router:any){
    // console.log(router)
    //根路由title
    let breadCrumbItems:any=[{path:"/",title:"commen.Management System"}];
    //遍历父级到当前子路由的页面的title和path存储到数组里
    for(const index in router.matched){
      //console.log(router.matched)
      if(router.matched[index].meta&&router.matched[index].meta.title){
            breadCrumbItems.push({
              path:router.matched[index].path? router.matched[index].path:"/",
              title:router.matched[index].meta.title
            });
      }
    }
    this.breadCrumbItems=breadCrumbItems;

    
  }
   getData(){
    (this as any).$axios.get("http://47.112.137.218:9986/Rest/TSvrMethods/GetUserModules/{'accountname':'hc','user_sid':'"+this.getUser.User_sid+"','obs_sid':'C1BDDE65-5639-4C9B-9658-8F0E86178813','mod_sid':'2A299CC4-A06C-4553-8017-23663AD614C0','gettype':'b','CallWay':'B*S','DelWebpart':'0'}")
    .then((res:any)=>{
       //解析接口返回结果
       let result=res.data.result;
       let data=JSON.parse(result);
       const menuList=data.data;
       console.log(data);
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
.home{
  height: 100%;
}
.lang-item{
  font-size: 16px;
  padding-left: 8px;
  padding-top: 8px;
  padding-bottom: 8px;
  cursor: pointer;
}
.el-dropdown-link{
  position:relative; 
    float: left;
    left:20px;
    .el-icon-arrow-down{
        float: left;
        left: 120px;
    }
}
.item{
  line-height: 18px;
}
.switch1{
  margin-bottom: 20px;
  height: 50px;
  color: black;
  .switname{
    position:relative; 
    float: left;
    left:20px;
  }
  .switch{
    float: left;
    left: 45%;
  }
}
.about{
  left: 50px;
 padding-right: 16px;
 
}
.help{
 left: 60px;
padding-right: 50px;

}
.el-icon-reading{
  font-size: 16px;

}
.system-deptchange{
  text-align: right;
  float: right;
  padding-right: 16px;
}
.layout-header {

  background:  #409EFF;//#409EFF;
  line-height: 60px;
  height: 60px;
}

.system-info {
  text-align: left;
  .logo {
    width: 250px;
    height: 48px;
    border-radius: 10px;
    margin-top: 12px;
    margin-left: 20px;
    margin-right: 10px;
    float: left;
    position: relative;
  }
  .title {
    font-size: 18px;
    font-weight: bold;
    color: azure;
    line-height: 64px;
  }
}
.el-scrollbar {
  height: 100%;
  border-right: 1px solid #e6e6e6;
  background: #fff;
  .el-menu-slide {
    align-self: auto;
    border-right: none;
    i {
      margin-right: 5px;
      width: 30px;
      text-align: center;
      font-size: 18px;
      
    }
  }
}
.system-user {
  text-align: right;
  float: right;
  padding-right: 16px;
  .userinfo-inner {
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    img {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      margin: 10px 0px 10px 10px;
      float: right;
    }
  }
}
  .userinfo{
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    img {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      margin: 10px 0px 10px 10px;
      float: right;
    }
  }
.toolbar{
  float: right;
  position: relative;
}
.my-item {
  font-size: 16px;
  padding-left: 8px;
  padding-top: 8px;
  padding-bottom: 8px;
  cursor: pointer;
}

.layout-content {
  width: 100%;
  height: 100%;
  .el-main {
    padding: 0;
    .top {
      background:  #fff;
      height: 54px;
      border-right: none;
      border-bottom: 1px solid #e6e6e6;
      display: flex;
      align-items: center;
      i {
        font-size: 20px;
        cursor: pointer;
        padding-left: 16px;
      }
      .breadcrumb {
        padding-left: 16px;
      }
    }
    .content {
      padding: 10px;
      height: calc(100% - 54px);
      box-sizing: border-box;
    }
  }
}
.trigger {
  padding: 0 20px;
  line-height: 64px;
  font-size: 24px;
}
.trigger:hover {
  background-color: #eeeeee;
}
.opFull{
 position: relative;
 top: 2px;
}
.exFull{
position: relative;
 top: 2px;
}
</style>