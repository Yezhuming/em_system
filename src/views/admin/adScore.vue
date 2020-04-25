<template>
  <page class="score" title="成绩管理">
    <el-form inline :model="searchForm" ref="searchForm">
      <el-form-item label="实验项目" prop="eID">
        <el-select v-model="searchForm.eID" placeholder="请选择">
          <el-option
            v-for="item in experimentList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班级" prop="class">
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
        <el-button type="primary" @click="search">查 询</el-button>
        <el-button @click="reset">重 置</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="classSubmissionData"
      border
      tooltip-effect="light"
      header-cell-class-name="bgblue"
      max-height="450">
      <el-table-column label="实验项目" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.experimentName.substr(0, scope.row.experimentName.indexOf('-'))}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="class" label="班级" align="center" min-width="50" show-overflow-tooltip></el-table-column>
      <el-table-column prop="grade" label="年级" align="center" min-width="25" show-overflow-tooltip></el-table-column>
      <el-table-column prop="deadline" label="截止日期" align="center" min-width="50" show-overflow-tooltip></el-table-column>
      <el-table-column label="已提交/未提交" align="center" min-width="50">
        <template slot-scope="scope">
          <span style="color:#409eff;">{{scope.row.submittedNum}}</span> / <span style="color:#f56c6c;">{{scope.row.unsubmittedNum}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="50">
        <template slot-scope="scope">
          <el-button type="primary" @click="toDetail(scope.row)">查 看</el-button>
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
      experimentList: [],
      classList: [],
      searchForm: {
        eID: '',
        gradeAndClass: ''
      },
      classSubmissionData: []
    }
  },
  methods: {
    // 查询
    search() {
      if (this.searchForm.eID || this.searchForm.gradeAndClass) {
        this.$axios.get('/classSubmission/searchByeIDOrClass', {
          params: {
            eID: this.searchForm.eID,
            gradeAndClass: this.searchForm.gradeAndClass
          }
        }).then(res => {
          if (res.data.status == 200) {
            this.classSubmissionData = res.data.result
            this.$message.success('查询成功！')
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.$message.error('请选择实验项目或班级！')
      }
    },
    // 重置
    reset() {
      this.$refs.searchForm.resetFields()
      this.getClassSubmissionData()
    },
    toDetail(row) {
      this.$router.push({
        name: 'adScoreDetails',
        query: {
          eID: row.eID,
          class: row.class,
          grade: row.grade
        }
      })
    },
    // 获取实验选项
    getExperimentList() {
      this.$axios.get('/classSubmission/getExperimentList', {
        params: {
          teacher: this.$props.user.name
        }
      }).then(res => {
        if (res.data.status == 200) {
          let obj = {}
          for (let i of res.data.result) {
            obj.label = i.experimentName.substr(0, i.experimentName.indexOf('-'))
            obj.value = i.eID
            this.experimentList.push(obj)
            obj = {}
          }
        } else {
          this.experimentList = []
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取班级选项
    getClassList() {
      this.$axios.get('/classSubmission/getClassList', {
        params: {
          teacher: this.$props.user.name
        }
      }).then(res => {
        if (res.data.status == 200) {
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
    },
    // 获取各班级实验提交数据
    getClassSubmissionData() {
      this.$axios.get('/classSubmission/getAll', {
        params: {
          teacher: this.$props.user.name
        }
      }).then(res => {
        if (res.data.status == 200) {
          this.classSubmissionData = res.data.result
        } else {
          this.classSubmissionData = []
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created() {
    this.getExperimentList()
    this.getClassList()
    this.getClassSubmissionData()
  }
}
</script>
