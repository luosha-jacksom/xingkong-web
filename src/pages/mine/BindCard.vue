<template>
  <div class="container page">
    <van-nav-bar :title="$t('填写收款卡')" class="nav-bar"></van-nav-bar>
    <div class="rt-pos" @click="$router.back()"></div>
    <div class="main-box">
      <div class="label">{{ $t('请输入您的收款卡信息') }}</div>
      <van-cell-group>
        <label>
          银行卡号: 
        </label>
        <input type="text" v-model="bankid" :label="$t('银行卡号')" :placeholder="$t('请输入真实银行卡号')" />
        <br/>
        <label>
          银行名称: 
        </label>
        <input type="text" v-model="bank" :label="$t('银行名称')" :placeholder="$t('请选择银行')" />

        <!-- <van-field v-model="bankid" :label="$t('银行卡号')" type="digit" :placeholder="$t('请输入真实银行卡号')" /> -->
        <!-- <van-field v-model="bank" :label="$t('银行名称')" readonly placeholder="$t('请选择银行')" @click="showSelectBanks()"/> -->
      </van-cell-group>
      <p>{{ $t('尊敬的用户,为了保障您的资金安全,请您绑定您的真实姓名和设置取款密码,如果姓名与开户名不一致,将无法取款') }}</p>
    </div>
    <van-button class="bindCard" type="default" @click="bindCard()">{{ $t('确认绑卡') }}</van-button>
    <van-popup v-model="showBank" round position="bottom" :style="{ height: '35%' }" >
      <van-picker
          show-toolbar
          :columns="banks"
          @confirm="onConfirm"
          @cancel="onCancel"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banks: [],
      showBank:false,
      userInfo:{},
      bankid:"",
      bank:""
    };
  },
  methods: {
    back(){
      return window.history.back();
    },
    bindCard(){
      console.log(this.bankid)
      console.log(this.bank)
      if(!this.bankid){
        this.$toast(this.$t("请输入银行卡号"));
        return false;
      }
      if(this.bank === "" || this.bank === null || this.bank === undefined){
        this.$toast.fail(this.$t("请选择银行"));
        return false;
      }
      this.$http({
        method: 'post',
        data:{bankid:this.bankid,bank:this.bank},
        url: 'user_set_bank'
      }).then(res=>{
        if(res.code === 200){
          this.$router.push({path:'/Mine'})
          this.$toast(res.msg);
        }else if(res.code ===401){
          this.$toast(res.msg);
        }
      })
    },
    showSelectBanks(){
      this.showBank = true;
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
    getBankList(){
      this.$http({
        method: 'get',
        url: 'sys_get_banks'
      }).then(res=>{
        if(res.code === 200){
          this.banks = res.data;
        }else if(res.code ===401){
          this.$toast(res.msg);
        }
      })
    },
    onConfirm(value) {
      this.bank = value.text
      this.showBank = false;
    },
    onCancel() {
      this.showBank = false;
    },
    getUserBankInfo(){
      this.$http({
        method: 'get',
        url: 'user_get_bank'
      }).then(res=>{
        if(res.code === 200){
          if(res.data.is_bank){
            this.is_bind = true;
          }else {
            this.is_bind = false;
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
      this.getBankList();
      this.getUserBankInfo();
    }
  }
};
</script>

<style lang='less' scoped>
// @import "../../assets/css/base.css";
.van-cell {
  font-size: 14px;
  line-height: 33px;
}
.van-hairline--bottom::after {
  border-bottom-width: 3px;
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

.main-box .label{
  padding: 20px;
  font-size: 14px;
  color: #797878;
}

::v-deep .van-nav-bar__title{
  color: #ddb285;
  font-size: 16px;
  line-height: 47px;
  height: 35px;
}

::v-deep .van-picker__toolbar {
  height: 50px;
}

::v-deep .van-picker__cancel, .van-picker__confirm {
  padding: 0 20px;
  font-size: 20px;
}

::v-deep .van-picker-column {
  font-size: 40px;
}

.main-box p{
  padding: 0 20px;
  font-size: 22px;
  color: #ee0a24;
}

.bindCard {
  margin: 20px 30px 0;
  height: 80px;
  line-height: 1.22667rem;
  border-radius: 50px;
  color: #fff;
  font-size: 30px;
  font-weight: bolder;
  border: none;
  background: linear-gradient(
      90deg,#e6c3a1,#7e5678);
}

input{
  height: 24px;
  width: 187px;
  outline: none;
  text-indent: 12px;
  margin-top: 12px;
  margin-left: 6px;
}
</style>
