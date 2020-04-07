<template>
  <page class="adAcm-details">
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
        <el-form-item>
          <el-button type="primary" @click="pulish">确 定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </page>
</template>

<script>
export default {
  data() {
    return {
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
        content: ''
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
  }
}
</script>

<style lang="scss">
.adAcm-details{
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
