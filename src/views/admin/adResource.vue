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
      <el-table-column prop="fileName" label="文件名" align="center"></el-table-column>
      <el-table-column prop="fileType" label="类型" align="center"></el-table-column>
      <el-table-column prop="uploadDate" label="上传日期" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleEdit(scope.row)">修 改</el-button>
          <el-button type="danger" @click="handleDelete(scope.row)">删 除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="文件上传"
      class="upload-dialog"
      :visible.sync="uploadDialogVisible"
      width="30%">
      <el-upload
        drag
        action="https://jsonplaceholder.typicode.com/posts/">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <el-form :model="uploadForm">
        <el-form-item label="类型">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="uploadDialogVisible = false">确 定</el-button>
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
      resourceData: [
        {
          fileName: '实验报告模板',
          fileType: '模板表格',
          uploadDate: '2020/3/1'
        }
      ],
      uploadDialogVisible: false
    }
  },
  methods: {
    showUploadDialog() {
      this.uploadDialogVisible = true
    },
    handleEdit(row) {
      this.uploadDialogVisible = true
    }
  }
}
</script>

<style lang="scss">
.upload-dialog{
  .el-upload-dragger{
    width: 200px;
  }
  .el-form-item{
    margin-top: 10px;
    margin-bottom: 0;
  }
  .el-input{
    width: 160px;
  }
}
</style>
