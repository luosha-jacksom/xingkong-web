<template>
  <div class="container page">
    <van-nav-bar :title="$t('收款卡信息')" class="nav-bar">
      <!-- <template #left>
        <van-icon name="arrow-left" color="#fff" @click="back()"/>
      </template> -->
    </van-nav-bar>
    <div class="rt-pos" @click="$router.back()"></div>
    <div class="wrapper">
      <div class="add-card" @click="toBindCard()">
        <van-icon name="plus" />
        <span>{{ $t('添加收款卡') }} </span>
      </div>
      <div class="bank">
          <div class="info">
            <div class="row-content">{{this.bankInfo.bankinfo}}</div>
            <div class="row-content">{{this.userInfo.name}}</div>
            <div class="row-content">{{this.bankInfo.bankid}}</div>
          </div>
      </div>
      <div class="tips">{{ $t('提示:请绑定大型商业银行, 如需修改, 请您联系在线客服') }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      is_bind:false,
      bankInfo:{},
      userInfo:{}
    };
  },
  methods: {
    back(){
      return window.history.back();
    },
    getUserBankInfo(){
      this.$http({
        method: 'get',
        url: 'user_get_bank'
      }).then(res=>{
        if(res.code === 200){
          if(res.data.is_bank){
            this.is_bind = true;
            this.bankInfo = res.data.info;
          }else {
            this.is_bind = false;
          }
        }else if(res.code ===401){
          this.$toast(res.msg);
        }
      })
    },
    getUserInfo(){
      this.$http({
        method: 'get',
        url: 'user_info'
      }).then(res=>{
        if(res.code === 200){
          this.userInfo = res.data;
          this.name = res.data.name;
        }else if(res.code ===401){
          this.$toast(res.msg);
        }
      })
    },
    toBindCard() {
      if (!this.userInfo.name) {
        this.$router.push("Setname");
        this.$toast("请设置姓名后再绑定银行卡！");
        return true;
      }else if(!this.userInfo.paypassword){
        this.$router.push("SetPayPassword");
        this.$toast("请设置提现密码后再绑定银行卡！");
        return true;
      } else {
        this.$router.push({path:'/BindCard'})
      }
    }
  },
  created() {
    if(!localStorage.getItem('token')){
      this.$router.push({path:'/Login'})
    }else {
      this.getUserInfo();
      this.getUserBankInfo();
    }
  }
};
</script>

<style lang='less' scoped>
// @import "../../assets/css/base.css";
.van-cell {
  font-size: 14px;
  line-height: 14px;
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

.page{
  background: #282828;
  color: #e6b98a;
  height: 667px;
  margin-top: -10px;
  width: 105%;
  margin-left: -10px;
  position: relative;
}
.container p{
  padding: 0 15px;
  margin-top: 15px;
  font-size: 14px;
  color: #dc2037;
}
.manage-card .wrapper{
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

}
.wrapper .add-card{
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ddb285;
  background-color: #212121;
  height: 52px;
  margin-right: -231px;
}
::v-deep .van-nav-bar__content {
  line-height: 46px;
  background-color: #212121;
  color: #ddb285;
}
::v-deep .van-nav-bar__title{
  color: #ddb285;
}
::v-deep .van-icon-arrow-left:before{
  color: #ddb285;
}
.wrapper .add-card span{
  margin-left: 10px;
  font-size: 14px;
}
.wrapper .tips {
  margin: 15px 15px;
  font-size: 14px;
  color: #979799;
}
.wrapper .bank .info {
  margin-left: 20px;
  flex: 1;
  color: #666;
}
.wrapper .bank .info .row-content{
  margin: 30px 0;
  line-height: 5px;
  font-size: 14px;
}
</style>
