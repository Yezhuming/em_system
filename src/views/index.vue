<template>
  <div class="index">
    首页
    <el-button type="text" @click="login">登录</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      this.$router.push('/login')
    }
  }
}
</script>
