<template>
  <div class="login">
    <div class="container">
      <div class="left">
        <el-image :src="src"></el-image>
      </div>
      <div class="right">
        <p>计组虚拟实验管理网站</p>
        <p>Management Website</p>
        <el-form :model="loginForm">
          <el-form-item>
            <el-input v-model="loginForm.account" placeholder="学号" v-if="loginForm.role == '1'" ref="input"></el-input>
            <el-input v-model="loginForm.account" placeholder="账号" v-else ref="input"></el-input>
            <el-input v-model="loginForm.password" placeholder="密码" show-password ref="pwdInput"></el-input>
            <el-radio-group v-model="loginForm.role" @change="selectRole">
              <el-radio label="1" >学生</el-radio>
              <el-radio label="2">教师</el-radio>
              <el-radio label="0">管理员</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" round @click="submit">立即登录</el-button>
          </el-form-item>
        </el-form>
        <p>Copyright © 2020 YEZHUMING</p>
      </div>
    </div>
  </div>
</template>

<script scoped>
import img from '../assets/computer.png'

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
    selectRole() {
      this.$refs.input.focus()
    },
    submit() {
      let date = new Date()
      let loginDay = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      let loginTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      switch (this.loginForm.role) {
        case '0': // 管理员登录
          this.$axios.post('/admin/login', {
            account: this.loginForm.account,
            password: this.loginForm.password
          }).then(res => {
            console.log(res)
            if (res.data.status == 200) {
              let user = JSON.parse(JSON.stringify(res.data.result[0]))
              sessionStorage.setItem('user', JSON.stringify(user))
              this.$router.push('/adIndex')
              this.$message.success('登录成功！')
            } else {
              this.$message.error(res.data.result)
              this.$refs.pwdInput.select()
            }
          }).catch(err => {
            console.log(err)
          })
          break
        case '1': // 学生登录
          this.$axios.post('/student/login', {
            account: this.loginForm.account,
            password: this.loginForm.password,
            loginDate: `${loginDay} ${loginTime}`
          }).then(res => {
            console.log(res)
            if (res.data.status == 200) {
              let user = {
                sID: res.data.result[0].sID,
                name: res.data.result[0].name,
                account: res.data.result[0].account,
                role: res.data.result[0].role,
                rID: res.data.rID
              }
              sessionStorage.setItem('user', JSON.stringify(user))
              this.$router.push('/')
              this.$message.success('登录成功！')
            } else {
              this.$message.error(res.data.result)
              this.$refs.pwdInput.select()
            }
          }).catch(err => {
            console.log(err)
          })
          break
        case '2': // 教师登录
          this.$axios.post('/teacher/login', {
            account: this.loginForm.account,
            password: this.loginForm.password
          }).then(res => {
            console.log(res)
            if (res.data.status == 200) {
              let user = {
                tID: res.data.result[0].tID,
                name: res.data.result[0].name,
                account: res.data.result[0].account,
                role: res.data.result[0].role
              }
              sessionStorage.setItem('user', JSON.stringify(user))
              this.$router.push('/adIndex')
              this.$message.success('登录成功！')
            } else {
              this.$message.error(res.data.result)
              this.$refs.pwdInput.select()
            }
          }).catch(err => {
            console.log(err)
          })
          break
        default: console.log('请选择身份')
      }
    }
  },
  mounted() {
    this.$refs.input.focus()
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
      min-width:400px;
      height:400px;
      position: relative;
      .el-image{
        width: 350px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
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
