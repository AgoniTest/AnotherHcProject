<template>

  <div class="home">
  <div class="home-body">
      <h4 class="title">HC互联网端</h4>
      <p class="des">版本:0.1.0</p>
      <p class="des">深圳聚才项目管理有限公司®版权所有</p>
    </div>
    </div>
 
 <!-- <el-container>
  <el-header>HC 互联网端</el-header>
  <el-main>深圳市聚才项目管理科技技术有限公司</el-main>
</el-container>
           <el-footer>
        <a class="link" @click="$router.push('/')">返回主页</a>        
        </el-footer> -->   
</template>

<script lang="ts">
import {Component,Vue ,Provide} from "vue-property-decorator"
@Component({
  components:{

  }
})
export default class AboutSystem extends Vue{

}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  background: url(../../assets/背景.jpg) no-repeat;
  background-size: 100% 100%;
  .home-body {
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    color: #fff;
    text-align: center;
    padding: 100px;
    box-sizing: border-box;
    .title {
      font-size: 32px;
      font-weight: bold;
      line-height: 60px;
    }
    .des {
      font-size: 18px;
      margin: 20px 0;
    }
  }
}

// .el-footer {
//     background-color: white;
//     position: relative;
//     top: 0px;
//     color: #333;
//     text-align: center;
//     line-height: 60px;
//   }
//  .link {
//         color: #5cacee;
//         font-size: 20px;
//         cursor: pointer;
//       }
//  .el-container{
//      position: relative;
    
//  }
//  .span{
//      position: relative;
//      left: 900px;
//      top: 400px;
//  }
//   .el-header {
//     background-color:white;
//     color: #333;
//     text-align: center;
//     line-height: 60px;
//   }
//    .el-main {
//     // background: url(..\assets\背景.jpg) no-repeat;
//     // background: url(../assets/backgroud.png) no-repeat;
//     background-size:100% 100%; 
//     background-color: #B3C0D1;
//     color: #333;
//     text-align: center;
//     line-height: 360px;
//   }
      
</style>