<template>
    <div class="container">
        <div class="title">直播间</div>
        <div class="live-content">
            <ul>
                <li v-for="item in list" :key="item.id" @click="toLink(item)">
                    <div class="info-header">
                        <div class="header-left-logo">
                            <img src="/img/footer/reservec.jpg" />
                            <icon />
                        </div>>
                        <div class="header-right-info">
                            <span class="name">远新</span>
                            <span class="nv-goal">官方认证女神</span>
                            <span class="bond">已缴纳20000保证金</span>
                            <span class="address">地区：长沙</span>
                        </div>
                    </div>
                    <div class="info-body">
                        <div class="body-left-img">
                            <img src="#">
                        </div>
                        <div class="body-right-info">
                            <span class="signature">签名：勿扰</span>
                            <span class="personality">A4小蛮腰</span> 
                            <span class="personality">舞蹈大人</span> 
                            <span class="personality">娃娃音</span> 
                            <span class="personality">高颜值</span> 
                            <span class="personality">性感</span> 
                            <span class="get-phone">获取联系方式</span> 
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
  </template>
  
  <script>
  
  export default {
    data() {
      return {
        poup: false,
        active: 0,
        show: false,
        notice: "获取中......",
        banners: [{}],
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
        ]
      };
    },
  
    methods: {
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

  * {
    margin: 0px;
    padding: 0px;
  }
  .container {
    height: 667px;
    width: 105%;
    background-color: #282828;
    margin-top: -10px;
    margin-left: -10px;
    // padding-bottom: 120px;
  }
  
  .container .title {
    height: 35px;
    width: 100%;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
    color: #e6c3a1;
  }

  .container .live-content {
    height: 100%;
    width: 100%;
  }
  .container .live-content ul li {
    width: 98%;
    height: 240px;
    display: block;
    float: left;
    background-color: #5b606c;
    border-radius: 10px;
    margin: 10px;
  }
  .container .live-content ul li .info-header {
    width: 100%;
    height: 100px;

  }
  .container .live-content ul li .info-header .header-left-logo{
    width: 30%;
    height: 89%;
    margin-top: 10px;
    margin-left: 8px;
    border-radius: 50%;
    position: relative;
    float: left;
  }

  .container .live-content ul li .info-header .header-left-logo img {
    height: 70px;
  }
  .container .live-content ul li .info-header .header-left-logo icon {
    width: 20px;
    height: 20px;
    display: inline-block;
    background: url(/public/favicon.ico) no-repeat;
    position: absolute;
    bottom: 38px;
    right: 20px;
    z-index: 2; 
  }

  .container .live-content ul li .info-header .header-right-info {
    font-size: 14px;
    height: 80%;
    width: 58%;
    float: left;
    margin-left: -5px;
  }
  .container .live-content ul li .info-header .header-right-info span {
    display: block;
    width: 100%;
    height: 20%;
    margin-top: 2px;
    font-weight: bold;
    text-align: left;
  }

  .container .live-content ul li .info-body {
    width: 100%;
    height: 160px;

  }

  .container .live-content ul li .info-body .body-left-img {
    width: 35%;
    height: 100%;
    float: left;
  }
  
  .container .live-content ul li .info-body .body-left-img img {
    height: 100%;
  }

  .container .live-content ul li .info-body .body-right-info {
    width: 55%;
    height: 100%;
    float: left;
  }
  
  .container .live-content ul li .info-body .body-right-info span {
    display: block;
    float: left;
    width: 38%;
    height: 16px;
    line-height: 16px;
    font-size: 14px;
    border-radius: 90px;
    margin: 5px 10px;
    background-color: #ff6056; 
  }
  </style>
  