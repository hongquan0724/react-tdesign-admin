
var Random = Mock.Random
Mock.setup({
    timeout: '200-600'
})
const loginData = Mock.mock('/mock/login','post',{
    data:{
        username:'admin',
        name:Random.name(),
        userid:"@id"
    },
    token:'joaaohiefuopieeaskfoefeop',
    code:200,
    message:'ok'
})
const menuData = Mock.mock('/mock/menulist','post',{
    code:200,
    message:'ok',
    MenuList:[
        {
        MenuName:'首页',
        MenuCode:'A001',
        IsShow:'1',
        Icon:'home',
        Closeable:'0',
        MenuUrl:'home',
        },
        {
            MenuName:'引导页',
            MenuCode:'A008',
            IsShow:'1',
            Icon:'send',
            Closeable:'1',
            MenuUrl:'guide',
        },
        {
            MenuName:'页面权限',
            MenuCode:'A002',
            IsShow:'1',
            Icon:'setting-1',

            SubMenuList:[{
                MenuName:'角色权限',
                MenuCode:'A002001',
                IsShow:'1',
                Icon:'',
                Closeable:'1',
                MenuUrl:'permission/role',
            }]
        },
        {
            MenuName:'组件',
            MenuCode:'A003',
            IsShow:'1',
            Icon:'adjustment',

            SubMenuList:[
                {
                    MenuName:'富文本编辑器',
                    MenuCode:'A003001',
                    IsShow:'1',
                    Icon:'',
                    Closeable:'1',
                    MenuUrl:'components/TinymcePage',
                },
                {
                    MenuName:'JSON Editor',
                    MenuCode:'A003002',
                    IsShow:'1',
                    Icon:'',
                    Closeable:'1',
                    MenuUrl:'components/JSONEditor',
                },
                {
                    MenuName:'Upload',
                    MenuCode:'A003003',
                    IsShow:'1',
                    Icon:'',
                    Closeable:'1',
                    MenuUrl:'components/upload',
                },
                {
                    MenuName:'DragBoard',
                    MenuCode:'A003004',
                    IsShow:'1',
                    Icon:'',
                    Closeable:'1',
                    MenuUrl:'components/DragBoard',
                },
            ]
        },
        {
            MenuName:'图表',
            MenuCode:'A004',
            IsShow:'1',
            Icon:'map',
            SubMenuList:[
                {
                    MenuName:'键盘图表',
                    MenuCode:'A004001',
                    IsShow:'1',
                    Icon:'',
                    Closeable:'1',
                    MenuUrl:'charts/Keyboard',
                },
                {
                    MenuName:'折线图',
                    MenuCode:'A004002',
                    IsShow:'1',
                    Icon:'',
                    Closeable:'1',
                    MenuUrl:'charts/LineMarker',
                },
                {
                    MenuName:'混合图表',
                    MenuCode:'A004003',
                    IsShow:'1',
                    Icon:'',
                    Closeable:'1',
                    MenuUrl:'charts/MixChart',
                },
            ]
        },
        {
            MenuName:'文章',
            MenuCode:'A005',
            IsShow:'1',
            Icon:'radar',
            SubMenuList:[
                {
                    MenuName:'创建文章',
                    MenuCode:'A005001',
                    IsShow:'1',
                    Icon:'',
                    Closeable:'1',
                    MenuUrl:'article/CreateArticle',
                },
                {
                    MenuName:'文章列表',
                    MenuCode:'A005002',
                    IsShow:'1',
                    Icon:'',
                    Closeable:'1',
                    MenuUrl:'article/ArticleList',
                },
            ]
        },
        {
            MenuName:'Excel',
            MenuCode:'A006',
            IsShow:'1',
            Icon:'radar',
            SubMenuList:[
                {
                    MenuName:'导出Excel',
                    MenuCode:'A006001',
                    IsShow:'1',
                    Icon:'',
                    Closeable:'1',
                    MenuUrl:'excel/exportExcel',
                },
                {
                    MenuName:'上传Excel',
                    MenuCode:'A006002',
                    IsShow:'1',
                    Icon:'',
                    Closeable:'1',
                    MenuUrl:'excel/uploadExcel',
                }
            ]
        },
        {
            MenuName:'Zip',
            MenuCode:'A007',
            IsShow:'1',
            Icon:'folder-add',
            SubMenuList:[
                {
                    MenuName:'导出Zip',
                    MenuCode:'A007001',
                    IsShow:'1',
                    Icon:'',
                    Closeable:'1',
                    MenuUrl:'zip/ExportZip',
                },
            ]
        },
        {
            MenuName:'地图',
            MenuCode:'A010',
            IsShow:'1',
            Icon:'folder-add',
            SubMenuList:[
                {
                    MenuName:'OpenLayers',
                    MenuCode:'A010001',
                    IsShow:'1',
                    Icon:'',
                    Closeable:'1',
                    MenuUrl:'map/OpenLayers',
                },
            ]
        },
        {
            MenuName:'错误页面',
            MenuCode:'A009',
            IsShow:'1',
            Icon:'data-error',
            Closeable:'1',
            MenuUrl:'errorPage',
        },
    ]
})
const list = Mock.mock('/mock/transaction/list','post',{
    "code": 200,
    "data": {
        "total": 20,
        "items": [
            {
                "order_no": "CdEa19e6-39fc-Cb94-7BfE-Ac8EBbc4ABc8",
                "timestamp": 1394235293102,
                "username": "Steven Miller",
                "price": 4481.17,
                "status": "success"
            },
            {
                "order_no": "F4d5AEd4-4dCE-bFD3-bEF4-DA2dd65EdfB5",
                "timestamp": 1394235293102,
                "username": "Donna Young",
                "price": 8870.8,
                "status": "success"
            },
            {
                "order_no": "7C2d2B17-24E6-1Bf2-5caa-bBB7ADFf312B",
                "timestamp": 1394235293102,
                "username": "Joseph Wilson",
                "price": 9642.57,
                "status": "success"
            },
            {
                "order_no": "1f15208C-DCa6-8CE8-eCdE-BfBCFB9aCCCd",
                "timestamp": 1394235293102,
                "username": "Laura Lewis",
                "price": 12225,
                "status": "pending"
            },
            {
                "order_no": "fB6DCbC3-f86d-7F1f-62Eb-43634c7c5Acc",
                "timestamp": 1394235293102,
                "username": "Timothy Rodriguez",
                "price": 14316,
                "status": "success"
            },
            {
                "order_no": "F30e16Bf-C132-42fe-3f4A-eD2Ea6b7366e",
                "timestamp": 1394235293102,
                "username": "Margaret Moore",
                "price": 2343,
                "status": "success"
            },
            {
                "order_no": "0f5B2eB8-Fada-AD5f-E95a-90cf5F92E744",
                "timestamp": 1394235293102,
                "username": "Betty Gonzalez",
                "price": 11835.37,
                "status": "success"
            },
            {
                "order_no": "cACad0A8-bEEd-7599-D6f0-28Fe2ED8F563",
                "timestamp": 1394235293102,
                "username": "Mark White",
                "price": 11778.37,
                "status": "pending"
            },
            {
                "order_no": "a131544c-A482-Cbe4-d3c1-E8B7DbefA7BD",
                "timestamp": 1394235293102,
                "username": "Joseph Gonzalez",
                "price": 3307.7,
                "status": "success"
            },
            {
                "order_no": "9FaCcDa4-E629-0f59-3444-3E1f7dFdCc7d",
                "timestamp": 1394235293102,
                "username": "Helen Davis",
                "price": 7083.2,
                "status": "pending"
            },
            {
                "order_no": "4e0e971E-7CDc-EFeF-8C51-3cEdDC469F82",
                "timestamp": 1394235293102,
                "username": "Betty Smith",
                "price": 4881.33,
                "status": "success"
            },
            {
                "order_no": "7DA1DE24-c47e-cffC-63eA-1E2AFdE35BBC",
                "timestamp": 1394235293102,
                "username": "Kimberly Robinson",
                "price": 10112,
                "status": "pending"
            },
            {
                "order_no": "DEACc62b-62a8-b8Bb-1DF7-F5F77B1cb6D2",
                "timestamp": 1394235293102,
                "username": "Joseph Lee",
                "price": 1480,
                "status": "success"
            },
            {
                "order_no": "A7E4Ebf9-2BA1-b6BA-8585-3DA6F6e85aeC",
                "timestamp": 1394235293102,
                "username": "Thomas Thomas",
                "price": 9236,
                "status": "success"
            },
            {
                "order_no": "48bDcD31-b47b-Fe71-FBb4-5CAC475B130f",
                "timestamp": 1394235293102,
                "username": "Anna White",
                "price": 1618,
                "status": "success"
            },
            {
                "order_no": "f306c7ff-9df2-94Eb-FdFf-cFd2c4360d77",
                "timestamp": 1394235293102,
                "username": "David Martinez",
                "price": 14459,
                "status": "success"
            },
            {
                "order_no": "847Cc1A4-1BC5-BBfA-72E1-a18AB6f1c35F",
                "timestamp": 1394235293102,
                "username": "Timothy Thompson",
                "price": 9375,
                "status": "pending"
            },
            {
                "order_no": "b9c8ADA3-F32f-10ef-C645-1dD1Da7ABDf4",
                "timestamp": 1394235293102,
                "username": "Donald Lopez",
                "price": 4794,
                "status": "success"
            },
            {
                "order_no": "A99A9F17-C83A-a965-e3B7-Cf3Ac47575e8",
                "timestamp": 1394235293102,
                "username": "Dorothy Lopez",
                "price": 12011,
                "status": "success"
            },
            {
                "order_no": "fFFB52DD-BDb5-1b9D-D7AC-A65cb3729942",
                "timestamp": 1394235293102,
                "username": "Edward Lee",
                "price": 8777.43,
                "status": "pending"
            }
        ]
    }
})




const mockMap = {
    loginData,
    menuData,
    list,
}
export default mockMap
