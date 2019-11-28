<template>
  <div id="app">
    <!--登入动画-->
    <transition name="rotate-fall">
    <router-view  class="app-router-view" v-if="isRouterAlive"></router-view>
      </transition>
  </div>
</template>
<script lang="ts">
// import  'vue-particles';
import 'vue-transition.css';
import {Loading} from 'element-ui';
import { Component, Vue ,Provide} from "vue-property-decorator";
import { State, Getter, Mutation, Action } from "vuex-class";
@Component({
  components: {
    
  }
})
export default class App extends Vue {
  @Action("setUser") setUser: any;
  @Provide() isRouterAlive:boolean=true;
  reload(){
    this.isRouterAlive=false;
    this.$nextTick(()=>{
      this.isRouterAlive=true;
    })
  }
  beforeCreate() {
    this.$store.state.loadingInstance = Loading.service(
      {
       lock:true,
       text:'拼命加载中...',
       background:'rgba(0,0,0,0.2)'
     }
    );
  }
  created() {
    this.setUser(localStorage.user);
    this.reload();
    window.setTimeout(() => {
      const loadingInstance = this.$store.state.loadingInstance;
      if (loadingInstance && loadingInstance.close) {
        loadingInstance.close();
      }
    }, 1500);
  }
  


  }

</script>

<style lang="scss">
// #particles-js {
//   position: fixed;
//   top: 0;
//   left: 0;
//   z-index: 1000;
//   width: 100%;
//   height: 100%;
// }
html,body,#app {
  width: 100%;
  height: 100%;
}
</style>
