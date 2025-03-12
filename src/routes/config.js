const routes = {
    lists:[
        {
            path:'home',
            name: 'index',
            // component: 'home',
            meta: { title: '首页' },
        },
        {
            path:'guide',
            name: 'guide',
            // component: 'home',
            meta: { title: '引导页' },
        },
        {
            path: 'permission',
            name: 'permission',
            meta: { title: '页面权限' },
            children:[
                {
                    path: 'role',
                    name: 'role',
                    meta: { title: '角色权限' },
                },
            ]
        },
        {
            path:'components',
            name: 'components',
            // component: 'home',
            meta: { title: '组件' },
            children:[
                {
                    path:'TinymcePage',
                    name: 'TinymcePage',
                    meta: { title: '富文本编辑器' },
                },
                {
                    path:'JSONEditor',
                    name: 'JSONEditor',
                    meta: { title: 'JSONEditor' },
                },
                {
                    path: 'upload',
                    name: 'upload',
                    meta: { title: '上传图片' },
                },
                {
                    path: 'DragBoard',
                    name: 'DragBoard',
                    meta: { title: '拖拽看板' },
                },
            ]
        },
        {
            path:'charts',
            name: 'charts',
            // component: 'home',
            meta: { title: '图表' },
            children:[
                {
                    path: 'Keyboard',
                    name: 'Keyboard',
                    meta: { title: '键盘图表' },
                },
                {
                    path: 'LineMarker',
                    name: 'LineMarker',
                    meta: { title: '折线图' },
                },
                {
                    path: 'MixChart',
                    name: 'MixChart',
                    meta: { title: '混合图表' },
                },
            ]
        },
        {
            path:'article',
            name: 'article',
            // component: 'home',
            meta: { title: '文章' },
            children:[
                {
                    path: 'CreateArticle',
                    name: 'CreateArticle',
                    meta: { title: '创建文章' },
                },
                {
                    path: 'EditArticle',
                    name: 'EditArticle',
                    meta: { title: '编辑文章' },
                },
                {
                    path: 'ArticleList',
                    name: 'ArticleList',
                    meta: { title: '文章列表' },
                },
            ]
        },
        {
            path:'excel',
            name: 'excel',
            // component: 'home',
            meta: { title: 'Excel' },
            children:[
                {
                    path: 'exportExcel',
                    name: 'exportExcel',
                    meta: { title: '导出excel' },
                },
                {
                    path: 'uploadExcel',
                    name: 'uploadExcel',
                    meta: { title: '上传excel' },
                },
            ]
        },
        {
            path:'zip',
            name: 'zip',
            // component: 'home',
            meta: { title: 'Excel' },
            children:[
                {
                    path: 'ExportZip',
                    name: 'ExportZip',
                    meta: { title: '导出Zip' },
                }
            ]
        },
        {
            path:'map',
            name: 'map',
            // component: 'home',
            meta: { title: '地图' },
            children:[
                {
                    path: 'OpenLayers',
                    name: 'OpenLayers',
                    meta: { title: 'OpenLayers地图' },
                }
            ]
        },
        {
            path:'errorPage',
            name: 'errorPage',
            // component: 'home',
            meta: { title: '错误页面' },
        },
        {
            path:'*',
            name: 'errorPage',
            // component: 'home',
            meta: { title: '404' },
        },

    ]
}
export default routes
