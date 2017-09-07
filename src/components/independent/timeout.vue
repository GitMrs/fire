<template>
   <div id="timeout">
    <headerer :img="true" :title="'网络不给力'" :backfn='goBack'></headerer>
      <div class="c">
          <img src="./../../img/timeout.png">
          <p>网络不给力呀~，点击重新加载~</p>
          <div v-tap="{methods:reflase}">刷新网络</div>
      </div>
   </div>
</template>
<script>
import headerer  from "./header.vue";
    export default {
         components:{
            headerer
        },
        data:function (){
            return {
               
            }
        },
        methods:{
            goBack:function(){
                this.$emit('back')
            },
            reflase(){
                this.$emit('init')
            }
        },
        mounted:function(){
            this.transitionDown(this,'timeout',true)
        }
    }
</script>

<style lang="sass">
@import "./../../scss/commen.scss";
#timeout{
    position:relative;
    height:100%;
    width:100%;
    .c{
        position:absolute;
        transform: translate(0,50%);
        margin:auto;
        width:100%;
        height:2.5rem;
        text-align:center;
        img{
            width:2.5rem;

        }
        p{
            margin:.4rem 0 .80rem;
            color:#999;
        }
        div{
            width:5.6rem;
            height:1.6rem;
            margin:0 auto;
            border:1px solid #ff4d4d;
            line-height:1.6rem;
            font-size:.56rem;
            transform: translate(0px,-.4rem) scale(0.5);
            color:#ff4d4d;
            border-radius:.12rem;
        }
    }
}
</style>
