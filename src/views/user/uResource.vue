<template>
  <div class="uresource flex">
    <div class="uintroduction-nav">
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
          <el-menu-item index="template">模板表格</el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="uintroduction-main" v-show="path=='curriculum'">
      <div class="main-header">
        <span>实验室课表</span>
        <span style="float:right;">您的位置：首页 >> 实验室课表</span>
      </div>
      <div class="main-content">
      </div>
    </div>
    <div class="uintroduction-main" v-show="path=='template'">
      <div class="main-header">
        <span>模板表格</span>
        <span style="float:right;">您的位置：首页 >> 模板表格</span>
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
      path: 'curriculum'
    }
  },
  methods: {
    modifyPath(index) {
      this.path = index
    }
  }
}
</script>
