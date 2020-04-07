<template>
  <page class="adexperience-content" title="实验内容">
    <el-form inline :model="searchForm">
      <el-form-item label="实验">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查 询</el-button>
      </el-form-item>
      <el-form-item style="float:right;">
        <el-button type="primary">发 布</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="experienceData"
      border
      header-cell-class-name="bgblue"
      max-height="380">
      <el-table-column prop="chapter" label="实验章节" align="center"></el-table-column>
      <el-table-column prop="deadline" label="截止日期" align="center"></el-table-column>
      <!-- <el-table-column prop="class" label="班级" align="center"></el-table-column> -->
      <!-- <el-table-column prop="submitNum" label="已提交/未提交" align="center"></el-table-column> -->
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleEdit(scope.$index, scope.row)">修 改</el-button>
          <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">删 除</el-button>
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
        value: ''
      },
      experienceData: [
        {
          chapter: '实验一 运算器组成原理',
          deadline: '2020/3/1'
        }
      ]
    }
  }
}
</script>
