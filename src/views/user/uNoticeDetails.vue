<template>
  <section class="unotice-details">
    <h3 class="title">{{ article.title }}</h3>
    <div class="date">发布日期：{{ article.date }}</div>
    <div class="content ql-editor" v-html="article.content"></div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      article: {
        title: '',
        date: '',
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
            this.article.date = res.data.result[0].publishDate
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
