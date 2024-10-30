<template>
  <div class="container page">
    <van-nav-bar title="基本信息" class="nav-bar">
      <template #left>
        <van-icon name="arrow-left" color="#fff" @click="back()"/>
      </template>
    </van-nav-bar>
    <div class="main-content">
        <div @click="openHerderImg()" class="item van-hairline--bottom">
          <div class="left">{{ $t('头像') }}</div>
          <div class="right">
            <img  :src="this.userInfo.header_img">
            <van-icon name="arrow" />
          </div>
        </div>
        <van-popup v-model="show" position="bottom" round :style="{ height: '50%' }">
            <div class="avatarbox">
                <div class="title van-hairline--bottom">
                  <van-icon @click="show=false" name="cross" />
                  <div class="text">{{ $t('选择头像') }}</div>
                  <div class="btnok" @click="check()">{{ $t('确定') }}</div>
                </div>
                <div class="content">
                  <van-image
                      round
                      v-for="(item,index) in 20" :key="index"
                      @click="select_header_img('http://20.24.83.251:9000/lvs/mihuan/'+item+'.png')"
                      :class="{ 'choose': isActive ===  'http://20.24.83.251:9000/lvs/mihuan/'+item+'.png'}"
                      :src="'http://20.24.83.251:9000/lvs/mihuan/'+item+'.png'"
                  />
                </div>
            </div>
        </van-popup>
        <div class="item van-hairline--bottom" @click="toSetName()">
        <div class="left">{{ $t('真实姓名') }}</div>
        <div class="right">
          <span class="desc">{{this.userInfo.name ? this.userInfo.name :'未设置'}}</span>
          <van-icon name="arrow" />
        </div>
      </div>
        <div class="item van-hairline--bottom" @click="toSetSex()">
        <div class="left">{{ $t('性别') }}</div>
        <div class="right">
          <span class="desc">{{this.userInfo.sex !== "0" ? this.userInfo.sex === "1" ? "男" :"女": '未知'}}</span>
          <van-icon name="arrow" />
        </div>
      </div>
        <div class="item van-hairline--bottom" @click="toSetBank()">
        <div class="left">{{ $t('绑定信息') }}</div>
        <div class="right">
          <span class="desc">{{this.isBank ? $t("已绑定") : $t('无')}}</span>
          <van-icon name="arrow" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive:false,
      show:false,
      isBank:false,
      userInfo:{}
    };
  },
  methods: {
    back(){
      return window.history.back();
    },
    toSetName(){
      this.$router.push({path:'/Setname'});
    },
    toSetBank(){
      this.$router.push({path:'/Setbank'});
    },
    toSetSex(){
      this.$router.push({path:'/Setsex'});
    },
    openHerderImg(){
      this.show = true;
    },
    select_header_img(url){
        this.isActive = url;
    },
    check(){
      this.$http({
        method: 'post',
        data:{header_img:this.isActive},
        url: 'user_header_img'
      }).then(res=>{
        if(res.code === 200){
          this.getUserInfo();
          this.$toast(res.msg);
          this.show = false;
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
          console.log(res.data,'res.dara')
          this.userInfo = res.data;
        }else if(res.code ===401){
          this.$toast(res.msg);
        }
      })
    },
    getUserBankInfo(){
      this.$http({
        method: 'get',
        url: 'user_get_bank'
      }).then(res=>{
        if(res.code === 200){
          if(res.data.is_bank){
            this.isBank = true;
          }else {
            this.isBank = false;
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
      this.getUserBankInfo();
    }
  }
};
</script>

<style lang='less' scoped>
// @import "../../assets/css/base.css";
.container .main-content {
  padding: 0 20px;
  background-color: #282828;
  color: #e6b98a;
}
.page{
  background: #282828;
  height: 580px;
}
.container .main-content .item{
  padding: 30px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}
.container .main-content .item .right{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.container .main-content .item .right img{
  width: 90px;
}
.container .main-content .van-hairline--bottom::after {
  border-bottom-width: 3px;
}
.container .main-content .item .right .desc-cell-number, .container .main-content .item .right .desc{
  font-size: 14px;
  font-weight: 700;
  color: #ddb285;
}
.avatarbox{
  padding: 15px;
  color: #000;
  height: 81%;
  background-color: #fff;
}
.avatarbox .title{
  padding: 8px 10px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.avatarbox .content .van-image{
  width: 105px;
  height: 105px;
  margin: 2.5%;
  border-radius: 50%;
}
.avatarbox .content{
  padding-bottom: 10px;
  height: 100%;
  overflow-y: auto;
  padding-top: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.avatarbox .content .choose{
  width: 95px;
  height: 95px;
  border: 6px solid #e6c3a1;
}

::v-deep .van-nav-bar__content {
  height: 100px;
  line-height: 100px;
  background-color: #212121;
}
::v-deep [class*=van-hairline]::after{
  border: 0 solid #ebedf0;
}
::v-deep .van-nav-bar__title{
  color: #ddb285;
}
::v-deep .van-icon-arrow-left:before{
  color: #ddb285;
}
</style>
