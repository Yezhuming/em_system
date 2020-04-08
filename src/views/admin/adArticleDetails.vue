<template>
  <page class="adarticle-details">
    <div v-show="page=='announcement'">
      <el-page-header @back="goBack" content="发布文章"></el-page-header>
      <div class="editor-container">
        <el-form :model="editorForm" label-width="80px">
          <el-form-item label="文章标题">
            <el-input v-model="editorForm.title"></el-input>
          </el-form-item>
          <el-form-item label="文章正文">
            <quill-editor
              v-model="editorForm.content"
              :options="editorOption">
            </quill-editor>
          </el-form-item>
          <el-form-item label="文章类型">
            <el-select v-model="editorForm.type" placeholder="请选择文章类型">
              <el-option label="通知" value="1"></el-option>
              <el-option label="公告" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="pulish">确 定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div v-show="page=='experience'">
      <el-page-header @back="goBack" content="发布实验"></el-page-header>
      <div class="editor-container">
        <el-form :model="editorForm" label-width="80px">
          <el-form-item label="实验标题">
            <el-input v-model="editorForm.title"></el-input>
          </el-form-item>
          <el-form-item label="实验内容">
            <quill-editor
              v-model="editorForm.content"
              :options="editorOption">
            </quill-editor>
          </el-form-item>
          <el-form-item label="截止时间">
            <el-date-picker v-model="editorForm.deadline" type="date" placeholder="请选择日期"></el-date-picker>
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
      editorForm: {
        title: '',
        content: '',
        type: '',
        deadline: ''
      }
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    pulish() {
      console.log(this.content)
    }
  },
  created() {
    this.page = this.$route.query.page
    console.log(this.page)
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
