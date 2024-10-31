<template>
  <div class="container">
      <div class="title">会员视频</div>
      <div class="rt-pos" @click="$router.back()"></div>
      <!-- <van-tabs v-model="active" animated swipeable  @change="OnChange">
        <van-tab v-for="(v,key) in videolitem" :key="key" :title="$t(v.name)" :name="v.key" ></van-tab>
      </van-tabs> -->
      <div class="category">
        <ul>
          <li>最新</li>
          <li>最热</li>
        </ul>
      </div>
      <div class="live-content">
          <ul>
            <!-- v-for="item in list" :key="item.id" @click="toLink(item)" -->
              <li>
                  <div class="movie-item">
                    <img src="https://www-stream.2345cdn.net/upload/20241014/9EejhxLs-20241014152321.png">
                    <span class="movie-info">空进仓<br/>播放0次</span>
                  </div>
              </li>

              <li>
                  <div class="movie-item">
                    <img src="https://www-stream.2345cdn.net/upload/20241014/9EejhxLs-20241014152321.png">
                    <span class="movie-info">空进仓<br/>播放0次</span>
                  </div>
              </li>

              <li>
                  <div class="movie-item">
                    <img src="https://www-stream.2345cdn.net/upload/20241014/9EejhxLs-20241014152321.png">
                    <span class="movie-info">空进仓<br/>播放0次</span>
                  </div>
              </li>
          </ul>
      </div>
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
      
      actions: [{text: 'cn'}, {text: 'en'}, {text: 'tw'}],
      lang: window.localStorage.getItem('lang') || 'cn',
      videolitem: [],
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
    getVideoClass(){
      this.$http({
        method: 'get',
        url: 'video_class'
      }).then(res=>{
        this.videolitem = res.data;
        console.log(res.data, 'data')
      })
    },
    OnChange(){
      this.videolist = [];
      this.number = 0;
      this.page = 0;
      this.count = 0;
      this.getVideoList();//获取视频列表

    },
    getVideoList(){
      this.$http({
        method: 'get',
        data:{id:this.active,page:this.page},
        url: 'video_list'
      }).then(res=>{
        console.log(res.data.data,'res.data.data')
        this.videolist = this.videolist.concat(res.data.data);
        this.count = res.data.count;
        this.page++;

      })
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

* {
  margin: 0px;
  padding: 0px;
  font-size: 0px;
}

.container {
  height: 670px;
  width: 105%;
  background-color: #282828;
  position: relative;
  // padding-bottom: 120px;
  margin-top: -10px;
  margin-left: -10px;
}

.rt-pos {
  content: "";
  display: inline-block;
  height: 12px;
  width: 12px;
  border-width: 0 0 5px 5px;
  border-color: #ccc;
  border-style: solid;
  transform: matrix(0.71, 0.71, -.71, 0.71, 0, 0);
  position: absolute;
  top: 10px;
  left: 10px;
}



.container .title {
  height: 35px;
  width: 100%;
  line-height: 35px;
  text-align: center;
  font-size: 14px;
  color: #e6c3a1;
}

.container .category {
  width: 100%;
  height: 63px;
  background-color:grey;
  // background-color:brown;

}

.container .category ul {
  width: 100%;
  height: 100%;
}
.container .category ul li {
  display: block;
  float: left;
  width: 38px;
  height: 50%;
  font-size: 14px;
  color: white;
  margin-left: 5px;
  margin-top: 10px;
}

.container .category ul li:hover {
  color: #e6c3a1;
}

.container .live-content {
  height: 66%;
  width: 100%;
  
}

.container .live-content .movie-item {
  width: 45%;
  height: 130px;
  background-color: aqua;
  float: left;
  margin-top: 10px;
  margin-left: 12px;
}

.container .live-content .movie-item img {
  height: 80%;
  max-width: 100%;
  margin: 0 auto;
}

.container .live-content .movie-item span {
  display: block;
  font-size: 12px;
  line-height: 12px;
}
</style>
