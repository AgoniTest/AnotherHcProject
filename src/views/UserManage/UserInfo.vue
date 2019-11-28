<template>
  <div class="user-info">
    <div class="img-box">
      <h2 class="title">About me</h2>
      <img :src="require('@/assets/admin.jpg')" alt />
      <h4>{{getUser.human_name}}</h4>  
    </div>
    <div class="info-box">
      <h2 class="h2">{{$t("Message.User Info")}}</h2>
      <!-- form -->
      <el-form ref="userData" :model="userData" class="form-box">
        <el-form-item :label="$t('Message.Email')">
          <el-input v-model="userData.email" readonly></el-input>
        </el-form-item>
        <el-form-item :label="$t('Message.Phone Number')">
          <el-input  v-model="userData.phone" readonly></el-input>
        </el-form-item>
        <el-form-item :label="$t('Message.Telephone')">
          <el-input v-model="userData.mobile" readonly></el-input>
        </el-form-item>
        <el-form-item :label="$t('Message.Phone2')">
          <el-input v-model="userData.phone_2" readonly></el-input>
        </el-form-item>
        <el-form-item>
        <el-button @click="dialogVisible=true"
        type="primary"
        :loading="loading">{{$t("Message.Edit Info")}}</el-button>
        </el-form-item>

      </el-form>
      <el-dialog :title="$t('Message.User Info')" :visible.sync="dialogVisible" :close-on-click-modal="false"
    :show-close="false">
         <el-form ref="userData" :model="userData" :rules="rules">
             <el-form-item :label="$t('Message.Email')" prop="email">
                <el-input type="text" v-model="userData.email" auto-complete="off" clearable></el-input>
             </el-form-item>
             <el-form-item :label="$t('Message.Phone Number')" prop="phone">
                <el-input type="text" v-model="userData.phone" auto-complete="off" clearable></el-input>
             </el-form-item>
             <el-form-item  :label="$t('Message.Telephone')" prop="mobile">
                <el-input type="text" v-model="userData.mobile" auto-complete="off" clearable></el-input>
             </el-form-item>
             <el-form-item :label="$t('Message.Phone2')" prop="phone_2">
                <el-input type="text" v-model="userData.phone_2" auto-complete="off" clearable></el-input>
             </el-form-item>
         </el-form>
         <div slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">{{$t("commen.Cancel")}}</el-button>
    <el-button type="primary"  @click="onSubmit" :loading="loading">{{$t("commen.OK")}}</el-button>
   </div>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide ,Prop} from "vue-property-decorator";
import { State, Getter, Mutation, Action } from "vuex-class";

@Component({
  components: {
    
  }
})
export default class UserInfo extends Vue {
  @Action("setUser") setUser:any;
  @Getter("user") getUser: any;
  @Provide() dialogVisible: Boolean = false; // 是否展示编辑页面
  
  @Provide() userData: { email: string; phone: string;mobile:string;phone_2:string; } = {
    email: "",
    phone: "",
    mobile:"",
    phone_2:"",
  };
  @Provide() rules: any = {
    email: [{ required: true,message: "请输入电子邮箱", trigger: "blur" },
    {validator:function (rule:any,value:any,callback:any){
                    var vertifyEmail=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                    if (vertifyEmail.test(value)==false) {
                        callback(new Error("请输入正确的邮箱号码。例如@sina.com"))
                    }else{
                        callback();
                    }
                }}],
    phone: [{ required: true,message: "请输入手机号码", trigger: "blur" },
    {validator:function(rule:any,value:any,callback:any){
    	            if(/^1[34578]\d{9}$/.test(value) == false){
    	                callback(new Error("请输入正确的手机号"));
    	            }else{
    	                callback();
    	            }
                }}],
    mobile: [{ required: true,message: "请输入固定电话", trigger: "blur" },
    {validator:function (rule:any,value:any,callback:any) {
          var reg =/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
          if (reg.test(value)==false) {
                    callback(new Error("请输入正确的固定电话格式。例如0000-0000000"));
          }else{
            callback();
          }
    }}],
    phone_2: [{ required: true,message: "请输入分机号",trigger: "blur"},
    ,{validator:function(rule:any,value:any,callback:any){
    	            if(/^1[34578]\d{9}$/.test(value) == false){
    	                callback(new Error("请输入正确的手机号"));
    	            }else{
    	                callback();
    	            }
                }}],
  };
  
  handleEdit(index: number, row: any) {
    // console.log(index, row);
    this.userData = row;
    this.dialogVisible = true;
  }
  @Provide() loading: boolean = false; // 是否发起网络请求
  

  closeDialog() {
    this.dialogVisible = false;
  }

  getUserData(){
    (this as any).$axios.get("http://47.112.137.218:9986/Rest/TSvrMethods/GetHumanInfo/{'accountname':'hc','human_sid':'"+this.getUser.human_sid+"'}")
    .then((res:any)=>{
      //解析返回结果
      let userinfo=JSON.parse(res.data.result)
      console.log(userinfo)
      //console.log(userinfo.phone_2)
      this.userData.email=userinfo.email;
      this.userData.phone=userinfo.phone;
      this.userData.mobile=userinfo.mobile;
      this.userData.phone_2=userinfo.phone_2;
    })
  }
  onSubmit(){
   (this as any).$axios.get("http://47.112.137.218:9986/Rest/TSvrMethods/PostHumanInfo/{'accountname':'hc','phone':'"+this.userData.phone+"','phone_2':'"+this.userData.phone_2+"','email':'"+this.userData.email+"','mobile':'"+this.userData.mobile+"','human_sid':'"+this.getUser.human_sid+"'}"
   ).then((res:any)=>{
      // if (condition) {
        this.loading=true;
        let result=res.data.result;
        let data=JSON.parse(result);
     // console.log(data.human_sid);
     // 接收接口返回状态号码
        let status=data.code;
        if (status==1) {
          this.$message({
            message:'更新成功!',
            type:'success'
          })
          this.dialogVisible=false;
          this.loading=false;
        }else{
          this.$message({
            message:'操作错误！',
            type:'error'
          })
          this.loading=false;
        }
      // }
   }).catch(()=>{
     this.loading=false
   })
  }
 
  created() {
    this.getUserData()
    //console.log(this.getUser);
  }
}
</script>

<style lang="scss" scoped>
.h2{
  position: relative;
  text-align: center;
}
.user-info {
  height: calc(100% - 50px);
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
      padding: 10px;
      
    }
  }
}
</style>
