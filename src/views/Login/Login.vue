<template>
    <div class="login">
       <BackGround/>
        <!-- <Particles/> -->
        <LoginHeader>
            <el-form class="for"
                    :rules="rules"
                    :model="ruleForm"
                    ref="ruleForm"
                    label-position="left"
                    label-width="0px"
                    slot="container">
               <div class="title">
                   <el-dropdown class="changelang"  @command="LangChange">
                       <span class="el-dropdown-link">{{$t('commen.LangSwitcher')}}
                           <i class="el-icon-arrow-down el-icon--right"></i>
                       </span>
                       <el-dropdown-menu slot="dropdown">
                       <el-dropdown-item command="zh" >{{$t('commen.Chinese')}}</el-dropdown-item>
                       <el-dropdown-item command="en" >English</el-dropdown-item>
                       </el-dropdown-menu>
                   </el-dropdown>
               </div>
                <!--uc-->
                   <el-form-item prop="uc">
                    <el-input type="text" v-model="ruleForm.uc" @keyup.enter.native="handleLogin"
                              auto-complete="off" :placeholder="$t('commen.Username')" clearable>
                        <i slot="prefix" class="fa fa-user-o"></i>
                    </el-input>
                </el-form-item> 
                <!--password-->
                <el-form-item prop="pwd">
                    <el-input type="password"  v-model="ruleForm.pwd" @keyup.enter.native="handleLogin" 
                              auto-complete="off" :placeholder="$t('commen.Password')" clearable show-password>
                              <i slot="prefix" class="fa fa-lock"></i>
                    </el-input>
                </el-form-item>

                <!-- 登录button-->
                <el-form-item>
                    <el-button :loading="isLogin"
                            @click.native.prevent="handleSubmit"                           
                            type="primary" style="width: 100%">
                        {{$t("commen.Login")}}
                    </el-button>
                </el-form-item>
                <span style="color:gray">{{$t("commen.Version")}}:0.1.0</span>
            </el-form>
        </LoginHeader>
    </div>
</template>
<script lang="ts">
    import LineBox from '../BackGroud/LineBox.vue';
    import Particles from '../BackGroud/Particles.vue';
    import BackGround from '../BackGroud/BackGround.vue';
    import LoginHeader from "./LoginHeader.vue";
    import {Component,Vue,Provide} from "vue-property-decorator"
    import { State,Getter,Mutation,Action} from 'vuex-class';
    // import crypto from 'crypto';
    @Component({
        components:{
            LoginHeader,BackGround,Particles,LineBox
        }
    })
    export default class Login extends Vue{
        //存储用户信息
        @Action("setUser") setUser:any;
        @Provide() isLogin: boolean=false;
        //登录信息
        @Provide() ruleForm:{
            uc:String;
            pwd:String;
            autoLogin:boolean;   
        }={
            uc:"",
            pwd:"",
            autoLogin:true,  //是否自动登录   
        }
     @Provide() rules={
         uc: [{require: true ,message:'请输入用户名',trigger:'blur'}],
         pwd: [{require: true ,message:'请输入密码',trigger:'blur'}],
     }
    //国际化语言切换
    LangChange(command:string):void{
           if (this.$i18n.locale=='zh'&&command=='zh') {
         this.$notify({
           title:'！！！',
           message:"当前语言已经是中文了",
           type:'warning',
         })
    }else if(command=='zh') {
      this.$i18n.locale='zh'
      this.$notify({
        title:'成功!',
        message:'已经切换成中文!',
        type:'success',
      })
    }
    if(this.$i18n.locale=='en'&&command=='en') {
      this.$notify({
           title:'！！！',
           message:"The current language is English",
           type:'warning',
         }) 
    }else if(command=='en') {
      this.$i18n.locale='en'
      this.$notify({
        title:'Success!',
        message:'Has been switched to English!',
        type:'success',
      })
    }
    }
   
    //点击登录
      handleLogin() {
     ( this.$refs["ruleForm"] as any).validate((valid:boolean )=> {
        if (valid) {
            this.isLogin=true;
            (this as any).$axios.get("http://47.112.137.218:9986/Rest/TSvrMethods/NewSystem_Login/{'accountname':'hc','uc':'"+this.ruleForm.uc+"','pwd':'"+this.ruleForm.pwd+"'}"
            ).then((res:any)=>{
                this.isLogin=false;
                 let result=res.data.result;
                            //解析接口返回结果
                            let data=JSON.parse(result);
                            //接收接口返回状态号码
                            let status=data.code;
                            let msg="";
                            //存储token
                            // localStorage.setItem("user",data);
                            sessionStorage.setItem("Token",data.Token);
                            sessionStorage.setItem("user",data);
                            // //存储到vuex中
                            this.setUser(data.Token);
                            this.setUser(data);
                            switch (status){
                                case 1:
                                    // this.$message({
                                    //     message:'成功!',
                                    //     type:'success'
                                    // })
                                    this.$router.push({path:'/'})
                                    break;
                                case 2:
                                    this.$message({
                                        message:'当前账号已在其它电脑登录，被踢出',
                                        type:'error'
                                    })
                                    this.isLogin=false;
                                    break;
                                case 3:
                                    this.$message({
                                        message:'JSON 解析异常！',
                                        type:'error'
                                    })
                                    this.isLogin=false;
                                    break;    
                                case 9:
                                    this.$message({
                                        message:'MAC地址认证未通过！',
                                        type:'error'
                                    })
                                    this.isLogin=false;
                                    break;
                                case 10:
                                    this.$message({
                                        message:'登录用户不存在！',
                                        type:'error'
                                    })
                                    this.isLogin=false;
                                    break;
                                case 11:
                                    this.$message({
                                        message:'登录用户密码错误!',
                                        type:'error'
                                    })
                                    this.isLogin=false;
                                    break;
                                case 12:
                                    this.$message({
                                        message:'用户已经登录，请退出已登录的电脑!',
                                        type:'error'
                                    })
                                    this.isLogin=false;
                                    break;
                                case 14:
                                    this.$message({
                                        message:'连接服务器失败!',
                                        type:'error'
                                    })
                                    this.isLogin=false;
                                    break;
                                case 41:
                                    this.$message({
                                        message:'账号已经停用，不能登录!',
                                        type:'error'
                                    })
                                    this.isLogin=false;
                                    break;
                            }                   
            }).catch(()=>{
                this.isLogin=false;
            })
            
          
        }
      })
    }
    //enter键输入
     handleSubmit():void{
         (this.$refs["ruleForm"] as any).validate((valid:boolean)=>{
                if (valid){
                    // console.log("校验通过")
                    this.isLogin=true;
                    (this as any).$axios
                    .get("http://47.112.137.218:9986/Rest/TSvrMethods/NewSystem_Login/{'accountname':'hc','uc':'"+this.ruleForm.uc+"','pwd':'"+this.ruleForm.pwd+"'}",
                    )
                        .then((res:any)=>{
                            //解析接口返回结果
                            let result=res.data.result;
                            //console.log(JSON.parse(result));
                            let data=JSON.parse(result);
                            //接收接口返回状态号码
                            let status=data.code;
                            let msg="";
                            //存储token
                            localStorage.setItem("Token",data.Token);
                            localStorage.setItem("user",data);
                            // //存储到vuex中
                            this.setUser(data.Token);
                            this.setUser(data);
                            if (status==1) {
                                this.$router.push("/");

                            }if (status==2) {
                                this.$message({
                                    message:'当前账号已经在其他电脑登录，被踢出',
                                    type:'error'
                                })
                                this.isLogin=false;
                            }
                            if (status==3) {
                                this.$message({
                                    message:'JSON解析异常',
                                    type:'error'
                                })
                                this.isLogin=false;
                            }
                            if (status==9) {
                                this.$message({
                                    message:'MAC地址认证未通过！',
                                    type:'error'
                                })
                                this.isLogin=false;
                            }
                             if(status==10){
                                //登录用
                                this.$message({
                                    message:'登录用户不存在！',
                                    type:'error'
                                })
                                this.isLogin=false;
                            }
                            if (status==11) {
                                this.$message({
                                    message:'登录用户密码错误!',
                                    type:'error'
                                })
                                this.isLogin=false;
                            }
                            if (status==12) {
                                this.$message({
                                    message:'用户已经登录，请退出已登录的电脑!',
                                    type:'error'
                                })
                                this.isLogin=false;
                            }
                              if (status==15) {
                                this.$message({
                                    message:'连接服务器成功！',
                                    type:'success'
                                })
                                 this.isLogin=false;
                            }
                            if (status==41) {
                                this.$message({
                                    message:'账号已经停用，不能登录!',
                                    type:"error"
                                })
                                this.isLogin=false;
                            }       
                    }).catch(()=>{
                        this.isLogin=false;
                    })
                }
           })
     }
   
    }
</script>
<style lang="scss" scoped>
    .login{
   width: 100%;
   height: 100%;
   overflow: hidden;
   background-size: 100% 100%;
        
    
    .title{
        margin: 0px auto 40px auto;
        text-align: right;
        color: #505458;
    
    i{
        font-size: 14px;
        margin-left: 8px;
    }
    }
    .forget{
        float: right;
    }
    }
    .el-dropdown-link{
        color: #fff;
    }
</style>