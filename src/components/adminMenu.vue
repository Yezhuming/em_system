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
      <el-menu-item index="/admin/user">
        <i class="el-icon-s-custom"></i>
        <span @click="con">用户管理</span>
      </el-menu-item>
      <el-menu-item index="/admin/account">
        <i class="el-icon-info"></i>
        <span>账号管理</span>
      </el-menu-item>
      <el-menu-item index="/admin/notice">
        <i class="el-icon-info"></i>
        <span>通知公告</span>
      </el-menu-item>
      <el-submenu index='/edu'>
        <template slot="title">
          <i class="el-icon-notebook-1"></i>
          <span>教学管理</span>
        </template>
        <el-menu-item index="/admin/experienceContent">实验内容</el-menu-item>
        <!-- 教师才有 -->
        <el-menu-item index="/admin/score">成绩管理</el-menu-item>
        <!-- 发布实验内容ppt -->
        <el-menu-item index="/admin/resource">资源管理</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultOpeneds: ['/edu']
    }
  },
  methods: {
    con() {
      console.log(this.$router)
    }
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
