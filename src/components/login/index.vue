<template>
  <div class="bg-container page">
<!--      <img class="bg-img" src="img/login/login-bg.png">-->
      <div class="bg-wrapper">
        <div class="login">
          <!-- <van-nav-bar class="nav-bar">
            <template #left>
              <van-icon name="arrow-left" color="#fff" @click="back()"/>
            </template>
          </van-nav-bar> -->
          <div class="wrapper">
            <div class="logo-container">
              <div class="logo-wrapper">
                <!-- <img class="logo-img" :src="this.$store.getters.getBaseInfo.ico !==undefined ?this.$store.getters.getBaseInfo.ico:'/img/null.png'"> -->
              </div>
            </div>
            <div class="title">登录</div>
            <div class="loginForm">
              <input type="text" class="input" v-model="username" placeholder="请输入用户名">
              <input type="password" class="input" v-model="password" placeholder="请输入密码">
              <!-- <van-field v-model="username"
               clearable 
               input-align="center"
               class="input"  
               placeholder="请输入用户名" /> -->

              <!-- <van-field
                  v-model="password"
                  :type="passwordType"
                  input-align="center"
                  class="input"
                  placeholder="请输入密码"> -->
                <!-- <template slot="right-icon">
                  <van-icon :name=" passwordType === 'password' ? 'closed-eye':'eye-o'" @click="switchPasswordType"/>
                </template>
              </van-field> -->
              <div class="reset-text">
                <span>忘记密码？</span>
              </div>
              <div @click="toRegister()" class="register-text">
                <span>没有账户？马上注册</span>
              </div>
              <button class="login-btn">登录</button>
              <!-- <van-button class="login-btn" 
                type="primary" size="normal" @click="doLogin()">登录</van-button> -->
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
// import {NavBar} from 'vant'
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
      username: '',
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
    toRegister(){
      this.$router.push("Register")
    },
    doLogin() {
      if(this.username === "" || this.username === null || this.username === undefined){
        // this.$toast(this.$t("请输入用户名"));
        alert("请输入用户名");
        return false;
      }
      if(this.password === "" || this.password === null || this.password === undefined){
        // this.$toast(this.$t("请输入密码"));
        alert("请输入密码");
        return false;
      }
      this.$http({
        method: 'get',
        data:{username:this.username,password:this.password},
        url: 'member_login'
      }).then(res=>{
          if(res.code === 200){
            this.$toast.success(res.msg);
            localStorage.setItem('token',res.data.id)
            this.$router.push("Mine")
          }else {
            this.$toast(res.msg);
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

.login{
  height: 100%;
}
.bg-container .bg-wrapper .login .nav-bar{
  background: 0 0
}

.login .wrapper {
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
.login .wrapper .title{
  line-height: 100px;
  text-align: center;
  font-size: 45px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 5px;
}
.login .wrapper .loginForm{
  padding: 60px;
}
.login .wrapper .loginForm .input{
  padding: 10px 20px;
  margin-top: 40px;
  border-radius: 50px;
  text-align: center;
  line-height: 80px;
  font-size: 30px;
  color: #4e4e4e;
}
::v-deep .van-field__right-icon .van-icon {
  font-size: 50px;
}
::v-deep .van-icon {
  font-size: 50px;
}
.bg-container .bg-wrapper{
  background: #212121;
}
.login .wrapper .loginForm .reset-text{
  margin: 30px 15px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.login .wrapper .loginForm .reset-text span{
  color: #fff;
  font-size: 25px;
  font-weight: 500;
  line-height: 15px;
}
.login .wrapper .loginForm .register-text{
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login .wrapper .loginForm .register-text span{
  color: #fff;
  font-size: 25px;
  font-weight: 500;
  line-height: 20px;
}
.login .wrapper .loginForm .active{

}
.login .wrapper .loginForm .login-btn{
  margin-top: 85px;
  width: 100%;
  height: 100px;
  border-radius: 50px;
  color: #fff;
  background-color: #7e5678;
  font-size: 30px;
  font-weight: bolder;
  border: none;
}

</style>
