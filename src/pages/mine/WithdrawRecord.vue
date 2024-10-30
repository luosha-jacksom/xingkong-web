<template>
  <div class="container page">
    <div class="header">
      <van-nav-bar title="兑换记录" class="nav-bar">
        <template #left>
          <van-icon name="arrow-left" color="#fff" @click="back()"/>
        </template>
      </van-nav-bar>
    </div>
    <div class="main">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-empty v-if="list.length === 0" description="数据为空！" />

          <div class="item_list" v-for="(v,key) in list" :key="key">
            <div class="item">
              <span class="key">状态:</span>
              <span class="value" v-if="v.status === 2" style="color: #07c160">{{v.status_text}}</span>
              <span class="value" v-else>{{v.status_text}}</span>

              <span class="key">金额:</span>
              <span class="value">{{v.money}}</span>

              <span class="key">说明:</span>
              <span class="value">{{v.desc}}</span>

              <span class="key">提交时间:</span>
              <span class="value">{{v.create_time}}</span>

              <span class="key">审核时间:</span>
              <span class="value">{{v.update_time}}</span>
            </div>
            <!-- <div class="topInfo">
              <span v-if="v.status === 2" style="color: #07c160">{{v.status_text}}</span>
              <span v-else >{{v.status_text}}</span>
              <span>{{ $t('金额') }}：-{{v.money}} 111</span>
            </div>
            <div class="desc">
              <span>{{ $t('说明') }}：{{v.desc}} 222</span>
            </div>
            <div class="time">
              <span>{{ $t('提交时间') }}：{{v.create_time}} 333</span>
            </div>
            <div class="time">
              <span>{{ $t('审核时间') }}：{{v.update_time}} 444</span>
            </div> -->
          </div>
      </van-pull-refresh>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      list:[]
    };
  },
  methods: {
    back(){
      return window.history.back();
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast(this.$t('刷新成功'));
        this.isLoading = false;
      }, 500);
    },
    getUserWithdrawList(){
      this.$http({
        method: 'get',
        url: 'user_get_withdraw_list'
      }).then(res=>{
        if(res.code === 200){
          this.list = res.data;
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
      this.getUserWithdrawList();
    }
  }
};
</script>

<style lang='less' scoped>
// @import "../../assets/css/base.css";
* {
  font-size: 14px;
  color: #f3c7a2;
}
.nav-bar {
  background: #212121;
  color: #f3c7a2 !important;
}
.page{
  background: #282828;
}

::v-deep .van-pull-refresh__track .van-pull-refresh__head *{
  color: #f3c7a2;
  font-size: 14px;
}

::v-deep .van-loading__text {
  color: #f3c7a2;
  font-size: 14px;
}
.container .main{
  position: relative;
  overflow: auto;
  height: 100%;
  padding: 0 10px;
}

.item_list {
  padding: 0px;
  margin: 30px 10px;
  background: #282828;
  border-radius: 10px;
  line-height: 25px;
}

.item_list .item {
  width: 100%;
  line-height: 25px;
  height: 100px;
  margin-bottom: 75px;
}

.item_list .item .key,.value {
  width: 45%;
  height: 25px;
  display: block;
  float: left;
}

.item_list .item .key {
  text-align: left;
}

.item_list .item .value {
  text-align: right;
  margin-left: 30px;
}

</style>
