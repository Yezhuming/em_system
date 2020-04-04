<template>
  <div class="admin-index">
    <el-container>
      <div class="admin-header">
        <adHeader />
      </div>
      <div class="admin-container">
        <el-aside class="admin-aside">
          <adMenu />
        </el-aside>
        <el-main>
          <div class="admin-main">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
          </div>
        </el-main>
      </div>
    </el-container>
  </div>
</template>

<script>
import adHeader from '../../components/adHeader.vue'
import adMenu from '../../components/adMenu.vue'

export default {
  components: {
    adHeader,
    adMenu
  },
  mounted() {
    this.$router.push('/adIndex/adUser')
  }
}
</script>

<style lang="scss">
  .admin-index{
    height: 100%;
    overflow: hidden;
    .el-header{
      padding: 0;
    }
    .el-container{
      height: 100%;
      flex-direction: column;
    }
    .el-main{
      // padding: 15px;
      overflow-y: auto;
      height: 100%;
      background-color: #dedeff;
    }
  }
  .admin-container{
    display: flex;
    flex-direction: row;
    height: 100%;
  }
  .admin-aside{
    width: 200px !important;
    background-color: #545c64;
  }
  .admin-main{
    background-color: white;
    min-height: 620px;
  }
  .move-enter-active,.move-leave-active{
    transition: opacity .3s;
  }
  .move-enter,.move-leave{
    opacity: 0;
  }
</style>
