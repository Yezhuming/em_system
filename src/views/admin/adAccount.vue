<template>
  <page class="adaccount" title="账号管理">
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
.update-pwd{
  width: 300px;
  .el-button{
    float: right;
  }
}
</style>
