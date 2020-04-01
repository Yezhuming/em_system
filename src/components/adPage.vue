<template>
  <div class="page">
    <div v-if="title" class="title">{{title}}</div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>

<style lang="scss">
  .page{
    padding: 20px;
    background-color: white;
    .title{
      font: {
        size: 28px;
        weight: bold;
      }
      margin-bottom: 30px;
    }
  }
</style>
