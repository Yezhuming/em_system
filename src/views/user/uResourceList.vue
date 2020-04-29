<template>
  <div class="uresource-list">
    <el-table
      :data="resourceData.list"
      :show-header="false"
      tooltip-effect="light"
      style="width: 100%">
      <el-table-column label="order" width="18">•</el-table-column>
      <el-table-column label="文件名" width="600">
        <template slot-scope="scope">
          <el-link @click="openLink(scope.row)" :underline="false">{{scope.row.fileName}}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="uploadDate" label="上传日期" align="right"></el-table-column>
    </el-table>
    <el-pagination
      style="float:right;margin-top:5px;"
      :hide-on-single-page="true"
      @current-change="resourcePageChange"
      :page-size="resourceData.size"
      layout="prev, pager, next, jumper"
      :total="resourceData.total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      resourceData: {
        total: 5,
        page: 1,
        size: 7, // 一页最多7条
        list: []
      }
    }
  },
  watch: {
    '$route' (to, from) {
      this.getResourceData()
    }
  },
  methods: {
    // 下载资源
    openLink(row) {
      window.open(`http://localhost:8081/resource/${row.fileName}`)
    },
    resourcePageChange(page) {
      this.resourceData.page = page
      this.getResourceData()
    },
    getResourceData() {
      this.$axios.get('/resource/getByTypeLimited', {
        params: {
          page: this.resourceData.page,
          size: this.resourceData.size,
          type: this.$route.params.type == 'curriculum' ? 1 : 2
        }
      }).then(res => {
        if (res.data.status == 200) {
          this.resourceData.total = res.data.total
          this.resourceData.list = res.data.result
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created() {
    this.getResourceData()
  }
}
</script>

<style lang="scss">
.uresource-list{
  .el-link--inner{
    width: 580px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
