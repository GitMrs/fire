/**
 * /
 * @author xujw 2017-07-04
 * @param  vue过滤器，自定义指令等工具类
 * @return 
 */

export default{
    install:function(Vue){
        /**
         * /
         * 自定义指令
         * 
        */

        //图片默认图显示
       Vue.directive('defaultimg', function(el,bind,vnode,oldVnode){
            var obj = bind.modifiers
            if(obj.reslist){
                //餐厅列表图
                el.src = '/src/img/default/reslist.png'
            }else if(obj.resdetail){
                //餐厅详情大图
                el.src = '/src/img/default/redetail.png'
            }else if(obj.orderlist){
                //订单列表图
                el.src = '/src/img/default/orderlist.png'
            }else if(obj.orderdetail){
                //订单详情图
               el.src = '/src/img/default/orderdetail.png'
            }else if(obj.headimg){
                //用户头像
               el.src = '/src/img/default/head.png'
            }else if(obj.swiper){
                //用餐类型
               el.src = '/src/img/default/type.png'
            }else if(obj.enterlogo){
                //用餐类型
               el.src = '/src/img/default/enterMoney.png'
            }
            var image = new Image();
            image.src = bind.value
            image.onload = function(){
                el.src = bind.value
            }.bind(this);
            
        }),
       /**
         * /
         * 自定义过滤器
         * 
        */

        //0 1 转换函数，0返回无，1返回有
        Vue.filter('what', function (value) {
          return value == 0 ? '无' : '有' ;
        }),
        //有无包房，0-有，1-无
        Vue.filter('rooms', function (value) {
          return value == 0 ? '有包房' : '无包房' ;
        }),
        //时间转换函数 输入为时间戳 输出为 0000-00-00 00:00
        Vue.filter('timeChangeYMDHM', function (time) {
            if(!time) return ''
            var str = "";
            var t = new Date(time)
            str += a(t.getFullYear())  + "-"
            str += a(t.getMonth() +1)  + "-"
            str += a(t.getDate()) + "  "
            str += a(t.getHours()) + ":"
            str += a(t.getMinutes())
            function a(t){
                if(t > 9 ){
                    return t;
                }else{
                    return "0" + t
                }
            }
            return str ;
        }),
        //时间转换函数 输入为时间戳 输出为 00-00 00:00
        Vue.filter('timeChangeMDHM', function (time) {
            if(!time) return ''
            var str = "";
            var t = new Date(time)
            str += a(t.getMonth() +1)  + "-"
            str += a(t.getDate()) + "  "
            str += a(t.getHours()) + ":"
            str += a(t.getMinutes())
            function a(t){
                if(t > 9 ){
                    return t;
                }else{
                    return "0" + t
                }
            }
            return str ;
        }),
        //时间转换函数 输入为时间戳 输出为 0000-00-00
        Vue.filter('timeChangeYMD', function (time) {
            if(!time) return ''
            var str = "";
            var t = new Date(time)
            str += a(t.getFullYear())  + "-"
            str += a(t.getMonth() +1)  + "-"
            str += a(t.getDate()) + "  "
            function a(t){
                if(t > 9 ){
                    return t;
                }else{
                    return "0" + t
                }
            }
            return str ;
        }),
        //时间转换函数 输入为时间戳 输出为 00月00日 00:00
        Vue.filter('timeChangeMDHMCN', function (time) {
            if(!time) return ''
            var str = "";
            var t = new Date(time)
            str += a(t.getMonth() +1)  + "月"
            str += a(t.getDate()) + "日  "
            str += a(t.getHours()) + ":"
            str += a(t.getMinutes())
            function a(t){
                if(t > 9 ){
                    return t;
                }else{
                    return "0" + t
                }
            }
            return str ;
        }),
        //金额转换函数 输入为Number 输出为 100.00
        Vue.filter('moneyChange', function (money) {
            if(typeof(money) == 'number')return money.toFixed(2)
                return '0.00'
        }),
        //订单状态数字转成对应含义
             /**
                订单状态 ：
                0-预约中，1-服务中，2-已完成，3-已取消，4-预约成功 （商家端：待服务）
                5- 预约失败（超时未接单） 6;预约失败（餐厅拒接），7-超时未到店,8-待付款 9-支付失败
            */
        Vue.filter('orderStatus', function (s) {
            if(s == 0){
                return "预约中"
            }else if(s == 1){
                return "服务中"
            }else if(s == 2 || s == 10){
                return "已完成"
            }else if(s == 3){
                return "已取消"
            }else if(s == 4){
                return "预约成功"
            }else if(s == 5){
                return "预约失败"
            }else if(s == 6){
                return "预约失败"
            }else if(s == 7){
                return "超时未到店"
            }else if(s == 8){
                return "待付款"
            }else if(s == 9){
                return "支付失败"
            } 
        }),
        //申请单状态数字转成对应含义
             /**
                申请单状态：0-申请中，1-申请通过，2-申请未通过，3-订单已取消
            */
        Vue.filter('applyStatus0', function (s) {
            if(s == 0){
                return "待审批"
            }else if(s == 1){
                return "已同意"
            }else if(s == 2 ){
                return "已拒绝"
            }else if(s == 3){
                return "已取消"
            }
        }),
        Vue.filter('applyStatus1', function (s) {
            if(s == 0){
                return "待审批"
            }else if(s == 1){
                return "申请成功"
            }else if(s == 2 ){
                return "申请失败"
            }else if(s == 3){
                return "已取消"
            }
        }),
        //订单申请类型态数字转成对应含义
             /**
                0 -- 普通申请，超额特批
                1 -- 代领导下单，特事特批
            */
        Vue.filter('applyOrderType', function (s) {
            if(s == 0){
                return "普通申请，超额特批"
            }else if(s == 1){
                return "代领导下单，特事特批"
            }else if(s == -1){
                return "请选择"
            }
        }),
        //订单申请单状态数字转成对应含义
             /**
                0 -- 普通申请，超额特批
                1 -- 代领导下单，特事特批
            */
        Vue.filter('applyOrderStatus', function (s) {
            if(s == 1){
                return "完成审批，同意该请求"
            }else if(s == 2){
                return "完成审批，拒绝该请求"
            }else if(s == 3){
                return "订单已取消，无需审批费用申请"
            }
        })
    }
}
