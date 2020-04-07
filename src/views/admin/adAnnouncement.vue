<template>
  <page class="adAnnouncement" title="通知公告">
    <el-form inline :model="searchForm">
      <el-form-item>
        <el-date-picker v-model="searchForm.date" type="date" placeholder="请选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查 询</el-button>
      </el-form-item>
      <el-form-item style="float:right;">
        <el-button type="primary" @click="toDetails">发 布</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="articleData"
      border
      header-cell-class-name="bgblue"
      max-height="380">
      <el-table-column prop="title" label="标题" align="center"></el-table-column>
      <el-table-column prop="type" label="类型" align="center"></el-table-column>
      <el-table-column prop="publishDate" label="发布日期" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleEdit(scope.row)">编 辑</el-button>
          <el-button type="danger" @click="handleDelete(scope.row)">删 除</el-button>
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
      articleData: [
        {
          title: '关于作业完成通知',
          type: '通知',
          publishDate: '2020/3/1'
        }
      ]
    }
  },
  methods: {
    toDetails() {
      this.$router.push('/adIndex/adAcmDetails')
    }
  }
}
</script>
