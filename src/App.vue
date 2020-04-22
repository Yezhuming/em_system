<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
html, body, #app{
  margin: 0;
  padding: 0;
  // width: 100%;
  // height: 100%;
  min-height: 720px;
  font-size: 16px;
}
body{
  .el-table{
    th.gutter{
      display: table-cell!important;
    }
    colgroup.gutter{
      display: table-cell!important;
    }
 }
}
</style>
