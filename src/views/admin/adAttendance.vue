<template>
  <page class="adattendance" title="考勤管理">
    <el-form inline :model="searchForm">
      <el-form-item label="班级">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
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
      max-height="380">
      <el-table-column prop="class" label="学生班级" align="center"></el-table-column>
      <el-table-column prop="name" label="学生姓名" align="center"></el-table-column>
      <el-table-column prop="number" label="学生学号" align="center"></el-table-column>
      <el-table-column prop="loginTimes" label="登录次数" align="center"></el-table-column>
      <el-table-column prop="recentLoginDate" label="最近一次登录日期" align="center"></el-table-column>
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
  data() {
    return {
      attendanceData: [
        {
          class: '网工七班',
          name: '张三',
          number: '2016218000',
          loginTimes: '10',
          recentLoginDate: '2020/3/1'
        }
      ]
    }
  },
  methods: {
    toDetails(row) {
      this.$toPage('/adIndex/adAttendanceDetails')
    }
  }
}
</script>
