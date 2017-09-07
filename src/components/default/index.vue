<template>
    <div id="defaultUrl" >
        我是默认图
    </div>
</template>
<script>
 ! function() {
    function rem() {
        var height = document.documentElement.clientHeight || document.body.clientHeight;
        // if(width > 1024){
        //  width = 1024
        // }
        document.documentElement.style.fontSize = height/16.7 + 'px';
        //设置body字体大小，不影响body内字体大小
        document.body.style.fontSize = '16px';
    }
    rem();
    window.addEventListener('resize', rem, false);
}();
    export default {
        data:function (){
            return {
               
            }
        },
        methods:{
            back(){
                this.$emit('back')
            }
        },
        mounted:function(){
            this.transitionDown(this,'defaultUrl',true)
            //s, title, img, link, desc
            var link = 'https://event-c2b.honghuotai.com'
            var arr = 
            [
                {//微信好友
                    title:'红火台餐饮',
                    link:link,
                    desc:'不一样的企业用餐服务'
                },
                {//微信朋友圈
                    title:'红火台餐饮——不一样的企业用餐服务',
                    link:link,
                    desc:'不一样的企业用餐服务'
                },
                {//QQ好友
                    title:'红火台餐饮',
                    link:link,
                    desc:'不一样的企业用餐服务'
                },
                {//QQ空间
                    title:'红火台餐饮',
                    link:link,
                    desc:'不一样的企业用餐服务'
                }
            ]
            if(g.env == "W"){
                g.setShare(this,arr) 
            }
        }
    }
</script>

<style lang="sass">
@import "./index.scss";

</style>
