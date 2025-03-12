
import axios from 'axios';
const instance = axios.create({
    baseURL:"/mock/",
    timeout: 1000 * 30,
});



export const request = ({method="post",url="",data={}})=>{
    return new Promise((resolve, reject)=>{
        instance({
            method,
            url,
            data,
        }).then((response)=>{
            // console.log(response);
            if(response.data.code === 200){
                resolve(response.data)
            }
        }).catch(()=>{
            reject()
        })
    })

}
