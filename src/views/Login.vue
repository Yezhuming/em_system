<template>
  <div class="login">
    <div class="container">
      <div class="left">
        <el-image :src="src"></el-image>
      </div>
      <div class="right">
        <p>计组实验管理系统</p>
        <p>Management System</p>
        <el-form :model="loginForm">
          <el-form-item>
            <el-input v-model="loginForm.account" placeholder="学号" v-if="loginForm.role == '1'"></el-input>
            <el-input v-model="loginForm.account" placeholder="账号" v-else></el-input>
            <el-input v-model="loginForm.password" placeholder="密码" show-password ref="pwdInput"></el-input>
            <el-radio v-model="loginForm.role" label="1">学生</el-radio>
            <el-radio v-model="loginForm.role" label="2">教师</el-radio>
            <el-radio v-model="loginForm.role" label="0">管理员</el-radio>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" round @click="submit">立即登录</el-button>
          </el-form-item>
        </el-form>
        <p>Copyright © 2020 华南师范大学</p>
      </div>
    </div>
  </div>
</template>

<script scoped>
import img from '../assets/xiaohui.jpg'

export default {
  data () {
    return {
      loginForm: {
        account: '',
        password: '',
        role: '1'
      },
      src: img
    }
  },
  methods: {
    submit() {
      switch (this.loginForm.role) {
        case '0': // 管理员登录
          this.$axios.post('/admin/login', {
            account: this.loginForm.account,
            password: this.loginForm.password
          })
            .then(res => {
              console.log(res)
              if (res.data.status == 200) {
                let user = JSON.parse(JSON.stringify(res.data.result[0]))
                localStorage.setItem('user', JSON.stringify(user))
                this.$router.push('/adIndex')
              } else {
                this.$message.error(res.data.result)
                this.$refs.pwdInput.select()
              }
            })
            .catch(err => {
              console.log(err)
            })
          break
        case '1': // 学生登录
          this.$axios.post('/student/login', {
            account: this.loginForm.account,
            password: this.loginForm.password
          })
            .then(res => {
              console.log(res)
              if (res.data.status == 200) {
                let user = {
                  uID: res.data.result[0].uID,
                  name: res.data.result[0].name,
                  account: res.data.result[0].account
                }
                localStorage.setItem('user', JSON.stringify(user))
                this.$router.push('/uIndex')
              } else {
                this.$message.error(res.data.result)
                this.$refs.pwdInput.select()
              }
            })
            .catch(err => {
              console.log(err)
            })
          break
        case '2': // 教师登录
          this.$axios.post('/teacher/login', {
            account: this.loginForm.account,
            password: this.loginForm.password
          })
            .then(res => {
              console.log(res)
              if (res.data.status == 200) {
                let user = {
                  uID: res.data.result[0].uID,
                  name: res.data.result[0].name,
                  account: res.data.result[0].account,
                  role: res.data.result[0].role
                }
                localStorage.setItem('user', JSON.stringify(user))
                this.$router.push('/adIndex')
              } else {
                this.$message.error(res.data.result)
                this.$refs.pwdInput.select()
              }
            })
            .catch(err => {
              console.log(err)
            })
          break
        default: console.log('请选择身份')
      }
    }
  }
}
</script>

<style lang="scss">
.login{
  // height: 100%;
  .container{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    width: 700px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    .left{
      .el-image{
        width: 400px;
      }
    }
    .right{
      position: relative;
      padding: 20px;
      p:last-child{
        position: absolute;
        bottom: 0;
      }
    }
  }
  .el-input{
    margin-bottom: 10px;
  }
  .el-button{
    width: 200px;
    margin: 0 auto;
    font-size: 16px;
    display: block;
  }
}
</style>
