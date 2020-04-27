<template>
  <div class="unotice-list">
    <el-table
      :data="noticeData.list"
      :show-header="false"
      style="width: 100%">
      <el-table-column label="order" width="18">•</el-table-column>
      <el-table-column label="标题" width="600">
        <template slot-scope="scope">
          <el-link @click="toDetail(scope.row)" :underline="false">{{scope.row.title}}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="publishDate" label="日期" align="right"></el-table-column>
    </el-table>
    <el-pagination
      style="float:right;margin-top:5px;"
      :hide-on-single-page="true"
      @current-change="noticePageChange"
      :page-size="noticeData.size"
      layout="prev, pager, next, jumper"
      :total="noticeData.total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      noticeData: {
        total: 7,
        page: 1,
        size: 7, // 一页最多7条
        list: []
      }
    }
  },
  watch: {
    '$route' (to, from) {
      this.getNoticeData()
    }
  },
  methods: {
    toDetail(row) {
      console.log(row)
      this.$router.push({
        name: 'uNoticeDetails',
        query: {
          aID: row.aID
        }
      })
    },
    // 换页
    noticePageChange(page) {
      this.noticeData.page = page
      this.getNoticeData()
    },
    // 获取数据
    getNoticeData() {
      this.$axios.get('/article/getByTypeLimited', {
        params: {
          page: this.noticeData.page,
          size: this.noticeData.size,
          type: this.$route.params.type == 'notice' ? 1 : 2
        }
      })
        .then(res => {
          console.log(res)
          if (res.data.status == 200) {
            this.noticeData.total = res.data.total
            this.noticeData.list = res.data.result
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    this.getNoticeData()
  }
}
</script>

<style lang="scss">
.unotice-list{
  .el-link--inner{
    width: 580px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
