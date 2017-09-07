 <template>
    <div id="bannercompanyintroduction" >
        <swiper :options="swiperOption" ref="mySwiper" id='swipercontent'>
            <swiper-slide class='swiper1 ss'>
                <img src="./../../img/comment/cha.png" class="cha" v-tap='{methods:back}'>
                <div class="fadeContent">
                    <transition
                    name="fade"
                    enter-active-class="fadeIn"
                    >
                    <div class="fadeBox" v-if="show[0]" >
                        <img class="img1" :src='images[0]'>
                        <div class="content">
                            <img class="img2" :src='images[1]'>
                            <transition
                                name="fade"
                                enter-active-class="fadeIn"
                                >
                            <img class="img4" :src='images[3]' v-if="show[2]">
                            </transition>
                            <img class="img17" :src='images[17]'>
                        </div>
                    </div>   
                    </transition>
                </div>
                <transition
                        name="slide"
                        enter-active-class="slideInUp"

                >
                    <img class="img3"  :src='images[2]' v-if="show[1]">
                </transition>
                <img class="img16" :src='images[16]'>
            </swiper-slide>
            <swiper-slide class='swiper2'>
                <img src="./../../img/comment/cha.png" class="cha" v-tap='{methods:back}'>
                <transition
                        name="slide"
                        enter-active-class="slideInUp"
                >
                    <img class="img1" :src='images[4]' v-if="show[3]">
                </transition>
                <transition
                        name="slide"
                        enter-active-class="slideInUp"
                >   
                    <img class="img2" :src='images[5]' v-if="show[4]">
                </transition>
                <transition
                        name="slide"
                        enter-active-class="slideInUp"
                > 
                <img class="img3" :src='images[6]' v-if="show[5]">
                </transition>
                <img class="img16" :src='images[16]'>
            </swiper-slide>
            <swiper-slide class='swiper3'>
                <img src="./../../img/comment/cha.png" class="cha" v-tap='{methods:back}'>
                <transition
                        name="slide"
                        enter-active-class="slideInUp"
                >
                <img class="img1" :src='images[7]' v-if="show[6]">
                </transition>
                <transition
                        name="slide"
                        enter-active-class="slideInUp"
                > 
                <img class="img2" :src='images[8]' v-if="show[7]">
                </transition>
                <transition
                        name="slide"
                        enter-active-class="slideInUp"
                > 
                <img class="img3" :src='images[9]' v-if="show[8]">
                </transition>
                <img class="img16" :src='images[16]'>
            </swiper-slide>
            <swiper-slide class='swiper4'>
                <img src="./../../img/comment/cha.png" class="cha" v-tap='{methods:back}'>
                <transition
                        name="slide"
                        enter-active-class="slideInUp"
                > 
                <img class="img1" :src='images[10]' v-if="show[9]">
                </transition>
                <transition
                        name="slide"
                        enter-active-class="slideInUp"
                > 
                <img class="img2" :src='images[11]' v-if="show[10]">
                </transition>
                <transition
                        name="slide"
                        enter-active-class="slideInUp"
                > 
                <img class="img3" :src='images[12]' v-if="show[11]">
                </transition>
                <img class="img16" :src='images[16]'>
            </swiper-slide>
            <swiper-slide class='swiper5'>
                <transition
                        name="slide"
                        enter-active-class="slideInUp"
                > 
                <img class="img1" :src='images[13]' v-if="show[12]">
                </transition>
                <transition
                        name="slide"
                        enter-active-class="slideInUp"
                > 
                <img class="img2" :src='images[14]' v-if="show[11]">
                </transition>
                <transition
                        name="slide"
                        enter-active-class="slideInUp"      
                >
                <img class="img3" :src='images[15]'  v-if="show[13]" v-tap='{methods:back}'>
                </transition>
            </swiper-slide>
        </swiper>
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
    require('vue2-animate/dist/vue2-animate.min.css')
    // require("../../lib/swiper.animate1.0.2.min.js")
    import { swiper, swiperSlide } from 'vue-awesome-swiper'  
    export default {
        components:{  
            swiper,  
            swiperSlide  
        },
        data:function (){
            return {
               images: [ 
                    '/src/img/default/banner_company_introduction/page1/p1_top.png',
                    '/src/img/default/banner_company_introduction/page1/p1_middle.png',
                    '/src/img/default/banner_company_introduction/page1/p1_bottom.png', 
                    '/src/img/default/banner_company_introduction/page1/rotate.png',
                    '/src/img/default/banner_company_introduction/page2/p2_top.png',
                    '/src/img/default/banner_company_introduction/page2/p2_middle.png',
                    '/src/img/default/banner_company_introduction/page2/p2_bottom.png', 
                    '/src/img/default/banner_company_introduction/page3/p3_top.png',
                    '/src/img/default/banner_company_introduction/page3/p3_middle.png',
                    '/src/img/default/banner_company_introduction/page3/p3_bottom.png', 
                    '/src/img/default/banner_company_introduction/page4/p4_top.png',
                    '/src/img/default/banner_company_introduction/page4/p4_middle.png',
                    '/src/img/default/banner_company_introduction/page4/p4_bottom.png', 
                    '/src/img/default/banner_company_introduction/page5/p5_top.png',
                    '/src/img/default/banner_company_introduction/page5/p5_middle.png',
                    '/src/img/default/banner_company_introduction/page5/p5_bottom.png',
                    '/src/img/default/banner_company_introduction/up_swiper.png',
                    '/src/img/default/banner_company_introduction/page1/p1_content.png',
                ],
                swiperOption: {
                  initialSlide: 0,
                  height : window.innerHeight,
                  // longSwipesRatio:0.5,
                  resistanceRatio:0,
                  direction:'vertical',
                  onSlideChangeEnd: swiper => {
                    // console.log(swiper.realIndex)
                    // console.log(swiperAnimate)
                    if(swiper.realIndex==1){
                        // console.log("已经是第二页了")
                        // console.log(this)
                        // console.log(this.$el)
                        
                        
                    }
                  }
                },
                show:[],
            }
        },
        methods:{
            //预加载图片
            loadImage(){
                var n = this.images.length
                for(var i = 0; i < this.images.length ; i++){
                    var image = new Image();
                    image.src = this.images[i]
                    image.onload = function(){
                        if(--n == 0){
                            this.$indicator.close()
                        }
                    }.bind(this);
                }
            },
            back(){
                this.$emit('back')
            }
        },
        computed: {
            swiper() {  
              return this.$refs.mySwiper.swiper;  
            }  
        },
        mounted:function(){
            setInterval(function(){
                this.show.push(true)
            }.bind(this),1000)
            this.transitionDown(this,'bannercompanyintroduction',false)
            this.transitionDown(this,'swipercontent',false)
            this.loadImage()
            var link = 'https://event-c2b.honghuotai.com?a=bci'
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
