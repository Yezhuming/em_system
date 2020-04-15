<template>
  <div class="uexperiment flex">
    <div class="sygl-nav">
      <div class="nav-header">
        <i class="el-icon-notebook-2"></i>
        实验教学
      </div>
      <div class="nav-main">
        <el-menu
          background-color="#f0f8ff"
          text-color="#0066CC"
          active-text-color="#0066CC"
          @select="modifyPath">
          <el-menu-item index="courseIntro">课程介绍</el-menu-item>
          <el-menu-item index="experimentCourse">实验内容</el-menu-item>
          <el-menu-item index="onlineExperiment">在线实验</el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="sygl-main">
      <div class="main-header">
        <span>{{title}}</span>
        <span style="float:right;">您的位置：首页 >> 实验教学 >> {{title}}</span>
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
      title: '课程介绍'
    }
  },
  methods: {
    modifyPath(index) {
      switch (index) {
        case 'onlineExperiment':
          // 跳转在线实验
          break
        default :
          this.$router.push({
            name: 'uExperimentList',
            params: {
              type: index
            }
          })
          this.title = index == 'courseIntro' ? '课程介绍' : '实验内容'
      }
    }
  }
}
</script>
