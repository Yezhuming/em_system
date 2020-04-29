<template>
  <page class="adattendance" title="考勤管理">
    <el-form inline :model="searchForm" ref="searchForm">
      <el-form-item prop="gradeAndClass">
        <el-select v-model="searchForm.gradeAndClass" placeholder="请选择班级">
          <el-option v-for="item in classList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item porp="value" prop="value">
        <el-input v-model="searchForm.value" placeholder="请输入学号或姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查 询</el-button>
        <el-button @click="reset">重 置</el-button>
      </el-form-item>
      <el-form-item style="float:right;">
        <el-button type="primary" @click="exportExcel">导出表格</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="attendanceTable"
      :data="attendanceData"
      border
      header-cell-class-name="bgblue"
      max-height="450">
      <el-table-column prop="grade" label="学生年级" align="center"></el-table-column>
      <el-table-column prop="class" label="学生班级" align="center"></el-table-column>
      <el-table-column prop="name" label="学生姓名" align="center"></el-table-column>
      <el-table-column prop="account" label="学生学号" align="center"></el-table-column>
      <el-table-column prop="loginTimes" label="登录次数" align="center"></el-table-column>
      <el-table-column label="最近一次登录日期" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.lastLoginDate != null">{{ scope.row.lastLoginDate }}</span>
          <span v-else>暂未登录</span>
        </template>
      </el-table-column>
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
        gradeAndClass: '',
        value: ''
      },
      classList: [],
      attendanceData: []
    }
  },
  methods: {
    // 查询
    search() {
      if (this.searchForm.gradeAndClass || this.searchForm.value) {
        this.$axios.get('/attendance/search', {
          params: {
            gradeAndClass: this.searchForm.gradeAndClass,
            value: this.searchForm.value
          }
        }).then(res => {
          if (res.data.status == 200) {
            this.attendanceData = res.data.result
            this.$refs.attendanceTable.bodyWrapper.scrollTop = 0
            this.$message.success('查询成功！')
          } else {
            this.attendanceData = []
            this.$message.error(res.data.result)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    reset() {
      this.$refs.searchForm.resetFields()
      this.getAttendanceData()
    },
    // 导出表格
    exportExcel() {
      this.$axios.post('/attendance/exportExcel', {
        excelData: this.attendanceData
      }).then(res => {
        if (res.data.status == 200) {
          window.open(`http://127.0.0.1:8081${res.data.path}`)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    toDetails(row) {
      this.$router.push({name: 'adAttendanceDetails', query: {sID: row.sID}})
    },
    // 获取学生简略考勤记录
    getAttendanceData() {
      this.$axios.get('/attendance/getAll', {
        params: {
          teacher: this.$props.user.name
        }
      }).then(res => {
        console.log(res.data)
        if (res.data.status == 200) {
          this.attendanceData = res.data.result
        } else {
          this.attendanceData = []
        }
      })
    },
    getClassList() {
      this.$axios.get('/student/getClassList').then(res => {
        if (res.data.status == 200) {
          this.classList = []
          for (let i of res.data.result) {
            let obj = {
              label: `${i.grade}${i.class}`,
              value: `${i.grade}${i.class}`
            }
            this.classList.push(obj)
          }
        } else {
          this.classList = []
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created() {
    this.getAttendanceData()
    this.getClassList()
  }
}
</script>
