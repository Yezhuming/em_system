<template>
  <page class="adaccount" title="账号管理">
    <div class="update-pwd">
      <h4>修改密码：</h4>
      <el-form :model="pwdForm" ref="pwdForm" :rules="rules" label-width="100px" label-position="left">
        <el-form-item label="原密码" prop="oldPassword">
          <el-input type="password" v-model="pwdForm.oldPassword" show-password ref="oldPwdInput"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="pwdForm.newPassword" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input type="password" v-model="pwdForm.checkPassword" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updatePassword">确 定</el-button>
          <el-button style="margin-right:10px;" @click="reset">重 置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </page>
</template>

<script>
export default {
  props: ['user'],
  data() {
    // 表单验证规则
    let pwdCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.pwdForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      path: '',
      pwdForm: {
        oldPassword: '',
        newPassword: '',
        checkPassword: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        checkPassword: [
          {required: true, validator: pwdCheck, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    reset() {
      this.$refs.pwdForm.resetFields()
      this.$refs.pwdForm.clearValidate()
    },
    updatePassword() {
      if (this.$props.user.role == '0') { // 管理员修改密码
        this.$refs.pwdForm.validate((valid) => {
          if (valid) {
            this.$axios.get(`/admin/getOne`, {
              params: {
                aID: this.$props.user.aID
              }
            }).then(res => {
              if (res.data.status == 200) {
                let oldPassword = res.data.result[0].password
                if (oldPassword != this.pwdForm.oldPassword) {
                  this.$message.error('原密码错误！')
                  this.$refs.oldPwdInput.select()
                } else {
                  this.$axios.post('/admin/updatePassword', {
                    aID: this.$props.user.aID,
                    newPassword: this.pwdForm.newPassword
                  }).then(res => {
                    if (res.data.status == 200) {
                      this.$message.success('修改成功！')
                      this.$refs.pwdForm.resetFields()
                    }
                  }).catch(err => {
                    console.log(err)
                  })
                }
              }
            }).catch(err => {
              console.log(err)
            })
          } else {
            this.$message.error('修改失败！')
            return false
          }
        })
      } else { // 教师修改密码
        this.$refs.pwdForm.validate((valid) => {
          if (valid) {
            this.$axios.get(`/teacher/getOne`, {
              params: {
                tID: this.$props.user.tID
              }
            }).then(res => {
              if (res.data.status == 200) {
                let oldPassword = res.data.result[0].password
                if (oldPassword != this.pwdForm.oldPassword) {
                  this.$message.error('原密码错误！')
                  this.$refs.oldPwdInput.select()
                } else {
                  this.$axios.post('/teacher/updatePassword', {
                    tID: this.$props.user.tID,
                    newPassword: this.pwdForm.newPassword
                  }).then(res => {
                    if (res.data.status == 200) {
                      this.$message.success('修改成功！')
                      this.$refs.pwdForm.resetFields()
                    }
                  }).catch(err => {
                    console.log(err)
                  })
                }
              }
            }).catch(err => {
              console.log(err)
            })
          } else {
            this.$message.error('修改失败！')
            return false
          }
        })
      }
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
