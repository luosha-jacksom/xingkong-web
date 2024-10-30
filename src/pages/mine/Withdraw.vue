<template>
  <div class="container page">
    <van-nav-bar title="在线兑换" class="nav-bar">
      <template #left>
        <van-icon name="arrow-left" color="#fff" @click="back()"/>
      </template>
      <template #right>
        <span class="nav-right" @click="$router.push({path:'/WithdrawRecord'})">兑换记录</span>
      </template>
    </van-nav-bar>
    <div class="main">
      <div class="withdrawMoney">
        <span>{{ $t('提现金额(元)') }}</span>
        <div class="money">
          <div class="moneyNumber">
            <span class="moneyType">¥</span>
            <van-field v-model="withdraw_money" type="number" placeholder= '请输入金额' />
          </div>
          <span class="all" @click="allMoeny()">{{ $t('全部') }}</span>
        </div>
        <div class="information">
          <div class="description">
            <van-popover v-model="showPopover" trigger="click">
              <div class="popover-body" style="padding: 10px;">
                <p>1.单笔限额：最低{{this.withdrawRole.min}}元，最高{{this.withdrawRole.max}}元</p>
                <p>2.提现次数：一天最高提现{{this.withdrawRole.num}}次</p>
                <p>3.{{ $t('到账时间：一般到账时间在5分钟左右，最快2分钟内到账') }}</p></div>
              <template #reference @click="withdrawInfo()">
                <van-icon name="info-o" />
                {{ $t('限额说明') }}
              </template>
            </van-popover>
          </div>

          <div class="balance">
            <span>{{ $t('余额') }}：</span>
            <span class="number">{{ this.userInfo.money }}{{ $t('元') }}</span>
          </div>
        </div>
      </div>
      <van-button class="withdraw_btn" type="default" @click="doWithdraw()">{{ $t('马上提现') }}</van-button>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPopover: false,
      withdraw_money:"",
      userInfo:{},
      withdrawRole:{}
    };
  },
  methods: {
    back(){
      return window.history.back();
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
    getUserWithdrawRole(){
      this.$http({
        method: 'get',
        url: 'user_get_withdraw_role'
      }).then(res=>{
        if(res.code === 200){
          this.withdrawRole = res.data;
        }else if(res.code ===401){
          this.$toast(res.msg);
        }
      })
    },
    allMoeny(){
      this.withdraw_money = this.userInfo.money;
    },
    doWithdraw(){
      if(this.withdraw_money <= 0){
        this.$toast(this.$t("请填写正确的金额"));
        return false;
      }else {
        this.$http({
          method: 'post',
          data:{money:this.withdraw_money},
          url: 'user_set_withdraw'
        }).then(res=>{
          if(res.code === 200){
            location. reload()
            this.$toast(res.msg);
            this.getUserInfo();
            this.getUserWithdrawRole();
          }else if(res.code ===401){
            this.$toast(res.msg);
          }
        })
      }
    },
    withdrawInfo(){
      this.showPopover = true;
    }
  },
  created() {
    if(!localStorage.getItem('token')){
      this.$router.push({path:'/Login'})
    }else {
      this.getUserInfo();
      this.getUserWithdrawRole();
    }
  }
};
</script>

<style lang='less' scoped>
// @import "../../assets/css/base.css";
.van-cell {
  font-size: 14px;
  line-height: 80px;
}
.nav-bar {
  background: #212121;
  color: #f3c7a2 !important;
}
.page{
  background: #282828;
}
::v-deep .van-field__control{
  background-color: #282828;
  color: #f3c7a2 !important;
}
.container p{
  padding: 0 15px;
  margin-top: 15px;
  font-size: 14px;
  color: #dc2037;
}
.container .main{
  display: flex;
  flex-direction: column;
  height: calc(100% - 50px);
  position: relative;
}
.container .main .withdrawMoney{
  display: flex;
  flex-direction: column;
  color: #ddb285;
  padding: 0 20px;
  white-space: nowrap;
  font-size: 14px;
}
.container .main .withdrawMoney span {
  padding: 10px 0;
}
.container .main .withdrawMoney .money{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #f2f2f5;
}
.container .main .withdrawMoney .money .moneyNumber{
  font-size: 50px;
  display: flex;
  flex-direction: row;
}
.container .main .withdrawMoney span {
  padding: 10px 0;
}
.container .main .withdrawMoney .money .all{
  color: #d10404;
}
.container .main .withdrawMoney .money .moneyNumber .van-cell {
  font-size: 14px;
  padding: 0!important;
}
.container .main .withdrawMoney .information{
  padding-bottom: 30px;
}
.container .main .withdrawMoney .information .description {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 0;
}
.container .main .withdrawMoney span{
  padding: 10px 0;
}
.container .main .withdrawMoney .information .balance .number{
  color: #d10404;
}
.withdraw_btn {
  margin: 20px 30px 0;
  height: 80px;
  line-height: 1.22667rem;
  border-radius: 50px;
  color: #fff;
  font-size: 14px;
  font-weight: bolder;
  border: none;
  background: linear-gradient(
      90deg,#e6c3a1,#7e5678);
}
::v-deep .van-field__control{
  padding-left: 15px;
  outline: none;
}
::v-deep .van-field__control::placeholder{
  font-size:20px;
  padding-left: 15px;

}

::v-deep .van-nav-bar__title,.nav-right,::v-deep .van-icon-arrow-left:before{
  color: #ddb285;
  height: 53px;
  line-height: 53px;
}

.nav-right {
  width: 100px;
  display: block;
  margin-left: 65%;
}


</style>
