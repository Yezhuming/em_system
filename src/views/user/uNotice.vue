<template>
  <div class="unotice flex">
    <div class="uintroduction-nav">
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
    <div class="uintroduction-main" v-show="path=='notice'">
      <div class="main-header">
        <span>课程通知</span>
        <span style="float:right;">您的位置：首页 >> 通知公告 >> 课程通知</span>
      </div>
      <div class="main-content">
      </div>
    </div>
    <div class="uintroduction-main" v-show="path=='announcement'">
      <div class="main-header">
        <span>系统公告</span>
        <span style="float:right;">您的位置：首页 >> 通知公告 >> 系统公告</span>
      </div>
      <div class="main-content">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: 'notice'
    }
  },
  methods: {
    modifyPath(index) {
      this.path = index
    }
  }
}
</script>
