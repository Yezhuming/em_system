<template>
  <page class="adresource" title="资源管理">
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
      :data="resourceData"
      border
      header-cell-class-name="bgblue"
      max-height="450">
      <el-table-column label="文件名" align="center">
        <template slot-scope="scope">
          <el-link @click="openLink(scope.row)" :underline="false">{{scope.row.fileName}}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.fileType=='1'">实验室课表</span>
          <span v-else>模板表格</span>
        </template>
      </el-table-column>
      <el-table-column prop="uploadDate" label="上传日期" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="danger" @click="deleteResource(scope.row)">删 除</el-button>
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
      <el-form :model="uploadForm">
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
          accept=".xls,.xlsx,.doc,.docx,.pdf"
          action="http://127.0.0.1:8081/resource/upload">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传word/excel/pdf文件</div>
        </el-upload>
        <el-form-item
          label="类型"
          prop="type"
          :rules="{ required: true, trigger: 'blur'}">
          <el-select v-model="uploadForm.type" placeholder="请选择" ref="selectType">
            <el-option label="实验室课表" value="1"></el-option>
            <el-option label="模板表格" value="2"></el-option>
          </el-select>
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
  data() {
    return {
      searchForm: {
        date: ''
      },
      resourceData: [],
      uploadDialogVisible: false,
      fileList: [],
      uploadForm: {
        type: '',
        uploadDate: ''
      }
    }
  },
  methods: {
    // 打开上传对话框
    showUploadDialog() {
      this.uploadForm.type = ''
      this.uploadDialogVisible = true
      this.fileList = []
    },
    // 关闭上传对话框
    closeUploadDialog() {
      this.fileList = []
      this.uploadDialogVisible = false
    },
    // 添加文件
    addFile(file, fileList) {
      this.fileList = fileList
    },
    // 上传文件
    fileUpload() {
      if (this.fileList.length != 0) {
        if (this.uploadForm.type) {
          let date = new Date()
          let uploadDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
          this.uploadForm.uploadDate = uploadDate
          this.$refs.upload.submit()
        } else {
          this.$message.error('请选择文件类型！')
          this.$refs.selectType.focus()
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
      this.getResourceData()
    },
    // 移除文件前
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    // 移除文件后
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    // 获取资源数据
    getResourceData() {
      this.$axios.get('/resource/getAll').then(res => {
        if (res.data.status == 200) {
          this.resourceData = res.data.result
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 按日期查询资源
    searchByDate() {
      this.$axios.get('/resource/getListByDate', {
        params: {
          uploadDate: this.searchForm.date
        }
      }).then(res => {
        if (res.data.status == 200) {
          this.resourceData = res.data.result
          this.$message.success('查询成功！')
        } else {
          this.resourceData = []
          this.$message(res.data.result)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 重置查询
    reset() {
      this.searchForm.date = ''
      this.getResourceData()
    },
    // 下载资源
    openLink(row) {
      window.open(`http://localhost:8081/resource/${row.fileName}`)
    },
    // 删除资源
    deleteResource(row) {
      this.$confirm('确定删除该文件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/resource/deleteByrID', {
          rID: row.rID
        }).then(res => {
          if (res.data.status == 200) {
            this.getResourceData()
            this.$message.success(res.data.result)
          }
        }).catch(err => {
          console.log(err)
        })
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
.upload-dialog{
  .el-upload-dragger{
    width: 340px;
  }
  .el-form-item{
    margin-top: 10px;
    margin-bottom: 0;
  }
  .el-input{
    width: 149px;
  }
}
</style>
