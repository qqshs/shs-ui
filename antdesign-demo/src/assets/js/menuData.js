const menu = [
    {
        id:'1',
        path:'',
        name:'主页',
        icon:'dashboard',
        children : [
            {
                id:'1-1',
                path:'/dashboard',
                name:'控制台'
            }
        ]
    },
    {
        id:'2',
        path:'',
        name:'个人主页',
        icon:'user',
        children : [
            {
                id:'2-1',
                path:'/userinfo',
                name:'个人信息'
            }
        ]
    },
    {
        id:'3',
        path:'',
        name:'例子页面',
        icon:'profile',
        children : [
            {
                id:'3-1',
                path:'/page/listpage',
                name:'功能主页面'
            }
        ]
    }
];
export default menu