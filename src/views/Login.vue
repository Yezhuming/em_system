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
            <el-input v-model="loginForm.name" placeholder="学号"></el-input>
            <el-input v-model="loginForm.password" placeholder="密码" show-password></el-input>
            <el-radio v-model="loginForm.role" label="1">学生</el-radio>
            <el-radio v-model="loginForm.role" label="2">教师</el-radio>
            <el-radio v-model="loginForm.role" label="3">管理员</el-radio>
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
import img from '../assets/login.jpg'

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
      this.$router.push('/admin')
    }
  }
}
</script>

<style lang="scss">
.login{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .container{
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
