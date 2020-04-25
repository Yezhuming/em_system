<template>
  <page class="adattendance" title="考勤管理">
    <el-form inline :model="searchForm">
      <el-form-item label="班级">
        <el-select v-model="searchForm.gradeAndClass" placeholder="请选择">
          <el-option
            v-for="item in classList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查 询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="attendanceData"
      border
      header-cell-class-name="bgblue"
      max-height="450">
      <el-table-column prop="grade" label="学生年级" align="center"></el-table-column>
      <el-table-column prop="class" label="学生班级" align="center"></el-table-column>
      <el-table-column prop="name" label="学生姓名" align="center"></el-table-column>
      <el-table-column prop="account" label="学生学号" align="center"></el-table-column>
      <el-table-column prop="loginTimes" label="登录次数" align="center"></el-table-column>
      <el-table-column prop="lastLoginDate" label="最近一次登录日期" align="center"></el-table-column>
      <el-table-column label="详细记录" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="toDetails(scope.row)">查 看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </page>
</template>

<script>
export default {
  props: ['user'],
  data() {
    return {
      searchForm: {
        gradeAndClass: ''
      },
      classList: [],
      attendanceData: []
    }
  },
  methods: {
    toDetails(row) {
      this.$router.push({name: 'adAttendanceDetails', query: {sID: row.sID}})
    },
    getAttendanceData() {
      this.$axios.get('/attendance/getAll', {
        params: {
          teacher: this.$props.user.name
        }
      }).then(res => {
        if (res.data.status == 200) {
          this.attendanceData = res.data.result
        } else {
          this.attendanceData = []
        }
      })
    }
  },
  created() {
    this.getAttendanceData()
  }
}
</script>
