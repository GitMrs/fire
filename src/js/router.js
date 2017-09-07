//app顶层控制器
const app = function(r){require.ensure([],function(){r(require('./../components/app.vue'));},'app')}

//banner图跳转企业介绍页面
const banner_company_introduction = function(r){require.ensure([],function(){r(require('./../components/banner_company_introduction/index.vue'));},'banner_company_introduction')}


//默认图
const defaultUrl = function(r){require.ensure([],function(){r(require('./../components/default/index.vue'));},'defaultUrl')}


//网络连接错误
// import Timeout from './../components/independent/timeout.vue'



export default 
[   
    {
        path: '/hht',
        component: app,
        children:
        [
            {
                name:'banner_company_introduction',
                path:'banner_company_introduction',
                component:banner_company_introduction,
                alias:"/banner_company_introduction"
            },
            {
                name:'defaultUrl',
                path:'defaultUrl',
                component:defaultUrl,
                alias:"/defaultUrl"
            }
        ],
    },
    {
        path: '*',
        redirect: '/hht'
    }
]
