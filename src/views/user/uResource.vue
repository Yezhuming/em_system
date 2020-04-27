<template>
  <div class="uresource flex">
    <div class="sygl-nav">
      <div class="nav-header">
        <i class="el-icon-download"></i>
        资源下载
      </div>
      <div class="nav-main">
        <el-menu
          background-color="#f0f8ff"
          text-color="#0066CC"
          active-text-color="#0066CC"
          @select="modifyPath">
          <el-menu-item index="curriculum">实验室课表</el-menu-item>
          <el-menu-item index="template">教学资源</el-menu-item>
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
      title: '实验室课表'
    }
  },
  methods: {
    modifyPath(index) {
      this.$router.push({name: 'uResourceList', params: {type: index}})
      this.title = index == 'curriculum' ? '实验室课表' : '教学资源'
    }
  }
}
</script>
