<template>
  <div>
      <el-menu background-color="#001529" text-color="#fff" :router="true">
           <menus v-for="item in navdata" :key="item.url" :menu="item"></menus>
      </el-menu>
  </div>
</template>

<script>
import {get} from '@/utils/http'
import menus from './menu'
export default {
    data(){
        return {
            navdata:[]
        }
    },
    mounted(){
        get("/menu").then((res)=>{
            this.navdata=res.data
        })
    },
    components:{
        menus
    }

};
</script>

<style scoped>
    .el-menu{height: 100vh;}
   
</style>