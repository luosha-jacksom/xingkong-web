<template>
  <div class="container page">
    <div class="header">
      <van-nav-bar title="个人报表" class="nav-bar">
        <template #left>
          <van-icon name="arrow-left" color="#ddb285" @click="back()"/>
        </template>
      </van-nav-bar>
      <div class="info">
        <p class="title">{{ $t('盈利金额(元)') }}</p>
        <p class="value">{{ this.win_money.toFixed(2) }}</p>
        <p class="tip">{{ $t('盈利计算公式 : 中奖金额 - 任务金额') }}</p>
      </div>
      <div class="content">
        <div class="datalist">
          <div class="datalistitem">
            <div class="datalistitemValue">{{ this.personalreport.play_money }}</div>
            <div class="datalistitemKey">{{ $t('任务金额') }}</div>
            <div class="datalistitemRightLine"></div>
          </div>
          <div class="datalistitem">
            <div class="datalistitemValue">{{ this.personalreport.recharge}}</div>
            <div class="datalistitemKey">{{ $t('充值金额') }}</div>
            <div class="datalistitemRightLine"></div>
          </div>
          <div class="datalistitem">
            <div class="datalistitemValue">{{ this.personalreport.withdrawal }}</div>
            <div class="datalistitemKey">{{ $t('提现金额') }}</div>
            <div class="datalistitemRightLine"></div>
          </div>
          <div class="datalistitem">
            <div class="datalistitemValue">{{ this.personalreport.win_money }}</div>
            <div class="datalistitemKey">{{ $t('中奖金额') }}</div>
            <div class="datalistitemRightLine"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      win_money:0,
      personalreport:{}
    };
  },
  methods: {
    back(){
      return window.history.back();
    },
    getPersonalreport(){
      this.$http({
        method: 'get',
        url: 'user_get_personalreport'
      }).then(res=>{
        if(res.code === 200){
          this.personalreport = res.data;
          this.win_money = this.personalreport.win_money - this.personalreport.play_money;
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
      this.getPersonalreport();
    }
  }
};
</script>

<style lang='less' scoped>
// @import "../../assets/css/base.css";
.container .header{
  background-color: #212121;
  color: #ddb285;
}
.page{
  background-color: #212121;
}
.container .header .info{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
  padding-top: 10px;
  margin: auto;
}
::v-deep .van-nav-bar__title{
  color: #e6b98a;
}
.container .header .info .title{
  font-size: 14px;
  color: #ddb285;
}
.container .header .info .value{
  margin: 10px auto;
  color: #ddb285;
  font-size: 14px;
  border-bottom: 1px solid #ddb285;
}
::v-deep .van-nav-bar__content {
  height: 100px;
  line-height: 100px;
  background-color: #282828;
}
.container .header .info .tip{
  font-size: 14px;
  color: #ddb285;
}
.container .content{
  flex: 1;
  background-color: #212121;
  height: 322px;
}
.container .content .datalist{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
}
.container .content .datalist .datalistitem{
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 270px;
  width: 23.3%;
}
.container .content .datalist .datalistitem .datalistitemValue{
  color: #ddb285;
  font-size: 14px;
  margin-bottom: 10px;
  margin-top: 10px;
}
.container .content .datalist .datalistitem .datalistitemKey{
  color: #ddb285;
  font-size: 14px;
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>
