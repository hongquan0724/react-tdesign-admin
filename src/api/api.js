import {request} from "@/common/request.js"

export default {
    login:{
        loginurl:data=>request({url:'login',data})
    },
    menu:{
        menulisturl:data=>request({url:'menulist',data})
    },
    home:{
        tablelisturl:data=>request({url:"transaction/list",data})
    }
}
