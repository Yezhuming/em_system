<template>
  <div class="uintroduction flex">
    <div class="uintroduction-nav">
      <div class="nav-header">
        <i class="el-icon-office-building"></i>
        实验室概况
      </div>
      <div class="nav-main">
        <el-menu
          background-color="#f0f8ff"
          text-color="#0066CC"
          active-text-color="#0066CC"
          @select="modifyPath">
          <el-menu-item index="abstract">实验室概况</el-menu-item>
          <el-menu-item index="contact">联系方式</el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="uintroduction-main" v-show="path=='abstract'">
      <div class="main-header">
        <span>实验室概况</span>
        <span style="float:right;">您的位置：首页 >> 实验室概况</span>
      </div>
      <div class="main-content">
        <h3>实验室概况</h3>
        <p class="paragraph">华南师范大学计算机科学技术实验中心是2001年11月经广东省教育厅批准、由广东省教育厅和华南师范大学共同投资建设的省级开放型重点实验室。</p>
        <p class="paragraph">该实验中心建筑面积1064平方米，现有单价800元以上的设备771件 ，总值548.6万元，承担40门实验课程，现有专职人员有14人，其中高级职称6人。</p>
        <p class="paragraph">该中心为实验教学和科研提供了一个良好的工作场所、且在实验体系、管理模式、技术先进性和资产利用率方面达到国内高校中先进水平，同时成为广东省具有示范性意义的高校教学实验室。</p>
      </div>
    </div>
    <div class="uintroduction-main" v-show="path=='contact'">
      <div class="main-header">
        <span>联系方式</span>
        <span style="float:right;">您的位置：首页 >> 实验室概况 >> 联系方式</span>
      </div>
      <div class="main-content">
        <p>办公电话：85211353-508</p>
        <p>电子邮箱：</p>
        <p>办公地点：硬件基础实验室</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: 'abstract'
    }
  },
  methods: {
    modifyPath(index) {
      this.path = index
    }
  }
}
</script>

<style lang="scss">
.uintroduction-nav{
  width: 200px;
  min-height: 450px;
  background-color: #f0f8ff;
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
.uintroduction-main{
  width: 900px;
  padding: 10px 20px;
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
    margin-top: 0;
  }
  .paragraph{
    text-indent: 2em;
    line-height: 25px;
    margin: 0;
  }
}
</style>
