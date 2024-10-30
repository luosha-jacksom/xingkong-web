<template>
    <div class="home-container">
      <div class="linear-bg">
        <div style="display: flex;justify-content: space-between;align-items: center;width: 100%;padding: 0 20px">
          <div @click="toLink(global)">全国</div>
          <div style="text-align: center;">{{ this.$store.state.baseInfo.name }}</div>
          <div @click="poup=true">
            <van-icon name="location-o"/>
            切换地区
          </div>
        </div>
      </div>
      <div class="home-scroll">
        <div class="banner">
          <swiper class="banner_swiper" :options="bannerSwiperOption">
            <swiper-slide v-for="(v,key) in banners" :key="key">
              <van-image class="banner_img" round :src="v.url">
                <template v-slot:loading>
                  <van-loading type="circular"/>
                </template>
              </van-image>
            </swiper-slide>
          </swiper>
        </div>
        <div class="noticeContent">
          <div class="sm">
            <div>
              <div class="left"><p>{{ this.$store.state.baseInfo.name }}传媒</p> <span>华人第一福利品牌</span>
              </div>
              <div class="right">
                <p>为了会员权益，网站只展示<b>1%</b>资源并且不定期更新只为展示实力，如需查询预约更多资源请联系上级接待
                </p></div>
            </div>
            <span>本平台所有资源真实丶安全点丶可靠，全国空降丶同城约炮选取你心仪的她，与您零距离邂逅，快加入我们吧</span>
          </div>
  
          <div class="navs">
            <nav>
              <a :class="active === 0 ? 'active' :'' " @click="active=0">{{ this.$store.state.baseInfo.name }}传媒资源</a>
              <a :class="active === 1 ? 'active' :'' " @click="active=1">服务条款</a>
            </nav>
          </div>
          <div v-if="active===0" class="item">
            <ul>
              <!--          {id: '901**', nickName: '欣妍', type: '小清新/大学生/大长腿', place: '海南', item: '激活可见', see: 94332.5, num: 90.1,img:1},-->
              <li v-for="item in list" :key="item.id" @click="toLink(item)">
                <i>已认证</i>
                <div class="left"><p data-v-0a1c4d62="">ID:{{ item.id }}</p>
                  <div class="ziliao"><span data-v-0a1c4d62="">昵称：{{ item.nickName }}</span> <span data-v-0a1c4d62="">类型：{{
                      item.type
                    }}</span>
                    <span>所在地区：{{ item.place }}</span> <span data-v-0a1c4d62="">服务项目：{{ item.item }}</span></div>
                  <div class="ft">
                    <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAABIRJREFUaEPtWl1oHFUU/s7Miq8aERFFihbRh7agVuhDsS2CL75opWClah+Umuw9s6EiRgsdENQHze7cu6tEReNPIqJGwRfR+gMqilIfbEQRxArqm4l9a6AzR27ZDZNkN/Ozm92S2QvzsnO+853vnjvn/i2hYI0KphdDwZs948MMDzO8yXpgOKQ3WULXyBlmeJjhnD1QrVavdRxnGxFtA2CfawBcEnus5/9izx8ATorIz67r/lIul//MSb0urKdDWmt9MREdFJGDAG7vMuATRDQrIrPMvNSlr2V4TwTX6/XLRKQMwIq9vlfBWT9E9FsURW+7rmvK5fK/3fruSrDv+6WRkREr1D7XdRtMAv53APWFhYW67/vn8nLlFhwEwc1E9BKAm/KS58T9CGCCmT/Jg88l2BizT0Q+y0PYK4yIPOR53itZ/WUWbIxRIqKzEm2Q/ZPM/HQW35kEB0HgE9HxLAQbbSsi93ue92ZantSCjTGPi8gzaR2vY2enmHkAlzfn5q5dEtEBpdS7aRylEmyMsdPNTBqHHWxeBfCViJzyPO9ky6ZWq13hOM4OEdlORI81OyEXTVrRiYKr1eoW13W/ALAlVyTAfmaeS8I2Go2tYRi+DGBPkm2790T0t13sKKV+XQ+fKFhr/RqAB3ME8Z0NPusqqZuiSEQfKKXuzi1Ya22FWsFZ2zlmvmg1qDl37xGRqxzHORtF0fzi4uKc7/tn47Za60cAvJCV1NqLyBOe53WsNR0zrLW+2n53OYfyEWaeagVsfdmpjIjuaiPiDIBjzFyPvwuC4D0i2p9HtOu6t46Njf3Qduh3cqi1fg7A0RyEU8x8pIWbnJzcWiqVPk5aehLRs0qpiRau0WjcGIbhNwAuzRoDEb2ulGr7GbbNcK1W2+k4zrcA3KxkpVJpx+jo6E+x7H4J4LY0fqIoOlSpVN5q2RpjZpo7rzTwFTYiss/zPFtsV7S2goMgmLHbvMwswBlmtnve8y0IggNE9E4GP/PMbPfO55vW+hiApzLgl01F5H3P8+5JFKy1tvvYT/OQAPiamXfHAn4DwKEsvohou1LqlMXU6/U7oyj6KAt+le0dqzcZazIcBMHDRLRccDKSvcjMozHBtnDcksWHLWxKqQ8tZmpq6sqlpaV/suDjtkTESimz4rfVzgonuHBDulls8s6BF1LRmvU8777EotUUvJeIPs/z7Vwg01IYRdGuSqWyZvHRcaVljJkWkQdyiB74wgPA88z8aLvYOwpuNBo7wzD8PodgCxnk0vI0gN3M/Fcmwc2hPUFEmY5QmiQD2zwAOMzM050Slbg9NMbMiUi7RX9S8vu+PQQwzcyH1wssjeAbAJywW7okhR3e9+UAAMDpMAz3jo+P2yHdsSUKtshCHfG0uqpQh3gx0cdFxM85tDcEtmHHtDHRxTmIj4kuzlVLS3ShLtNaogt1XRqvQPZCPAxD5TjOvZv6Qnx12S3MXx7azTeF+FPLhky0PXaaamnZY86BuhsKHmj394F8mOE+dPJAKYYZHmj394F8mOE+dPJAKQqX4f8BYPRTW5RGL5kAAAAASUVORK5CYII="
                        alt=""> <span>{{ item.see }}k</span> <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAABOBJREFUaEPtmmtoHFUUx///2SiKQdsKRqUoBfWD+kGREltRqlZBK6LQRLRaK4So+ZLt3DtJfEEQIjRzZ1O1vioSXwS0KC3EkrZY+sUg2hoQRNT6QFFo0agItWqyR2aSLNvsc3ZnNskm9+PuOed/fveeO3PPzBCLbHCR8WIJuN5XfGmFl1a4zmag4pIW110HYB3IJlCapubFOgCRw9T606jmSXp7T8c5Z90C4VoImyByPogTAL+AJd9BrC9p24fL1QsFLMZcAwvtENwF4LwiIkcg2Emtd5abyGw7GRw8A+PjfYBsAbCieBwOQeRNar2vlF7ZwJIyr0DQXirgrP+PAOleqq7hMH5B9VjsA7A2jB+A16n0Q8V8ygIWz7wLoCWkeJY5+6jUk+X4i+d2AwFsohz7PDY/UOlVhXxLAlcPOy1NvA9Y99O2/y6UjKTMOxC0Vgia7XaUSl+aL05R4MhgM8qyF0w8QNsez9mznhkE4O/XqMYuKp0zeQWBxXNfBvhwVOqZOMRBwNpM2/555jcx5gUQHZFrCZLU+tnsuHmBJZW6ApIeA3Ba5ElMBRwFrQdp20fFc12AOiad75GWa+k4x2fi5wf2XA+gHVMSM2HHABkG+FS8OuygUi8VBBbXXQWLnwFYFm8itYou71E5GwsDe+7T8c96rWADnd+pdObgklPS4plPAKyuaUpxi1mJ5dy69Q9fJh/wsRLHxrjTiz5+Q/oydnZ9kwMsO3aci39O/hq94lxH5HVUajQXeKD/KqQt/3ZUX0NwN7XenQvseXcCsqe+aH0aaadyXs0FNqYTxPa6AyaeoK2fyQVOuQ6E/fUHLPfQdvyO79SrtHj9WwDLP8TX10g0XMxk8sd8e/h2QD6oK1rBt9T6krwnLUmlVkDSv9UVMDhEpTblBQ6uZ54ZAnBv3UDPahFzT1rGbALxdt0Ac7KZdrd/XA5G/vbQmI9BNNcB9AEqfWs2R4F+uH8zYL2x8IHTHVRdmV644ApP7+WDAG5cwNDjSDRczmTSb4Yyo/AzrQGzEWnsWrjA8hqV0zY7/+JPLVNmGIINCxOaG6jU3nDArrsGFkcAnL2woLmNSvXky7n0g3hj2kAEncaCGMQhrLxoPVtbJysCDi5gxmwH0TnvgUVOgtbNM81+5cAtLQk0N4+AWD+/oUVROaliOZYs6Rlncd0r4b8fIvO+s5n7ieBzVKpkFZYNHJS2D21xP4AL5h7wlJvrIdq6rDNDKOAA+vltF+LfxFcAGucN9H8Ty9jT82c5+YQGDqBTqTMh6RPlCMRuQ6uZtp1pDkrpVQSc2dfG/QnkylIisf1Pa3WY7zv8PKoCnlptMwrBmtig8gc+jkTDDUwm/a0ValQNHEBX/UlEqJzHMDF5B7u7fwnlNW0cCXANoYcxMXkfu7v/qgQ2kpLOFhbPfRHgo5UmU9xPDJXjVBs7shXOXMgGTBsmpR/k8mqTm/Y/BoFDrd+KIl7kwEF5+x+wAf0gbqoqSXI/rLTDpPN5VXGynGMBDqB7ey00NvrQqrJkoynh2dqxAWdK3JjbQD4GyPXlgcsIYBkq9WF59uGsYgfOgHueD/14kSPp1wB90Fh775oBT926vKtBeSTrm03/XvoRKPuQ5h5qHfvL+JoChyu+eKyXgOOZ1/kTdWmF589axJPJolvh/wF8iXZMtgf/PgAAAABJRU5ErkJggg=="
                      alt=""> <span>{{ item.num }}k</span></div>
                </div>
                <div class="right">
                  <div class="avatar">
                    <img :src="require(`../../assets/se/${item.img}.jpg`)" alt=""></div>
                </div>
              </li>
            </ul>
          </div>
  
          <div v-if="active===1">
            <div class="item tiaokuan">
              <ul>
                <li>
                  <div><p>平台资源</p> <span>网红丶模特丶空姐丶嫩模丶大学生，只有您想不到，没有本平台办不到</span>
                  </div>
                  <div><p>服务范围</p> <span>同城约炮，任意地点空降，国内一二线城市当地均有，三线城市也可以通过上级预约安排。</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  
      <van-popup v-model="poup">
        <ul class="cityPopup">
          <li><i class="cubeic-like"></i> 热门地区</li>
          <li @click="showGlobal">上海</li>
          <li @click="showGlobal">广州</li>
          <li @click="showGlobal">深圳</li>
          <li @click="showGlobal">杭州</li>
          <li @click="showGlobal">南京</li>
          <li @click="showGlobal">成都</li>
          <li @click="showGlobal">重庆</li>
          <li @click="showGlobal">厦门</li>
          <li @click="showGlobal">武汉</li>
          <li @click="showGlobal"><span >更多区域</span></li>
        </ul>
      </van-popup>
  
    </div>
  </template>
  
  <script>
  import {vantLocales} from '@/lang'
  
  export default {
    data() {
      return {
        poup: false,
        active: 0,
        show: false,
        notice: "获取中......",
        banners: [
          {url:"https://imgcdn.toutiaoyule.com/20241028/ab677042c3e7b30768ea2dbd4010a784.jpg"},
          {url:"https://imgcdn.toutiaoyule.com/20241029/6e2b3345485111a71634ac3ddc6569f1.jpg"},
          {url:"https://image1.nccontrol.com.cn/20241028/1c87b15e-91d0-4db1-9be6-c18bf4e61c39.jpg"},
        ],
        basicData: [],
        gameitem: [{}, {}, {}, {}],
        movielist_0: [{}, {}, {}, {}],
        movielist_1: [{}, {}, {}, {}, {}, {}, {}, {}],
        isLoading: false,
        movielistSwiperOption: {
          slidesPerView: 'auto',
          spaceBetween: 0,
          slidesPerGroup: 1,
        },
        rightList: [
          {
            name: 'cn',
            code: 'cn'
          },
          {
            name: 'en',
            code: 'en'
          },
          {
            name: 'tw',
            code: 'tw'
          },
        ],
        bannerSwiperOption: {
          effect: 'coverflow',
          grabCursor: true,
          centeredSlides: true,
          slidesPerView: 'auto',
          speed: 800,
          autoplay: true,
          coverflowEffect: {
            rotate: 50,
            stretch: 10,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }
        },
        showPopover: false,
        actions: [{text: 'cn'}, {text: 'en'}, {text: 'tw'}],
        lang: window.localStorage.getItem('lang') || 'cn',
        global: {
          id: '901**',
          nickName: '欣妍',
          type: '小清新/大学生/大长腿',
          place: '海南',
          item: '激活可见',
          see: 94332.5,
          num: 90.1,
          img: 1,
          as: 'se21'
        },
        list: [
          {
            id: '901**',
            nickName: '欣妍',
            type: '小清新/大学生/大长腿',
            place: '海南',
            item: '激活可见',
            see: 94332.5,
            num: 90.1,
            img: 1,
            as: 'se1'
          },
          {
            id: '797**',
            nickName: '艺影莎',
            type: '性感/性格开朗/上下粉嫩',
            place: '海南',
            item: '激活可见',
            see: 967.7,
            num: 79.7,
            img: 2,
            as: 'se2'
          },
          {
            id: '814**',
            nickName: '依娜',
            type: 'A4小蛮腰/舞蹈达人/娃娃音',
            place: '海南',
            item: '激活可见',
            see: 965.8,
            num: 81.4,
            img: 3,
            as: 'se3'
          },
          {
            id: '261**',
            nickName: '眼前人',
            type: '阳光女神/性格开朗/大长腿',
            place: '南宁',
            item: '激活可见',
            see: 947.1,
            num: 26.1,
            img: 4,
            as: 'se4'
          },
          {
            id: '583**',
            nickName: '心动',
            type: '阳光女神/性格开朗/上下粉嫩',
            place: '珠海',
            item: '激活可见',
            see: 922.2,
            num: 58.3,
            img: 5,
            as: 'se5'
          },
          {
            id: '902**',
            nickName: '周书亦',
            type: '性格开朗/性感/上下粉嫩',
            place: '珠海',
            item: '激活可见',
            see: 997.4,
            num: 90.21,
            img: 6,
            as: 'se6'
          },
          {
            id: '794**',
            nickName: '郑一葵',
            type: '二次元/大学生/A4小蛮腰',
            place: '唐山',
            item: '激活可见',
            see: 935.7,
            num: 79.4,
            img: 7,
            as: 'se7'
          },
          {
            id: '342**',
            nickName: '珍茵霄',
            type: '高颜值/乖巧可爱/小清新',
            place: '青岛',
            item: '激活可见',
            see: 920.9,
            num: 34.2,
            img: 8,
            as: 'se8'
          },
          {
            id: '990**',
            nickName: '赵红衫',
            type: '高颜值/性感/乖巧可爱',
            place: '青岛',
            item: '激活可见',
            see: 996.1,
            num: 99,
            img: 9,
            as: 'se9'
          },
          {
            id: '574**',
            nickName: '蕴锦',
            type: '小清新/乖巧可爱/娃娃音',
            place: '济南',
            item: '激活可见',
            see: 954.7,
            num: 57.4,
            img: 10,
            as: 'se10'
          },
          {
            id: '780**',
            nickName: '云絮芊',
            type: '阳光女神/舞蹈达人/五官精致',
            place: '济南',
            item: '激活可见',
            see: 952.1,
            num: 78,
            img: 11,
            as: 'se11'
          },
          {
            id: '795**',
            nickName: '云裳',
            type: '性感/性格开朗/上下粉嫩',
            place: '济南',
            item: '激活可见',
            see: 994.0,
            num: 79.5,
            img: 12,
            as: 'se12'
          },
          {
            id: '776**',
            nickName: '玥兰可',
            type: '舞蹈达人/上下粉嫩/皮肤白净',
            place: '厦门',
            item: '激活可见',
            see: 947.2,
            num: 77.6,
            img: 13,
            as: 'se13'
          },
          {
            id: '717**',
            nickName: '苑莎',
            type: '小清新/乖巧可爱/娃娃音',
            place: '厦门',
            item: '激活可见',
            see: 900.5,
            num: 71.7,
            img: 14,
            as: 'se14'
          },
          {
            id: '541**',
            nickName: '圆圆',
            type: 'A4小蛮腰/舞蹈达人/大长腿',
            place: '厦门',
            item: '激活可见',
            see: 973.6,
            num: 54.1,
            img: 15, as: 'se15'
          },
          {
            id: '318**',
            nickName: '鸢尾花',
            type: '小清新/大学生/娃娃音',
            place: '厦门',
            item: '激活可见',
            see: 931.7,
            num: 31.8,
            img: 16,
            as: 'se16'
          },
          {
            id: '157**',
            nickName: '玉洁',
            type: '性感/乖巧可爱/上下粉嫩',
            place: '深圳',
            item: '激活可见',
            see: 999.4,
            num: 15.7,
            img: 17,
            as: 'se17'
          },
          {
            id: '820**',
            nickName: '语亭',
            type: '小清新/高颜值/大学生',
            place: '深圳',
            item: '激活可见',
            see: 920.3,
            num: 82,
            img: 18,
            as: 'se18'
          },
          {
            id: '179**',
            nickName: '雨嘉',
            type: '性格开朗/小清新/娃娃音',
            place: '深圳',
            item: '激活可见',
            see: 961.0,
            num: 17.9,
            img: 19,
            as: 'se19'
          },
          {
            id: '225**',
            nickName: '张芝兰',
            type: '小清新/乖巧可爱/娃娃音',
            place: '济南',
            item: '激活可见',
            see: 989.8,
            num: 22.5,
            img: 20,
            as: 'se20'
          },
        ]
      };
    },
  
    methods: {
      showPopup() {
        this.show = true;
      },
      showGlobal(){
        this.$toast.loading({
          message: '请联系管理员激活账号',
          forbidClick: true
        })
        this.poup = false
      },
      changeLang(lang) {
        this.lang = lang.name;
        this.show = false;
        vantLocales(lang.code)
        this.$i18n.locale = lang.code;
      },
      onSelect(action) {
        this.lang = action.text
        vantLocales(action.text)
        this.$i18n.locale = action.text;
      },
      gotoMenu(router) {
        this.$router.replace(router)
      },
      toLottery(key, id) {
        if (!localStorage.getItem('token')) {
          this.$router.push({path: '/Login'})
        } else {
          this.$router.push({path: '/Lottery?key=' + key + "&id=" + id})
        }
  
      },
      toPlayVideo(id) {
        if (!localStorage.getItem('token')) {
          this.$router.push({path: '/Login'})
        } else {
          this.$router.push({path: '/PlayVideo?id=' + id})
        }
      },
      onRefresh() {
        setTimeout(() => {
          this.getBasicConfig();
          this.isLoading = false;
          this.$toast("刷新成功");
        }, 500);
      },
      getBasicConfig() {
        this.$http({
          method: 'get',
          url: 'sys_config'
        }).then(res => {
          console.log(this.basicData,'this.basicDatabanner')
          this.basicData = res.data;
          // this.getNotice(this.basicData);//获取公告
          // this.getBanner(this.basicData);//获取banner
          this.getGameItem();//获取首页游戏列表
          // this.getMovieList_0(this.basicData);//获取首页视频0
          // this.getMovieList_1(this.basicData);//获取首页视频1
        })
  
      },
      toLink(item) {
        this.$router.push('/Detail')
        window.localStorage.setItem('detail', JSON.stringify(item))
      },
      getNotice(data) {
        this.notice = data.notice;
      },
      getGameItem() {
        this.$http({
          method: 'get',
          url: 'lottery_hot'
        }).then(res => {
          this.gameitem = res.data
        })
      },
      getMovieList_0(data) {
        this.movielist_0 = data.movielist_0
      },
      getMovieList_1(data) {
        this.movielist_1 = data.movielist_1
      },
      getBanner(data) {
        this.banners = data.banners;
      }
    },
    mounted() {
      console.log(this.$store.state.baseInfo.name, 'ussssssss')
    },
    watch: {
      '$i18n.locale'() {
        this.getBasicConfig();
      }
    },
    created() {
      // document.addEventListener('click',e=>{
      //   if ( e.target.className === 'lang_css' || e.target.className === 'rightButton') {
      //     this.show = true
      //   }else{
      //     this.show = false
      //   }
      // })
      this.getBasicConfig();
    }
  }
  
  </script>
  
  <style lang='less' scoped>
  @notice-bar-size: 30px;
  @movie-list-item-bottom-size: 25px;
  .linear-bg {
    display: flex;
    height: 13.333vw;
    background: #16151b;
    color: #f3c7a2;
    text-align: center;
    line-height: 26px; //13.333vw
    font-size: 12px; //4.667vw;
    width: 100%;
    justify-content: center;
  }
  
  .home-container {
    position: absolute !important;
    top: 0;
    left: 0;
    right: 0;
    bottom: 80px;
    background-color: #282828;
    overflow-y: auto;
    // padding-bottom: 120px;
  }
  
  .linear-gradient {
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, rgba(126, 86, 120, 0), rgb(230, 195, 161), rgba(126, 86, 120, 0));
  }
  
  ::v-deep .van-notice-bar__left-icon, .van-notice-bar__right-icon {
    min-width: 40px;
  }
  
  .notice-swipe {
    width: calc(100% - 50px);
    height: 85px;
    font-size: @notice-bar-size;
  }
  
  ::v-deep .van-icon-bullhorn-o::before {
    transform: scale(2.5);
  }
  
  .banner {
    width: 100%;
    margin-top: 4%;
  }
  
  .banner .lang {
    text-align: right;
    color: white;
    padding: 0 20px;
  }
  
  .banner_swiper {
    height: 100%;
    width: 100%;
  
    .swiper-slide {
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 620px;
      height: 190px;
      text-align: center;
      font-weight: bold;
      font-size: 20px;
      // background-color: #ffffff;
      background-color: rgba(0, 0, 0, .4);
      background-position: center;
      background-size: cover;
      color: #ffffff;
    }
  }
  
  ::v-deep .swiper-container-3d .swiper-slide-shadow-left {
    background-image: linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0));
  }
  
  ::v-deep .swiper-container-3d .swiper-slide-shadow-right {
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0));
  }
  
  .banner_img {
    border-radius: 10px;
    width: 100%;
    height: 100%;
  }
  
  .hot-game {
    width: 100%;
    height: 100%;
  }
  
  .hot-title-div {
    width: calc(100% - 50px);
    margin: 0 auto;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .hot-title-div > div:first-child {
    width: auto;
  }
  
  .hot-title-div div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  
  .hot-title-div > div:nth-child(2) span {
    font-size: 20px;
    color: #979799;
  }
  
  .hot-title-div > div:first-child span {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 10px;
    font-weight: 700;
    color: #000;
  }
  
  .hot-title-div > div:first-child span {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 28px;
    font-weight: 700;
    color: #000;
  }
  
  .hot-title-div > div:nth-child(2) span {
    font-size: 25px;
    color: #979799;
  }
  
  .hot-title-div > div:first-child span:before {
    content: "";
    display: block;
    width: 5px;
    height: 30px;
    background-color: #7e5678;
    border-radius: 1px;
    margin-right: 5px;
  }
  
  .hot-game .hot-items-div {
    margin-top: -3px;
  }
  
  .hot-game .hot-items-div span {
    margin-top: 10px;
    font-size: 28px;
    color: #000;
  }
  
  .hot-recommend {
    width: 100%;
    flex: 1;
    background-color: #f2f2f5;
  }
  
  .movie_swiper {
    .swiper-slide {
      width: 80%;
    }
  }
  
  .movie_list_0 {
    width: calc(100% - 50px);
    margin: 0 auto;
  }
  
  .movie_cover {
    border-radius: 10px;
    width: 550px;
    height: 330px
  }
  
  .movie_list_0 .movie-list-item-bottom {
    position: relative;
    width: 550px;
    bottom: 43px;
  }
  
  .movie_list_0 .movie-list-item-bottom .movie-time-div {
    background-color: rgba(0, 0, 0, .4);
  }
  
  .movie_list_0 .movie-list-item-bottom > div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .movie_list_0 .movie-list-item-bottom .movie-time-div .van-count-down {
    font-size: 28px;
    color: #fff;
  }
  
  .movie_list_0 .movie-time-div {
    color: #fff;
    border-radius: 0 0 10px 10px;
  }
  
  .movie_list_0 .movie_swiper .hot {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 80px;
  }
  
  .movie_list_0 span {
    font-size: 30px;
  }
  
  .movie_list_1 {
    display: flex;
    width: calc(100% - 50px);
    margin: 0 auto;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  
  .movie_list_1 .movie-list-item .cover_img {
    border-radius: 10px;
    width: 335px;
    height: 290px;
  }
  
  .home-scroll {
    padding-bottom: 110px;
  }
  
  .movie_list_1 .movie-list-item {
    margin-bottom: -10px;
  }
  
  .movie_list_1 .movie-list-item-bottom {
    position: relative;
    width: 335px;
    bottom: 42px;
  
  }
  
  .movie_list_1 .movie-list-item:nth-child(odd) {
    margin-right: 25px;
  }
  
  .movie_list_1 .movie-list-item-bottom .movie-time-div {
    background-color: rgba(0, 0, 0, .4);
  }
  
  .movie_list_1 .movie-list-item-bottom > div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .movie_list_1 .movie-list-item-bottom .movie-time-div .van-count-down {
    color: #fff;
  }
  
  .movie_list_1 .movie-time-div {
    color: #fff;
    border-radius: 0 0 10px 10px;
    height: 35px;
  }
  
  .movie_list_1 .movie_swiper .hot {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 5px;
  }
  
  .movie_list_1 .movie-list-item .movie-time-div span:first-child {
    overflow: hidden;
    white-space: nowrap;
    width: 180px;
    padding-left: 8px;
    font-size: 25px;
  }
  
  .movie_list_1 .movie-list-item .movie-time-div span:last-child {
    overflow: hidden;
    white-space: nowrap;
    width: 0px;
    padding-right: 110px;
    font-size: 22px;
  }
  
  .movie_list_0 .movie-time-div span:first-child {
    overflow: hidden;
    white-space: nowrap;
    width: 350px;
    padding-left: 10px;
    font-size: 25px;
  }
  
  .hot-recommend-more {
    width: 100%;
    padding-bottom: 20px;
    text-align: center;
    color: #979799;
    font-size: 30px;
  }
  
  .hot-items-div .game_item_img {
    width: 100px;
    height: 100px;
  }
  
  ::v-deep .hot-items-div .game_item_img .van-image__img {
    border-radius: 20px;
  }
  
  ::v-deep .van-pull-refresh__track .van-pull-refresh__head * {
    color: #000000;
    font-size: 35px;
  }
  
  ::v-deep .van-nav-bar__content {
    background: linear-gradient(180deg, #FDB379 0%, #FF6D61 100%);
    box-shadow: inset 0px 0px 10px rgb(255 255 255 / 20%);
  }
  
  .rightup {
    position: fixed;
    right: 2px;
    top: 12.8vw;
    width: 17.533vw;
    z-index: 9;
    background: #fff;
    border-radius: 10px;
  
    .rightbox {
      display: flex;
      align-items: center;
      color: #333;
      height: 8vw;
      justify-content: center;
      border-bottom: 1px solid #f2f2f2;
  
      img {
        width: 10px;
        // height: 14px;
      }
  
      p {
        width: 80px;
        text-align: center;
        height: 100%;
        line-height: 45px;
      }
    }
  }
  
  .noticeContent {
    padding: 20px;
    margin-right: 17px;
  }
  
  .sm {
    width: 100%;
    min-height: 1rem;
    border-radius: 10px;
    border: 1px solid #766350;
    margin: 10px 0;
    background: linear-gradient(120deg, #212121, #313131);
    display: -ms-flexbox;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
    position: relative;
    overflow: hidden;
  }
  
  
  .sm:before, .sm:after {
    content: "";
    position: absolute;
    width: 137.4vw;
    height: 144px;
    background: linear-gradient(0deg, rgba(74, 70, 70, 0.29), transparent);
    transform: rotate(139deg);
  }
  
  .sm:before {
    left: -4%;
  }
  
  .sm:after {
    left: -35%;
    z-index: 0;
  }
  
  .sm > div {
    position: relative;
    z-index: 99;
    display: flex;
  }
  
  .sm .left {
    width: 32%;
    position: relative;
    z-index: 99
  }
  
  .sm .left p {
    font-weight: 1000;
    background-image: -webkit-linear-gradient(top, #f8dbae, #edbd71);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 24px;
    text-align: center;
    margin-top: 3vw;
  }
  
  .sm .right {
    flex: 1;
    padding-left: 10px;
  }
  
  .sm .right p {
    color: #dadada;
    font-size: 12px; // 3vw
    line-height: 26px; //48px
  }
  
  .sm > span {
    line-height: 38px;
    color: #ddb285;
    font-size: 3vw;
    padding-top: 10px;
    text-align: center;
  }
  
  .sm .left span {
    line-height: 24px;
    color: #ddb285;
    font-size: 3vw;
    padding-top: 10px;
    text-align: center;
  }
  
  .sm .left:before {
    content: "";
    position: absolute;
    width: 0.02rem;
    height: 100%;
    background: #f6d5a1;
    right: 0;
    top: 0;
  }
  
  .navs > nav {
    padding-top: 15px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  
  .item ul li {
    float: left;
    width: 113%;
    margin-top: 10px;
    min-height: 14px;
    background: linear-gradient(120deg, #212121, #313131);
    position: relative;
    overflow: hidden;
    margin-bottom: 10px;
    margin-left: -37px;
    border-radius: 10px;
    border: 1px solid #7e6a56;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .item ul li:after, .item ul li:before {
    content: "";
    position: absolute;
    top: -100%;
    height: 400%;
    background: linear-gradient(90deg, rgba(74, 70, 70, .1), transparent);
    transform: rotate(50deg);
  }
  
  .item ul li:before {
    width: 60px;
    left: 1%;
  }
  
  .item ul li:after {
    width: 100px;
    left: 40%;
  }
  
  .navs > nav a {
    font-size: 14px;
    padding: 10px 15px;
    border-radius: 50px;
    margin-right: 14px;
    background: linear-gradient(90deg, #5b606c, #2b2b2b);
    color: #fff;
    margin-bottom: 10px
  }
  
  .navs > nav a.active {
    background: linear-gradient(#fde3ca, #e7b486);
    color: #8a5623;
  }
  
  .item ul li i {
    position: absolute;
    right: -2.333vw;
    top: 2.667vw;
    background: #ff6056;
    font-size: 16px;
    padding: 4px 20px;
    font-style: normal;
    transform: rotate(45deg);
    color: #E7E7E7;
  }
  
  .item ul li .left .ft img {
    width: 24px;
    margin-right: 2px;
  }
  
  .item ul li .left .ft span {
    font-size: 12px;
    color: #696969;
    margin-right: 6px;
  }
  
  .item ul li .left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
  }
  
  .item ul li .left p {
    background: linear-gradient(90deg, #efcba7, #dcab76);
    color: #8d5825;
    display: inline-block;
    font-size: 12px;
    font-weight: 600;
    padding: 20px 18px;
    border-radius: 10px;
    margin-bottom: 10px;
    margin-top: 16px;
  }
  
  .item ul li .left .ziliao {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 10px; //3.733vw;
    margin-left: 10px;
  }
  
  .item ul li .left .ziliao span {
    padding: 3px 0;
    color: #e8e8e8;
    text-align: left;
  }
  
  ul li .left .ft {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-top: 10px;
  }
  
  .item ul li .right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  
  .item ul li .right .avatar {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    border: 2px solid #5c534b;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
    overflow: hidden;
  }
  
  .item ul li .right .avatar img {
    width: 100%;
  }
  
  .item.tiaokuan ul li {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  
  .item.tiaokuan ul li p {
    color: #e1be9c;
    background-image: -webkit-linear-gradient(top, #f8dbae, #edbd71);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 3.733vw;
    font-weight: 600;
    text-align: left;
    padding: 10px 0;
  }
  
  .item.tiaokuan ul li span {
    font-size: 3vw;
    color: white;
  }
  
  .cube-scroll-list-wrapper span {
    color: white;
  }
  
  .cityPopup{
    width: 88%;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #7e6a56;
    border-radius: 6px;
    text-align: center;
    background: linear-gradient(120deg,#212121,#313131);
    overflow: hidden;
  }
  
  .cityPopup li:first-child {
    color: #f54c48;
  }
  
  .home-container .cityPopup li:first-child {
    width: 100%;
  }
   .cityPopup li:first-child .cubeic-like {
    font-size: 20px;
  }
  
  .cityPopup li{
    float: left;
    width: 33.3%;
    padding: 10px 0;
    color: #fff;
  }
  .cityPopup li:last-child {
    margin-top: 10px;
    width: 100%;
  }
  .cityPopup li:last-child span {
    padding:4px 14px;
    border-radius: 24px;
    color: #8a5623;
    font-size: 24px;
    background: linear-gradient(#fde3ca,#e7b486);
    display: block;
    margin: 0 auto;
    width: 40%;
  }
  ::v-deep .van-popup{
    background: none;
    width: 70%;
  }
  ::v-deep .van-toast__text{
    font-size: 24px;
  }
  ::v-deep .van-toast{
    padding: 0 !important;
  }
  </style>
  