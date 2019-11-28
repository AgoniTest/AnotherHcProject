<template>
  <div
    class="data-box"
    :class="{ noborder: !boxb }"
    style="height:120px;width: 120px;"
  >
    <!--左上边框-->
    <div class="line-box" v-if="boxb">
      <i class="t-l-line"></i>
      <i class="l-t-line"></i>
    </div>
    <!--右上边框-->
    <div class="line-box" v-if="boxb">
      <i class="t-r-line"></i>
      <i class="r-t-line"></i>
    </div>
    <!--左下边框-->
    <div class="line-box" v-if="boxb">
      <i class="l-b-line"></i>
      <i class="b-l-line"></i>
    </div>
    <!--右下边框-->
    <div class="line-box" v-if="boxb">
      <i class="r-b-line"></i>
      <i class="b-r-line"></i>
    </div>
    <!--<div class="main-title" v-if="topt">
           <icon :type="icon"></icon> {{title}}
        </div>-->
    <div class="in-title"></div>
  </div>
</template>

<script>
import {Component,Vue, Provide} from "vue-property-decorator"
export default {
  components:{
    
  },
  name: "databox",
  props: {
    title: String,
    dheight: Number,
    icon: String,
    boxb: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="scss">
.data-box{
    box-sizing: border-box;
    border: 1px solid #2C58A6;
    position: relative;
    box-shadow: 0 0 10px #2C58A6;
    &.noborder{
        border: none;
        box-shadow: none;
    }
.line-box {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
    i {
        background-color: #4788fb;
        box-shadow: 0px 0px 10px #4788fb;
        position: absolute;
        &.l-t-line{
            width: 5px;
            height: 24px;
            left: -3px;
            top: -3px;
        }
        &.t-l-line{
            height: 5px;
            width: 26px;
            left: -3px;
            top: -3px;
        }
        &.t-r-line{
            height: 5px;
            width: 26px;
            right: -3px;
            top: -3px;
        }
        &.r-t-line{
            width: 5px;
            height: 24px;
            right: -3px;
            top: -3px;
        }
        &.l-b-line{
            width: 5px;
            height: 24px;
            left: -3px;
            bottom: -3px;
        }
        &.b-l-line{
            height: 5px;
            width: 26px;
            left: -3px;
            bottom: -3px;
        }
        &.r-b-line{
            width: 5px;
            height: 24px;
            right: -3px;
            bottom: -3px;
        }
        &.b-r-line{
            height: 5px;
            width: 26px;
            right: -3px;
            bottom: -3px;
        }
    }
}
}
</style>
