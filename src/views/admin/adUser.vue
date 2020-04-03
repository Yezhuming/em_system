<template>
  <page class="user" title="用户管理">
    <el-form inline :model="searchForm">
      <el-form-item>
        <el-input v-model="searchForm.value" placeholder="请输入学号或姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查 询</el-button>
      </el-form-item>
      <el-form-item class="button-group">
        <el-button type="primary">新增用户</el-button>
        <el-button type="primary">批量导入</el-button>
        <el-button type="danger">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-tabs type="border-card">
      <el-tab-pane label="教师">
        <el-table
          :data="teacherData"
          border
          header-cell-class-name="bgblue"
          max-height="380">
          <el-table-column type="selection" width="35" align="center"></el-table-column>
          <el-table-column prop="name" align="center" label="姓名"></el-table-column>
          <el-table-column prop="class" align="center" label="班级"></el-table-column>
          <el-table-column prop="account" align="center" label="账号"></el-table-column>
          <el-table-column prop="password" align="center" label="密码"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编 辑</el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删 除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="学生">
        <el-table
          :data="studentData"
          border
          max-height="380">
          <el-table-column type="selection" width="35" align="center"></el-table-column>
          <el-table-column prop="name" align="center" label="姓名"></el-table-column>
          <el-table-column prop="stuNumber" align="center" label="学号"></el-table-column>
          <el-table-column prop="class" align="center" label="班级"></el-table-column>
          <el-table-column prop="password" align="center" label="密码"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编 辑</el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删 除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </page>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        value: ''
      },
      teacherData: [
        {
          name: '王小虎',
          class: '网工七班',
          account: 'teacher',
          password: 123456
        },
        {
          name: '王小虎',
          class: '网工七班',
          account: 'teacher',
          password: 123456
        },
        {
          name: '王小虎',
          class: '网工七班',
          account: 'teacher',
          password: 123456
        },
        {
          name: '王小虎',
          class: '网工七班',
          account: 'teacher',
          password: 123456
        }
      ],
      studentData: [
        {
          name: '王小虎',
          stuNumber: 20162180203,
          password: 123456,
          belongToTeacher: '张三'
        },
        {
          name: '王小虎',
          stuNumber: 20162180203,
          password: 123456,
          belongToTeacher: '张三'
        },
        {
          name: '王小虎',
          stuNumber: 20162180203,
          password: 123456,
          belongToTeacher: '张三'
        },
        {
          name: '王小虎',
          stuNumber: 20162180203,
          password: 123456,
          belongToTeacher: '张三'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
  .button-group{
    float: right;
  }
  .operation{
    text-align: center;
  }
</style>
