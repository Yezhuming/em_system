<template>
  <page class="adscroe-details">
    <el-page-header @back="goBack" content="作业批改"></el-page-header>
    <el-table
      :data="scoreData"
      border
      tooltip-effect="light"
      header-cell-class-name="bgblue"
      max-height="500">
      <el-table-column label="实验项目" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.experimentName.slice(scope.row.experimentName.indexOf('-')+1)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="class" label="学生班级" align="center" min-width="60" show-overflow-tooltip></el-table-column>
      <el-table-column prop="grade" label="学生年级" align="center" min-width="40" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="学生姓名" align="center" min-width="50" show-overflow-tooltip></el-table-column>
      <el-table-column prop="account" label="学生学号" align="center" min-width="50" show-overflow-tooltip></el-table-column>
      <el-table-column prop="status" label="作业状态" align="center" min-width="40">
        <template slot-scope="scope">
              <el-tag type="danger" effect="dark" v-show="scope.row.status==0">未提交</el-tag>
              <el-tag v-show="scope.row.status==1">已提交</el-tag>
              <el-tag type="success" effect="dark" v-show="scope.row.status==2">已批改</el-tag>
            </template>
      </el-table-column>
      <el-table-column prop="score" label="成绩" align="center" min-width="30"></el-table-column>
      <el-table-column label="操作" align="center" min-width="40">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="showCheckDialog(scope.row)">评 分</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="批改作业"
      :visible.sync="checkDialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="23%">
      <el-form :model="checkForm">
        <el-form-item label="学生作业：">
          <el-link type="primary" @click="download">{{checkForm.submitFile.slice(checkForm.submitFile.indexOf('-')+1)}}</el-link>
        </el-form-item>
        <el-form-item label="分数：">
          <el-input-number v-model="checkForm.score" :min="0" :max="100"></el-input-number>
        </el-form-item>
        <el-form-item label="评语：">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入评语"
            v-model="checkForm.comment">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="checkDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="check">确 定</el-button>
      </div>
    </el-dialog>
  </page>
</template>

<script>
export default {
  data() {
    return {
      scoreData: [],
      checkDialogVisible: false,
      checkForm: {
        eID: '',
        sID: '',
        submitFile: '',
        score: '',
        comment: ''
      }
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    getScoreData() {
      this.$axios.get('/score/getByeIDAndClassAndGrade', {
        params: {
          eID: this.$route.query.eID,
          class: this.$route.query.class,
          grade: this.$route.query.grade
        }
      }).then(res => {
        console.log(res)
        if (res.data.status == 200) {
          this.scoreData = res.data.result
        } else {
          this.scoreData = []
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 打开评分对话框
    showCheckDialog(row) {
      if (row.status != 0) {
        this.checkDialogVisible = true
        this.checkForm.eID = row.eID
        this.checkForm.sID = row.sID
        this.checkForm.submitFile = row.submitFile.substr(7)
        this.checkForm.score = row.score
        this.checkForm.comment = row.comment
      } else {
        this.$message.error('该学生尚未提交作业！')
      }
    },
    download() {
      window.open(`http://localhost:8081/${this.checkForm.submitFile}`)
    },
    check() {
      if (this.checkForm.score) {
        this.$axios.post('/score/check', {
          eID: this.checkForm.eID,
          sID: this.checkForm.sID,
          score: this.checkForm.score,
          comment: this.checkForm.comment
        }).then(res => {
          if (res.data.status == 200) {
            this.$message.success(res.data.result)
            this.getScoreData()
            this.checkDialogVisible = false
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.$message.error('请选择一个分数')
      }
    }
  },
  created() {
    this.getScoreData()
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
  .el-dialog__body{
    padding: 10px 20px;
  }
  .el-form{
    width: 300px;
  }
}
</style>
