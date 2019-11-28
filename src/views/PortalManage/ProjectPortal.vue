<template>
<div class="home-page">
  <div class="img-box">
      <h2 class="title">About me</h2>
      <img :src="require('@/assets/admin.jpg')" alt />
      <h4>admin</h4>
      <h4>本次登录时间:</h4>  
    </div>
    <div class="info-box">
        
        
       <div class="data-bo">
                <Valendar></Valendar>
                 </div>
          </div>
 </div>
</template>


<script>

import Valendar from '../../components/Valendar.vue'
export default {
   components:{
       Valendar
   }
}
</script>


<style lang="scss" scoped>
.h2{
  position: relative;
  text-align: center;
}
.home-page{
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
    // background: #fff;
    .data-bo{
        position: relative;
        width: 100%;
        height: 70%;
    }
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