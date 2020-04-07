<template>
  <page class="adaccount" title="账号管理">
    <div class="upload-avatar flex">
      <span style="height:20px;">头像：</span>
      <el-avatar :size="150" :src="avatarUrl"></el-avatar>
      <div class="upload-btn">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          >
          <el-button size="small" type="primary">选择头像</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
    </div>
    <div class="update-pwd">
      <h4>修改密码：</h4>
      <el-form :model="passwordFrom" label-width="100px" label-position="left">
        <el-form-item label="原密码" prop="oldPassword">
          <el-input type="password" v-model="passwordFrom.oldPassword" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="passwordFrom.newPassword" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input type="password" v-model="passwordFrom.checkPassword" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">确 定</el-button>
          <el-button style="margin-right:10px;" @click="reset">重 置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </page>
</template>

<script>
export default {
  data() {
    return {
      avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      passwordFrom: {
        oldPassword: '',
        newPassword: '',
        checkPassword: ''
      }
    }
  },
  methods: {
    reset() {
      this.passwordFrom.newPassword = ''
      this.passwordFrom.checkPassword = ''
    }
  }
}
</script>

<style lang="scss">
  .upload-avatar{
    width: 500px;
    justify-content: space-between;
    align-items: center;
  }
  .upload-btn{
    align-self: flex-end;
  }
  .update-pwd{
    width: 300px;
    .el-button{
      float: right;
    }
  }
</style>
