<template>
  <div class="container page">
    <van-nav-bar :title="$t('修改登录密码')" class="nav-bar">
      <template #right>
        <span class="nav-right" @click="save()">{{ $t('保存') }}</span>
      </template>
    </van-nav-bar>
    <div class="rt-pos" @click="$router.back()"></div>
    <van-cell-group>
      <van-field v-model="old_password" :label="$t('旧密码')" :placeholder="$t('请输入您的旧密码')" />
      <van-field v-model="o_new_password" :label="$t('新密码')" :placeholder="$t('请输入您的新密码')" />
      <van-field v-model="t_new_password" :label="$t('新密码')" :placeholder="$t('请再次输入您的新密码')" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      o_new_password:"",
      t_new_password:"",
      old_password:"",
      userInfo:{}
    };
  },
  methods: {
    back(){
      return window.history.back();
    },
    save(){
      if(this.o_new_password === "" || this.o_new_password === null || this.o_new_password === undefined){
        this.$toast.fail(this.$t("请填写完整"));
        return false;
      }
      if(this.t_new_password === "" || this.t_new_password === null || this.t_new_password === undefined){
        this.$toast.fail(this.$t("请填写完整"));
        return false;
      }
      if(this.old_password === "" || this.old_password === null || this.old_password === undefined){
        this.$toast.fail(this.$t("请填写完整"));
        return false;
      }
      if(this.o_new_password !== this.t_new_password){
        this.$toast(this.$t("两次密码输入不一致"));
        return false;
      }
      this.$http({
        method: 'get',
        data:{
          old_password:this.old_password,
          new_password:this.o_new_password,
        },
        url: 'user_set_loginpw'
      }).then(res=>{
        if(res.code === 200){
          this.$toast(res.msg);
          setTimeout(() => {
            localStorage.clear()
            this.$router.push("Login")
          }, 500);

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
.page {
  height: 677px;
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
  border-color: #ccc;
  border-style: solid;
  transform: matrix(0.71, 0.71, -.71, 0.71, 0, 0);
  position: absolute;
  top: 14px;
  left: 14px;
}

.van-cell-group {
  margin-top: 77px;
}
::v-deep .van-nav-bar__content {
  height: 35px;
  line-height: 35px;
  background-color: #282828;
  color: #ddb285;
}
::v-deep .van-nav-bar__content {
  line-height: 46px;
  background-color: #212121;
  color: #ddb285;
}
.van-cell {
  font-size: 21px;
  color: #ddb285;
  margin-top: 22px;
}
::v-deep .van-field__label{
  width: auto;
}

::v-deep input {
  height: 24px;
  margin-top: 10px;
  text-indent: 10px;
  outline: none;
  border: none;
}
</style>
