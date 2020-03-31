<template>
  <div class="index">
    <el-container>
      <div class="header">
        Header
      </div>
      <div class="container">
        <el-aside class="aside" v-show="this.$route.path!='/'">
          aside
        </el-aside>
        <el-main>
          <div class="main">
            <!-- <transition name="move" mode="out-in"><router-view></router-view></transition> -->
            main
          </div>
        </el-main>
      </div>
      <div class="footer">
        footer
      </div>
    </el-container>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss">
  .index{
    height: 100%;
    width: 1100px;
    margin: 0 auto;
    background-color: white;
    .el-container{
      flex-direction: column;
    }
  }
</style>
