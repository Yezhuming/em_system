<template>
  <page class="aduser" title="用户管理">
    <el-form inline :model="searchForm">
      <el-form-item>
        <el-input v-model="searchForm.value" placeholder="请输入学号或姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查 询</el-button>
      </el-form-item>
      <el-form-item class="button-group">
        <el-button type="primary" @click="showAddSingleUserDialog">新增用户</el-button>
        <el-button type="primary" @click="showAddUserDialog">批量导入</el-button>
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
          <el-table-column prop="account" align="center" label="账号"></el-table-column>
          <el-table-column prop="password" align="center" label="密码"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="primary" @click="showUpdateUserDialog(scope.row)">编 辑</el-button>
              <el-button type="danger" @click="handleDelete(scope.row)">删 除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="学生">
        <el-table
          :data="studentData"
          border
          header-cell-class-name="bgblue"
          max-height="380">
          <el-table-column type="selection" width="35" align="center"></el-table-column>
          <el-table-column prop="name" align="center" label="姓名"></el-table-column>
          <el-table-column prop="grade" align="center" label="年级"></el-table-column>
          <el-table-column prop="class" align="center" label="班级"></el-table-column>
          <el-table-column prop="discipline" align="center" label="专业"></el-table-column>
          <el-table-column prop="account" align="center" label="学号(账号)"></el-table-column>
          <el-table-column prop="password" align="center" label="密码"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="small" type="primary" @click="showUpdateUserDialog(scope.row)">编 辑</el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删 除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="新增用户"
      :visible.sync="addSingleUserDialogVisible"
      class="add-singleuser-dialog"
      width="25%">
      <el-form :model="addUserForm">
        <el-form-item label="角色">
          <el-select v-model="addUserForm.role" placeholder="请选择角色">
            <el-option label="教师" value="1"></el-option>
            <el-option label="学生" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="addUserForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="班级">
          <el-input v-model="addUserForm.class" placeholder="请输入班级"></el-input>
        </el-form-item>
        <el-form-item label="账号" v-show="addUserForm.role=='1'">
          <el-input v-model="addUserForm.account" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="学号" v-show="addUserForm.role=='2'">
          <el-input v-model="addUserForm.account" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="addUserForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addSingleUserDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSingleUserDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="批量导入"
      :visible.sync="addUserDialogVisible"
      class="adduser-dialog"
      width="30%">
      <el-form :model="uploadForm">
        <el-form-item label="角色">
          <el-select v-model="uploadForm.role" placeholder="请选择角色">
            <el-option label="教师" value="1"></el-option>
            <el-option label="学生" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-upload
        drag
        action="https://jsonplaceholder.typicode.com/posts/">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传excel文件</div>
        <div class="el-upload__tip" slot="tip">表格模板：</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addUserDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改信息"
      :visible.sync="updateUserDialogVisible"
      class="add-singleuser-dialog"
      width="25%">
      <el-form :model="updateUserForm">
        <el-form-item label="姓名">
          <el-input v-model="updateUserForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="班级">
          <el-input v-model="updateUserForm.class" placeholder="请输入班级"></el-input>
        </el-form-item>
        <el-form-item label="账号" v-show="updateUserForm.role=='1'">
          <el-input v-model="updateUserForm.account" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="学号" v-show="updateUserForm.role=='2'">
          <el-input v-model="updateUserForm.account" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="updateUserForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateUserDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUserDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </page>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        value: ''
      },
      addSingleUserDialogVisible: false,
      addUserDialogVisible: false,
      updateUserDialogVisible: false,
      addUserForm: {
        role: '1',
        name: '',
        class: '',
        account: '',
        password: ''
      },
      uploadForm: {
        role: '1',
        file: ''
      },
      updateUserForm: {
        role: '',
        name: '',
        class: '',
        account: '',
        password: ''
      },
      teacherData: [
        {
          role: '1',
          name: '王小虎',
          account: 'teacher',
          password: 123456
        }
      ],
      studentData: [
        {
          role: '2',
          name: '王小虎',
          grade: '2016级',
          class: '网工七班',
          discipline: '网络工程',
          account: 20162180203,
          password: 123456
        }
      ]
    }
  },
  methods: {
    showAddSingleUserDialog() {
      this.addSingleUserDialogVisible = true
    },
    showAddUserDialog() {
      this.addUserDialogVisible = true
    },
    showUpdateUserDialog(row) {
      this.updateUserDialogVisible = true
      this.updateUserForm = JSON.parse(JSON.stringify(row))
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
.add-singleuser-dialog{
  .el-dialog__body{
    padding-bottom: 0;
  }
  .el-form{
    width: 240px;
    margin: 0 auto;
  }
  .el-input{
    width: 200px;
  }
}
.adduser-dialog{
  .el-dialog__body{
    padding-bottom: 0;
  }
  .el-input{
    width: 100px;
  }
}
</style>
