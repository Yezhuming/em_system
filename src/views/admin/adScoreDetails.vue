<template>
  <page class="adscroe-details">
    <el-page-header @back="goBack" content="作业批改"></el-page-header>
    <el-table
      :data="homeworkData"
      border
      header-cell-class-name="bgblue"
      max-height="380">
      <el-table-column prop="chapter" label="实验章节" align="center"></el-table-column>
      <el-table-column prop="class" label="学生班级" align="center"></el-table-column>
      <el-table-column prop="name" label="学生姓名" align="center"></el-table-column>
      <el-table-column prop="number" label="学生学号" align="center"></el-table-column>
      <el-table-column prop="status" label="作业状态" align="center">
        <template slot-scope="scope">
              <el-tag type="info" effect="dark" v-show="scope.row.status==0">未提交</el-tag>
              <el-tag v-show="scope.row.status==1">已提交</el-tag>
              <el-tag type="success" effect="dark" v-show="scope.row.status==2">已批改</el-tag>
            </template>
      </el-table-column>
      <el-table-column prop="score" label="成绩" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">批 改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </page>
</template>

<script>
export default {
  data() {
    return {
      homeworkData: [
        {
          chapter: '实验一 运算器组成原理',
          class: '网络工程七班',
          name: '张三',
          number: '20162180100',
          status: 1,
          score: 100
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
.adscroe-details{
  .el-page-header{
    margin-bottom: 20px;
  }
  .el-page-header__title{
    font-size: 16px;
  }
}
</style>
