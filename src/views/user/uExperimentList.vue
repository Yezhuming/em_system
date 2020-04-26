<template>
  <div class="uexperiment-list">
    <div v-show="type=='courseIntro'">
      <h3>计算机组成原理实验</h3>
      <p class="paragraph">“计算机组成原理”是计算机专业的一门专业基础课。本课程实践性强，因此,该实验课程必须有相应的实验平台支持，这里选用的是：TEC-4计算机组成原理实验系统。它是一个8位计算机模型实验系统，简单、实用,运算器数据通路、控制器、控制台各部分划分清晰。对提高学生的动手能力;提高学生对计算机整体和各组成部分的理解都会有很大帮助。</p>
    </div>
    <div v-show="type=='experimentCourse'">
      <el-table
        :data="experimentData.list"
        style="width: 100%"
        border
        header-cell-class-name="bgblue"
        tooltip-effect="light">
        <!-- 实验提交状态 0-未提交 1-已提交 2-已批改 -->
        <el-table-column label="状态" align="center" width="100">
          <template slot-scope="scope">
            <el-tag type="danger" v-show="scope.row.status==0">未提交</el-tag>
            <el-tag v-show="scope.row.status==1">已提交</el-tag>
            <el-tag type="success" v-show="scope.row.status==2">已批改</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="实验项目" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.experimentName.slice(scope.row.experimentName.indexOf('-')+1)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="deadline" label="截止时间" align="center" min-width="50"></el-table-column>
        <el-table-column label="成绩" align="center" min-width="20">
          <template slot-scope="scope">
            <el-popover
              v-if="scope.row.status=='2'"
              placement="top-start"
              title="评语"
              width="200"
              trigger="hover">
              <span>{{ scope.row.comment }}</span>
              <el-link type="primary" slot="reference">{{ scope.row.score }}</el-link>
            </el-popover>
            <span v-else>0</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <el-button @click="toDetail(scope.row)" type="primary" size="small">下载课件</el-button>
            <el-button @click="showUploadDialog(scope.row)" type="primary" size="small" v-if="scope.row.status!='2'">
              <span v-if="!scope.row.submitFile">提 交</span>
              <span v-else>修 改</span>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
      title="作业上传"
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
          :on-exceed="handleExceed"
          :file-list="fileList"
          :data="uploadForm"
          :limit="1"
          accept=".rar,.zip"
          action="http://127.0.0.1:8081/score/upload">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">请将实验结果和实验报告打包上传</div>
          <div class="el-upload__tip" slot="tip">命名格式：学号+姓名+实验项目(不需要+号)</div>
        </el-upload>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeUploadDialog">取 消</el-button>
        <el-button type="primary" @click="fileUpload">确 定</el-button>
      </span>
    </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      experimentData: {
        total: 4,
        page: 1,
        size: 4, // 一页最多4条
        list: []
      },
      uploadDialogVisible: false,
      fileList: [],
      uploadForm: {
        eID: '',
        sID: ''
      }
    }
  },
  computed: {
    type() {
      return this.$route.params.type
    }
  },
  methods: {
    // 下载实验ppt
    toDetail(row) {
      window.open(`http://localhost:8081/experiment/${row.experimentName}`)
    },
    // 打开提交/修改对话框
    showUploadDialog(row) {
      if (row.submitFile) {
        let file = {
          name: `${row.submitFile.slice(18)}`,
          url: `http://localhost:8081/submitFile/${row.submitFile}`
        }
        this.fileList.push(file)
      } else {
        this.fileList = []
      }
      this.uploadForm.eID = row.eID
      this.uploadDialogVisible = true
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
    // 上传文件 TODO
    fileUpload() {
      if (this.fileList.length != 0) {
        this.uploadForm.sID = this.user.sID
        this.$refs.upload.submit()
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
      this.fileList = fileList
    },
    // 超出文件个数限制
    handleExceed(file, fileList) {
      this.$message.error('只能上传一个文件！')
    },
    // 获取实验内容
    getExperimentData() {
      this.$axios.get('/score/getLimited', {
        params: {
          sID: this.user.sID,
          page: this.experimentData.page,
          size: this.experimentData.size
        }
      }).then(res => {
        if (res.data.status == 200) {
          this.experimentData.total = res.data.total
          this.experimentData.list = res.data.result
        } else {
          this.experimentData.total = 0
          this.experimentData.list = []
        }
      })
    }
  },
  created() {
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.getExperimentData()
  }
}
</script>

<style lang="scss">
.uexperiment-list{
  .el-upload-dragger{
    width: 340px;
  }
}
</style>
