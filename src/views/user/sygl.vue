<template>
  <div class="sygl">
    <el-container>
      <div class="header">
        <Header />
      </div>
        <!-- <el-aside class="aside" v-show="this.$route.path!='/'">
          aside
        </el-aside> -->
      <div class="main">
        <router-view></router-view>
      </div>
      <div class="footer">
        <Footer />
      </div>
    </el-container>
  </div>
</template>

<script>
import Header from '../../components/header.vue'
import Footer from '../../components/footer.vue'

export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      headerImg: ''
    }
  },
  mounted() {
    this.$router.push('/uIndex')
  }
}
</script>

<style lang="scss">
  .sygl{
    height: 100%;
    width: 1100px;
    margin: 0 auto;
    // background-color: white;
    // position: relative;
    .el-container{
      flex-direction: column;
    }
  }
</style>

<style lang="scss" scoped>
  .footer{
    width: 1100px;
    height: 60px;
    // position: absolute;
    // bottom: 0;
  }
</style>
