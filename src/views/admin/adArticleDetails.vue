<template>
  <page class="adarticle-details">
    <div v-if="page=='announcement'">
      <el-page-header @back="goBack" content="发布文章"></el-page-header>
      <div class="editor-container">
        <el-form :model="articleEditorForm" ref="articleEditorForm" label-width="80px">
          <el-form-item label="文章标题" prop="title">
            <el-input v-model="articleEditorForm.title"></el-input>
          </el-form-item>
          <el-form-item label="文章正文" prop="content">
            <quill-editor
              v-model="articleEditorForm.content"
              :options="editorOption">
            </quill-editor>
          </el-form-item>
          <el-form-item label="文章类型" prop="type">
            <el-select v-model="articleEditorForm.type" placeholder="请选择文章类型">
              <el-option label="通知" value="1"></el-option>
              <el-option label="公告" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="articlePulish">确 定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div v-if="page=='experience'">
      <el-page-header @back="goBack" content="发布实验"></el-page-header>
      <div class="editor-container">
        <el-form :model="experimentEditorForm" label-width="80px">
          <el-form-item label="实验标题">
            <el-input v-model="experimentEditorForm.title"></el-input>
          </el-form-item>
          <el-form-item label="实验内容">
            <quill-editor
              v-model="experimentEditorForm.content"
              :options="editorOption">
            </quill-editor>
          </el-form-item>
          <el-form-item label="截止时间">
            <el-date-picker v-model="experimentEditorForm.deadline" type="date" placeholder="请选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="pulish">确 定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </page>
</template>

<script>
export default {
  data() {
    return {
      page: '',
      // 富文本编辑器工具栏配置
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'align': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }]
          ]
        }
      },
      articleEditorForm: {
        title: '',
        content: '',
        type: ''
      },
      experimentEditorForm: {
        title: '',
        content: '',
        deadline: ''
      }
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    articlePulish() {
      let date = new Date()
      let pulishDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      if (this.$route.query.aID) { // 更新文章
        console.log('yes')
      } else { // 发布新文章
        this.$axios.post('/article/add', {
          title: this.articleEditorForm.title,
          content: this.articleEditorForm.content,
          type: this.articleEditorForm.type,
          pulishDate: pulishDate
        })
          .then(res => {
            console.log(res)
            if (res.data.status == 200) {
              this.$message.success('发布成功！')
              this.$refs.articleEditorForm.resetFields()
            } else {
              this.$message.success('发布失败！')
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    getFormData() {
      let obj = this.$route.params.form
      this.articleEditorForm.title = obj.title
      this.articleEditorForm.content = obj.content
      this.articleEditorForm.type = obj.type
    }
  },
  created() {
    this.page = this.$route.query.page
    if (this.$route.query.aID) {
      this.getFormData()
    }
  }
}
</script>

<style lang="scss">
.adarticle-details{
  .el-page-header{
    margin-bottom: 20px;
  }
  .el-page-header__title{
    font-size: 16px;
  }
}
.editor-container{
  .el-form-item__content{
    width: 900px;
    line-height: 0;
  }
  .ql-container{
    min-height: 100px;
    font-size: 15px;
  }
}
</style>
