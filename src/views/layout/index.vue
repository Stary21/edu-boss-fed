<template>
  <div class="layout">
    <el-container>
      <el-aside width="200px">
        <aside-list></aside-list>
      </el-aside>
<el-container>
  <el-header>Header</el-header>
  <el-main>
    <router-view></router-view>
  </el-main>
</el-container>

</el-container>
</div>
</template>

<script>
import AsideList from './component/list.vue'
export default {
  name: 'LayOut',
  components: {
    AsideList
  }
}
</script>

<style lang="scss" scoped>
.layout{
    min-width: 50vw;
}
.el-container{
    background-color: #bfc;
    height: 100vh;
}
.el-aside{
    background-color: red;
}
.el-header{
    background-color: yellow;
}
</style>
