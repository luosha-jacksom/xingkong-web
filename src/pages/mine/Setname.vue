<template>
  <div class="container page">
    <van-nav-bar :title="$t('修改真实姓名')" class="nav-bar">
      <template #left>
        <van-icon name="arrow-left" color="#fff" @click="back()"/>
      </template>
      <template #right>
        <span class="nav-right" @click="save()">{{ $t('保存') }}</span>
      </template>
    </van-nav-bar>
    <van-cell-group>
      <van-field v-model="name" :readonly="userInfo.name !== ''" :label="$t('姓名')" :placeholder="$t('请输入真实姓名')" />
    </van-cell-group>
    <p>{{ $t('为了您账户安全,真实姓名需要与绑定银行卡姓名一致') }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name:"",
      userInfo:{}
    };
  },
  methods: {
    back(){
      return window.history.back();
    },
    save(){
      if(this.userInfo.name){
        this.$toast(this.$t("请勿重复设置"));
        return true;
      }
      if(this.name === "" || this.name === null || this.name === undefined){
        this.$toast.fail(this.$t("请输入姓名"));
        return false;
      }
      this.$http({
        method: 'get',
        data:{name:this.name},
        url: 'user_set_name'
      }).then(res=>{
        if(res.code === 200){
          this.getUserInfo();
          this.name = this.userInfo.name;
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
          this.name = res.data.name;
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

.nav-bar {
  background: #282828;
  color: #f3c7a2 !important;
}
.van-nav-bar__content {
  height: 100px;
  line-height: 100px;
}



.page{
  position: absolute!important;
  top: 0;
  left: 0;
  right: 0;
  background-color: #282828;
  height: 589px
}

.van-cell {
  font-size: 14px;
  line-height: 80px;
}
.container p{
  padding: 0 15px;
  margin-top: 15px;
  font-size: 14px;
  color: #dc2037;
}

.van-nav-bar__right {
  width: 50px;
  float: right;
}

::v-deep .van-cell-group,::v-deep .van-cell{
  background: #282828;
}
::v-deep .van-field__control,::v-deep .van-field__label,::v-deep .van-nav-bar__title,::v-deep .nav-right,::v-deep .van-icon-arrow-left:before{
  color: #f3c7a2 !important;
}
</style>
