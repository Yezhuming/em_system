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
      </el-form-item>
      <el-form-item style="float:right;">
        <el-button type="primary" @click="toDetail">发 布</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="articleData"
      border
      header-cell-class-name="bgblue"
      max-height="380">
      <el-table-column prop="title" label="标题" align="center"></el-table-column>
      <el-table-column prop="type" label="类型" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.type=='1'">通知</span>
          <span v-else>公告</span>
        </template>
      </el-table-column>
      <el-table-column prop="publishDate" label="发布日期" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="updateAnnouncement(scope.row)">编 辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删 除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </page>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        date: ''
      },
      articleData: []
    }
  },
  methods: {
    searchByDate() {
      console.log(this.searchForm.date)
    },
    toDetail() {
      this.$router.push({
        path: '/adIndex/adArticleDetails',
        query: {
          page: 'announcement'
        }
      })
    },
    updateAnnouncement(row) {
      console.log(row)
      this.$router.push({
        name: 'adArticleDetails',
        query: {
          page: 'announcement',
          aID: row.aID
        },
        params: {
          form: row
        }
      })
    },
    getArticleData() {
      this.$axios.get('/article/getAll')
        .then(res => {
          console.log(res)
          if (res.data.status == 200) {
            this.articleData = res.data.result
          }
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
