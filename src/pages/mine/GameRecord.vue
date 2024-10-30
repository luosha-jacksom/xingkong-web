<template>
  <div class="container page">
    <van-nav-bar title="打赏记录" class="nav-bar">
      <template #left>
        <van-icon name="arrow-left" color="#fff" @click="back()"/>
      </template>
    </van-nav-bar>
    <div class="main">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-empty v-if="list.length === 0" :description="$t('数据为空')" />
        <div class="item_list" v-for="(v,key) in list" :key="key">
          <div class="lottery_info">
            <van-image class="cover" :src="v.ico">
              <template v-slot:loading>
                <van-loading type="spinner"/>
              </template>
            </van-image>
            <span class="period-number">{{v.expect}}</span>
            <span class="period-number">{{v.name}}</span>
          </div>
          <div class="recent">
            <div class="kuaisan-ball left">
<!--              <van-image class="res-img" :src=" v.status === 0 ? 'img/lottery/open_num.gif' : 'img/lottery/shaizi/' + v.opencode[0] + '.png' " >-->
<!--                <template v-slot:loading>-->
<!--                  <van-loading type="spinner"/>-->
<!--                </template>-->
<!--              </van-image>-->
<!--              <van-image class="res-img" :src=" v.status === 0 ? 'img/lottery/open_num.gif' : 'img/lottery/shaizi/' + v.opencode[1] + '.png' " >-->
<!--                <template v-slot:loading>-->
<!--                  <van-loading type="spinner"/>-->
<!--                </template>-->
<!--              </van-image>-->
<!--              <van-image class="res-img" :src=" v.status === 0 ? 'img/lottery/open_num.gif' : 'img/lottery/shaizi/' + v.opencode[2] + '.png' " >-->
<!--                <template v-slot:loading>-->
<!--                  <van-loading type="spinner"/>-->
<!--                </template>-->
<!--              </van-image>-->
<!--              <span class="res-des middle">{{v.status === 0 ? 0 : v.opencode[0] + v.opencode[1] + v.opencode[2]}}</span>-->
              <span class="res-des middle">{{v.status === 0 ? 0 : (v.opencode[0] + v.opencode[1] + v.opencode[2]) >= 11 && (v.opencode[0] + v.opencode[1] + v.opencode[2]) &lt;= 18 ? '糖心' : "烟花"}}</span>
              <span class="res-des middle">{{v.status === 0 ? 0 : (v.opencode[0] + v.opencode[1] + v.opencode[2]) % 2 === 0 ? '双件' : '单件'}}</span>
            </div>
          </div>
          <div class="topInfo">
            <div class="totalMoney">当前打赏总积分：{{v.money}}</div>
          </div>
          <div  class="titleContent">
            <div v-for=" item in title" :key="item">{{item}}</div>
          </div>
          <div class="titleContent" v-for="lists in v.data " :key="lists.id">
              <div>{{lists.type}}</div>
              <div>{{lists.money}}</div>
              <div>{{lists.win_text}}</div>
              <div>{{lists.create_time.split(' ')[1]}}</div>
          </div>
<!--          <div class="topInfo">-->
<!--            <span v-if="v.is_win === 1" style="color: #07c160">{{v.win_text}}</span>-->
<!--            <span v-else >{{v.win_text}}</span>-->
<!--            <span>{{ $t('金额') }}：{{v.profit}}</span>-->
<!--          </div>-->
<!--          <div class="topInfo">-->
<!--            <span>{{ $t('任务类型') }}：</span>-->
<!--            <span>{{v.type}}</span>-->
<!--          </div>-->
<!--          <div class="time">-->
<!--            <span>{{ $t('下单时间') }}：{{v.create_time}}</span>-->
<!--          </div>-->
<!--          <div class="time">-->
<!--            <span>{{ $t('结算时间') }}：{{v.update_time}}</span>-->
<!--          </div>-->
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
      list:[],
      title:['打赏礼物','打赏积分','打赏状态','打赏时间']
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
    getUserGameList(){
      console.log( '打印222')
      this.$http({
        method: 'get',
        url: 'user_get_game_list'
      }).then(res=>{
        console.log(res, '打印')
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
      this.getUserGameList();
    }
  }
};
</script>

<style lang='less' scoped>
// @import "../../assets/css/base.css";
::v-deep .van-pull-refresh__track .van-pull-refresh__head *{
  color: #ddb285;
  font-size: 14px;
}
::v-deep .van-nav-bar__content {
  height: 100px;
  background-color: #282828;
  line-height: 100px;
}
::v-deep .van-loading__text {
  color: #ddb285;
  font-size: 14px;
}
.container .main{
  position: relative;
  overflow: auto;
  background-color: #212121;
  height: 100%;
  padding: 0 10px;
}
.item_list{
  padding: 15px 15px;
  margin: 30px 10px;
  background: #282828;
  border-radius: 10px;
  line-height: 60px;
}

.item_list .topInfo .totalMoney{
  flex: 1;
  font-size: 14px;
  font-weight: 700;
  color: red;
}
.item_list .time span{
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  color: #ddb285;
}

.item_list .topInfo span:last-child{
  float: right;
}
.item_list .desc span{
  font-size: 14px;
  font-weight: 700;
  color: #ddb285;
}
.item_list .cover{
  width: 60px;
  height: 60px;
  -o-object-fit: cover;
  object-fit: cover;
}
.item_list  .period-number{
  margin-left: 50px;
  margin-right: 10px;
  height: 50px;
  line-height: 60px;
  font-size: 14px;
  font-weight: 700;
  color: #ddb285;
}
.item_list .lottery_info{
  display: flex;
}
.recent {
  display: flex;
  align-items: center;
  height: 100px;
}
.kuaisan-ball .left{
  justify-content: flex-start;
}
.kuaisan-ball{
  flex: 1;
  display: flex;
  align-items: center;
}

.kuaisan-ball .res-img{
  width: 70px;
  height: 70px;
  margin-right: 30px;
}
.kuaisan-ball .res-des{
  font-weight: 700;
  text-align: center;
  color: #ddb285;
}
.kuaisan-ball .res-des.middle{
  width: 15%;
  font-size: 14px;
}
.titleContent{
  display: flex;
  justify-content: space-between;
}
.titleContent div{
  width: 25%;
  text-align: center;
  color: #e6b98a;
}
::v-deep .van-nav-bar__title{
  color: #ddb285;
}
::v-deep .van-icon-arrow-left:before{
  color: #ddb285;
}
</style>
