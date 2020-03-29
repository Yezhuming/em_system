<template>
  <div class="admin-index">
    <el-container>
      <div class="admin-header">
        <Header />
      </div>
      <div class="admin-container">
        <el-aside class="admin-aside">
          <navMenu />
        </el-aside>
        <el-main>
          <div class="admin-main">
            <router-view></router-view>
          </div>
        </el-main>
      </div>
    </el-container>
  </div>
</template>

<script>
import Header from '../../components/header.vue'
import navMenu from '../../components/navMenu.vue'

export default {
  components: {
    Header,
    navMenu
  }
}
</script>

<style lang="scss">
  .admin-index{
    height: 100%;
    .el-header{
      padding: 0;
    }
    .el-container{
      height: 100%;
      flex-direction: column;
    }
    .el-main{
      background-color: #CCCCCC;
    }
  }
  .admin-container{
    display: flex;
    flex-direction: row;
    height: 100%;
  }
  .admin-aside{
    width: 200px !important;
    background-color: #545c64;
  }
</style>
