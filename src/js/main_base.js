import Vue from 'vue';
import Promise from 'es6-promise';
import VueRouter from "vue-router";//路由
Vue.use(VueRouter);

import vueTap from 'v-tap';
Vue.use(vueTap);


import { 
        MessageBox,
        Toast,
        Indicator,
} from 'mint-ui'

Vue.prototype.$toast = Toast;
Vue.prototype.$indicator = Indicator;
Vue.prototype.$messagebox = MessageBox;

import Axios from "axios";//AJAX插件

var env = proce()

//配置基础路径
Axios.defaults.baseURL = "https://dev-api-c2b.honghuotai.com"//本地环境
Axios.defaults.baseURL = "https://test-api-c2b.honghuotai.com"//测试环境
// Axios.defaults.baseURL = "https://api-c2b.honghuotai.com"//生产环境



if(env == "dev"){
  Axios.defaults.baseURL = "https://dev-api-c2b.honghuotai.com"//开发环境
}
if(env == "test"){
  Axios.defaults.baseURL = "https://test-api-c2b.honghuotai.com"//测试环境
}
if(env == "prod"){
  Axios.defaults.baseURL = "https://api-c2b.honghuotai.com"//生产环境
}

Axios.defaults.timeout = 10000//请求10秒后超时

//ajax的请求拦截器
Axios.interceptors.request.use(function(config){
     /*在发送请求之前做某事*/
     if(JSON.parse(localStorage.getItem("loginData")) &&　config.method == 'get'){
        if(!config.params){
            config.params = {}
        }
        config.params.global_user_id =  JSON.parse(localStorage.getItem("loginData")).user_id
        config.params.global_phone =  JSON.parse(localStorage.getItem("loginData")).phone
        config.params.token =  JSON.parse(localStorage.getItem("loginData")).token
     }
     if(JSON.parse(localStorage.getItem("loginData")) &&　config.method == 'post'){
        if(!config.data){
            config.data = {}
        }
        config.data.global_user_id =  JSON.parse(localStorage.getItem("loginData")).user_id
        config.data.global_phone =  JSON.parse(localStorage.getItem("loginData")).phone
        config.data.token =  JSON.parse(localStorage.getItem("loginData")).token
     }
     if(config.method == 'get'){
        //项目类型
        config.params.appPort =  g.env + 'events'
         //手机API等级
        config.params.deviceOs = g.agent
     }else{
        config.data.appPort =  g.env + 'events'
        config.data.deviceOs = g.agent
     }
     return config;
   },function(error){
     /*请求错误时做些事*/
     return Promise.reject(error);
   });
 
//ajax的相应拦截器
Axios.interceptors.response.use(
    function(response){//请求正确情况下的执行函数
        // Indicator.close()
        return response;
    },
    function(error){//请求错误情况下的执行函数
        Indicator.close()
        //网络原因错误
        if(!navigator.onLine){//还没测试
            Toast({
                message: "网络不给力呀~",
                position: 'bottom',
                duration: 1500,
            }); 
            // location.hash = "/timeout"
        }else if(!arguments[0].response){//还没有做大规模的测试，还不太准确
           Toast({
                message: "网络不给力呀~",
                position: 'bottom',
                duration: 1500,
            }); 
        }
       
        var arr1 = [
           
        ]
        //弹窗处理的异常
        if(arr1.indexOf(arguments[0].response.data.code) > -1){
            app.$messagebox({
                    title: '',
                    message: arguments[0].response.data.msg,
                    confirmButtonText:'我知道了',
                })
            return Promise.reject(error);
        }
         var arr2 = [
          
        ]
        //手动处理的异常
        if(arr2.indexOf(arguments[0].response.data.code) > -1){
            return Promise.reject(error);
        }
        Toast({
                message: arguments[0].response.data.msg,
                position: 'middle',
                duration: 1500,
            });
        return Promise.reject(error);
   });




import VueAxios from 'vue-axios';//axios外壳
Vue.use(VueAxios, Axios);


import util from './vueUtil.js';//自定义指令或者过滤器
Vue.use(util)

import routerMap from './router.js';//路由js


var router = new VueRouter({routes: routerMap});

router.beforeEach(function (to, from, next) {//路由切换的钩子函数（每次路由切换执行的函数）
    Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle',
        spinnerType:"snake"
    });
    g.setTimeout = setTimeout(function(){
        Indicator.close()
        Toast({
            message: '网络不给力呀~',
            position: 'bottom',
            duration: 1500,
        });
        location.hash = "/timeout"
    },10000)
  next();
});

Vue.prototype.transitionDown = function (s,str,close){//转场调用的函数5秒没有加载出来新的页面跳转timeout页面
    document.body.scrollTop　= 0
    clearTimeout(g.setTimeout)
    if(close){
        setTimeout(function(){
            Indicator.close()
        },0)
    }
    if(str){
        document.getElementById(str).style.height  = window.innerHeight + "px";
    }
}

var app = new Vue({
  router:router
});
app.$mount('#app');