<template>
  <div class="wrap">
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide class="slide">
        <img src="https://www-stream.2345cdn.net/upload/20241014/9EejhxLs-20241014152321.png" alt="">
      </swiper-slide>
      <swiper-slide class="slide"><img src="https://imgcdn.toutiaoyule.com/20241029/9721de66c6652ce8862e53ec0fd6fc0e.jpg" alt=""></swiper-slide>
      <swiper-slide class="slide"><img src="https://www-stream.2345cdn.net/upload/20241009/acZY9twM-20241009170928.png" alt=""></swiper-slide>
    </swiper>
    <div class="radiusArrow" @click="$router.back()">
      <div class="rt-pos"></div>
    </div>
    <div class="content">
      <div class="notice">
        <van-notice-bar
            class="notice-swipe"
            left-icon="bullhorn-o"
            color="#ddb285"
            :text="this.notice"
        />
        <div class="icon2">公告</div>
      </div>
      <div>
        <p>Id：{{ list.id }}</p>
        <p>激活可见</p>
      </div>

      <div class="score_">
        <div class="score">
          <div>{{ this.$store.state.baseInfo.name }}传媒而打分</div>
          <div class="da_fen">88</div>
          <div>美女颜值</div>
        </div>
        <div class="phone_id">
          <div>详细地址：已隐藏，联系小蜜激活可见</div>
          <div>联系方式：已隐藏，联系小蜜激活可见</div>
        </div>
      </div>

      <div class="information">
        <div class="info">
          <div class="age"><i  class="icon3"></i> <span>基本信息 25岁,身高 162</span>
          </div>
          <div class="age"><i  class="icon4"></i> <span >所在地区  海南</span></div>
          <div class="age"><i  class="icon5"></i> <span>服务项目 激活可见</span>
          </div>
        </div>
        <div class="text_bo">祝{{ this.$store.state.baseInfo.name }}传媒的会员们，天天约得美娇娘，夜夜都能当新郎！</div>
      </div>

      <!-- require(`../../assets/detail/se1/1.jpg`)
          require(`../../assets/detail/se1/2.jpg`)
          require(`../../assets/detail/se1/3.jpg`) -->
      <div class="img"><img src="https://image1.nccontrol.com.cn/20241028/04932668-711a-4f04-8848-dfb1d6800b45.jpg" alt=""></div>
      <div class="img"><img src="https://imgcdn.toutiaoyule.com/20241029/6e2b3345485111a71634ac3ddc6569f1.jpg" alt=""></div>
      <div class="img"><img src="https://image1.nccontrol.com.cn/20241028/3064a578-8d7f-4f73-b79b-08482b3db0b2.jpg" alt=""></div>
      <div data-v-cca020a6="" class="kf_btn" @click="info">立即约她</div>
    </div>

  </div>
</template>
<script>

export default {
  name: 'swiper-example-default',
  title: 'Default',
  data() {

    return {
      list: {},
      notice: "获取中......",
      swiperOption: {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
      }
    }
  },
  created() {
    this.list = JSON.parse(window.localStorage.getItem('detail'))
    this.getBasicConfig()
  },
  methods: {
    info(){
      this.$toast({
        message: '联系专属客服接待',
        icon: 'like-o',
      });
    },
    getNotice(data) {
      this.notice = data.notice;
    },
    getBasicConfig() {
      this.$http({
        method: 'get',
        url: 'sys_config'
      }).then(res => {
        this.basicData = res.data;
        // this.getNotice(this.basicData);//获取公告
      })

    },
  }
}
</script>
<style scoped>
body {
  height: 100%;
}

.wrap {
  background: #282828;
  height: 100%;
}

.swiper {
  width: 100%;
  /*height: 100%;*/
  overflow: hidden;
}

.swiper img ,img{
  width: 100%;

  position: relative;
}

.radiusArrow {
  position: absolute;
  left: 11px;
  top: 23px;
  z-index: 999;
  padding-left: 10px;
}

.rt-pos {
  content: "";
  display: inline-block;
  height: 20px;
  width: 20px;
  border-width: 0 0 5px 5px;
  border-color: #ccc;
  border-style: solid;
  transform: matrix(0.71, 0.71, -.71, 0.71, 0, 0);
}

.content {
  background: #282828;
  padding: 0 20px;
  position: relative;
  top: -12.133vw;
  z-index: 999;
  overflow: hidden;
  color: white;
}

.notice {
  color: #ddb285;
  border: 0.01rem solid #7e6a56;
  border-radius: 10px;
  padding-left: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
}

.notice-swipe {
  width: calc(89% - 50px);
  height: 85px;
  background: #282828;
  color: #ddb285;
}

::v-deep .van-notice-bar__left-icon {
  font-size: 8vw;
}
::v-deep .van-toast__text{
  font-size: 28px;
}

.icon2 {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAAoCAYAAADaKFUbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyVpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LjE2NDc1MywgMjAyMS8wMi8xNS0xMTo1MjoxMyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjMgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzJEMjE1OUQ5M0Q3MTFFQzg5MTc4MjUzRDExM0YzQUYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzJEMjE1OUU5M0Q3MTFFQzg5MTc4MjUzRDExM0YzQUYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0MzdEQjE5NDkzRDYxMUVDODkxNzgyNTNEMTEzRjNBRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3MkQyMTU5QzkzRDcxMUVDODkxNzgyNTNEMTEzRjNBRiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqUa9qoAAATISURBVHja7FzLjhtFFK1XPxzP4DGxrcky2Q0Sk9jzSUjsyM+w5gNYRFkgsWCB2ABLHhJCQkKIRBF8AI+xu+peblU/3PZUe8wGF9I9dstyH3Vvjs99VbUlIopjgK+/XtDHU4FYIjo6IekrBE4qcyOkfE7cdJ9j/NdQJAiSHJo+5W904j3zL65+im5TgvMi7gqo8+w5cdMYxziV1ore5pHU2UdHiYyvvhoj2BJsJQAc/VC2QtJNLhGqaYxjnA4SlAAys5L60bFOnoOzQURBn+hfTZQ32Wg5xDFOJLD0GdOHbEWB1YrjnAwwRy8iHRiciv073qAb4BgngTeZpFfQg77cKzL8+qWiX8PMX0Bih4uwEZJupOnkuzGOcWqAUCGkHiFyqJjBGu9UX1RhL+fqfHRFDh/FOMbJ/Sx854THOBkFLHy+xXBYsdNyabMCV8U5xomra4qzXo+jRHZ2LlqRQ4zfcflykGOcOC+DN2hInwdFdr98UZCAb/nCqnbrNhwrk0/oRk9iHCOBCjukY3OEk1HMyMkS+25tI3VWLoc4RgpWlsF49+ZkEm/hcy1Ak3d7ORelWqFbRzlGEl6mcIshLw+KbH/+nAS0c3Bbp0rArjkmCz9zUY6RykTEryPAoZxMzpxQOKacXDtVOOh6YF2eP6aK+yLGMVIJ1ypEVz9mNgfKszn6MSUdIji2bqxD0ZXlqyGOkUqwphpJ35OTScCF74HDTBp2Bx0U7ZdugGOk4uRa4MHqevPTZwZdNaWDkrPdKayUNiVVbVcxjpFSSq7NN+hkqsgeOrdR2IoYeuDarXp0cQ1uY2IcIyUjK6EcBEebeDp2i7B8GJYQbQjJ3RBEZytX3UY5RkpWhsOza7DVfDuTdqK/QEwXrYY4RkpWdsNLjZsfPx2D3Yyx8tVz1S0hepjy7JLOXcY4Rno5uS6+3F2Ryam1i5vqObi1gS7HyyGOkZiRD1XXftUJq6o3ruy1TkrdwDrOMRIUOTa7vv3hE+XsegZh0FFv6ZFNOEalNF10HeMYCYrsl6Ga7VhmT/4phWNDLVKYZvXbo/zB21fElTGOkR4U6nifTCcXWLUi1rs9uouKcgXr2yjHSNDJqplE7vfJYNdzqqwbIfe286BYDnKMBIchzcbKvpP//v5lQQXXpK6e7W5VnT+YCOeexDhGqoUXdkvAZmtUnHmntpOsfuWcjS+8i2WMYyTaJ2MzqOo72a86ORJZOHt3P5fOVtXtH1GOkWpObrbkttX1X9++EFRwhSFIO7LsJllhZycuoxwj5aRcP5e2dTJMyMWFsFVTVG3HlfnZ7DGJO4lxjNRzcq/wCqNMuxZ1D+woWUPXAWej82bV6S7HSNvJov+YDIXqRXj01G1XLmSbwKVaDnGMxJ3st2TR2/z5zceGKudpvapkm+083V6uknLwOzGOkXp1jd0DiIaOh5SPFXRbebY9cH4+uyZOxzhG4k5uN1b6nExfFvWAo6p3efScaorxylLrFOMY/xdLy5CT59L/v4QmU5tMhP8gaLfe5vlKbuIcI1lVw1ubXEjSTOksiKx1Nqr/70OZvZwri2GOka55ZRDYFGdCZtnvXuTvVDl6VmhThGFHX0hrPyTuA+KmdzhG0iHaO5gEfkPf3v9HgAEAERvCjLJ7r8cAAAAASUVORK5CYII=) no-repeat;
  width: 120px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: #533921;
  font-size: 28px;
  background-size: 100% 100%;
  margin-right: 10px;
}

.score_ {
  font-size: 12px;
  border-radius: 10px;
  border: 1px solid #7e6a56;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding: 1vw;
  margin-top: 30px
}

.score_ .score {
  width: 30%;
  height: 100%;
  text-align: center;
}

.score_ .da_fen {
  font-size: 30px;
  color: #f1c79f;
}

.score_ .phone_id {
  font-size: 12px;
}
.information{
  border-radius: 10px;
  border: 1px solid #7e6a56;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 19px;
  font-size: 12px;
}
.information .info{
  border-bottom: 2px solid #7e6a56;
  padding-bottom: 10px;
}
.information .info .age{
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  line-height: 49px;
}
.information .info .age .icon3{
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3VpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LjE2NDc1MywgMjAyMS8wMi8xNS0xMTo1MjoxMyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkYTVkYTgwNS1jOTQyLTQ4MzMtOTk2YS0xMzE1NWEzZGJlOGEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDM3REIxOEY5M0Q2MTFFQzg5MTc4MjUzRDExM0YzQUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDM3REIxOEU5M0Q2MTFFQzg5MTc4MjUzRDExM0YzQUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjMgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1MmQ2MzM3NC1hZWI4LTQzZGMtODU0ZS1jYzQ5ZDE3ODVlOTgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ZGE1ZGE4MDUtYzk0Mi00ODMzLTk5NmEtMTMxNTVhM2RiZThhIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+MWWLJQAAAmZJREFUeNrs3c0uA1EYxvFz1EciLoCytLCzwMItWFVSEmtbFiw0NpYSumDBjisQH42FmyAS6y4rtWeDyHhP55SRkui0czof/yfedszQ9PzUmek7SUd7nqdI9OmDAGigCdBAA02ATlP62/2Fp8rOb6sHpQp+6XmtVF5pPehv0o0vc6O1tqv013rduPHrezn484Htge//Wm7dpn5uay43Hz+4vbFOvch9TRbuZcWl3Fdky1twHCbD00vRQv+SRal9qcmUvPhGpKZsrUhVpUpSF72aOnJSe/YJTKb4v96M7dyONeds6ghkV2orQ9Nsc6wll6/oYsaQg9hFV9BmJ3eQ4QOIQ2sQObTZ3U5kGHpcatkFdIGj4vYNwkDP4axmXUCP4qzGXEAP4exmZ0gcvzMkQAMNNAEaaNI76Btlzq74pyF6WXn7XFILvSpVj8G46va5MHU4iJdm6BMVj16IaWWexgm6v8uPtxCTqYOjDqAJ0EAToIEGmgANNAE65dBxaZPGrr2a1jZp2ETWXmXqaI2XBOi4tEnDJrL2Km1SjjqAJkADDTQEQANNgAYaaJJIaNqkjqBpkzJ1/Du0SR2ENik7QwI00EAToIEmQAMNNAEaaAJ0sqGfYTMf3B09NN25EAZhoB9wVrcuoK9wbt8gDPSZVC3DyI/WIHJosyPYzDD0htSrq8M78xctZxC5HObV3Olx9LbUUYaQj+2Ynb9h+ZBaV/7FBaopBjZjMx+3v2bHHCrdOAturlFybZ+MufjNjPJP2w8kFPbd7vDulLmykD9VvHX6oJpLocb3LTgBGmigIQAaaNJ+PgUYADCXUrEYpA4XAAAAAElFTkSuQmCC) no-repeat;
  width: 30px;
  height: 30px;
  background-size: 100% 100%;
}
.information .info .age .icon4{
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3VpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LjE2NDc1MywgMjAyMS8wMi8xNS0xMTo1MjoxMyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkYTVkYTgwNS1jOTQyLTQ4MzMtOTk2YS0xMzE1NWEzZGJlOGEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDM3REIxOEI5M0Q2MTFFQzg5MTc4MjUzRDExM0YzQUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDM3REIxOEE5M0Q2MTFFQzg5MTc4MjUzRDExM0YzQUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjMgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4N2QzYThmMC1jMTUyLTQzZDQtOGEzZS05N2YyNzczYzg1OWUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ZGE1ZGE4MDUtYzk0Mi00ODMzLTk5NmEtMTMxNTVhM2RiZThhIi8+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) no-repeat;
  width: 30px;
  height: 30px;
  background-size: 100% 100%;
}
.information .info .age .icon5{
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3VpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LjE2NDc1MywgMjAyMS8wMi8xNS0xMTo1MjoxMyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkYTVkYTgwNS1jOTQyLTQ4MzMtOTk2YS0xMzE1NWEzZGJlOGEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDM3REIxOTM5M0Q2MTFFQzg5MTc4MjUzRDExM0YzQUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDM3REIxOTI5M0Q2MTFFQzg5MTc4MjUzRDExM0YzQUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjMgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpkODk3M2FlZC1mZDVlLTRkYjAtYmU0Mi1lZTBkMWJmYWE0YjYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ZGE1ZGE4MDUtYzk0Mi00ODMzLTk5NmEtMTMxNTVhM2RiZThhIi8+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) no-repeat;
  width: 30px;
  height: 30px;
  background-size: 100% 100%;
}
.information .info .age i{
  margin-right: 20px;
}
.information .text_bo{
  margin-top: 10px;
}
.kf_btn{
  width: 70%;
  height: 60px;
  background: linear-gradient(#fde3ca,#e7b486);
  text-align: center;
  margin: 40px auto;
  line-height: 60px;
  color: #333;
  border-radius: 20px;
}
</style>