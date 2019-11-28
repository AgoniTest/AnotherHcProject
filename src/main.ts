import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import ElementUI from 'element-ui';
import Echarts from 'echarts';
import 'element-ui/lib/theme-chalk/index.css';
import VueI18n from 'vue-i18n';
import VueResource from 'vue-resource';
// import BMap from 'bmap';
// import Myhttp from './utils/Myhttp';
// import ports from './utils/ports';
// import { DatePicker } from 'ant-design-vue';
// import Ant from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';
//import axios from './utils/http'
import axios from 'axios';
// Vue.use(Ant);
// Vue.use(DatePicker);
Vue.prototype.$echarts = Echarts;
Vue.use(VueResource)
Vue.use(ElementUI);
Vue.use(VueI18n);
Vue.config.productionTip = false;
Vue.prototype.$axios =axios;

// let loading:any;
// let needLoadingRequestCount = 0 // 声明一个对象用于存储请求个数

// function startLoading(){
//   loading = Vue.prototype.$service({
//     lock:true,
//     text:"拼命加载中~~~~~",
//     background:'rgba(0,0,0,0,7)'
//   })
// }
// function endLoading(){
//   loading.close();
// }

// Vue.prototype.Myhttp=Myhttp;
// Vue.prototype.ports=ports;
const i18n=new VueI18n({
  locale:'zh',//语言标识
  messages:{
    'zh':require('./lang/zh.json'),
    'en':require('./lang/en.json')
  },
  silentTranslationWarn:true
})
new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
