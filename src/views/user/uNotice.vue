<template>
  <div class="unotice flex">
    <div class="sygl-nav">
      <div class="nav-header">
        <i class="el-icon-bell"></i>
        通知公告
      </div>
      <div class="nav-main">
        <el-menu
          background-color="#f0f8ff"
          text-color="#0066CC"
          active-text-color="#0066CC"
          @select="modifyPath">
          <el-menu-item index="notice">课程通知</el-menu-item>
          <el-menu-item index="announcement">系统公告</el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="sygl-main">
      <div class="main-header">
        <span>{{title}}</span>
        <span style="float:right;">您的位置：首页 >> 通知公告 >> {{title}}</span>
      </div>
      <div class="main-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '课程通知'
    }
  },
  methods: {
    modifyPath(index) {
      this.$router.push({name: 'uNoticeList', params: {type: index}})
      this.title = index == 'notice' ? '课程通知' : '系统公告'
    }
  }
  // created() {
  //   this.$router.push({name: 'uNoticeList', params: {type: 'notice'}})
  // }
}
</script>

<style lang="scss">
.main-content{
  .el-table{
    tr:hover>td {
      background-color:#fff!important
    }
  }
}
.article-title{
  cursor: pointer;
  &:hover{
    color: #66b1ff;
  }
}
</style>
