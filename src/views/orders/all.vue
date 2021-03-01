<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in breadlist" :key="index">{{
        item
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="mt">
      <el-radio-group v-model="tabPosition" style="margin-bottom:20px">
        <el-radio-button :label="1">待审核</el-radio-button>
        <el-radio-button :label="2">审核中</el-radio-button>
        <el-radio-button :label="3">审核通过</el-radio-button>
        <el-radio-button :label="4">审核拒绝</el-radio-button>
        <el-radio-button :label="5">已放款</el-radio-button>
      </el-radio-group>
      <keep-alive>
         <component :is="modules"></component>
      </keep-alive>
    </el-card>  
  </div>
</template>

<script>
import breadCrumb from "@/mixins/breadCrumb";
import tabs1 from "./tabs1";
import tabs2 from "./tabs2";
import tabs3 from "./tabs3";
import tabs4 from "./tabs4";
import tabs5 from "./tabs5";
export default {
  mixins: [breadCrumb],
  data(){
      return {
          tabPosition:"1"
      }
  },
  computed:{
      modules(){
        return 'tabs'+this.tabPosition
      }
  },
  components:{
      tabs1,tabs2,tabs3,tabs4,tabs5
  }
};
</script>

<style scoped>
</style>