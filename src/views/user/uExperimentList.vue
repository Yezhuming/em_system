<template>
  <div class="uexperiment-list">
    <div v-show="type=='courseIntro'">
      <h3>计算机组成原理实验</h3>
      <p class="paragraph">“计算机组成原理”是计算机专业的一门专业基础课。本课程实践性强，因此,该实验课程必须有相应的实验平台支持，这里选用的是：TEC-4计算机组成原理实验系统。它是一个8位计算机模型实验系统，简单、实用,运算器数据通路、控制器、控制台各部分划分清晰。对提高学生的动手能力;提高学生对计算机整体和各组成部分的理解都会有很大帮助。</p>
    </div>
    <div v-show="type=='experimentCourse'">
      <el-table
        :data="experimentData.list"
        style="width: 100%"
        border
        header-cell-class-name="bgblue"
        tooltip-effect="light">
        <!-- 实验提交状态 0-未提交 1-已提交 2-已批改 -->
        <el-table-column label="状态" align="center" width="100">
          <template slot-scope="scope">
            <el-tag type="danger" v-show="scope.row.status==0">未提交</el-tag>
            <el-tag v-show="scope.row.status==1">已提交</el-tag>
            <el-tag type="success" v-show="scope.row.status==2">已批改</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="experimentName" label="实验课程名称" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="deadline" label="截止时间" align="center" min-width="50"></el-table-column>
        <el-table-column prop="score" label="成绩" align="center" min-width="20"></el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <el-button @click="toDetail(scope.row)" type="primary">查 看</el-button>
            <el-button type="primary">提 交</el-button>
            <el-button type="primary">修 改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      experimentData: {
        total: 4,
        page: 1,
        size: 4, // 一页最多4条
        list: []
      }
    }
  },
  computed: {
    type() {
      return this.$route.params.type
    }
  },
  methods: {
    toDetail(row) {
      window.open(`http://localhost:8081/experiment/${row.experimentName}`)
    },
    getExperimentData() {
      this.$axios.get('/score/getLimited', {
        params: {
          uID: this.user.uID,
          page: this.experimentData.page,
          size: this.experimentData.size
        }
      }).then(res => {
        console.log(res.data)
        if (res.data.status == 200) {
          this.experimentData.total = res.data.total
          this.experimentData.list = res.data.result
        } else {
          this.experimentData.total = 0
          this.experimentData.list = []
        }
      })
    }
  },
  created() {
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.getExperimentData()
  }
}
</script>
