<template>
  <div class="container page">
      <van-nav-bar :title="$t('设置')" class="nav-bar">
        <template #left>
          <van-icon name="arrow-left" color="#fff" @click="back()"/>
        </template>
      </van-nav-bar>
      <div class="items">
        <div class="item van-hairline--bottom" @click="toInfomation()">
          <div class="left">{{ $t('基本信息设置') }}</div>
          <van-icon name="arrow" />
        </div>
        <div class="item van-hairline--bottom" @click="toLoginPassword()">
          <div class="left">{{ $t('登录密码') }}</div>
          <van-icon name="arrow" />
        </div>
        <div class="item van-hairline--bottom" @click="toPayPassword()">
          <div class="left">{{ $t('资金密码') }}</div>
          <div class="right">
            <span class="desc">{{this.userInfo.paypassword}}</span>
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
      <van-button class="sign-out" type="primary" size="normal" @click="loginout()">{{ $t('退出登录') }}</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo:{}
    };
  },
  methods: {
    back(){
      return window.history.back();
    },
    toPayPassword(){
      if(this.userInfo.paypassword !== "未设置"){
        this.$toast(this.$t("提现密码已设置，需要修改请联系客服"));
      }else {
        this.$router.push({path:'/SetPayPassword'});
      }
    },
    toLoginPassword(){
      this.$router.push({path:'/SetLoginPassword'});
    },
    toInfomation(){
      this.$router.push({path:'/Infomation'});
    },
    loginout(){
        localStorage.clear()
        this.$router.push({path:'/Mine'});
    },
    toServicePage(){
      this.$router.push("ServicePage");
    },
    getUserInfo(){
      this.$http({
        method: 'get',
        url: 'user_info'
      }).then(res=>{
        if(res.code === 200){
          this.userInfo = res.data;
          if(res.data.paypassword){
            this.userInfo.paypassword = this.$t("已设置");
          }else {
            this.userInfo.paypassword = this.$t("未设置");
          }
        }else if(res.code ===401){
          this.$toast(res.msg);
        }
      })
    }
  },
  created() {
    if(!localStorage.getItem('token')){
      this.$router.push({path:'/Login'})
    }else {
      this.getUserInfo();
    }
  }
};
</script>

<style lang='less' scoped>
// @import "../../assets/css/base.css";

::v-deep .van-nav-bar__content {
  height: 100px;
  line-height: 100px;
  background-color: #282828;
  color: #ddb285;
}

.container .items{
  background-color: #212121;
  font-size: 14px;
  color: #ddb285;
  padding: 0 25px;
}
.container .items .item{
  padding: 30px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 10px;
}
.container .items .van-hairline--bottom::after {
  border-bottom-width: 3px;
}
.container .sign-out{
  margin: 500px 20px 0;
  height: 100px;
  line-height: 100px;
  border-radius: 50px;
  color: #fff;
  font-size: 14px;
  font-weight: bolder;
  border: none;
  background: #212121;
}
.page{
  background: #212121;
}
.container  .item .desc{
  font-size: 14px;
  font-weight: 700;
  color: #979799;
}
.container .item .right{
  display: flex;
  flex-direction: row;
  align-items: center;
}

::v-deep [class*=van-hairline]::after{
  border: 0 solid  #ddb285;
}
</style>
