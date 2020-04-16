<template>
  <page class="adresource" title="资源管理">
    <el-form inline :model="searchForm">
      <el-form-item label="日期">
        <el-date-picker v-model="searchForm.date" type="date" placeholder="请选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查 询</el-button>
      </el-form-item>
      <el-form-item style="float:right;">
        <el-button type="primary" @click="showUploadDialog">上 传</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="resourceData"
      border
      header-cell-class-name="bgblue"
      max-height="380">
      <el-table-column prop="fileName" label="文件名" align="center">
        <!-- TODO -->
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
          <el-button type="danger" @click="handleDelete(scope.row)">删 除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="文件上传"
      class="upload-dialog"
      :visible.sync="uploadDialogVisible"
      width="25%">
      <el-form :model="uploadForm">
        <el-upload
          ref="upload"
          drag
          :auto-upload="false"
          :on-success="uploadSuccess"
          :data="uploadForm"
          action="http://127.0.0.1:8081/resource/upload">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip"></div>
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
        <el-button @click="uploadDialogVisible = false">取 消</el-button>
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
      uploadForm: {
        type: '',
        uploadDate: ''
      }
    }
  },
  methods: {
    showUploadDialog() {
      this.uploadForm.type = ''
      this.uploadDialogVisible = true
    },
    // 上传文件
    fileUpload() {
      if (this.uploadForm.type) {
        let date = new Date()
        let uploadDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        this.uploadForm.uploadDate = uploadDate
        this.$refs.upload.submit()
        this.uploadDialogVisible = false
        this.$refs.upload.clearFiles()
      } else {
        this.$message.error('请选择文件类型！')
        this.$refs.selectType.focus()
      }
    },
    // 文件上传成功
    uploadSuccess() {
      this.$message.success('上传成功！')
    },
    // 获取资源数据
    getResourceData() {
      this.$axios.get('/resource/getAll')
        .then(res => {
          if (res.data.status == 200) {
            console.log(res.data.result)
            this.resourceData = res.data.result
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 按日期查询资源
    searchByDate() {}
  },
  created() {
    this.getResourceData()
  }
}
</script>

<style lang="scss">
.upload-dialog{
  .el-form{
    width: 200px;
    margin: 0 auto;
  }
  .el-upload-dragger{
    width: 200px;
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
