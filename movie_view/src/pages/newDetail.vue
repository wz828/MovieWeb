<template lang="html">
  <div class="container">
    <div>
      <movie-index-header></movie-index-header>
    </div>
    <div class="contentMain">
      <h1>{{detail.articleTitle}}</h1>
      <div>{{detail.articleTime}}</div>
      <div class="contentText">{{detail.articleContext}}</div>
    </div>
    <comment v-bind:movie_id="article_id"></comment>
    <div>
      <common-footer></common-footer>
    </div>
  </div>
</template>
<script>
  import MovieIndexHeader from '../components/MovieIndexHeader';
  import CommonFooter from '../components/commonFooter';
  import Comment from '../components/Comment';

  let article_id = 0;
  export default {
    name: 'NewDetail',
    data() {
      return {
        detail: [],
        article_id: '',
      }
    },
    components: {
      MovieIndexHeader,
      CommonFooter,
      Comment,
    },
    created() {
      //this.$route.query.id
      article_id = this.$route.query.id;
      this.article_id = article_id;
      this.$http.post('http://localhost:3000/articleDetail', {
        article_id: article_id
      }).then((data) => {
        this.detail = data.body.data[0];
        this.detail.articleTime = new Date(parseInt(this.detail.articleTime)).toLocaleString();
        //console.log(data.body.data)
      })
    },
    methods: {

    }
  }

</script>
<style lang="css" scoped>
  .container {
    width: 100%;
    margin: 0 auto;
  }

  .contentMain {
    padding-top: 150px;
  }

  .contentText {
    font-size: 15px;
    padding-top: 20px;
  }

</style>
