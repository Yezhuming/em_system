<template>
  <div class="header">
    <div class="title" @click="toIndex">实验管理系统</div>
    <div class="info">
      <div class="avatar">
        <el-avatar icon="el-icon-user-solid" />
      </div>
      <p>Admin</p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toIndex() {
      this.$router.push('/admin')
    }
  }
}
</script>

<style lang="scss">
  .header{
    height: 60px;
    background-color: #42c8aa;
    color: white;
    display: flex;
    justify-content: space-between;
  }
  .title{
    width: 200px;
    text-align: center;
    line-height: 60px;
    font-size: 20px;
    border-right: solid 0.5px white;
    cursor: pointer;
  }
  .info{
    display: flex;
    justify-content: space-between;
    width: 200px;
    p{
      width: 140px;
      text-align: center;
      border-left: solid 1px white;
    }
    .el-avatar{
      margin-top: 10px;
    }
  }
</style>
