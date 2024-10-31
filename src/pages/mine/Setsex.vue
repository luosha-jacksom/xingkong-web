<template>
  <div class="container page">
    <van-nav-bar :title="$t('性别修改')" class="nav-bar"></van-nav-bar>
    <div class="rt-pos" @click="$router.back()"></div>
    <div class="sex">
        <van-radio-group v-model="radio">
          <div class="item van-hairline--bottom" @click="chooesSex(1)">
              <van-radio name="1">{{ $t('男') }}</van-radio>
          </div>
          <div class="item van-hairline--bottom" @click="chooesSex(2)">
            <van-radio name="2">{{ $t('女') }}</van-radio>
          </div>
        </van-radio-group>

    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      radio:"",
      userInfo:{}
    };
  },
  methods: {
    back(){
      return window.history.back();
    },
    chooesSex(sex){
      this.$http({
        method: 'post',
        data:{sex:sex},
        url: 'user_set_sex'
      }).then(res=>{
        if(res.code === 200){
          this.getUserInfo();
          this.radio = sex;
          this.$toast(res.msg);
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
          this.radio = res.data.sex;
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
.container .sex{
  background-color: #282828;
  padding: 0 40px;
  height: 100%;
  color: #ddb285;
}
.container .sex .item{
  font-size: 14px;
  line-height: 50px;
  padding: 8px 0;
}
::v-deep .van-nav-bar__content {
  line-height: 46px;
  background-color: #212121;
  color: #ddb285;
}
::v-deep .van-nav-bar__title{
  color: #ddb285;
}

::v-deep .van-radio__label {
  line-height: 50px;
  margin-left: 30px;
}
::v-deep .van-radio__icon {
  font-size: 14px;
}
::v-deep .van-radio__icon--checked .van-icon {
  color: red;
  border-color: #282828;
  background-color:#282828;
}
.container .van-hairline--bottom::after {
  border-bottom-width: 3px;
}
</style>
