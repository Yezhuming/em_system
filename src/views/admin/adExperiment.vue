<template>
  <page class="adexperience-content" title="实验内容">
    <el-form inline :model="searchForm">
      <el-form-item label="上传日期">
        <el-date-picker
          v-model="searchForm.date"
          type="date"
          placeholder="请选择日期"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchByDate">查 询</el-button>
        <el-button @click="reset">重 置</el-button>
      </el-form-item>
      <el-form-item style="float:right;">
        <el-button type="primary" @click="showUploadDialog">上 传</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="experimentData"
      border
      tooltip-effect="light"
      header-cell-class-name="bgblue"
      max-height="450">
      <el-table-column label="实验项目" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.experimentName.slice(scope.row.experimentName.indexOf('-')+1)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="uploadDate" label="上传日期" align="center" min-width="50"></el-table-column>
      <el-table-column prop="deadline" label="截止日期" align="center" min-width="50"></el-table-column>
      <el-table-column label="操作" align="center" min-width="50">
        <template slot-scope="scope">
          <el-button type="primary" @click="openLink(scope.row)">查 看</el-button>
          <el-button type="danger" @click="deleteExperiment(scope.row)">删 除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="文件上传"
      class="upload-dialog"
      :visible.sync="uploadDialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="25%">
      <el-form :model="uploadForm" ref="uploadForm">
          <el-upload
            ref="upload"
            drag
            :auto-upload="false"
            :on-success="uploadSuccess"
            :on-change="addFile"
            :before-remove="beforeRemove"
            :on-remove="handleRemove"
            :file-list="fileList"
            :data="uploadForm"
            :limit="1"
            accept=".ppt,.pptx"
            action="http://127.0.0.1:8081/experiment/upload">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传课件ppt</div>
          </el-upload>
        <el-form-item
          label="截止日期"
          prop="deadline"
          :rules="{ required: true, trigger: 'blur'}">
          <el-date-picker
            v-model="uploadForm.deadline"
            type="date"
            placeholder="请选择日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeUploadDialog">取 消</el-button>
        <el-button type="primary" @click="fileUpload">确 定</el-button>
      </span>
    </el-dialog>
  </page>
</template>

<script>
export default {
  props: ['user'],
  data() {
    return {
      searchForm: {
        date: ''
      },
      uploadDialogVisible: false,
      fileList: [],
      uploadForm: {
        uploader: '',
        deadline: '',
        uploadDate: ''
      },
      uploadedeID: '',
      experimentData: [],
      pickerOptions: {
        shortcuts: [
          {
            text: '一周',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          },
          {
            text: '两周',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 14)
              picker.$emit('pick', date)
            }
          }
        ]
      }
    }
  },
  methods: {
    // 打开上传对话框
    showUploadDialog() {
      this.uploadDialogVisible = true
      this.$refs.uploadForm.resetFields()
      this.$refs.uploadForm.clearValidate()
    },
    // 关闭上传对话框
    closeUploadDialog() {
      this.fileList = []
      this.uploadDialogVisible = false
    },
    addFile(file, fileList) {
      this.fileList = fileList
    },
    // 上传文件
    fileUpload() {
      if (this.fileList.length != 0) {
        if (this.uploadForm.deadline) {
          let date = new Date()
          let uploadDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
          this.uploadForm.uploadDate = uploadDate
          this.uploadForm.uploader = this.$props.user.name
          this.$refs.upload.submit()
        } else {
          this.$message.error('请选择截止日期！')
        }
      } else {
        this.$message.error('请选择需要上传的文件！')
      }
    },
    // 文件上传成功
    uploadSuccess() {
      this.$message.success('上传成功！')
      this.uploadDialogVisible = false
      this.$refs.upload.clearFiles()
      this.getExperimentData()
    },
    // 移除文件前
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    // 移除文件后
    handleRemove(file, fileList) {
      console.log(file, fileList)
      this.fileList = fileList
    },
    // 按日期查询资源
    searchByDate() {
      this.$axios.get('/experiment/getListByDate', {
        params: {
          uploadDate: this.searchForm.date,
          uploader: this.$props.user.name
        }
      }).then(res => {
        if (res.data.status == 200) {
          this.experimentData = res.data.result
          this.$message.success('查询成功！')
        } else {
          this.experimentData = []
          this.$message.warning(res.data.result)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 重置查询
    reset() {
      this.searchForm.date = ''
      this.getExperimentData()
    },
    // 查看实验项目(下载ppt) 线上地址可实现预览
    openLink(row) {
      window.open(`http://localhost:8081/experiment/${row.experimentName}`)
    },
    // 删除实验项目 TODO
    deleteExperiment(row) {
      this.$confirm('确定删除该实验?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/experiment/deleteByeID', {
          eID: row.eID
        }).then(res => {
          if (res.data.status == 200) {
            this.getExperimentData()
            this.$axios.post('/score/deleteByeID', {
              eID: row.eID
            }).then(res => {
              if (res.data.status == 200) {
                this.$message.success(res.data.result)
              }
            })
          } else {
            this.$message.error(res.data.result)
          }
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
        this.$message('已取消删除！')
      })
    },
    // 获取实验内容数据
    getExperimentData() {
      this.$axios.get('/experiment/getAll', {
        params: {
          uploader: this.$props.user.name
        }
      }).then(res => {
        if (res.data.status == 200) {
          this.experimentData = res.data.result
        } else {
          this.experimentData = []
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created() {
    this.getExperimentData()
  }
}
</script>

<style lang="scss">
.adexperience-content{
  .el-dialog__body{
    padding-bottom: 0;
    width: 300px;
    margin: 0 auto;
  }
  .el-upload-dragger{
    width: 300px;
  }
}
</style>
