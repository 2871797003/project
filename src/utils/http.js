import service from "./service"
//get请求
export function get(url, params) {
    const config = {
        method: 'get',
        url: url
    }
    if (params) { config.params = params }
    return service(config)
}
//post请求 
export function post(url, data) {
    const config = {
        method: 'post',
        url: url
    }
    if (data) { config.data = data }
    return service(config)
}

