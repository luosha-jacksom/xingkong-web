<template>
  <div class="container page">
    <van-nav-bar :title="$t('修改真实姓名')" class="nav-bar">
      <template #right>
        <span class="nav-right" @click="save()">{{ $t('保存') }}</span>
      </template>
    </van-nav-bar>
    <div class="rt-pos" @click="$router.back()"></div>
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
  height: 667px;
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

.van-cell {
  font-size: 14px;
  line-height: 45px;
}
.container p{
  padding: 0 15px;
  margin-top: 15px;
  font-size: 14px;
  color: #dc2037;
}

::v-deep .van-nav-bar__content {
  line-height: 46px;
  background-color: #212121;
  color: #ddb285;
}

::v-deep .van-nav-bar__title{
  color: #ddb285;
}

::v-deep .van-nav-bar__right {
  margin-left: 300px;
}

::v-deep .van-cell-group,::v-deep .van-cell{
  background: #282828;
}
::v-deep .van-field__control,::v-deep .van-field__label,::v-deep .van-nav-bar__title,::v-deep .nav-right,::v-deep .van-icon-arrow-left:before{
  color: #f3c7a2 !important;
}
</style>
