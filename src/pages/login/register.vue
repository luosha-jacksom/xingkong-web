<template>

  <div class="bg-container page">
<!--    <img class="bg-img" src="img/login/login-bg.png">-->
    <div class="bg-wrapper">
      <div class="register">
        <van-nav-bar class="nav-bar"></van-nav-bar>
        <div class="rt-pos" @click="$router.back()"></div>
        <div class="wrapper">
          <!-- <div class="logo-container">
            <div class="logo-wrapper">
              <img class="logo-img" :src="this.$store.getters.getBaseInfo.ico !==undefined ?this.$store.getters.getBaseInfo.ico:''">
            </div>
          </div> -->
          <div class="title">{{ $t('注册') }}</div>
          <div class="loginForm">
            <input v-model="username" :placeholder="$t('请输入用户名(6-12个英文字母或数字)')"/>
            <input v-model="password" :placeholder="$t('请输入登录密码(6-12个英文字母或数字)')"/>
            <input v-model="code" :placeholder="$t('请输入邀请码')"/>

            <!-- <van-field v-model="username"  clearable input-align="center" class="input"  :placeholder="$t('请输入用户名(6-12个英文字母或数字)')" /> -->
            <!-- <van-field
                v-model="password"
                :type="passwordType"
                input-align="center"
                class="input"
                :placeholder="$t('请输入登录密码(6-12个英文字母或数字)')"> -->
              <!-- <template slot="right-icon">
                <van-icon :name=" passwordType === 'password' ? 'closed-eye':'eye-o'" @click="switchPasswordType"/>
              </template> -->
            <!-- </van-field> -->
            <!-- <van-field v-model="code"  clearable input-align="center" class="input"  :placeholder="$t('请输入邀请码')" /> -->
            <div class="agreement">
              <!-- <van-checkbox v-model="checked" /> -->
              <input type="checkbox" class="agree-checkbox" v-model="checked"/>
              <span class="agreement-text">{{ $t('我已经知晓并同意"开户协议"各项条约') }}</span>
            </div>
            <van-button class="login-btn"   type="primary" size="normal" @click="doRegister()">{{ $t('注册') }}</van-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'inputValue',
    event: 'input'
  },
  props: {
    /**
     * 当前输入的值
     */
    inputValue: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      checked: true,
      username: '',
      code: '',
      password: this.inputValue,
      passwordType: 'password',
    };
  },
  methods: {
    switchPasswordType() {
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
    },
    back(){
      return window.history.back();
    },
    doRegister() {
      if(this.username === "" || this.username === null || this.username === undefined){
        this.$toast.fail("请输入用户名！");
        return false;
      }
      if(this.password === "" || this.password === null || this.password === undefined){
        this.$toast.fail("请输入密码！");
        return false;
      }
      if(this.code === "" || this.code === null || this.code === undefined){
        this.$toast.fail("请输入邀请码！");
        return false;
      }
      if(!this.checked){
        this.$toast.fail("请勾选下方开户协议！");
        return false;
      }
      this.$http({
        method: 'post',
        data:{
          username:this.username,
          password:this.password,
          code:this.code
        },
        url: 'member_register'
      }).then(res=>{
          if(res.code === 200){
            this.$toast.success(res.msg);
            localStorage.setItem('token',res.data)
            this.$router.push("Mine")
          }else {
            this.$toast.fail(res.msg);
          }
      })
    }
  },
  created() {
    if(localStorage.getItem('token')){
      return window.history.back();
    }
  }
};
</script>

<style lang='less' scoped>
// @import "../../assets/css/base.css";


.page {
  height: 667px;
  background: #282828;
  width: 105%;
  margin-left: -10px;
  margin-top: -10px;
  position: relative;
}

.rt-pos {
  display: inline-block;
  height: 12px;
  width: 12px;
  border-width: 0 0 5px 5px;
  border-color: #ddb285;
  border-style: solid;
  transform: matrix(0.71, 0.71, -.71, 0.71, 0, 0);
  position: absolute;
  top: 14px;
  left: 14px;
}


.register{
  height: 100%;
}
.bg-container .bg-wrapper .register .nav-bar{
  background: 0 0
}
.register .wrapper {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.logo-container{
  margin: 0 auto;
  width: 45%;
}
.logo-container .logo-wrapper{
  position: relative;
  padding-bottom: 62.5%;
}
.logo-container .logo-wrapper .logo-img{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -o-object-fit: contain;
  object-fit: contain;
}
.register .wrapper .title{
  line-height: 100px;
  text-align: center;
  font-size: 45px;
  font-weight: 700;
  color: #ddb285;
  letter-spacing: 5px;
}
.register .wrapper .loginForm{
  padding: 60px;
}
.bg-container .bg-wrapper{
  background: #212121;
}
.register .wrapper .loginForm .input{
  padding: 10px 20px;
  margin-top: 35px;
  border-radius: 50px;
  text-align: center;
  line-height: 70px;
  font-size: 30px;
  color: #4e4e4e;
}

::v-deep input {
  height: 30px;
  width: 186px;
  outline: none;
  text-indent: 12px;
  margin-top: 10px;
}


::v-deep .van-field__right-icon .van-icon {
  font-size: 50px;
}
::v-deep .van-icon {
  font-size: 50px;
}
.register .wrapper .loginForm .reset-text{
  margin: 30px 15px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.register .wrapper .loginForm .reset-text span{
  color: #ddb285;
  font-size: 25px;
  font-weight: 500;
  line-height: 15px;
}
.register .wrapper .loginForm .register-text{
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.register .wrapper .loginForm .register-text span{
  color: #ddb285;
  font-size: 25px;
  font-weight: 500;
  line-height: 20px;
}
.register .wrapper .loginForm .login-btn{
  margin-top: 30px;
  width: 77%;
  height: 53px;
  border-radius: 50px;
  color: #ddb285;
  background-color: #7e5678;
  font-size: 30px;
  font-weight: bolder;
  border: none;
}
.register .wrapper .loginForm .agreement{
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.register .wrapper .loginForm .agreement .agreement-text{
  margin-left: 10px;
  font-size: 14px;
  color: #ddb285;
  font-weight: 500;
  line-height: 18px;
}
.agree-checkbox {
  width: 20px;
  height: 20px;
}

::v-deep .agreement .van-icon {
  font-size: 30px;
}
::v-deep .agreement .van-checkbox__icon {
  font-size: 38px;
}
::v-deep .agreement .van-checkbox__icon--checked .van-icon {
  color: #ddb285;
  border-color: rgb(126, 86, 120);
  background-color: rgb(126, 86, 120);
}
</style>
