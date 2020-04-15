<template>
  <div class="unotice-list">
    <el-table
      :data="resourceData.list"
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
      @current-change="resourcePageChange"
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
      resourceData: {
        total: 5,
        size: 7, // 一页最多7条
        list: []
      }
    }
  },
  watch: {
    // 监听路由变化获取数据
  },
  methods: {
    resourcePageChange() {}
  }
}
</script>
