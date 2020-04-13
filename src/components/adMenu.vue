<template>
  <div class="nav-menu">
    <el-menu
      :default-active="this.$route.path"
      :default-openeds="defaultOpeneds"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router>
      <!-- 管理教师和学生信息以及权限 -->
      <el-menu-item index="/adIndex/adUser" v-if="user.role==0">
        <i class="el-icon-s-custom"></i>
        <span>用户管理</span>
      </el-menu-item>
      <el-menu-item index="/adIndex/adAccount">
        <i class="el-icon-info"></i>
        <span>账号管理</span>
      </el-menu-item>
      <el-menu-item index="/adIndex/adAnnouncement">
        <i class="el-icon-message-solid"></i>
        <span>通知公告</span>
      </el-menu-item>
      <el-submenu index='/edu'>
        <template slot="title">
          <i class="el-icon-notebook-1"></i>
          <span>教学管理</span>
        </template>
        <el-menu-item index="/adIndex/adExperiment">实验内容</el-menu-item>
        <el-menu-item index="/adIndex/adScore">成绩管理</el-menu-item>
        <el-menu-item index="/adIndex/adResource">资源管理</el-menu-item>
        <el-menu-item index="/adIndex/adAttendance">考勤管理</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultOpeneds: ['/edu'],
      user: {}
    }
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('user'))
  }
}
</script>

<style lang="scss">
  .nav-menu{
    .el-menu{
      border-right: 0;
    }
  }
</style>
