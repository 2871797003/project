<template>
  <div>
    <el-submenu v-if="menu.children" :index="menu.url" >
      <template slot="title" >
        <i :class="menu.icon"></i>
        <span>{{ menu.name }}</span>
      </template>
      <nav-menu v-for="item in menu.children" :key="item.url" :menu="item"></nav-menu>
    </el-submenu>
    <el-menu-item v-else :index="menu.url" > 
        <i :class="menu.icon"></i>
        <span>{{ menu.name }}</span>
    </el-menu-item>
  </div>
</template>

<script>
export default {
  name: "navMenu",
  props: {
    menu: { type: Object, required: true },
  },
};
</script>

<style scoped>
       
</style>