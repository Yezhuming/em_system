<template>
  <page class="adattendance-details">
    <el-page-header @back="goBack" content="考勤记录"></el-page-header>
    <el-table
      :data="attendanceDetailsData"
      border
      header-cell-class-name="bgblue"
      max-height="380">
      <el-table-column prop="name" label="学生姓名" align="center"></el-table-column>
      <el-table-column prop="number" label="学生学号" align="center"></el-table-column>
      <el-table-column prop="loginDate" label="登录日期" align="center"></el-table-column>
      <el-table-column prop="experimentChapter" label="实验章节" align="center"></el-table-column>
      <el-table-column prop="experimentDuration" label="实验时长" align="center"></el-table-column>
    </el-table>
  </page>
</template>

<script>
export default {
  data() {
    return {
      attendanceDetailsData: [
        {
          name: '张三',
          number: '2016218000',
          loginDate: '2020/3/1',
          experimentChapter: '实验一 运算器组成原理',
          experimentDuration: '1:30:00'
        }
      ]
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
.adattendance-details{
  .el-page-header{
    margin-bottom: 20px;
  }
  .el-page-header__title{
    font-size: 16px;
  }
}
</style>
