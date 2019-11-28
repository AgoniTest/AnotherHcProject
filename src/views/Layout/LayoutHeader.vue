<template>
  <div  class="layout-header">
    <el-row>
       <el-col :xs="10" :sm="12" :md="14" :lg="16" :xl="18">
          <div class="system-info">
              <img class="logo" src="@/assets/logo.png" alt/>
              <span>聚才科技</span> 
          </div>
      </el-col>
      <el-col :xs="10" :sm="12" :md="10" :lg="8" :xl="6">
         <el-dropdown @command="userCommand" class="system-user">
          <span class="userinfo-inner">
             <img :src="require('@/assets/admin.jpg')" alt/>
             {{getUser.human_name}}
          </span>
          <el-dropdown-menu slot="dropdown">
             <el-dropdown-item command="usercenter"> 
                我的信息
             </el-dropdown-item>
             <el-dropdown-item command="userbase">
                修改密码
             </el-dropdown-item>
             <el-dropdown-item command="deptchange">
                切换部门
             </el-dropdown-item>
             <el-dropdown-item divided command="logout"> 
                系统注销
             </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      
       <el-button class="about" type="primary" icon="el-icon-question" @click="aboutsys">关于系统</el-button>
       
      <el-dropdown @command="userCommand" class="system-usertodo">
          <span class="userinfo-todo">
            <i class="el-icon-chat-dot-round"></i>待处理事务
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="approvalpending">        
                待  审  批
             </el-dropdown-item>
             <el-dropdown-item command="cheakreading">         
                待  查  阅
             </el-dropdown-item>
             <el-dropdown-item command="approveddrawing">           
                已  审  批
             </el-dropdown-item>
             <el-dropdown-item  command="cheakedreading">           
                已  查  阅
             </el-dropdown-item> 
             <el-dropdown-item  command="overoffice">           
                已  办  结
             </el-dropdown-item>
            <el-dropdown-item  command="inoffice">           
                我的已办结
             </el-dropdown-item>
             <el-dropdown-item command="myinoffice">
                我的在办
             </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
       
        </el-col>
    </el-row>
  </div>


</template>

<script lang="ts">
import {Component,Vue} from "vue-property-decorator";
import { State,Getter,Mutation,Action} from 'vuex-class';
@Component({
  components:{

  }
})
export default class LayoutHeader extends Vue{
  @Getter("user") getUser:any;
  aboutsys(){
    this.$router.push('/system')
  }
  userCommand(command:string):void{
    if(command=="logout"){
      this.$confirm('是否注销?','提示',{
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(()=>{
      localStorage.removeItem("Token");
       this.$router.replace("/login");
      })
      
    }
     if(command == "usercenter") this.$router.push("/user");
     if(command=="userbase") this.$router.push("/userbase");
     if(command=="inoffice") this.$router.push("/inoffice");
     if(command=="overoffice") this.$router.push("/overoffice");
     if(command=="approvalpending") this.$router.push("/approvalpending");
     if(command=="approveddrawing") this.$router.push("/approveddrawing");
     if(command=="cheakreading") this.$router.push("/cheakreading");
     if(command=="cheakedreading") this.$router.push("/cheakedreading");
     if(command=="myinoffice") this.$router.push("/myinoffice");
  }
  created() {
     //console.log(this.getUser);
  }

}
</script>



<style lang="scss" scoped>
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
  background:  #409EFF;//#495060;
  line-height: 64px;
  height: 64px;
}

.system-info {
  text-align: left;
  .logo {
    width: 40px;
    height: 40px;
    border-radius: 50px;
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
.system-usertodo {
  text-align: right ;
  float: right;
  padding-right: 16px;
  .userinfo-todo {
    color: #fff;
    font-size: 16px;
    cursor: pointer;
   
  }
}
</style>