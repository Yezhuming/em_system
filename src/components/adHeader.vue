<template>
  <div class="header">
    <div class="title" @click="toIndex">实验管理系统</div>
    <div class="info">
      <div class="avatar">
        <el-avatar icon="el-icon-user-solid" />
      </div>
      <div class="username">
        <el-dropdown>
          <span class="el-dropdown-link">
            Admin<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>修改信息</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toIndex() {
      this.$router.push('/adIndex')
    }
  }
}
</script>

<style lang="scss">
  .info{
    display: flex;
    width: 200px;
    .el-avatar{
      margin-top: 10px;
    }
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
    flex: 1;
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
      cursor: pointer;
    }
  }
</style>
