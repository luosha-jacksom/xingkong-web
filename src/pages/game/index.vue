<template>
  <div class="convention-hall page">
    <van-nav-bar class="nav-bar" title="福利"/>
    <div class="convention-item">
      <ul data-v-08c28d8f="" class="girl-ul">
        <li data-v-08c28d8f="" @click="$router.push('/Video')"><p data-v-08c28d8f="" class="girl-title"><img data-v-08c28d8f=""
                                                                             src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2xpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LmRhYmFjYmIsIDIwMjEvMDQvMTQtMDA6Mzk6NDQgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NjZmNTJiM2UtNWFiMS1iOTQ0LThiMjQtYjBmMTc1MWFlN2VhIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjBBNDdBQkJFOTRFQjExRUNCNzk5OTQ0QzRCRUM5RUYyIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjBBNDdBQkJEOTRFQjExRUNCNzk5OTQ0QzRCRUM5RUYyIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMi41IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjBCQzYwMDc1OUMzRTExRUNBNDczRDgwQTlDNzYwNDkyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjBCQzYwMDc2OUMzRTExRUNBNDczRDgwQTlDNzYwNDkyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+II2ztwAAA8pJREFUeNrMV1uIjkEYnnd+1nJBaxVywW5yJ2c3S45bklqiVZKi1s3eIAk5FPfSFnFBiSibXbTkUKRNXHG1kbiQi73YQmw21r+/Z75v5pt3Dt//LTf2333n8M47M8+8p5mPKpWK+N+/car43nkgX4LINNAkxqO0Tv5pAtorQXPRe4e6F7LDViYlyvoy7YNqmw+nIKoDyDaygBgI/C1G0YF2U8YjeoYCJ6NXZlNygOsD6fVyQKQbhwA4P1loNhqP0ZhqxvXiq0A9aCxB3W835ABkBkJGT59uNBPC+zHlOHiLAtWmi7ZnAPjpUlLz21ye0oi0AKIgrP0bMfk5GmfAOwV6Cdpk7MoWnm82p6j95TqhN1Wbk4wAsiACdbWhaLBoqQb1EUoGJZf9RcSdzW4oZCL3zdUQAxRogoz3Z/afEQFWj6LkLfZAMPVSaJLrxMCFJvM04XivoNvcznpiD+i3Z//LoEexxbF5N+hm4EeOxpgmyDijnXAHtI+E/Ih6AHQRzJOR0/4EtWCzY1j0DegzqA/jB8HfASqnc5hDyjBESWXMwa5DYfx7cS24Q0bjPakl+iNW1YF59Lo2OmpWtJs8kWhiAYqdGKhnANSCyOtUchaLLI6FRzSAklaXOchrALqKztdovsiSFdEG8LvBrhVRweL0G+aRLIp2o94FmWYFxB7CT1ZIsbB/HEBusvG8XRILP+mbYCnGWpwQ9tM2hObl2j8GKpZ+YwlL+4XuN+g5qrMNDXXp3YLAkPEJGVd30H+i7b827nAUasgCHhKJRugs5jdp3hYIbDXmqBSkX0Wwp9yO061HDJw2c6qayB3fC+oFNTGZZu4ToiD9Cu3dg+nm8oS6FzD+gW+o7gYXkOSAGkG13t0zzJJVeJJQ3VLdQCUm81Q/ZDpjt2N8DT+s3ejIEcz1dgO6H9SKfrvJjrH0HJpMOnnCAVFFlaIg/V7QKTt8L1BOphXSe1k5VyuFPlKcfo+CpkWfcFVTv3DyBE+/4i/CTznbJfRXF2ba2N3DX9ujTL8qJMsMYCuKDoxPL0pq4Ts1oonAISPaQFEHXh0Af0H/HGhPlaTm2Z89FZgWyEvbNIr0OxmNezr2Fv6D/d+jmIX+RPOKQz2eRYcshyEauWzw6iYDIJAJ84Sn/vOol2HkLtnPiWvcHG+xwByqdovGTZQTfiLg4TcA2T50WtDeCN4U1DeYOaR61i833xD+66fgUnMBxe3/EGNdmScS3Q++RcF8AVoDbWyG8KTqnj7a+E/6FYx8QvMKOj8yvv+9NRa+yqUYA78xAeKPAAMAeP5zn6MY9acAAAAASUVORK5CYII="
                                                                             alt=""> <span
            data-v-08c28d8f="">会员视频</span></p>
          <div data-v-08c28d8f="" class="">
            <div data-v-08c28d8f="" class="girl-cont"><p data-v-08c28d8f="" class="data-box"><span data-v-08c28d8f="">骑在身上大屌套弄</span>
              <img data-v-08c28d8f="" src="../../assets/logo.png" alt=""> 
              <i data-v-08c28d8f="" class="border"></i></p>
<!--              <p data-v-08c28d8f="" class="data-box"><span data-v-08c28d8f="">高端外围兼职美女</span> <img data-v-08c28d8f=""-->
<!--                                                                                                   src="../../assets/5.png"-->
<!--                                                                                                   alt=""> <i-->
<!--                  data-v-08c28d8f="" class="border"></i></p>-->
<!--              <p data-v-08c28d8f="" class="data-box"><span data-v-08c28d8f="">高潮惊险刺激</span> <img data-v-08c28d8f=""-->
<!--                                                                                                 src="../../assets/1.png"-->
<!--                                                                                                 alt=""> <i-->
<!--                  data-v-08c28d8f="" class="border"></i></p>-->
<!--              <p data-v-08c28d8f="" class="data-box"><span data-v-08c28d8f="">高潮惊险刺激</span> <img data-v-08c28d8f=""-->
<!--                                                                                                 src="../../assets/9.png"-->
<!--                                                                                                 alt=""> <i-->
<!--                  data-v-08c28d8f="" class="border"></i></p>-->
<!--              <p data-v-08c28d8f="" class="data-box"><span data-v-08c28d8f="">疯狂癫狂颤抖高潮</span> <img data-v-08c28d8f=""-->
<!--                                                                                                   src="../../assets/13.png"-->
<!--                                                                                                   alt="">-->
<!--                <i-->
<!--                  data-v-08c28d8f="" class="border"></i></p>-->
             </div>
          </div>
          <van-icon name="arrow" />
        </li>
        <li @click="$router.push('/Home')"><p data-v-08c28d8f="" class="girl-title">
          <img data-v-08c28d8f=""
                                                                             src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2xpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LmRhYmFjYmIsIDIwMjEvMDQvMTQtMDA6Mzk6NDQgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NjZmNTJiM2UtNWFiMS1iOTQ0LThiMjQtYjBmMTc1MWFlN2VhIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjBBNDdBQkMyOTRFQjExRUNCNzk5OTQ0QzRCRUM5RUYyIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjBBNDdBQkMxOTRFQjExRUNCNzk5OTQ0QzRCRUM5RUYyIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMi41IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjBCQzYwMDc1OUMzRTExRUNBNDczRDgwQTlDNzYwNDkyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjBCQzYwMDc2OUMzRTExRUNBNDczRDgwQTlDNzYwNDkyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+SdUiZgAABF9JREFUeNrsl1+IV0UUx+ec1RBW26AeDBGVXlIrQspEFPJf+JRQEZYPKglCWImWkogiSOH/IEKDgh76Q2plESraUxq9ZNIfwu2fqZAVohvammvur8/cmd/cmXvn7qs+7I89d75n5tx7znzPzJlZabVa5nr/1NwAv8EgbqgghrTBxT0r4v5RyFRj5GEjZjxtj4gcom+/EfkeASK0Iq51uk5EfwT9QeQW5IyIHqU9jHzDnEcx/jf40rDZq+pB+N9QZBKyHMP5ris4msVjMep68BF6zxbORe1YF48p2G0HT2j3o0/iMQ/8HfhF8EHwNRd0Ph12ZDLylgsgN1O5k4+8z+y20I7xAXRis0pUPkKf4Jyrf0/bwdxN+w4yE6WDccmmw6dgeeGomL0JlNfoN7IAcDuy2NGva9p2YgI73j7gLvAK2p+Q3xqCkId4/7GS/iiIfP5non9gHOVVh44BE2HXPxc8mfY0H+mvp0PM3NSRhhlJcOBFw0fvQ9d2CkqHfly9rSZ4KuM355kQuVcqM4/oT3UXZIv2H/SrtDfx9c5yvJaOf61IEbDciozgAz21IDAfmc1/ooePX0FOML6bYH4A34M8yfg4F1CwtYH2ENQebD9z21aH0vY3MREcBuftWaV9vfTtRd8A/tU6xeF+XwteIKg5jA0vHImeon0ZfS/4MrhPitxqK79FRc+VuY0lDkCvMP4u+kJbiNDnoe8Dw4YuQ14i55vJ/UXkGHgp46Pp/xybr8GbwGOrdSJmwhaUcdn8l2z8zGO9p/Rpx4Z2efs7cDKDdh2yAWxZsltyDjYdfm2NN9aHKIyZkzUmMPrE5zDKf8SGai+zY0vq7+jTGN/YDkBKBqkd+jr4NjqeB88OAYRdpY+iP9HExBfG1nkj06trwus2p0fFsTDfFHnXXHGyL6z2TEo6FmrMtKY10Y3Vm5I4T8rvNfS/6CAIvT+sn2L/iy8XwaEUpbm2VQOzI7NB8FYLw0/56KumUvvLGdpaUDjvrBYnE1OukZ6MB0b6mpiwBueRrXxkt9Gak2FgTkq1hedEdDhldlJZVdPUBv2XhiCKly0bZ9wK18OSltxO8OPGllxO0pTiammv7KyEEe0vtmw+HWFW7BD9Efwc7aEoHTbHE8n/IoLbhxywayGtLQ07Ky3/X9oFPkA6gkMbCJTLs3adRDm3a+EZ8F3u+NaTjqkB8x/rfcgb9Hbng9DaIrOpsTtmJfhDn39xFU93iDu8nnKlOZf/SkCOhc1YfUz7X3M6NHP8khpjb06ib3umlL8HwDuR0+iLxC40TXOfVtviva30vUZ7wUjTbTtNR1wpreBE1uJop59dh7vM6i507pq6FL07d/K6g0w20r8N5Y8w1rQ7JHM5iVb4qeKsUOEKqJd8OaYsy3vIOQyWoX9l0jVwlq+uBL5SBjDAlT91mF5OIvwnsqtYWCJLEM4IPW6va/R96/rMOgztlf84720BH+HzvU0BFL4H/yEeDKLy+1+AAQBejrMi7Sj/5QAAAABJRU5ErkJggg=="
                                                                             alt=""> <span
            data-v-08c28d8f="">新人福利</span></p>
          <div data-v-08c28d8f="" class="">
            <div data-v-08c28d8f="" class="girl-cont">
              <p data-v-08c28d8f="" class="data-box"><span data-v-08c28d8f="">新加入 ID: 346***</span> 
                <img data-v-08c28d8f="" src="../../assets/logo.png" alt="">
                  <i data-v-08c28d8f="" class="border"></i></p>
<!--              <p data-v-08c28d8f="" class="data-box"><span data-v-08c28d8f="">新加入 ID: 895***</span> <img-->
<!--                  data-v-08c28d8f="" src="../../assets/13.png" alt=""> <i data-v-08c28d8f=""-->
<!--                                                                                    class="border"></i></p>-->
<!--              <p data-v-08c28d8f="" class="data-box"><span data-v-08c28d8f="">新加入 ID: 438***</span> <img-->
<!--                  data-v-08c28d8f="" src="../../assets/14.png" alt=""> <i data-v-08c28d8f=""-->
<!--                                                                                    class="border"></i></p>-->
<!--              <p data-v-08c28d8f="" class="data-box"><span data-v-08c28d8f="">新加入 ID: 087***</span> <img-->
<!--                  data-v-08c28d8f="" src="../../assets/15.png" alt=""> <i data-v-08c28d8f=""-->
<!--                                                                                    class="border"></i></p>-->
             </div>
          </div>
          <van-icon name="arrow" />
        </li>
        <li  @click="info"><p data-v-08c28d8f="" class="girl-title"><img data-v-08c28d8f=""
                                                                             src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2xpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LmRhYmFjYmIsIDIwMjEvMDQvMTQtMDA6Mzk6NDQgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NjZmNTJiM2UtNWFiMS1iOTQ0LThiMjQtYjBmMTc1MWFlN2VhIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjU1MTg4M0ExOTRFOTExRUNCNzk5OTQ0QzRCRUM5RUYyIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU1MTg4M0EwOTRFOTExRUNCNzk5OTQ0QzRCRUM5RUYyIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMi41IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjBCQzYwMDc1OUMzRTExRUNBNDczRDgwQTlDNzYwNDkyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjBCQzYwMDc2OUMzRTExRUNBNDczRDgwQTlDNzYwNDkyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+tBzsIQAABAxJREFUeNrsl0uIFkcQx7vaTXZFIUtEVIiv4AZfiHjQhBxUFHwk67KgBBX0oEIuIoqPixrNRT2oB5WIiQiiXhYCXkyQhchu8KK4oOILH4tiRPCgrg8wup+/numZr3q+mWFv7mE/qK+qumu6a+pfVd0jlUrFfOqfNf3g1y+cqHN/PW2bCqZlmBHTDJ8nIlMY+MqI9ELdjF2H/8X4eeQeZONIHDexbMRWx7yeyibWG+Ztjp3I+dVjsQ27n+Gj4gdNdXEjI+CzGF8Df4B+AH5Y1MbOVm+edabqcD4c45j9hzV2w0dVPfeL+4fVG41n0UMi9iz8yyAi0Wa2QPdyjhNNzJ5j9rvI0OjQ+XAaqxazOsRLHDzOkWgD6yiBINxckmjVOiH1TJyETxLtgCLJ0cMQ25noR6v4Q1bng9W2WTgizLfz922Kv4RRkFyH/Bv7Bf3YMmhF4Jz1ztgceFInxFAFsr4P+N/nwW4d3gL8f0Gur8HfyTbUlRPyI1NflOB/GZoNTY1KVWQxdCMNcS3+3yB8n8U/3VzbJk7gwIIS/G9Bi9A7oLfIb1jAJeAP6E9K8G9R+M/FlpJ3L+DhS2xVJJpK8P8D/VkO/t3Ip4IGFOI/LoP/XugS8u/Q8HQ95cToHPyTN/qvBP8nhfUvMlTh/xThA7aDkddCF9DHhNUhtq6k/icEmIb4zyiqf+RehX8FvaJeZjJrt6F/Xs0J13qL63+NS7Sw/0chd3m0tLD+EwhjW9dJ6zIJOpO/lRqOrpL6Hwv97Wofco1sGoMbkNuwaSisf7Fdqnd0YbM7jkiQb6vSUxTtTwzW1TQkkx42nA9ymvn/0Qf52KsIJIdRqjv8z6rwv0HfhfAT8kS1/tc6JzoxemwyIc+p/8+c0If674DfyUnm1ylEcQ4O0TnBpOzJYNr3/q91KySg7IQqgYMmOuCmhvlGZFM4onqV35hc7jpd6fkfL5h5w8D2BPxff5/gHBE6LYlppBW9PuzK7nKUOBHj0xvXsLgaHhFcUMrx1864BN/ob1fTkY9BjSZ7Kps0J9oUHCn+tGi7HP1VSf3X9v94/jbUggMv0V17donZGJ5BgQOP4Md1iWr8uVVJK8KzPuCfvN3V+CyxLGznMNCedMSg4kwK3Ttfni90dWT7fzsbLILfzLueSdhPOuHN6Pf8ZrOgkSLZW5l4Ud7zvw75QnCAFfR/jm+ZjzPtUnxXPIPubuIPVX/Zh77V5PQcxnuiLhnf4MIrf7h5cD3n8JKF0A783Ybe4OefuzJEd6foBAYGhQ1OzsDcZ8ER5OF+7AY7EQG5mPvdUYt3UHIf4LuiDmhkv4kTbzP6XeNK2sgW1xNU+N3D1+Cr2fsK4weR7zDxa/Rs3tfNwLfogBP90YmPAgwA9AiRoi/YwycAAAAASUVORK5CYII="
                                                                             alt=""> <span
            >附近的人</span></p>
          <div  class="">
            <div  class="girl-cont" style="width: 100%;"><p  class="data-box"><span >为您发现同城炮友 9999 位</span>
              <img  src="../../assets/logo.png" alt="">
              <i class="border"></i></p>
<!--              <p data-v-08c28d8f="" class="data-box"><span data-v-08c28d8f="">为您发现同城炮友 1314 位</span> <img-->
<!--                  data-v-08c28d8f="" src="../../assets/8.png" alt=""> <i data-v-08c28d8f=""-->
<!--                                                                                   class="border"></i></p>-->
<!--              <p data-v-08c28d8f="" class="data-box"><span data-v-08c28d8f="">为您发现同城炮友 520 位</span> <img-->
<!--                  data-v-08c28d8f="" src="../../assets/9.png" alt=""> <i data-v-08c28d8f=""-->
<!--                                                                                   class="border"></i></p>-->
<!--              <p data-v-08c28d8f="" class="data-box"><span data-v-08c28d8f="">为您发现同城炮友 888 位</span> <img-->
<!--                  data-v-08c28d8f="" src="../../assets/10.png" alt=""> <i data-v-08c28d8f=""-->
<!--                                                                                    class="border"></i></p>-->
<!--              <p data-v-08c28d8f="" class="data-box"><span data-v-08c28d8f="">为您发现同城炮友 666 位</span> <img-->
<!--                  data-v-08c28d8f="" src="../../assets/6.png" alt=""> <i data-v-08c28d8f=""-->
<!--                                                                                   class="border"></i></p>-->
             </div>
          </div>
          <van-icon name="arrow" />
        </li>
<!--        <li @click="$router.push('/FangPian')"><p style="width: 26%" class="girl-title">-->
<!--          <img data-v-08c28d8f=""  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2xpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LmRhYmFjYmIsIDIwMjEvMDQvMTQtMDA6Mzk6NDQgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NjZmNTJiM2UtNWFiMS1iOTQ0LThiMjQtYjBmMTc1MWFlN2VhIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjBBNDdBQkMyOTRFQjExRUNCNzk5OTQ0QzRCRUM5RUYyIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjBBNDdBQkMxOTRFQjExRUNCNzk5OTQ0QzRCRUM5RUYyIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMi41IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjBCQzYwMDc1OUMzRTExRUNBNDczRDgwQTlDNzYwNDkyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjBCQzYwMDc2OUMzRTExRUNBNDczRDgwQTlDNzYwNDkyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+SdUiZgAABF9JREFUeNrsl1+IV0UUx+ec1RBW26AeDBGVXlIrQspEFPJf+JRQEZYPKglCWImWkogiSOH/IEKDgh76Q2plESraUxq9ZNIfwu2fqZAVohvammvur8/cmd/cmXvn7qs+7I89d75n5tx7znzPzJlZabVa5nr/1NwAv8EgbqgghrTBxT0r4v5RyFRj5GEjZjxtj4gcom+/EfkeASK0Iq51uk5EfwT9QeQW5IyIHqU9jHzDnEcx/jf40rDZq+pB+N9QZBKyHMP5ris4msVjMep68BF6zxbORe1YF48p2G0HT2j3o0/iMQ/8HfhF8EHwNRd0Ph12ZDLylgsgN1O5k4+8z+y20I7xAXRis0pUPkKf4Jyrf0/bwdxN+w4yE6WDccmmw6dgeeGomL0JlNfoN7IAcDuy2NGva9p2YgI73j7gLvAK2p+Q3xqCkId4/7GS/iiIfP5non9gHOVVh44BE2HXPxc8mfY0H+mvp0PM3NSRhhlJcOBFw0fvQ9d2CkqHfly9rSZ4KuM355kQuVcqM4/oT3UXZIv2H/SrtDfx9c5yvJaOf61IEbDciozgAz21IDAfmc1/ooePX0FOML6bYH4A34M8yfg4F1CwtYH2ENQebD9z21aH0vY3MREcBuftWaV9vfTtRd8A/tU6xeF+XwteIKg5jA0vHImeon0ZfS/4MrhPitxqK79FRc+VuY0lDkCvMP4u+kJbiNDnoe8Dw4YuQ14i55vJ/UXkGHgp46Pp/xybr8GbwGOrdSJmwhaUcdn8l2z8zGO9p/Rpx4Z2efs7cDKDdh2yAWxZsltyDjYdfm2NN9aHKIyZkzUmMPrE5zDKf8SGai+zY0vq7+jTGN/YDkBKBqkd+jr4NjqeB88OAYRdpY+iP9HExBfG1nkj06trwus2p0fFsTDfFHnXXHGyL6z2TEo6FmrMtKY10Y3Vm5I4T8rvNfS/6CAIvT+sn2L/iy8XwaEUpbm2VQOzI7NB8FYLw0/56KumUvvLGdpaUDjvrBYnE1OukZ6MB0b6mpiwBueRrXxkt9Gak2FgTkq1hedEdDhldlJZVdPUBv2XhiCKly0bZ9wK18OSltxO8OPGllxO0pTiammv7KyEEe0vtmw+HWFW7BD9Efwc7aEoHTbHE8n/IoLbhxywayGtLQ07Ky3/X9oFPkA6gkMbCJTLs3adRDm3a+EZ8F3u+NaTjqkB8x/rfcgb9Hbng9DaIrOpsTtmJfhDn39xFU93iDu8nnKlOZf/SkCOhc1YfUz7X3M6NHP8khpjb06ib3umlL8HwDuR0+iLxC40TXOfVtviva30vUZ7wUjTbTtNR1wpreBE1uJop59dh7vM6i507pq6FL07d/K6g0w20r8N5Y8w1rQ7JHM5iVb4qeKsUOEKqJd8OaYsy3vIOQyWoX9l0jVwlq+uBL5SBjDAlT91mF5OIvwnsqtYWCJLEM4IPW6va/R96/rMOgztlf84720BH+HzvU0BFL4H/yEeDKLy+1+AAQBejrMi7Sj/5QAAAABJRU5ErkJggg=="-->

<!--             alt=""> <span-->
<!--            data-v-08c28d8f="">防骗指南</span></p></li>-->
      </ul>

<!--          <div class="left">-->
<!--            <van-sidebar @change="onChange" v-model="activeKey">-->
<!--              <van-sidebar-item :title="$t('全部')" />-->
<!--              <van-sidebar-item v-for="(v,key) in lotteryitem" :key="key" :title="$t(v.name)" />-->
<!--            </van-sidebar>-->
<!--          </div>-->
<!--          <div class="right">-->
<!--            <van-pull-refresh :border="false" class="list-wrapper" v-model="isLoading" @refresh="onRefresh">-->
<!--              <van-grid :column-num="2">-->
<!--                <van-grid-item @click="toLottery(v.key,v.id)" v-for="(v,key) in gameitem" :key="key">-->
<!--                  <van-image class="game_item_img" :src="v.ico">-->
<!--                    <template v-slot:loading>-->
<!--                      <van-loading type="circular"/>-->
<!--                    </template>-->
<!--                  </van-image>-->
<!--                  <span>{{$t(v.name)}}</span>-->
<!--                  <span>{{v.desc}}</span>-->
<!--                </van-grid-item>-->
<!--              </van-grid>-->
<!--            </van-pull-refresh>-->
<!--          </div>-->

      <div class="gameContent">
        <div>
          <!-- <img src="../../assets/hz.png" alt=""> todo-->
        </div>
        <div style="display:flex;justify-content: space-between;align-items: center">
          <!-- <img src="../../assets/tc.png" todo alt="" style="width: 45%" @click="toLottery(gameitem[0].key,gameitem[0].id)"> -->
          <!-- <img src="../../assets/kj.png" todoalt="" style="width: 45%" @click="toLottery(gameitem[1].key,gameitem[1].id)"> -->
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import {Toast} from 'vant';

export default {
  data() {
    return {
      gameitem: [{}, {}, {}, {}],
      lotteryitem: [{}, {}, {}, {}],
      isLoading: false,
      activeKey: 0,
    };
  },
  methods: {
    info(){
      this.$toast({
        message: '联系专属客服接待',
        icon: 'like-o',
      });
    },
    onRefresh() {
      setTimeout(() => {
        Toast('刷新成功');
        this.isLoading = false;
      }, 500);
    },
    toLottery(key, id) {
      if (!localStorage.getItem('token')) {
        this.$router.push({path: '/Login'})
      } else {
        this.$router.push({path: '/Lottery?key=' + key + "&id=" + id})

      }
    },
    getGameItem() {
      this.$http({
        method: 'get',
        url: 'lottery_list'
      }).then(res => {
        this.gameitem = res.data;
      })
    },
    onChange(index) {
      this.$http({
        method: 'get',
        data: {class: index},
        url: 'lottery_list'
      }).then(res => {
        console.log(res.data,'this.gameitem')
        this.gameitem = res.data;
      })
    },
    getLotteryItem() {
      this.$http({
        method: 'get',
        url: 'lottery_class'
      }).then(res => {
        this.lotteryitem = res.data;
      })
    }
  },
  created() {
    this.getGameItem();//获取首页游戏列表
    this.getLotteryItem();
  }
};
</script>

<style lang='less' scoped>
ul {
  margin: 0px;
  padding: 0px;
}
.gameContent{
  background: #212121;
  padding: 20px;
}
.page {
  position: absolute !important;
  top: 0;
  left: 0;
  right: 0;
  background-color: #f2f2f5;
  color: #ddb285;
}

.nav-bar {
  background: #282828;
  color: #f3c7a2 !important;
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

.van-sidebar {
  width: 180px;
}

.van-sidebar-item--select::before {
  left: 10px;
  height: 44%;
  background-color: #ddb285;
  border-radius: 5px;
  width: 10px;
}

::v-deep .van-sidebar-item--select {
  color: #ddb285;
  font-size: 35px;
  text-align: center;

}

.van-sidebar-item {
  font-size: 35px;
  text-align: center;
  padding: 50px 0;
  background-color: #212121;
  color: #ddb285;
}

.van-sidebar-item--select, .van-sidebar-item--select:active {
  background-color: #212121;
}

.convention-item {
  height: 100%;
  background: #212121;
}

.convention-hall {
  display: flex;
  flex-direction: column;
  bottom: 20px;
  background: #f2f2f5;
}

.convention-item .left {
  height: 100%;
  background-color: #212121;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.convention-item .right {
  height: 100%;
  flex: 1;
  background-color: #212121;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.convention-item .right .list-wrapper {
  padding: 20px 20px;
  min-height: 800px;
}

.convention-item .right .list-wrapper .game_item_img {
  width: 200px;
  height: 200px;
}

.convention-item .right .list-wrapper span {
  margin-top: 10px;
  font-size: 30px;
  color: #ddb285;
}

.convention-item .right .list-wrapper span:last-child {
  margin-top: 10px;
  font-size: 24px;
  color: #ddb285;
}

.van-grid-item {
  padding: 10px;

}

::v-deep .van-grid-item__content--center {
  border-radius: 15px;
}

::v-deep .van-image__img {
  border-radius: 40px;
}

::v-deep .van-pull-refresh__track .van-pull-refresh__head * {
  color: #000000;
  font-size: 35px;
}

::v-deep .van-grid-item__content {
  background-color: #212121;
}

::v-deep [class*=van-hairline]::after {
  border: none;
}

.girl-ul li{
  font-size: 12px;
  color: #fff;
  padding: 10px 0;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.girl-ul li div{
  width: 76%;
  display: flex;
  flex-direction: row-reverse;
  margin-right: 10px;
}
.girl-ul li .girl-title{
  width: 33%;
  padding-left: 20px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -ms-flex-align: center;
  align-items: center;
}
.girl-ul li .girl-title img{
  height: 48px;
  vertical-align: middle;
}
.cube-scroll-list-wrapper span{
  color: #fff;
}
.fuli-lot .girl-ul li .girl-cont {
  width: 76%;
  overflow: hidden;
}


.girl-ul li .girl-cont .data-box {
  float: left;
  text-align: right;
  height: 41px;
  position: relative;
}
.girl-ul li .girl-cont .data-box span {
  display: inline-block;
  color: #666666;
  margin-right: 40px;
  margin-top: 14px;
}
 .girl-ul li .girl-cont .data-box img {
  width: 45px;
  vertical-align: middle;
  margin-top: -30px;
  margin-right: -6px;
}
.girl-ul li .girl-cont .data-box .border {
  position: absolute;
  top: -7px;
  right: -11px;
  width:16px;
  height: 16px;
  border-radius: 50%;
  background-color: red;
}
::v-deep .van-icon{
  font-size: 36px;
  color: #666;
  margin-right: 10px;
}
</style>
