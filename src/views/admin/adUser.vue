<template>
  <page class="aduser" title="用户管理">
    <el-form inline :model="searchForm" ref="searchForm">
      <el-form-item v-if="activeTabs == '1'" prop="gradeAndClass">
        <el-select v-model="searchForm.gradeAndClass" placeholder="请选择班级">
          <el-option v-for="item in classList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item porp="value" prop="value">
        <el-input v-model="searchForm.value" placeholder="请输入学号或姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查 询</el-button>
        <el-button @click="reset">重 置</el-button>
      </el-form-item>
      <el-form-item class="button-group">
        <el-button type="primary" @click="showAddSingleUserDialog">新增用户</el-button>
        <el-button type="primary" @click="showAddUserDialog">批量导入</el-button>
        <el-button type="danger" @click="deleteUsers">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-tabs type="border-card" v-model="activeTabs">
      <el-tab-pane label="学生" name="1">
        <el-table
          :data="studentData"
          ref="studentTable"
          border
          header-cell-class-name="bgblue"
          max-height="380"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="35" align="center"></el-table-column>
          <el-table-column prop="name" align="center" label="姓名" min-width="40" show-overflow-tooltip></el-table-column>
          <el-table-column prop="grade" align="center" label="年级" min-width="30" show-overflow-tooltip></el-table-column>
          <el-table-column prop="class" align="center" label="班级" min-width="40" show-overflow-tooltip></el-table-column>
          <el-table-column prop="teacher" align="center" label="班级教师" min-width="30" show-overflow-tooltip></el-table-column>
          <el-table-column prop="discipline" align="center" label="专业" min-width="30" show-overflow-tooltip></el-table-column>
          <el-table-column prop="account" align="center" label="学号(账号)" min-width="40" show-overflow-tooltip></el-table-column>
          <el-table-column prop="password" align="center" label="密码" min-width="40" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="small" type="primary" @click="showUpdateUserDialog(scope.row)">编 辑</el-button>
              <el-button size="small" type="danger" @click="deleteSingleUser(scope.row)">删 除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="教师" name="2">
        <el-table
          :data="teacherData"
          ref="teacherTable"
          border
          header-cell-class-name="bgblue"
          max-height="380"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="35" align="center"></el-table-column>
          <el-table-column prop="name" align="center" label="姓名"></el-table-column>
          <el-table-column prop="account" align="center" label="账号"></el-table-column>
          <el-table-column prop="password" align="center" label="密码"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="primary" @click="showUpdateUserDialog(scope.row)">编 辑</el-button>
              <el-button type="danger" @click="deleteSingleUser(scope.row)">删 除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="新增用户"
      :visible.sync="addSingleUserDialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      class="add-singleuser-dialog"
      width="25%">
      <el-form :model="addUserForm" ref="addUserForm" :rules="addUserFormRules">
        <el-form-item label="角色" prop="role">
          <el-select v-model="addUserForm.role" placeholder="请选择角色">
            <el-option label="学生" value="1"></el-option>
            <el-option label="教师" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addUserForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="年级" v-if="addUserForm.role=='1'" prop="grade">
          <el-input v-model="addUserForm.grade" placeholder="请输入年级"></el-input>
        </el-form-item>
        <el-form-item label="班级" v-if="addUserForm.role=='1'" prop="class">
          <el-input v-model="addUserForm.class" placeholder="请输入班级"></el-input>
        </el-form-item>
        <el-form-item label="教师" v-if="addUserForm.role=='1'" prop="tID">
          <el-select v-model="addUserForm.tID" placeholder="请选择教师">
            <el-option v-for="item in teacherList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业" v-if="addUserForm.role=='1'" prop="discipline">
          <el-input v-model="addUserForm.discipline" placeholder="请输入专业"></el-input>
        </el-form-item>
        <el-form-item label="学号" v-if="addUserForm.role=='1'" prop="account">
          <el-input v-model="addUserForm.account" placeholder="请输入学号"></el-input>
        </el-form-item>
        <el-form-item label="账号" v-else prop="account">
          <el-input v-model="addUserForm.account" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUserForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addSingleUserDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSingleUser">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="批量导入"
      :visible.sync="addUserFromFileDialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      class="adduser-dialog"
      width="26%">
      <el-form :model="uploadForm">
        <el-form-item label="角色">
          <el-select v-model="uploadForm.role" placeholder="请选择角色">
            <el-option label="学生" value="1"></el-option>
            <el-option label="教师" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级教师" v-if="uploadForm.role=='1'" prop="teacher">
          <el-select v-model="uploadForm.tID" placeholder="请选择教师">
            <el-option v-for="item in teacherList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-upload
        ref="upload"
        drag
        :auto-upload="false"
        :on-success="uploadSuccess"
        :on-change="addFile"
        :before-remove="beforeRemove"
        :on-remove="handleRemove"
        :file-list="fileList"
        :limit="1"
        :data="uploadForm"
        accept=".xls,.xlsx"
        :action="uploadUrl">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传excel文件</div>
        <div class="el-upload__tip" slot="tip">
          表格模板：
          <el-link v-show="uploadForm.role == '1'" type="primary" href="http://127.0.0.1:8081/resource/学生信息导入模板.xlsx" target="_blank">学生信息导入模板.xlsx</el-link>
          <el-link v-show="uploadForm.role == '2'" type="primary" href="http://127.0.0.1:8081/resource/教师信息导入模板.xlsx" target="_blank">教师信息导入模板.xlsx</el-link>
        </div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addUserFromFileDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="importUserFromFile">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改信息"
      :visible.sync="updateUserDialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      class="add-singleuser-dialog"
      width="25%">
      <el-form :model="updateUserForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="updateUserForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="年级" v-if="updateUserForm.role=='1'" prop="grade">
          <el-input v-model="updateUserForm.grade" placeholder="请输入年级"></el-input>
        </el-form-item>
        <el-form-item label="班级" v-if="updateUserForm.role=='1'" prop="class">
          <el-input v-model="updateUserForm.class" placeholder="请输入班级"></el-input>
        </el-form-item>
        <el-form-item label="教师" v-if="updateUserForm.role=='1'" prop="tID">
          <el-select v-model="updateUserForm.tID" placeholder="请选择教师">
            <el-option v-for="item in teacherList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业" v-if="updateUserForm.role=='1'" prop="discipline">
          <el-input v-model="updateUserForm.discipline" placeholder="请输入专业"></el-input>
        </el-form-item>
        <el-form-item label="学号" v-if="updateUserForm.role=='1'" prop="account">
          <el-input v-model="updateUserForm.account" placeholder="请输入学号"></el-input>
        </el-form-item>
        <el-form-item label="账号" v-else prop="account">
          <el-input v-model="updateUserForm.account" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="updateUserForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateUserDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUser">确 定</el-button>
      </div>
    </el-dialog>
  </page>
</template>

<script>
export default {
  data() {
    return {
      classList: [],
      searchForm: {
        gradeAndClass: '',
        value: ''
      },
      activeTabs: '1',
      idArray: [],
      addSingleUserDialogVisible: false,
      addUserFromFileDialogVisible: false,
      updateUserDialogVisible: false,
      addUserForm: {
        role: '',
        name: '',
        grade: '',
        class: '',
        tID: '',
        discipline: '',
        account: '',
        password: ''
      },
      addUserFormRules: {
        role: [
          { required: true, message: '请选择角色', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        grade: [
          { required: true, message: '请输入年级', trigger: 'blur' }
        ],
        class: [
          { required: true, message: '请输入班级', trigger: 'blur' }
        ],
        tID: [
          { required: true, message: '请选择教师', trigger: 'blur' }
        ],
        discipline: [
          { required: true, message: '请输入专业', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      uploadForm: {
        role: '1',
        tID: ''
      },
      fileList: [],
      updateUserForm: {
        tID: '',
        sID: '',
        role: '',
        name: '',
        grade: '',
        class: '',
        teacher: '',
        discipline: '',
        account: '',
        password: ''
      },
      teacherList: [],
      teacherData: [],
      studentData: []
    }
  },
  computed: {
    uploadUrl () {
      return this.uploadForm.role == '1' ? 'http://127.0.0.1:8081/student/addFromFile' : 'http://127.0.0.1:8081/teacher/addFromFile'
    }
  },
  methods: {
    // 查询
    search() {
      if (this.searchForm.gradeAndClass || this.searchForm.value) {
        if (this.activeTabs == '1') {
          this.$axios.get('/student/search', {
            params: {
              gradeAndClass: this.searchForm.gradeAndClass,
              value: this.searchForm.value
            }
          })
            .then(res => {
              if (res.data.status == 200) {
                this.studentData = res.data.result
                this.$refs.studentTable.bodyWrapper.scrollTop = 0
                this.$message.success('查询成功！')
              } else {
                this.studentData = []
                this.$message.error(res.data.result)
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          this.$axios.get('/teacher/searchByName', {
            params: {
              value: this.searchForm.value
            }
          })
            .then(res => {
              if (res.data.status == 200) {
                this.teacherData = res.data.result
                this.$refs.teacherTable.bodyWrapper.scrollTop = 0
                this.$message.success('查询成功！')
              } else {
                this.teacherData = []
                this.$message.error(res.data.result)
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      } else {
        this.$message.error('请输入所需信息！')
      }
    },
    // 重置
    reset() {
      this.$refs.searchForm.resetFields()
      if (this.activeTabs == '1') {
        this.getStudentData()
      } else {
        this.getTeacherData()
      }
    },
    // 打开新增用户对话框
    showAddSingleUserDialog() {
      this.addSingleUserDialogVisible = true
      setTimeout(() => {
        this.$refs.addUserForm.resetFields()
      }, 0)
    },
    // 新增用户
    addSingleUser() {
      switch (this.addUserForm.role) {
        case '1': // 新增学生
          this.$refs.addUserForm.validate(valid => {
            if (valid) {
              this.$axios.post('/student/addOne', this.addUserForm)
                .then(res => {
                  console.log(res)
                  if (res.data.status == 200) {
                    this.$message.success(res.data.result)
                    this.getStudentData()
                    this.addSingleUserDialogVisible = false
                  }
                })
                .catch(err => {
                  console.log(err)
                })
            } else {
              this.$message.error('请填写所需信息！')
            }
          })
          break
        case '2': // 新增教师
          this.$refs.addUserForm.validate(valid => {
            if (valid) {
              this.$axios.post('/teacher/addOne', this.addUserForm)
                .then(res => {
                  if (res.data.status == 200) {
                    this.$message.success(res.data.result)
                    this.getTeacherData()
                    this.addSingleUserDialogVisible = false
                  }
                })
                .catch(err => {
                  console.log(err)
                })
            } else {
              this.$message.error('请填写所需信息！')
            }
          })
          break
        default:
          this.$message.warning('请选择角色！')
          break
      }
    },
    // 打开批量导入对话框
    showAddUserDialog() {
      this.addUserFromFileDialogVisible = true
      this.uploadForm.role = '1'
      this.uploadForm.tID = ''
      this.fileList = []
      setTimeout(() => {
        this.$refs.upload.clearFiles()
      }, 0)
    },
    // 批量导入用户
    importUserFromFile() {
      if (this.fileList.length != 0) {
        this.$refs.upload.submit()
      } else {
        this.$message.error('请选择需要上传的文件！')
      }
    },
    addFile(file, fileList) {
      this.fileList = fileList
    },
    // 文件上传成功
    uploadSuccess() {
      this.$message.success('导入成功！')
      this.addUserFromFileDialogVisible = false
      if (this.uploadForm.role == '1') {
        this.activeTabs = '1'
        this.getStudentData()
      } else {
        this.activeTabs = '2'
        this.getTeacherData()
      }
    },
    // 移除文件前
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    // 移除文件后
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    // 多选数据
    handleSelectionChange(val) {
      this.idArray = []
      if (this.activeTabs == '1') {
        for (let i of val) {
          this.idArray.push(i.sID)
        }
      } else {
        for (let i of val) {
          this.idArray.push(i.sID)
        }
      }
    },
    // 批量删除
    deleteUsers() {
      this.$confirm('确定删除选定的用户？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.activeTabs == '1') {
          this.$axios.post('/student/deleteByidArray', {
            idArray: this.idArray
          })
            .then(res => {
              if (res.data.status == 200) {
                this.getStudentData()
                this.$message.success(res.data.result)
              }
            }).catch(err => {
              console.log(err)
            })
        } else {
          this.$axios.post('/teacher/deleteByidArray', {
            idArray: this.idArray
          })
            .then(res => {
              if (res.data.status == 200) {
                this.getTeacherData()
                this.$message.success(res.data.result)
              }
            }).catch(err => {
              console.log(err)
            })
        }
      }).catch(() => {
        this.$message('已取消删除')
      })
    },
    // 打开修改信息对话框
    showUpdateUserDialog(row) {
      this.updateUserDialogVisible = true
      this.updateUserForm = JSON.parse(JSON.stringify(row))
    },
    // 更新信息
    updateUser() {
      switch (this.updateUserForm.role) {
        case 1:
          this.$axios.post('/student/updateBysID', this.updateUserForm)
            .then(res => {
              if (res.data.status == 200) {
                this.$message.success(res.data.result)
                this.getStudentData()
                this.updateUserDialogVisible = false
              }
            })
            .catch(err => {
              console.log(err)
            })
          break
        case 2:
          this.$axios.post('/teacher/updateBytID', this.updateUserForm)
            .then(res => {
              if (res.data.status == 200) {
                this.$message.success(res.data.result)
                this.getTeacherData()
                this.updateUserDialogVisible = false
              }
            })
            .catch(err => {
              console.log(err)
            })
          break
      }
    },
    // 删除指定用户
    deleteSingleUser(row) {
      this.$confirm('确定删除该用户？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        switch (row.role) {
          case 1:
            this.$axios.post('/student/deleteBysID', {
              sID: row.sID
            })
              .then(res => {
                if (res.data.status == 200) {
                  this.$message.success(res.data.result)
                  this.getStudentData()
                }
              })
              .catch(err => {
                console.log(err)
              })
            break
          case 2:
            this.$axios.post('/teacher/deleteBytID', {
              tID: row.tID
            })
              .then(res => {
                if (res.data.status == 200) {
                  this.$message.success(res.data.result)
                  this.getTeacherData()
                }
              })
              .catch(err => {
                console.log(err)
              })
            break
        }
      }).catch(() => {
        this.$message('已取消删除')
      })
    },
    // 获取教师数据
    getTeacherData() {
      this.$axios.get('/teacher/getAll')
        .then(res => {
          if (res.data.status == 200) {
            this.teacherData = res.data.result
            this.teacherList = []
            for (let i of res.data.result) {
              let obj = {}
              obj.label = i.name
              obj.value = i.tID
              this.teacherList.push(obj)
            }
            this.$refs.teacherTable.bodyWrapper.scrollTop = 0
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取学生数据
    getStudentData() {
      this.$axios.get('/student/getAll')
        .then(res => {
          if (res.data.status == 200) {
            this.studentData = res.data.result
            this.$refs.studentTable.bodyWrapper.scrollTop = 0
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取班级信息
    getClassList() {
      this.$axios.get('/student/getClassList')
        .then(res => {
          if (res.data.status == 200) {
            this.classList = []
            for (let i of res.data.result) {
              let obj = {
                label: `${i.grade}${i.class}`,
                value: `${i.grade}${i.class}`
              }
              this.classList.push(obj)
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    this.getStudentData()
    this.getTeacherData()
    this.getClassList()
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
    width: 260px;
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
    width: 150px;
  }
}
</style>
