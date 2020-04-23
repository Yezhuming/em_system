<template>
  <section class="unotice-details">
    <h3 class="title">{{ article.title }}</h3>
    <div class="title-info">
      <span>发布日期：{{ article.publishDate }}</span>
      <span>发布人：{{ article.publisher }}</span>
    </div>
    <div class="content ql-editor" v-html="article.content"></div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      article: {
        title: '',
        publishDate: '',
        publisher: '',
        content: ''
      }
    }
  },
  methods: {
    getArticle() {
      this.$axios.get('/article/getContentByaID', {
        params: {
          aID: this.$route.query.aID
        }
      })
        .then(res => {
          console.log(res)
          if (res.data.status == 200) {
            this.article.title = res.data.result[0].title
            this.article.publishDate = res.data.result[0].publishDate
            this.article.publisher = res.data.result[0].publisher
            this.article.content = res.data.result[0].content
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    this.getArticle()
  }
}
</script>

<style lang="scss">
.unotice-details{
  .title-info{
    text-align: center;
    margin-top: 12px;
  }
}
</style>
