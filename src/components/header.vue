<template>
  <div>
    <div>
      <div class="head">
        <el-dropdown trigger="click"  @command="loginout">
          <span class="el-dropdown-link">
            <span style="font-size:18px">欢迎您，{{nickname}}</span><i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">个人中心</el-dropdown-item>
            <el-dropdown-item command="b">修改密码</el-dropdown-item>
            <el-dropdown-item command="c">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="date">今天是你入职的第 <span>{{days}}</span> 天</div>
    </div>
  </div>
</template>

<script>
import {removeToken} from "@/utils/auth"
import {get} from "@/utils/http"
export default {
    data(){
        return {
            nickname:sessionStorage.getItem("nickname"),
            time:""
        }
    },
    methods:{
        loginout(command){
            if(command=="c"){
                removeToken()
                this.$router.push("/login");
            }
        },
    },
    mounted(){
        get("/in").then((res)=>{
            this.time=res.time
        })
    },
    computed:{
        days(){
            let start=new Date(this.time)
            let current=new Date()
            return Math.floor((current-start)/1000/60/60/24)
        }
    }
};
</script>
    
<style lang="less" scoped>
    .head,.date{float: right;line-height: 80px;margin-left:35px;cursor: pointer;}
    .date{font-size: 18px;
      span{font-size: 24px;color: #4d87ff}
    }
</style>