<template>
  <page class="adattendance-details">
    <el-page-header @back="goBack" content="考勤记录"></el-page-header>
    <el-button type="primary" @click="exportExcel" class="export-btn">导出表格</el-button>
    <el-table
      :data="attendanceRecordsData"
      border
      header-cell-class-name="bgblue"
      max-height="530">
      <el-table-column prop="name" label="学生姓名" align="center"></el-table-column>
      <el-table-column prop="account" label="学生学号" align="center"></el-table-column>
      <el-table-column prop="loginDate" label="登录日期" align="center"></el-table-column>
      <el-table-column prop="loginDuration" label="登录时长" align="center"></el-table-column>
    </el-table>
  </page>
</template>

<script>
export default {
  data() {
    return {
      attendanceRecordsData: []
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    // 导出表格
    exportExcel() {
      if (this.attendanceRecordsData.length != 0) {
        this.$axios.post('/attendanceRecord/exportExcel', {
          excelData: this.attendanceRecordsData
        }).then(res => {
          if (res.data.status == 200) {
            window.open(`http://127.0.0.1:8081${res.data.path}`)
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.$message.error('该表格无数据！')
      }
    },
    // 获取学生详细考勤记录
    getAttendanceRecordsData() {
      this.$axios.get('/attendancerecord/getRecords', {
        params: {
          sID: this.$route.query.sID
        }
      }).then(res => {
        if (res.data.status == 200) {
          this.attendanceRecordsData = res.data.result
        } else {
          this.attendanceRecordsData = []
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created() {
    this.getAttendanceRecordsData()
  }
}
</script>

<style lang="scss">
.adattendance-details{
  position: relative;
  .el-page-header{
    margin-bottom: 20px;
  }
  .el-page-header__title{
    font-size: 16px;
  }
}
.export-btn{
  position: absolute;
  top: 15px;
  right: 20px;
}
</style>
