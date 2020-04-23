<template>
  <page class="adnotice-announcement" title="通知公告">
    <el-form inline :model="searchForm">
      <el-form-item>
        <el-date-picker
          v-model="searchForm.date"
          type="date"
          placeholder="请选择日期"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchByDate">查 询</el-button>
        <el-button @click="reset">重 置</el-button>
      </el-form-item>
      <el-form-item style="float:right;">
        <el-button type="primary" @click="publish">发 布</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="articleData"
      border
      header-cell-class-name="bgblue"
      max-height="450">
      <el-table-column prop="title" label="标题" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="type" label="类型" align="center" min-width="50">
        <template slot-scope="scope">
          <span v-if="scope.row.type=='1'">通知</span>
          <span v-else>公告</span>
        </template>
      </el-table-column>
      <el-table-column prop="publisher" label="发布人" align="center" min-width="50"></el-table-column>
      <el-table-column prop="publishDate" label="发布日期" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="updateAnnouncement(scope.row)">编 辑</el-button>
          <el-button size="small" type="danger" @click="deleteAnnouncement(scope.row)">删 除</el-button>
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
        date: ''
      },
      articleData: []
    }
  },
  methods: {
    // 查询
    searchByDate() {
      if (this.searchForm.date) {
        this.$axios.get('/article/getListByDate', {
          params: {
            publishDate: this.searchForm.date
          }
        }).then(res => {
          if (res.data.status == 200) {
            this.articleData = res.data.result
            this.$message.success('查询成功！')
          } else {
            this.articleData = []
            this.$message.warning(res.data.result)
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.$message.error('请选择日期！')
      }
    },
    // 重置
    reset() {
      this.searchForm.date = ''
      this.getArticleData()
    },
    // 发布
    publish() {
      this.$router.push('/adIndex/adArticleDetails')
    },
    // 编辑
    updateAnnouncement(row) {
      if (this.$props.user.role == '0' || row.publisher == this.$props.user.name) {
        this.$router.push({
          name: 'adArticleDetails',
          query: {
            aID: row.aID
          },
          params: {
            form: row
          }
        })
      } else {
        this.$message.error(`您没有权限修改该${row.type == '1' ? '通知' : '公告'}`)
      }
    },
    // 删除
    deleteAnnouncement(row) {
      if (this.$props.user.role == '0' || row.publisher == this.$props.user.name) {
        this.$confirm(`确定删除该${row.type == '1' ? '通知' : '公告'}?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/article/deleteByaID', {
            aID: row.aID
          })
            .then(res => {
              if (res.data.status == 200) {
                this.getArticleData()
                this.$message.success(res.data.result)
              }
            })
            .catch(err => {
              console.log(err)
            })
        })
      } else {
        this.$message.error(`您没有权限修改该${row.type == '1' ? '通知' : '公告'}`)
      }
    },
    // 获取全部数据
    getArticleData() {
      this.$axios.get('/article/getAll')
        .then(res => {
          if (res.data.status == 200) {
            this.articleData = res.data.result
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    this.getArticleData()
  }
}
</script>

<style lang="scss">
.adnotice-announcement{
  .el-table{
    td{
      padding: 5px 0;
    }
  }
}
</style>
