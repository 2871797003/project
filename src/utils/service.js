import axios from "axios"
import {getToken} from "./auth"
import {Message} from "element-ui"
//请求实例
var service=axios.create({
    baseURL:"localhost:8080",
    timeout:5000
})
//请求拦截（所以请求之前要做的事）
service.interceptors.request.use((config)=>{
    if(getToken()){
        config.headers["token"]=getToken()
    }
    return config  //必须把配置信息return出去，return的数据就是请求拿到的数据
},(error)=>{
    return Promise.reject(error)
})
//响应拦截（拿到数据之前要做的事）
service.interceptors.response.use((response)=>{
    const res=response.data
    if(res.success){
        return res    //返回成功数据
    }else{
        Message.error(res.message||"请求错误");
        return Promise.reject(res)   //返回失败数据，catch函数里面调用
    }
},(error)=>{
    Message.error(error.data.message||"请求错误");
    return Promise.reject(error)
})
export default service