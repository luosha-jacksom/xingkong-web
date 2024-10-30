<template>
  <div class="container page">
    <van-nav-bar class="nav-bar">
      <template #left>
        <van-icon name="arrow-left" color="#fff" @click="$router.push('/Game')"/>
      </template>

      <div slot="title">
        {{ lottery.name }}
        <van-icon name="arrow-down" :class="{ up: tabChange,down:!tabChange }"
                  @click="tabChange ? tabChange = false : tabChange = true"/>
      </div>

      <!--      <template #right>-->
      <!--        <div class="right">切换任务</div>-->
      <!--      </template>-->
    </van-nav-bar>
    <div class="record">
      <div class="period">
        <!--        <van-image class="cover" :src="lottery.ico">-->
        <!--          <template v-slot:loading>-->
        <!--            <van-loading type="spinner"/>-->
        <!--          </template>-->
        <!--        </van-image>-->
        <span class="period-number">{{ lottery.now_expect }}</span>
        <div class="next-number">
          <div style="color:#ddb285;">{{ lottery.next_expect }}</div>
          <van-count-down :time="time" @finish="check()"/>
        </div>

      </div>
      <div class="linear-gradient"
           style="background: linear-gradient(to right, rgba(126, 86, 120, 0), rgb(230, 195, 161), rgba(126, 86, 120, 0));"></div>
      <div class="recent">
        <div class="kuaisan-ball left">
          <!--            <van-image class="res-img" :src="this.shanzi_1">-->
          <!--              <template v-slot:loading>-->
          <!--                <van-loading type="spinner"/>-->
          <!--              </template>-->
          <!--            </van-image>-->
          <!--            <van-image class="res-img" :src="this.shanzi_2">-->
          <!--              <template v-slot:loading>-->
          <!--                <van-loading type="spinner"/>-->
          <!--              </template>-->
          <!--            </van-image>-->
          <!--            <van-image class="res-img" :src="this.shanzi_3">-->
          <!--              <template v-slot:loading>-->
          <!--                <van-loading type="spinner"/>-->
          <!--              </template>-->
          <!--            </van-image>-->
          <!--            <span class="res-des middle">{{this.sum}}</span>-->
          <span class="res-des middle">{{ this.size }}</span>
          <span class="res-des middle">{{ this.double }}</span>
        </div>
        <van-icon name="arrow-down" :class="{ up: active,down:!active }"
                  @click="active ? active = false : active = true"/>
      </div>
    </div>
    <div class="history_popup"></div>
    <div class="wrapper">
      <div class="options-bar">
        <div class="game">
          <div class="tips">
            <!--            <p class="odds">【{{ this.lottery.desc }}】</p>-->
            <div class="play-tip">
              <!--              <van-icon name="more-o"/>-->
              <!--                  <span class="span-text" @click="playgame = true">玩法提示</span>-->
              <!--              <span class="span-text" @click="$router.push({path:'/GameRecord'});">{{ $t('任务记录') }}</span>-->
              <van-popup class="mask" get-container="body" v-model="playgame">
                <div class="play-type-tip">
                  <div class="title">{{ $t('玩法规则') }}</div>
                  <div class="wrapper">
                    <div class="item">
                      <van-icon name="info-o"/>
                      <div class="content">
                        <p class="content-title">{{ $t('玩法提示') }}</p>
                        <p class="content-detail">{{ $t('从可选和值形态里面选择号码进行下注') }}</p>
                      </div>
                    </div>
                    <div class="item">
                      <van-icon name="comment-o"/>
                      <div class="content">
                        <p class="content-title">{{ $t('中奖说明') }}</p>
                        <p class="content-detail">{{ $t('三个开奖号码总和值11~18 为大;总和值3~ 10为小') }};</p>
                      </div>
                    </div>
                    <div class="item">
                      <van-icon name="description"/>
                      <div class="content">
                        <p class="content-title">{{ $t('投注范例') }}</p>
                        <p class="content-detail">{{ $t('投注方案：小 开奖号码：123, 即中小') }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </van-popup>
            </div>
          </div>
          <!--          <div class="linear-gradient"-->
          <!--               style="background: linear-gradient(to right, rgba(126, 86, 120, 0), rgb(230, 195, 161), rgba(126, 86, 120, 0));"></div>-->
          <div class="sumValueTwoSides">
            <div class="rectangle large"  v-for="(v,key) in lottery_peilv_list"
                 :key="key" @click="choosePlay(v.type,v.name);">
              <div class="wrapper">
                <div class="content" >
                  <p class="name-text large" :class="{active:choose[v.type]}">{{ v.name }}</p>
                  <!--                      <p class="odd-text large">{{v.proportion}}</p>-->
                </div>
              </div>
            </div>
          </div>

          <div style="padding: 20px">
            <img :src="this.userInfo.touzhu_ico" alt="" style="width: 100%">
          </div>
        </div>
      </div>

      <div class="mid">
        <div>
          <span>{{ this.formData.length }}个</span>
          <span>{{ this.formData.length * this.money }}总积分</span>
        </div>
        <div>
          <span class="text">账户余额：</span>
          <span class="text num" style="padding-top: 5px">{{ this.userInfo.money }}</span>
          <span class="text">积分</span>
        </div>

      </div>
      <div class="bottom-bar">
        <div class="bar">
          <div class="left">
            <div class="item" @click=" money='' ">
              <span class="text">重置</span>
            </div>
            <div class="line"></div>
          </div>
          <div class="mids">
            <input type="number" v-model="money" inputmode="numeric" placeholder="请输入金额" class="van-field__control">
          </div>
          <div class="right" @click="jiesuan()">
            打赏
          </div>
        </div>
        <!--        <div class="wrapper" :class="{active:shopping}">-->
        <!--          <div class="item">-->
        <!--            <span class="label">当前选号：</span>-->
        <!--            <div class="bet-number">{{ this.shopchoose }}</div>-->
        <!--            <van-icon name="arrow-down" :class="{ up: !shopping,down:shopping }"-->
        <!--                      @click="shopping ? shopping = false : shopping = true"/>-->
        <!--          </div>-->
        <!--          <div class="item">-->
        <!--            <span class="label">每注金额：</span>-->
        <!--            <div class="amount-wrapper">-->
        <!--              <van-field v-model="money" type="digit" placeholder="请输入金额"/>-->
        <!--              <span class="label">积分</span>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--          <div class="item">-->
        <!--            <div class="part">-->
        <!--              <span>总共</span>-->
        <!--              <span class="number">{{ this.formData.length }}</span>-->
        <!--              <span>注</span>-->
        <!--            </div>-->
        <!--            <div class="part">-->
        <!--              <span>合计</span>-->
        <!--              <span class="number">{{ this.formData.length * this.money }}</span>-->
        <!--              <span>积分</span>-->
        <!--            </div>-->

        <!--          </div>-->
        <!--        </div>-->
      </div>
      <van-popup v-model="jiesuanpage" get-container="body">
        <div class="confirm-order-modal">
          <p style="text-align: center"> {{ lottery.name }} {{ lottery.next_expect }} 数据匹配确认</p>
          <!--          <ui class="list">-->
          <!--            <li v-for="(v,key) in formData" :key="key" class="lise-item van-hairline&#45;&#45;bottom">-->
          <!--              <div class="main">-->
          <!--                <p class="bet-name">{{ v.name }}</p>-->
          <!--                <p class="detail-text">{{ money }}积分={{ money }}积分</p>-->
          <!--              </div>-->
          <!--              <van-icon @click="clearChooes(v.type)" name="close"/>-->
          <!--            </li>-->
          <!--          </ui>-->
          <div class="sub-bar">
            <van-button class="item cancel-btn" type="default" @click="allClear()">取消</van-button>
            <van-button class="item sub-btn" type="default" @click="doSub">确认打赏</van-button>
          </div>
        </div>
      </van-popup>
      <van-popup v-model="active" position="top" >
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <div class="wrapper">
            <div class="item">
              <div class="left font-weight">期号</div>
              <div class="right font-weight">烟花/糖心</div>
              <div class="right font-weight">单件/双件</div>
            </div>
            <div class="item" v-for="(v,key) in lottery_list" :key="key">
              <div class="left font-weight">{{ v.expect }}</div>
              <div class="right font-weight">
                <div class="kuaisan-ball left" style="display: flex;justify-content: space-around;">
                  <!--                          <van-image class="res-img" :src="'img/lottery/shaizi/' + v.opencode[0] + '.png'">-->
                  <!--                            <template v-slot:loading>-->
                  <!--                              <van-loading type="spinner"/>-->
                  <!--                            </template>-->
                  <!--                          </van-image>-->
                  <!--                          <van-image class="res-img" :src="'img/lottery/shaizi/' + v.opencode[1] + '.png'">-->
                  <!--                            <template v-slot:loading>-->
                  <!--                              <van-loading type="spinner"/>-->
                  <!--                            </template>-->
                  <!--                          </van-image>-->
                  <!--                          <van-image class="res-img" :src="'img/lottery/shaizi/' + v.opencode[2] + '.png'">-->
                  <!--                            <template v-slot:loading>-->
                  <!--                              <van-loading type="spinner"/>-->
                  <!--                            </template>-->
                  <!--                          </van-image>-->
                  <!--                          <span class="res-des middle">{{v.opencode[0] + v.opencode[1] + v.opencode[2]}}</span>-->
                  <span
                      class="res-des middle">{{ (v.opencode[0] + v.opencode[1] + v.opencode[2]) >= 11 && (v.opencode[0] + v.opencode[1] + v.opencode[2]) &lt;= 18 ? "糖心" : "烟花" }}</span>
                  <span
                      class="res-des middle">{{ (v.opencode[0] + v.opencode[1] + v.opencode[2]) % 2 === 0 ? "双件" : "单件" }}</span>
                </div>
              </div>
            </div>
          </div>
        </van-pull-refresh>
      </van-popup>


      <!--      <van-popup v-model="tabChange" position="top" :style="{ height: '70%' }">-->
      <!-- -->
      <!--      </van-popup>-->
      <div  class="zk-nav-list" style="" v-if="tabChange">
        <ul class="list-submenu">
          <!--          <li v-for="item in gameitems"  :key="item.id" @click="toLottery(item.key,item.id)"><span  :class="{'activeSpan': this.lottery.name === item.name}" >{{item.name}}</span></li>-->
          <li v-for="item in gameitems"  :key="item.id" @click="toLottery(item.key,item.id)"><span :class="{'activeSpan': lottery.name === item.name}">{{item.name}}</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
var time;
var count = 0;
export default {
  data() {
    return {
      gameitems: [{}, {}, {}, {}],
      jiesuanpage: false,
      choose: {
        "糖心": false,
        "烟花": false,
        "单件": false,
        "双件": false,
        "3": false,
        "4": false,
        "5": false,
        "6": false,
        "7": false,
        "8": false,
        "9": false,
        "10": false,
        "11": false,
        "12": false,
        "13": false,
        "14": false,
        "15": false,
        "16": false,
        "17": false,
        "18": false,
      },
      playgame: false,
      shopping: false,
      isLoading: false,
      play: {},
      lottery_peilv_list: {},
      lottery_list: [],
      active: false,
      tabChange: false,
      userInfo: {},
      lottery: {},
      shanzi_1: "0",
      shanzi_2: "0",
      shanzi_3: "0",
      sum: 0,
      size: "",
      double: "",
      time: 0,
      shopchoose: "未选择",
      gameitem: "",
      formData: [],
      money: "",
    };
  },
  methods: {
    toLottery(key, id) {

      if (!localStorage.getItem('token')) {
        this.$router.push({path: '/Login'})
      } else {
        this.tabChange = false

        this.$router.push({path: '/Lottery?key=' + key + "&id=" + id})

        this.getUserInfo();
        this.getLotteryInfo();
        this.getLotteryList();
      }
    },
    getGameItem() {
      this.$http({
        method: 'get',
        url: 'lottery_list'
      }).then(res => {
        console.log(res.data,'切换数据')
        this.gameitems = res.data;
      })
    },
    back() {
      return window.history.back();
    },
    doSub() {
      console.log(this.gameitem, 'this.gameitem')
      console.log(this.lottery.id, 'this.gameitem')
      if (this.money === "0") {
        this.$toast(this.$t("金额错误"));
        return false;
      }
      if (this.formData.length === 0) {
        this.$toast(this.$t("请选号"));
        return false;
      } else if (this.money === "") {
        this.$toast(this.$t("请填写金额"));
        return false;
      } else {
        if (this.userInfo.money - (this.money * this.formData.length) < 0) {
          this.$toast(this.$t("余额不足，请联系客服充值"));
          return false;
        } else {
          this.$http({
            method: 'post',
            data: {
              item: this.gameitem,
              money: this.money,
              lid: this.lottery.id,
              mid: this.userInfo.id,
              expect: this.lottery.now_expect
            },
            url: 'game_place_order'
          }).then(res => {
            if (res.code === 200) {
              this.$toast(res.msg);
              this.allClear();
              this.getUserInfo();
            } else if (res.code === 401) {
              this.$toast(res.msg);
            }
          })
          return true;
        }
      }
    },
    allClear() {
      for (var i = 0; i < this.formData.length; i++) {
        this.choose[this.formData[i]['type']] = false;
      }
      this.formData.length = 0;
      this.money = "";
      this.shopchoose = "未选中";
      this.gameitem = "";
      this.shopping = false;
      this.jiesuanpage = false;
    },
    jiesuan() {
      if (this.formData.length === 0) {
        this.$toast(this.$t("请选号"));
        return false;
      } else if (this.money === "") {
        this.$toast(this.$t("请填写金额"));
        return false;
      } else {
        this.jiesuanpage ? this.jiesuanpage = false : this.jiesuanpage = true;
      }

    },
    clearChooes(type) {
      for (var i = 0; i < this.formData.length; i++) {
        if (type === this.formData[i]['type']) {
          this.formData.splice(i, 1)
          this.choose[type] = false;
        }
      }
      if (this.formData.length >= 1) {
        for (var j = 0; j < this.formData.length; j++) {
          if (j === 0) {
            this.shopchoose = this.formData[j]['name'];
            this.gameitem = this.formData[j]['type'];
          } else {
            this.shopchoose += "," + this.formData[j]['name'];
            this.gameitem += "," + this.formData[j]['type'];
          }
        }
      } else {
        this.shopchoose = this.$t("未选中");
        this.gameitem = "";
        this.shopping = false;
      }
      if (this.formData.length === 0) {
        this.jiesuanpage = false;
      }
    },
    choosePlay(type, name) {
      console.log(type,name ,'typeName')
      if (this.choose[type] === true) {
        this.choose[type] = false;
        for (var i = 0; i < this.formData.length; i++) {
          if (type === this.formData[i]['type']) {
            this.formData.splice(i, 1)
          }
        }
      } else if (this.choose[type] === false) {
        this.formData.push({'name': name, 'type': type})
        this.choose[type] = true;
      }
      if (this.formData.length === 1) {
        this.shopping = true;
      }
      if (this.formData.length >= 1) {
        for (var j = 0; j < this.formData.length; j++) {
          if (j === 0) {
            this.shopchoose = this.formData[j]['name'];
            this.gameitem = this.formData[j]['type'];
          } else {
            this.shopchoose += "," + this.formData[j]['name'];
            this.gameitem += "," + this.formData[j]['type'];
          }
        }
      } else {
        this.shopchoose = this.$t("未选中");
        this.gameitem = "";
        this.shopping = false;
      }

    },
    check() {
      if (!localStorage.getItem('token')) {
        this.$router.push({path: '/Login'})
      } else {
        time = window.setInterval(() => {
          setTimeout(() => {
            this.getUserInfo();
            this.getLotteryInfo();
            this.getLotteryList();
            count++;
            if (count > 5) {
              clearInterval(time);
              count = 0;
            }
          }, 0)
        }, 300)
      }
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast(this.$t("刷新成功"));
        this.getLotteryList();
        this.isLoading = false;
      }, 200);
    },
    getUserInfo() {
      this.$http({
        method: 'get',
        url: 'user_info'
      }).then(res => {
        if (res.code === 200) {
          this.userInfo = res.data;
        } else if (res.code === 401) {
          this.$toast(res.msg);
        }
      })
    },
    getLotteryPeilv() {
      this.$http({
        method: 'get',
        data: {id: this.$route.query.id},
        url: 'lottery_get_peilv'
      }).then(res => {
        if (res.code === 200) {
          console.log(res.data,'res.datares.data')
          this.lottery_peilv_list = res.data;
        } else if (res.code === 401) {
          this.$toast(res.msg);
        }
      })
    },
    getLotteryList() {
      this.$http({
        method: 'get',
        data: {key: this.$route.query.key},
        url: 'lottery_get_one_list'
      }).then(res => {
        if (res.code === 200) {
          this.lottery_list = res.data;
          this.getLotteryPeilv();
        } else if (res.code === 401) {
          this.$toast(res.msg);
        }
      })
    },
    getLotteryInfo() {
      this.$http({
        method: 'get',
        data: {key: this.$route.query.key},
        url: 'lottery_get_info'
      }).then(res => {
        if (res.code === 200) {
          if (parseFloat(this.userInfo.money) < parseFloat(res.data.condition)) {
            this.$toast(this.$t("请联系管理员领取该任务"));
            this.$router.push({path: '/Home'})
            return false;
          }
          this.lottery = res.data;
          this.time = res.data.second * 1000;

          if (this.time / 1000 === 59) {
            this.$toast(this.$t('开奖成功，期号') + "：" + this.lottery.now_expect);
          }
          this.shanzi_1 = "img/lottery/shaizi/" + res.data?.opencode[0] + ".png";
          this.shanzi_2 = "img/lottery/shaizi/" + res.data?.opencode[1] + ".png";
          this.shanzi_3 = "img/lottery/shaizi/" + res.data?.opencode[2] + ".png";
          this.sum = res.data.opencode[0] + res.data.opencode[1] + res.data.opencode[2];
          if (this.sum >= 11 && this.sum <= 18) {
            this.size = this.$t("糖心");
          } else if (this.sum >= 3 && this.sum <= 10) {
            this.size = this.$t("烟花");
          }
          if (this.sum % 2 === 0) {
            this.double = this.$t("双件");
          } else {
            this.double = this.$t("单件");
          }
        } else if (res.code === 401) {
          this.$toast(res.msg);
        }
      })

    }
  },
  created() {
    if (!localStorage.getItem('token')) {
      this.$router.push({path: '/Login'})
    } else {
      this.getUserInfo();
      this.getLotteryInfo();
      this.getLotteryList();
      this.getGameItem()
    }
  },
  destroyed() {
    clearInterval(time);
  }
};
</script>

<style lang='less' scoped>
// @import "../../assets/css/base.css";

.nav-bar {
  background: #282828;
  color: #f3c7a2 !important;
}

.nav-bar .right {
  padding-left: 8px;
  padding-right: 8px;
  color: #ddb285;
  font-size: 28px;
  border-radius: 10px;
  border: 2px solid #ddb285;
  line-height: 60px;
}

.record {
  padding-left: 20px;
  padding-right: 20px;
  background-color: #282828;
  box-shadow: 0 2px 2px 0 #ddb285;
  z-index: 1;
}

.record .period {
  display: flex;
  align-items: center;
  padding: 20px 0;
}

.record .period .cover {
  width: 60px;
  height: 60px;
  -o-object-fit: cover;
  object-fit: cover;
}

.record .period .period-number {
  flex: 1;
  margin-left: 20px;
  margin-right: 10px;
  height: 50px;
  line-height: 50px;
  font-size: 32px;
  color: #ddb285;
}

.van-count-down {
  color: #fff;
  font-size: 32px;
  margin-top: 10px;
  float: right;
}

.linear-gradient {
  width: 100%;
  height: 2px;
}

.record .recent {
  display: flex;
  align-items: center;
  height: 110px;
}

.kuaisan-ball .left {
  justify-content: flex-start;
}

.kuaisan-ball {
  flex: 1;
  display: flex;
  align-items: center;
}

.kuaisan-ball .res-img {
  width: 70px;
  height: 70px;
  margin-right: 30px;
}

.kuaisan-ball .res-des {
  font-weight: 700;
  text-align: center;
  color: #ddb285;
}

.kuaisan-ball .res-des.middle {
  width: 15%;
  font-size: 30px;
}

.van-icon {
  font-size: 40px;
}

.down {
  transition: all .5s;
  color: #ddb285;
}

.up {
  transform: rotate(180deg);
  transition: all .5s;
  color: #ddb285;
}

.wrapper {
  position: relative;
  flex: 1;
  overflow: hidden;
  background: #282828;
}

.options-bar {
  display: flex;
  align-items: center;
  height: calc(100% - 160px);
}

.options-bar .game {
  flex: 1;
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.options-bar .game .tips {
  display: flex;
  align-items: center;
  //height: 100px;
  padding: 0 20px;
}

.options-bar .game .tips .odds {
  flex: 1;
  font-size: 35px;
  font-weight: 500;
  color: #ff253f;
}

.options-bar .game .tips .play-tip {
  display: flex;
  align-items: center;
  height: 100%;
}

::v-deep .van-icon-more-o {
  color: #ff253f;
  font-size: 50px;
}

.options-bar .game .tips .play-tip .span-text {
  margin-left: 10px;
  font-size: 35px;
  font-weight: bolder;
  color: #ff253f;
}

.linear-gradient {
  width: 100%;
  height: 2px;
}

.sumValueTwoSides {
  display: flex;
  padding: 30px 0;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.rectangle {
  overflow: hidden;
}

.rectangle.large {
  width:50%;
  border-radius: 10px;
}

.rectangle .wrapper {
  position: relative;
  padding: 0 10px;
  background: #282828;
}

.rectangle .wrapper .content {
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.rectangle.large .wrapper {
  padding-bottom: 34%;
}

.rectangle .wrapper .content .name-text.large {
  font-size: 4vw;
  padding: 2vw 15vw;
  border-radius: 1vw;
  background-color: #232127;
  box-shadow: 0 0 4vw rgb(87 87 87 / 20%);
  color: white;
}

.rectangle .wrapper .content .name-text {
  color: #7d7c7c;
  font-weight: bolder;
}

.rectangle .wrapper .content .odd-text.large {
  font-size: 25px;
  margin-top: -30px;
}

.rectangle .wrapper .content .odd-text {
  text-align: center;
  color: #ff253f;
}

.bottom-bar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100px;
  z-index: 2;
}

.bottom-bar .bar .left, .bottom-bar .bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.bottom-bar .bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  background-color: #282828;
  z-index: 2;
}
::v-deep .van-nav-bar .van-icon{
  color: #ddb285!important;
}
.bottom-bar .bar .left, .bottom-bar .bar {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.bottom-bar .bar .left .item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  font-size: 20px;
}

.bottom-bar .bar .left .item .text {
  font-size: 22px;
  color: #fff;
}

.jixuanico {
  font-size: 45px;
  color: #ddb285;
}

.bottom-bar .bar .left .line {
  width: 2px;
  height: 50px;
  background: #282828;
}

.bottom-bar .bar .mid {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.wrapper .mid{
  padding: 1vw 2vw;
  background: #7e614a;
  display: flex;
  justify-content: space-between;
  color: white;
  font-size: 2.5vw;
}
.bottom-bar .bar .mid .text {
  font-size: 30px;
  font-weight: 500;
  color: #ddb285;
}

.bottom-bar .bar .mid .text.num {
  margin: 0 5px;
  color: #fff;
  line-height: 4vw;
}

.bottom-bar .bar .right {
  padding: 3px 30px;
  margin: 0 30px;
  color: #fff;
  //background: #282828;
  font-size: 4vw;
  font-weight: 500;
  border-radius: 50px;
  background: #ddb285;
}

.rectangle.active .wrapper {
  background-color: #ff253f !important;
}

::v-deep .van-pull-refresh__track .van-pull-refresh__head * {
  color: #000000;
  font-size: 35px;
}

::v-deep .van-popup {
  position: absolute;
}

::v-deep .van-overlay {
  position: absolute;
  background-color: rgb(70 67 67 / 70%);
}

::v-deep .van-popup--top {
  top: -1px;
}

.wrapper .item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 0;

}

.wrapper .item .left {
  width: 40%;
  font-size: 30px;
  text-align: center;
  font-weight: 500;
  color: #ddb285;
}

.font-weight {
  font-weight: 700 !important;
}

.wrapper .item .right {
  flex: 1;
  display: flex;
  font-size: 30px;
  justify-content: center;
  overflow: hidden;
  color: #ddb285;
}

.wrapper .item .kuaisan-ball .left {
  justify-content: flex-start;
}

.wrapper .item .kuaisan-ball {
  margin-left: 20px;
  flex: 1;
  display: flex;
  align-items: center;
}

.wrapper .item .kuaisan-ball .res-img {
  width: 50px;
  height: 50px;
  margin-right: 20px;
}

.wrapper .item .kuaisan-ball .res-des {
  font-weight: 700;
  text-align: center;
  color: #fff;
}

.wrapper .item .kuaisan-ball .res-des.middle {
  width: 15%;
  font-size: 28px;
}

.play-type-tip {
  position: unset;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 650px;
  height: 700px;
  max-height: 50%;
  z-index: 10;
  border-radius: 30px;
  overflow: hidden;
  background-color: #fff;
  color: #000;
}

.play-type-tip .title {
  line-height: 90px;
  background: linear-gradient(90deg, #7e5678, #e6c3a1);
  text-align: center;
  color: #fff;
  font-size: 35px;
  font-weight: 500;
}

.mask {
  background-color: rgb(0 0 0 / 0%);
  animation-duration: 0.35s;
}

.play-type-tip .wrapper {
  height: calc(100% - 10px);
  background-color: transparent;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.play-type-tip .wrapper .item {
  padding: 40px 50px;
  display: flex;
  align-items: flex-start;
}

.play-type-tip .wrapper .item .van-icon {
  color: #e6c3a1;
  font-size: 60px;
}

.play-type-tip .wrapper .item .content .content-title {
  margin-top: 22px;
  font-size: 35px;
  font-weight: 500;
  color: #000;
  line-height: 0px;
}

.play-type-tip .wrapper .item .content .content-detail {
  margin-top: 5px;
  font-size: 22px;
  color: #000;
  line-height: 30px;
}

.play-type-tip .wrapper .item .content {
  flex: 1;
  margin-left: 30px;
}

.rectangle.active .wrapper {
  background-color: #ff253f !important;
}

.rectangle.active .wrapper .name-text, .rectangle.active .wrapper .odd-text {
  color: #fff !important;
}

.bottom-bar .wrapper {
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
  padding: 20px 20px 10px 20px;
  height: 230px;
  background-color: #212121;
  z-index: 1;
  box-shadow: 0 0 10px 0 #212121;
  transition: transform .3s cubic-bezier(.21, 1.02, .55, 1.01);
}

.bottom-bar .wrapper.active {
  transform: translateY(-100%);
}

.bottom-bar .wrapper .item {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 65px;
}

.bottom-bar .wrapper .item .label {
  font-size: 30px;
  line-height: 30px;
  color: #ddb285;
}

.bottom-bar .wrapper .item .bet-number {
  flex: 1;
  margin: 0 16px;
  overflow: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  color: #ff253f;
  font-size: 30px;
  font-weight: 500;
  height: 40px;
  line-height: 40px;
}

.bottom-bar .wrapper .item .amount-wrapper {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
}

::v-deep .van-cell {
  font-size: 30px;
  line-height: 50px;
  background: #212121;
}



.bottom-bar .wrapper .item .part {
  margin-right: 20px;
}

.bottom-bar .wrapper .item .part span {
  font-size: 30px;
  vertical-align: center;
  color: #ddb285;
}
.rectangle .wrapper .content .active{
  border: 1px solid #ddb285;
}
.bottom-bar .wrapper .item .part .number {
  margin: 0 5px;
  color: #ff253f;
  font-weight: 500;
}


.confirm-order-modal {
  position: unset;
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 0 20px 30px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 610px;
  //height: 680px;
  max-height: 50%;
  z-index: 10;
  color: #fff;
  background-color: #262626!important;
  border: 0.01rem solid #7e6a56;
}

.confirm-order-modal .head {
  position: relative;
  height: 80px;
}

.confirm-order-modal .head .text {
  padding: 0 20px;
  height: 30px;
  line-height: 10px;
  text-align: center;
  font-size: 35px;
  font-weight: 500;
  color: #7e5678;
}

::v-deep .confirm-order-modal .van-hairline--bottom::after {
  border-bottom-width: 2px;
}

.confirm-order-modal .list {
  flex: 1;
  padding: 0 10px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.confirm-order-modal .list .lise-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 0;
}

.confirm-order-modal .list .lise-item .main {
  flex: 1;
  overflow: hidden;
}

.confirm-order-modal .list .lise-item .main .bet-name {
  color: #ff253f;
  font-size: 35px;
  font-weight: 500;
  line-height: 0px;
  word-wrap: break-word;
  word-break: break-all;
}

.confirm-order-modal .list .lise-item .main .detail-text {
  line-height: 0px;
  font-size: 25px;
  color: #979799;
}

.confirm-order-modal .list .lise-item {
  color: #ff253f;
}

.confirm-order-modal .sub-bar {
  display: flex;
  align-items: center;
  margin-top: 30px;
  justify-content: space-around;
}

.confirm-order-modal .sub-bar .item {
  min-width: 30%;
  height: 50px;
  text-align: center;
  box-sizing: border-box;
  border-radius: 50px;
  font-size: 3vw;
  font-weight: 500;
}

.confirm-order-modal .sub-bar .item.cancel-btn {
  background: linear-gradient(180deg,#efcba7,#dcab76);
  color: #8a5623;
  border: 0;
}

.confirm-order-modal .sub-bar .item.sub-btn {
  background: linear-gradient(180deg,#efcba7,#dcab76);
  color: #8a5623;
  border: 0;
}

.next-number span {
  font-size: 35px;
  color: #ddb285;
  float: right;
}

.zk-nav-list {
  position: fixed;
  top: 88px;
  width: 100%;
  height: 100%;
  background: #161616;
  z-index: 999999;
}

.zk-nav-list .list-submenu {
  width: 100%;
  clear: both;
  padding: 20px 0;
  overflow: scroll;
  transform: rotate(0deg);
}
.zk-nav-list .list-submenu li{
  float: left;
  width: 33.3%;
  text-align: center;
  margin-top: 10px;
}
.zk-nav-list .list-submenu li span  {
  display: inline-block;
  width: 94%;
  height: 64px;
  line-height: 64px;
  border-radius: 8px;
  color: #f5d6b7;
  background: #232127;
}
.zk-nav-list .list-submenu li .activeSpan {
  border: 1px  solid #f5d6b7;
}

::v-deep .van-nav-bar__title{
  font-size: 4vw;
  color: #f5d6b7;
}
::v-deep .van-field__control{
  background: #7e614a;
  border-radius: 20vw;
  color: #fff;
  padding-left: 5vw;
  width: 50vw;
}

input::placeholder {
  color: #5e4735;
  font-size: 2.5vw;
}
</style>
