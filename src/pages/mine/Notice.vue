<template>
  <div class="container page">
    <div class="header">
      <van-nav-bar :title="$t('系统公告')" class="nav-bar"></van-nav-bar>
      <div class="rt-pos" @click="$router.back()"></div>
    </div>
    <div class="content">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <div class="listItem" v-for="(v,key) in notice" :key="key">
            <div class="listTitle">{{ v.name }}</div>
            <div class="listContent html"><p>{{ v.text }}<br></p></div>
            <div class="listTime"><div class="listTimeText">{{ v.create_time }}</div></div>
          </div>
      </van-pull-refresh>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      notice:{},
      loading: false,
      finished: false,
    };
  },
  methods: {
    back(){
      return window.history.back();
    },
    getNoticeList(){
      this.$http({
        method: 'get',
        url: 'sys_get_notice_list'
      }).then(res=>{
        console.log(res);
        this.notice = res.data
      })
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast(this.$t("刷新成功"));
        this.isLoading = false;
        this.getNoticeList();
      }, 500);
    },
  },
  created() {
    this.getNoticeList();
  }
};
</script>

<style lang='less' scoped>

.page{
  background: #282828;
  color: #e6b98a;
  height: 667px;
  margin-top: -10px;
  width: 105%;
  margin-left: -10px;
  position: relative;
}

.rt-pos {
  display: inline-block;
  height: 12px;
  width: 12px;
  border-width: 0 0 5px 5px;
  border-color: #ccc;
  border-style: solid;
  transform: matrix(0.71, 0.71, -.71, 0.71, 0, 0);
  position: absolute;
  top: 14px;
  left: 14px;
}

// @import "../../assets/css/base.css";
::v-deep .van-pull-refresh__track .van-pull-refresh__head *{
  color: #ddb285;
  font-size: 35px;
}
::v-deep .van-nav-bar__content {
  background-color: #282828;
}
::v-deep .van-nav-bar__title{
  color: #ddb285;
  height: 35px;
  line-height: 35px;
}
::v-deep .van-icon-arrow-left:before{
  color: #ddb285;
}

::v-deep .van-loading__text {
  color: #ddb285;
  font-size: 35px;
}
.container{
  background: #282828;
}
.container .content {
  height: calc(100% - 20px);
  overflow: auto;
}
.container .content .listItem{
  margin-bottom: 20px;
  padding: 20px 20px 0;
  position: relative;
  color: #ddb285;
  background-color: #282828;
}
.container .content .listItem .listTitle{
  font-size: 38px;
}
.container .content .listItem .listContent{
  border-bottom: 2px solid #ddb285;
  padding: 5px 0;
  font-size: 25px;
}
.container .content .listItem .listTime{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  height: 70px;
}
.container .content .listItem .listTime .listTimeText {
  color: #ddb285;
  font-size: 30px;
}
</style>
