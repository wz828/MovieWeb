<template lang="html">
  <div class="container">
    <div>
      <movie-index-header></movie-index-header>
    </div>
    <div class="userMessage">
      <user-message></user-message>
    </div>
    <label>收件箱</label>
    <div>
      <email-list v-for="item in receive_items" :title="item.title" :fromUser="item.fromUser" :context="item.context" :key="index">
      </email-list>
    </div>
    <label>发件箱</label>
    <div>
      <email-list v-for="item in send_items" :title="item.title" :fromUser="item.fromUser" :context="item.context" :key="index">
      </email-list>
    </div>
    <send-talk-box></send-talk-box>
    <common-footer></common-footer>
  </div>
</template>
<script>
  import MovieIndexHeader from '../components/MovieIndexHeader';
  import CommonFooter from '../components/commonFooter';
  import UserMessage from '../components/UserMessage';
  import EmailList from '../components/EmailList';
  import SendTalkBox from '../components/SendTalkBox';

  export default {
    name: 'HelloWorld',
    data() {
      return {
        receive_items: [],
        send_items: [],
        detail: [],
      }
    },
    components: {
      MovieIndexHeader,
      CommonFooter,
      UserMessage,
      EmailList,
      SendTalkBox,
    },
    created() {
      let userId = localStorage._id;
      let send_data = {
        token: localStorage.token,
        user_id: localStorage._id,
        receive: 0
      };
      let receive_data = {
        token: localStorage.token,
        user_id: localStorage._id,
        receive: 1
      };

      if (userId) {
        this.$http.post('http://localhost:3000/users/showEmail', send_data).then((data) => {
          if (data.body.status == 1) {
            alert(data.body.message);
          } else {
            this.send_items = data.body.data;
          }
          console.log(data.body.data);
        })
        this.$http.post('http://localhost:3000/users/showEmail', receive_data).then((data) => {
          if (data.body.status == 1) {
            alert(data.body.message);
          } else {
            this.receive_items = data.body.data;
          }
          console.log(data.body.data);
        })
      } else {
        alert("用户信息错误")
      }
    },
    methods: {

    }
  }

</script>
<style lang="css" scoped>
  .box {
    display: inline-flex;
  }

  .container {
    width: 100%;
    margin: 0 auto;
  }

  .userMessage {
    padding-top: 60px;
    margin-top: -10px;
    margin-left: -10px;
  }

</style>
