<template>
  <div class="nav-menu">
    <el-menu
      :default-active="this.$router.path"
      :default-openeds="defaultOpeneds"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router>
      <el-submenu index="/admin">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item index="/admin/teacherManagement">教师管理</el-menu-item>
        <el-menu-item index="/studentManagement">学生管理</el-menu-item>
        <el-menu-item index="/authorityManagement">权限管理</el-menu-item>
      </el-submenu>
      <el-submenu index='/undefined'>
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>教学管理</span>
        </template>
        <el-menu-item index="/undefined">课件管理</el-menu-item>
        <el-menu-item index="/undefined">资源管理</el-menu-item>
        <el-menu-item index="/undefined">课程管理</el-menu-item>
        <el-menu-item index="/undefined">作业管理</el-menu-item>
        <el-menu-item index="/undefined">作业管理</el-menu-item>
        <el-menu-item index="/undefined">作业管理</el-menu-item>
        <el-menu-item index="/undefined">作业管理</el-menu-item>
        <el-menu-item index="/undefined">作业管理</el-menu-item>
        <el-menu-item index="/undefined">作业管理</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultOpeneds: ['/admin']
    }
  },
  methods: {
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
