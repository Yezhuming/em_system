<template>
  <div class="uexperience flex">
    <div class="uintroduction-nav">
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
          <el-menu-item index="experienceCourse">实验课程</el-menu-item>
          <el-menu-item index="onlineExperience">在线实验</el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="uintroduction-main" v-show="path=='courseIntro'">
      <div class="main-header">
        <span>课程介绍</span>
        <span style="float:right;">您的位置：首页 >> 实验教学 >> 课程介绍</span>
      </div>
      <div class="main-content">
        <h3>计算机组成原理实验</h3>
        <p class="paragraph">“计算机组成原理”是计算机专业的一门专业基础课。本课程实践性强，因此,该实验课程必须有相应的实验平台支持，这里选用的是：TEC-4计算机组成原理实验系统。它是一个8位计算机模型实验系统，简单、实用,运算器数据通路、控制器、控制台各部分划分清晰。对提高学生的动手能力;提高学生对计算机整体和各组成部分的理解都会有很大帮助。</p>
      </div>
    </div>
    <div class="uintroduction-main" v-show="path=='experienceCourse'">
      <div class="main-header">
        <span>实验课程</span>
        <span style="float:right;">您的位置：首页 >> 实验教学 >> 实验课程</span>
      </div>
      <div class="main-content">
        <el-table
          :data="experienceData"
          style="width: 100%"
          border>
          <!-- 实验提交状态 0-未提交 1-已提交 2-已批改 -->
          <el-table-column label="状态" align="center" width="100">
            <template slot-scope="scope">
              <el-tag type="info" effect="dark" v-show="scope.row.status==0">未提交</el-tag>
              <el-tag effect="dark" v-show="scope.row.status==1">已提交</el-tag>
              <el-tag type="success" effect="dark" v-show="scope.row.status==2">已批改</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="experienceName" label="实验课程名称" align="center"></el-table-column>
          <el-table-column prop="deadline" label="截止时间" align="center" width="100"></el-table-column>
          <el-table-column prop="score" label="成绩" align="center" width="50"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="deleteRow(scope.row)" type="primary">查 看</el-button>
              <el-button @click="deleteRow(scope.row)" type="primary">提 交</el-button>
              <el-button @click="deleteRow(scope.row)" type="primary">修 改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: 'courseIntro', // 导航路径
      experienceData: [
        {
          status: 0,
          experienceName: '实验一 运算器组成原理',
          deadline: '2020/3/1',
          score: 100
        }
      ]
    }
  },
  methods: {
    modifyPath(index) {
      if (index == 'onlineExperience') {
        // 跳转在线实验网站
      } else {
        this.path = index
      }
    }
  }
}
</script>
