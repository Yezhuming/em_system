<template>
  <div class="header">
    <div class="title">实验管理系统</div>
    <div class="info">
      <div class="username">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <span v-if="user.role==0">Admin</span>
            <span v-else>{{user.name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="toAccount">修改信息</el-dropdown-item>
            <el-dropdown-item command="exit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {}
    }
  },
  methods: {
    handleCommand(command) {
      if (command == 'toAccount') {
        this.$router.push('/adIndex/adAccount')
      } else if (command == 'exit') {
        sessionStorage.removeItem('user')
        this.$router.push('/login')
      }
    }
  },
  created() {
    this.user = JSON.parse(sessionStorage.getItem('user'))
  }
}
</script>

<style lang="scss">
  .info{
    width: 200px;
    .el-dropdown-link {
      cursor: pointer;
      color: white;
      line-height: 60px;
      font-size: 20px;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
  }
  .username{
    text-align: center;
  }
</style>

<style lang="scss" scoped>
  .header{
    height: 60px;
    background-color: #42c8aa;
    color: white;
    display: flex;
    justify-content: space-between;
    .title{
      width: 200px;
      text-align: center;
      line-height: 60px;
      font-size: 20px;
      border-right: solid 0.5px white;
    }
  }
</style>
