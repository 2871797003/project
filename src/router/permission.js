import router from "./index"
import {getToken} from "@/utils/auth"
router.beforeEach((to,from,next)=>{
    const hasToken=getToken()
    if(hasToken){
        if(to.path==="/login"){
            next({path:"/"})
        }else{
            next()
        }
    }else{
        if(to.path==="/login"){
            next()
        }else{
            next({path:"/login"})
        }
    }
})