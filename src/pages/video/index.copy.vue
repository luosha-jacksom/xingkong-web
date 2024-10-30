<template>
  <div class="movie-hall page">
    <van-nav-bar
        class="nav-bar"
        :title="$t('视频影院')"
    />
    <van-tabs v-model="active" animated swipeable  @change="OnChange">
      <van-tab v-for="(v,key) in videolitem" :key="key" :title="$t(v.name)" :name="v.key" ></van-tab>
    </van-tabs>
    <swiper class="video_swiper" ref="swiper" :options="videoSwiperOption" @slideChange="itemChange">
      <swiper-slide v-for="(v,key) in videolitem" :key="key">
        <div class="movie-list-tab">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <div class="hot-recommend-div">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    :immediate-check="false"
                    :finished-text="$t('没有更多了')"
                    @load="onLoad"
                >
                  <div class="list-item">
                    <div class="movie-list-item" v-for="(v,key) in videolist" :key="key" @click="toPlayVideo(v.id)">
                      <van-image class="cover_img"  round :src="v.vod_pic">
                        <template v-slot:loading>
                          <van-loading type="circular"/>
                        </template>
                      </van-image>
                      <div class="movie-list-item-bottom">
                        <div class="movie-time-div">
                          <span>{{v.vod_name}} <br/>{{ $t('播放') }}:{{v.count}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </van-list>

            </div>
          </van-pull-refresh>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  data() {
    return {
      active: 0,
      isLoading: false,
      count:0,
      loading: false,
      finished: false,
      refreshing: false,
      videolitem: [],
      videolist: [],
      number:0,
      page:0,
      videoSwiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 0,
        slidesPerGroup : 1,
      }
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
    toPlayVideo(id){
      if(!localStorage.getItem('token')){
        this.$router.push({path:'/Login'})
      }else {
        this.$router.push({path:'/PlayVideo?id='+id})
      }
    },
    itemChange(){
      this.active = this.$refs.swiper.swiper.activeIndex
      this.OnChange()
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
    onLoad() {
        this.getVideoList();
      let timer = setTimeout(() => {
        if (this.refreshing) {
          this.videolist = [];
          this.refreshing = false;
        }
        this.loading = false;
        if (this.videolist.length === this.count) {
          this.finished = true;
        }
        this.finished && clearTimeout(timer);//清除计时器
      }, 500);
    },
     OnChange(){
      this.videolist = [];
      this.number = 0;
      this.page = 0;
      this.count = 0;
      this.getVideoList();//获取视频列表

    },
    onRefresh() {
      setTimeout(() => {
        this.finished = false;
        this.loading = true;
        this.onLoad();
        this.isLoading = false;
        Toast(this.$t('刷新成功'));
      }, 500);
    },
  },
  created() {
    this.getVideoClass();//获取视频类目
    this.OnChange()
  }
};
</script>

<style lang='less' scoped>
.page{
  height: 700px;
  position: absolute!important;
  top: 0;
  left: 0;
  right: 0;
  background-color: #f2f2f5;
}
.nav-bar{
  background-color:#212121;
}
.van-nav-bar {
  line-height: 50px;
}

::v-deep .van-nav-bar__title {
  max-width: 60%;
  margin: 0 auto;
  color: #ddb285;
  font-size: 14px;
}
::v-deep .van-nav-bar__content {
  height: 35px;
  line-height: 35px;
}
.nav-bar{
  background: #282828;
  color: #f3c7a2!important;
}
.movie-hall{
  display: flex;
  flex-direction: column;
  bottom: 100px;
  background: #f2f2f5;
}
::v-deep .van-tabs__nav {
  background-color:#212121;
  overflow: hidden;
  height: 70px;
}
::v-deep .van-tab {
  color: #ddb285;
  font-size: 14px;
  width: 40px;
  margin: 5px 5px;
  float: left;
}

::v-deep .van-tabs__line {
  width: 29px;
  height: 7px;
  border-radius: 0px;
  background-color: #ddb285;
  margin-left: 0px;
  margin-top: 24px;
}

::v-deep .van-tabs--line .van-tabs__wrap {
  height: 69px;
}
::v-deep .van-tabs__wrap--scrollable .van-tab {
  padding: 0 23px;
}
::v-deep  .van-hairline--bottom::after {
  border-bottom-width: 0px;
}

::v-deep .van-tab__text--ellipsis{
  overflow: inherit;
}
.video_swiper {
  background-color:#212121;
  width: 100%;
  flex: 1;
  .swiper-slide {
    flex-shrink: 0;
    flex-grow: 0;
    flex-basis: 100%;
    justify-content: center;
    height: 100%;
    position: relative;
    transition-property: transform;
  }
}
.movie-list-tab {
  overflow: auto;
  height: 100%;
}
::v-deep .van-pull-refresh__track .van-pull-refresh__head *{
  color: #000;
  font-size: 35px;
}
.movie-list-tab .hot-recommend-div{
  height: 100%;
  margin: 10px auto;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  //overflow: auto;
}
.list-item{
  // display: flex;
  width: calc(100% - 50px);
  margin: 10px auto;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.list-item .movie-list-item{
  margin-bottom: 42px;
  width:45%;
  height:135px;
  float: right;
  // margin-left: 10px;
}

.list-item .movie-list-item:nth-child(odd) {
  float: left;
  // margin-right: 0px;
}
.list-item .movie-list-item .cover_img{
  width:100%;
  height:133px;
  background-color: aqua;
}

.list-item .movie-list-item-bottom{
  position: relative;
  width: 310px;
  bottom: -3px;
}
.list-item .movie-list-item-bottom .movie-time-div{
  background-color: rgba(0,0,0,.4);
}
.list-item .movie-list-item-bottom>div {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.list-item .movie-list-item-bottom .movie-time-div .van-count-down {
  color: #fff;
}

.list-item .movie-list-item .movie-time-div span:first-child {
  overflow: hidden;
  white-space: nowrap;
  width: 180px;
  padding-left: 8px;
  font-size: 12px;
}

.list-item .movie-time-div {
  color: #fff;
  border-radius: 0 0 20px 20px;
  height: 35px;
}
</style>
