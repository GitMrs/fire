
//设定全局变量，处理微信和ios以及pc端环境以及分享跳转问题
var g = {
    agent : navigator.userAgent,
    env : 'B',//全局浏览环境
    iOS : null,//iOSJavascriptBridge ios和js的桥对象 
    weixin : 0,
    openid : null,
    code:null
};//全局配置对象

g.setIosBridge = function(name,data,backfn){
    setupWebViewJavascriptBridge(function(bridge) {
        g.iOS = bridge;
        if(backfn){
            g.iOS.callHandler(name,data,backfn)
        }
    })
}

g.useIosBridge = function(name,data,backfn){
    if(g.iOS){
        g.iOS.callHandler(name,data,backfn) 
    }else{
        g.setIosBridge(name,data,backfn)
    }
}

g.useWxConfig = function(s,fn){//微信SDK授权函数，传入s为vue的this对象
    if(g.weixin != 1){
        var url = location.href+"";
        url = url.split('#')[0];
        s.axios({
            url:"/api/weixin/jsSdkConfig",
            params:{
              this_url:url
            }
        }).then(function(data){
            wx.config({
                debug: false,
                appId: data.data.data.appId,
                timestamp: data.data.data.timestamp,
                nonceStr: data.data.data.nonceStr,
                signature: data.data.data.signature,
                jsApiList: [
                    // 所有要调用的 API 都要加到这个列表中
                'getLocation',
                'scanQRCode',//扫码
                'chooseWXPay',
                'openLocation',//获取定位
                'onMenuShareTimeline',//朋友圈
                'onMenuShareAppMessage',//消息
                'onMenuShareQQ',//QQ
                'onMenuShareQZone',//QQ空间
                ]
            });
            wx.error(function(){
                g.weixin = 2;
            });
            wx.ready(function() {
               g.weixin = 1;
               if(fn)fn();
            });  
        })

    }else{
        if(fn)fn();
    }
}

g.getOpenID = function(s,fn){//获取openId
    var code = g.code
    s.axios({
        url:"/api/v1/hht/getOpenId",
        params:{
            code:code
        }
    })
    .then(function(data){
        g.openid = data.data.data
        if(fn)fn(data.data.data)
    })
}
g.setShare = function (s, arr) {//设置微信分享
    var logoImg = 'https://event-c2b.honghuotai.com/src/img/default/logo.png';
    g.useWxConfig(s,function(){
        wx.onMenuShareAppMessage({//分享给朋友
            title: arr[0].title, // 分享标题
            desc: arr[0].desc, // 分享描述
            link: arr[0].link, // 分享链接
            imgUrl: arr[0].img  || logoImg, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareTimeline({//分享到朋友圈
            title: arr[1].title, // 分享标题
            imgUrl: arr[1].img || logoImg, // 分享图标
            link: arr[1].link, // 分享链接
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareQQ({//分享到qq
            title: arr[2].title, // 分享标题
            desc: arr[2].desc, // 分享描述
            link: arr[2].link, // 分享链接
            imgUrl: arr[2].img || logoImg, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareQZone({
            title: arr[3].title, // 分享标题
            desc: arr[3].desc, // 分享描述
            link: arr[3].link, // 分享链接
            imgUrl: arr[3].img || logoImg, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        
    })
}

//A-- 安卓  I-- ios 其余的走浏览器默认
if(window.Android){
//========================================================================================安卓环境
    g.env = "A"//
}else if(g.agent.indexOf('Safari') == -1 && !! g.agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) && g.agent.indexOf('hht_iOS') > -1){
//========================================================================================ios环境
    g.env = "I"//
    /*与OC交互的所有JS方法都要放在此处注册，才能调用通过JS调用OC或者让OC调用这里的JS*/
    g.setIosBridge()
}else if(g.agent.indexOf('MicroMessenger') > -1){
    g.env = "W"//
}else{
     g.env = "B"//
}

function setupWebViewJavascriptBridge(callback) {//ios桥必须的函数
    /*这段函数是固定的，必须要放到js中*/
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}


