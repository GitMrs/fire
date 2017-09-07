<template>
    <div class="top" >
            <router-view
                @back='back'
            >
            </router-view>
    </div>
</template>

<script>
export default {
    data:function (){
        return {
           
        }
    },
    methods:{
        GetQueryString(name){  
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");  
            var r = window.location.search.substr(1).match(reg);  
            if(r!=null)return  unescape(r[2]); return null;
        },
        //返回 
        back(){
            if(g.env == 'A'){
                Android.back()
            }else if(g.env == 'I'){
                history.go(-1)
                g.useIosBridge('returnBtnCallBack',{}, function(res) {
                })
            }else{
                history.go(-1)
            }
        },
        getuserinfo(token){
            var objs = {}
            objs.token = token
            localStorage.setItem("loginData",JSON.stringify(objs))
            this.axios({
                url:"/api/v1/user/getById",
                params:{
                    port:8,// 端口号 number  1-商家端app,8-客户端app
                    token:token,//   登录标识    string   
                }
            })
            .then(function(data){
                if(g.env == 'A'){
                    Android.hideLoading()
                }else if(g.env == 'I'){
                    g.useIosBridge('loadSuccess',{}, function(res) {
                    })
                }
                var obj = data.data.data
                obj.token = token
                localStorage.setItem("loginData",JSON.stringify(obj))
                var type = this.GetQueryString('type')
                if(obj.role == 2){
                    if(type == 2){
                        this.$router.replace('orgmanage')
                        return
                    }else{
                        this.$router.replace('my_organization')
                        return
                    }
                }else if(obj.role == 8){
                    this.$router.replace('my_organization')
                    return
                }else if(obj.role == 0){
                    this.$router.replace('myorgempty')
                    return
                }
            }.bind(this))
            .catch(function(){
                if(g.env == 'A'){
                    Android.hideLoading()
                }else if(g.env == 'I'){
                    g.useIosBridge('loadSuccess',{}, function(res) {
                    })
                }
                this.$router.replace('timeout')
            }.bind(this))
        },
        init(){
            var token
            localStorage.removeItem("loginData")
            if(g.env == 'A'){
                token = Android.getUserToken()
                this.getuserinfo(token)
            }else if(g.env == 'I'){
                var s = this
                g.useIosBridge('tokenCallBack',{}, function(res) {
                    s.getuserinfo(res)
                })
            }else{
                token = this.GetQueryString('token')
                this.getuserinfo(token)
               
            }
        },
        hideLoading(){
            if(g.env == 'A'){
                Android.hideLoading()
            }else if(g.env == 'I'){
                g.useIosBridge('loadSuccess',{}, function(res) {
                })
            }else{
                this.$indicator.close()
            } 
        },
        bci(){
            this.hideLoading()
            this.$router.replace('banner_company_introduction')
        },
        defaultUrl(){
            this.hideLoading()
            this.$router.replace('defaultUrl')
        }
    },
    mounted:function(){
        this.transitionDown(this,'',false);
        var to = this.GetQueryString('a')
        switch(to)
        {
            case 'bci':
              this.bci();
              break;
            default:
              this.bci();
        }
    }
};
</script>
<style type="scss">
    @import './../scss/commen.scss';
</style>
