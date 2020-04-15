<template>
  <div class="unotice-list">
    <el-table
      :data="noticeData.list"
      :show-header="false"
      style="width: 100%">
      <el-table-column prop="order" label="order" width="18"></el-table-column>
      <el-table-column label="标题" width="250">
        <template slot-scope="scope">
          <span @click="toDetail" class="article-title">{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="日期" align="right"></el-table-column>
    </el-table>
    <el-pagination
      style="float:right;margin-top:5px;"
      :hide-on-single-page="true"
      @current-change="noticePageChange"
      :page-size="1"
      layout="prev, pager, next, jumper"
      :total="1">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      noticeData: {
        total: 5,
        size: 7, // 一页最多7条
        list: [
          {
            order: '·',
            title: '通知1',
            date: '2020/3/1'
          }
        ]
      }
    }
  },
  watch: {
    // 获取数据
  },
  methods: {
    toDetail() {
      this.$router.push({
        name: 'uNoticeDetails',
        query: {
          nID: '1'
        }
      })
    },
    noticePageChange() {}
  }
}
</script>
