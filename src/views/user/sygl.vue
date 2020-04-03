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
  .sygl-nav{
    width: 200px;
    min-height: 450px;
    background-color: #f0f8ff;
  }
  .sygl-main{
    width: 900px;
    padding: 10px 20px;
  }
  .nav-header{
    background-color: aliceblue;
    color: #000;
    border-bottom: dotted 1px #000;
    padding: 5px 0 5px 5px;
  }
  .nav-main{
    .el-menu{
      border: 0;
    }
    .el-menu-item{
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 16px;
    }
  }
  .main-header{
    border-bottom: solid 1px #000;
    height: 30px;
    line-height: 30px;
    margin-bottom: 10px;
  }
  .main-content{
    padding: 0 30px;
    h3{
      text-align: center;
      margin-top: 0;
    }
    .paragraph{
      text-indent: 2em;
      line-height: 25px;
      margin: 0;
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
