<template>
  <page class="adattendance-details">
    <el-page-header @back="goBack" content="考勤记录"></el-page-header>
    <el-table
      :data="attendanceRecordsData"
      border
      header-cell-class-name="bgblue"
      max-height="500">
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
    search() {},
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
  .el-page-header{
    margin-bottom: 20px;
  }
  .el-page-header__title{
    font-size: 16px;
  }
}
</style>
