<template>
  <div id="layout">
    <el-container>
      <el-aside width="200px"><nav-left></nav-left></el-aside>
      <el-container>
        <el-header style="height: 80px;"><headers></headers></el-header>
        <el-main class="mainbg">
          <keep-alive>  
              <router-view v-if="$route.meta.keepAlive"/>
          </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"/>
          </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import headers from '@/components/header'
import navLeft from '@/components/navLeft'
// import own from './account/own'
export default {
  name: "layout",
  data() {
    return {};
  },
  methods: {},
  components:{
    navLeft,headers
  }
};
</script>
<style lang="less" scoped>
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
.mainbg{background: #f1f3f4;height: 80vh;}

</style>
