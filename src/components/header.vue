<template>
  <div class="header">
    <div class="header-title">
      <el-image :src="headerImg"></el-image>
      <div class="title-word">计算机组成原理实验平台</div>
    </div>
    <el-menu
      mode="horizontal"
      class="header-menu"
      :default-active="activeRoute"
      background-color="#0066CC"
      text-color="#fff"
      active-text-color="#fff"
      router>
      <el-menu-item index="/uIndex">首页</el-menu-item>
      <el-menu-item index="/uIntroduction">实验室概况</el-menu-item>
      <el-menu-item index="/uNotice/uNoticeList/notice">通知公告</el-menu-item>
      <el-menu-item index="/uExperiment/uExperimentList/courseIntro">实验相关</el-menu-item>
      <el-menu-item index="/uResource/uResourceList/curriculum">资源下载</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import headerImg from '../assets/contentlogo.png'

export default {
  data() {
    return {
      headerImg: headerImg
    }
  },
  computed: {
    activeRoute() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss">
  .header-menu{
    display: flex;
    justify-content: space-between;
    .el-menu-item{
      font-size: 18px;
    }
  }
  .header-title{
    width: 1100px;
    height: 150px;
    position: relative;
    background: url('../assets/background.jpg') no-repeat right center;
    .el-image{
      transform: translate(20px,50px);
    }
  }
  .title-word{
    display: inline-block;
    font-size: 35px;
    color: #3d6ddc;
    transform: translate(50px,30px);
  }
</style>
