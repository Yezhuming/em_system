<template>
  <div class="sygl">
    <el-container>
      <div class="header">
        <Header />
      </div>
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
      headerImg: '',
      beforeUnload_time: ''
    }
  },
  methods: {
    beforeunloadHandler() {
      this.beforeUnload_time = new Date().getTime()
    },
    unloadHandler(e) {
      let gapTime = new Date().getTime() - this.beforeUnload_time
      if (gapTime <= 5) {
        let user = JSON.parse(sessionStorage.getItem('user'))
        if (user) {
          let quitTime = new Date().getTime()
          let params = 'quitTime=' + quitTime + '&rID=' + user.rID
          let xmlhttp = new XMLHttpRequest()
          xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
              console.log(xmlhttp.responseText)
            }
          }
          xmlhttp.open('POST', 'http://127.0.0.1:8081/attendanceRecord/update', false)
          xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
          xmlhttp.send(params)
        }
      }
    }
  },
  mounted() {
    window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
    window.addEventListener('unload', e => this.unloadHandler(e))
    this.$router.push('/uIndex')
  },
  destroyed() {
    window.removeEventListener('beforeunload', e => this.beforeunloadHandler(e))
    window.removeEventListener('unload', e => this.unloadHandler(e))
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
      margin: 0;
    }
    .date{
      margin-top: 5px;
      text-align: center;
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
