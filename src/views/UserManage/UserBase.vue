<template>
  <div class="user-info">
    <div class="img-box">
      <h2 class="title">About me</h2>
      <img :src="require('@/assets/admin.jpg')" alt />
      <h4>{{getUser.uc}}</h4>
    </div>
    <div class="info-box">
      <h2 class="h2">{{$t("commen.Change Password")}}</h2>
      <!-- form -->
      <el-form :model="userData" class="form-box">
        <el-form-item :label="$t('commen.Username')">
          <el-input v-model="getUser.uc" readonly></el-input>
        </el-form-item>
        <el-form-item :label="$t('Message.Old Code')">
          <el-input type="password" v-model="userData.oldPss" auto-complete="off" :placeholder="$t('Message.Please enter your old password')" show-password clearable></el-input>
        </el-form-item>
        <el-form-item :label="$t('Message.New Code')">
          <el-input type="password" v-model="userData.newPass" auto-complete="off" :placeholder="$t('Message.Please enter your new password')" show-password clearable></el-input>
        </el-form-item>
        <el-form-item :label="$t('Message.Confirm Your Password')">
          <el-input type="password" v-model="userData.confirmPass" auto-complete="off" :placeholder="$t('Message.Type your new password again')" show-password clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="pwdchange"
            type="primary"
            :disabled="!userData.confirmPass"
            :loading="loading"
          >{{$t("commen.Change Password")}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
import { State, Getter, Mutation, Action } from "vuex-class";
@Component({
  components: {}
})
export default class UserInfo extends Vue {
  @Getter("user") getUser: any;

  @Provide() userData: { oldPss: string ;newPass:string;confirmPass:string} = {
    oldPss: "",
    newPass:"",
    confirmPass:""
  };

  @Provide() loading: boolean = false; // 是否发起网络请求

  pwdchange(){
     this.loading=true;
     (this as any).$axios.get("http://47.112.137.218:9986/Rest/TSvrMethods/ChangePassword/{'accountname':'hc','user_code':'"+this.getUser.uc+"','OldPass':'"+this.userData.oldPss+"','NewPass':'"+this.userData.newPass+"'}")
     .then((res:any)=>{
               this.loading=false;
                let result=res.data.result;
                            //解析接口返回结果
                            let data=JSON.parse(result);
                            //接收接口返回状态号码
                            let status=data.code;
                            if(status==1){
                                  this.$message({
                                    message:'修改成功!',
                                    type:'success'
                                  })
                                  this.loading=false;
                            }
                            else{
                              this.$message({
                                message:'请求错误!',
                                type:"error"
                              })
                              this.loading=false;
                            }
     })
  }
  //   // 发起请求
  //   (this as any).$axios
  //     .post("/api/users/changePwd", this.userData)
  //     .then((res: any) => {
  //       // console.log(res.data);
  //       this.loading = false;
  //       this.$message({
  //         message: res.data.msg,
  //         type: "success"
  //       });
  //     })
  //     .catch(() => {
  //       this.loading = false;
  //     });
  // }

  created() {
    // console.log(this.getUser.uc.toLowerCase());
    
  }
}
</script>

<style lang="scss" scoped>
.h2{
  position: relative;
  text-align: center;
}
.user-info {
  height: 100%;
  // height: calc(100% - 70px);
  display: flex;
  overflow: auto;
  color: #606266;
  .img-box,
  .info-box {
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    border: 1px solid #dcdfe6;
    background: #fff;
    .title {
      border-bottom: 1px solid #dcdfe6;
      padding: 10px;
      text-align: left;
      margin-bottom: 20px;
      font-size: 16px;
      font-weight: bold;
    }
  }
  .img-box {
    text-align: center;
    width: 30%;
    margin-right: 10px;
    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }
    h4 {
      margin-top: 20px;
      font-size: 16px;
    }
  }
  .info-box {
    flex: 1;
    .form-box {
      padding: 0px;
    }
  }
}
</style>
