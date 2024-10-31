<template>
    <div :key="$i18n.locale" class="footer" v-if="show">
      <van-tabbar  v-model="active" active-color="#e6b98a" :border="true" inactive-color="#979799">
        <van-tabbar-item
            v-for="(k,key) in item"
            replace
            :to="k.router"
            :key="key"
        >
          <span>{{ k.title }}</span>
          <template #icon="props">
            <img :src= "props.active ? k.icon.active : k.icon.noactive" :alt=k.title />
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </div>
  
  </template>
  
  <script>
  export default {
    data() {
      return {
        show:false,
        active: 0,
        item:[
          {
            router:"/Home",
            title:"首页",
            icon:{
                active:"/img/footer/homec.jpg",
                noactive:"/img/footer/home.jpg"
            }
          },{
            router:"/Game",
            title:"福利",
            icon:{
              active:"/img/footer/reservec.jpg",
              noactive:"/img/footer/reserve.jpg"
            }
          },{
            router:"/Live",
            title:"直播间",
            icon:{
              active:"/img/footer/videoc.jpg",
              noactive:"/img/footer/video.jpg"
            }
          },{
            router:"/Mine",
            title:"我的",
            icon:{
              active:"/img/footer/myc.jpg",
              noactive:"/img/footer/my.jpg"
            }
          }
        ]
      };
    },
    methods: {
  
    },
    watch: {
      '$route'(to) {
        if (to.name == "home") {
          this.active = 0;
          this.show = true;
        } else if (to.name == "game") {
          this.active = 1;
          this.show = true;
        } else if (to.name == "live") {
          this.active = 2;
          this.show = true;
        } else if (to.name == "mine") {
          this.active = 3;
          this.show = true;
        }else {
          this.show = false;
        }
      }
    },
    created () {
      if (this.$route.name == "home") {
          this.active = 0;
          this.show = true;
      } else if (this.$route.name == "game") {
          this.active = 1;
          this.show = true;
      } else if (this.$route.name == "live") {
          this.active = 2;
          this.show = true;
      } else if (this.$route.name == "mine") {
          this.active = 3;
          this.show = true;
      }else {
          this.show = false;
      }
    },
  };
  </script>
  
  <style lang='less' scoped>
  @tabbar-height: 79px;
  @tabbar-img:75px;
  .footer {
    bottom: 0px;
    background: #282828;
    left: 0px;
    right: 0px;
    width: 100%;
    height: @tabbar-height;
    position: fixed;
  }
  .van-tabbar {
    height: @tabbar-height;
    width:100%;
  }
  .van-tabbar-item__icon img {
    height:30px;
    
  }
  .van-tabbar-item {
    font-size: 20px;
    width: 20%;
    float: left;
    margin-top:10px;
  }
  .van-tabbar-item:first-child {
    margin-left: 0px;
  }
  
  .van-tabbar-item:nth-child(2) {
    margin-left: 5%;
    margin-right: 5%;
  }

  .van-tabbar-item:nth-child(3) {
    margin-left: 5%;
  }
  .van-tabbar-item:last-child {
    margin-right: 0px;
    margin-left: 5%;
  }
  ::v-deep .van-tabbar{
    background-color: #282828;
    color: #ddb285;
  }
  ::v-deep .van-tabbar-item--active{
    background-color: #282828;
  }
  ::v-deep [class*=van-hairline]::after{
    border: 0 solid #e6b98a;
  }
  </style>
  