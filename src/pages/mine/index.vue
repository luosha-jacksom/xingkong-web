<template>
  <div class="mine page">
    <div class="page-bg" ></div>
    <div class="wrapper">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
         <div class="header">
<!--           <van-nav-bar class="nav-bar">-->
<!--             <template #right>-->
<!--               <van-icon name="setting-o" @click="showSetting()" color="#fff"/>-->
<!--             </template>-->
<!--           </van-nav-bar>-->
           <div class="user-wrapper" @click="doLogin()">
             <van-image round class="user_img" :src="this.userInfo.header_img">
               <template v-slot:loading>
                 <van-loading type="spinner"/>
               </template>
             </van-image>
             <div class="login-content">
               <p class="login-btn" >{{this.userInfo.username}}</p>
               <p style="margin-top: 10px;font-size:14px;"> 用户名: {{ this.$store.state.baseInfo.name }}传媒号：{{ this.userInfo.id }}</p>
             </div>
           </div>
         </div>
         <div class="content">

           <div style="margin-top: 15px">
             <van-cell @click="refresh()" >
               <template>
                 <div style="display: flex ;justify-content: space-between;">
                   <div style="color:#fff;font-size: 14px" class="icons">
                     <img data-v-42038ca9="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LmRhYmFjYmIsIDIwMjEvMDQvMTQtMDA6Mzk6NDQgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMi40IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjY2RUVDN0I4OTQ4MDExRUNBN0QwRkE2RDJCODUzQzNGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY2RUVDN0I5OTQ4MDExRUNBN0QwRkE2RDJCODUzQzNGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjZFRUM3QjY5NDgwMTFFQ0E3RDBGQTZEMkI4NTNDM0YiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjZFRUM3Qjc5NDgwMTFFQ0E3RDBGQTZEMkI4NTNDM0YiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5jgk47AAAE6UlEQVR42uyaaWwWRRjHt4oUCrRpKalyhsMDgbYRSIiCcoQaK6QG8RMECG3CEcFwiFQOBRKiYMKH4kHAD4gh0RgCVAQbCwUJIESOAKEQUmqrcoMgR9pX+vof+ycOm+nuzO7s24TwNL90d3Znd553nmfmeWY2KR6POw+TPOY8ZNLC8+rJ74L8QIvBW+AOuApughvgNviL59dBHTgNfjVudZ+xARUyl1TwgWGdCWBDQnoogH/9zV+8v0GdBpAPeoDVOhWSgvqQ0MeDVmA5+Bhks+weWOlTT2YX6Ay2gRJwBIzwqxdiUIh7AUOOF4N54Bj4HhSAH0GNT11BDGSAj6SyXPATeN+7bjQm18l1/jo56vvW/y0np4lrs8By+z7kb/sqyQ357gtgfDTDtncPJUcwjcDcnHHgUnOMcmmWlakAI5tz2L5nWaFhCZiHPOt+AXqDdM7+z4GeAduxlm15k5NzMn1pL/8npIeqQYF0/gS4wgaZyHrwNeumKSZqEUUU80cLF5zGzf5ioBhcBfU+994BFaAQTALnQZrivnZgOjgK+twvTWTo8xkR0hFkglbsvccZkP4O/uA9U8ApmtarYACo5YyRyzivA+gO9tHE//Sc3LwaffvQV6YKPc8GHAfXPO4TjV0Exkhl2awnSweaYx7PK8FLbQZOuJaIHpoLVkrntfQLkTbE6Ojt+Gu3VdTfBrq6yi6z5/aDQRx4PgQzo1aoBLztKutCdEXc+zmYprgmeqiKJvxLlD6UAr5lDGdDpjIWXKMY7bKp0PGoFBLmgQjb6Wd5ghXz2zlQ5io/TyIZ5YQS5XTaKAQpiDMc7EpE6JNNJ02JeL1jJ3gN7LC26iMUctEJ7AUpimsylWA22KS49g2YA2p9niHYDl5xl9vsoR849PpJPv1gFfgSTGa5OC7i8c/goKb59ebzQppcwwMKLaO56UgvqQGF4CkeF7kGFR0R89d2zkHWfKgbWGhgymVMByqkHpNlFDBZ9HuWk/a7tnxooYa9uykHLyrK80BpgOfNBV1t+FAqg0Q/qQEzwG88b88VU7eIcGgoV1GFdGak0V3jHXPAO2EVEmFHS42XfQq2atx32HV+jP7xiUbd8VTqnzAml6dpEqM5rJuaUhYo0Lw3AwwP20ODNB13MMN7d8q8gim2w0h5nCJFMFlwyVeERdoKdWSOoyttOWTL8oJ0/LLiuqkMDtNDOcw0deWMoof2SMeliuf1YnarK33DKPSkwYs2KszJLauILKmM2ocYTLSBFcoyUGh3QBO6yaRtiGNB/BQycVaxc3eX84wsp5ltCnmamWkdF0KS6KNFtkJ0P4VaGzxL7EaoVlWWUVkhC8DEKHMOn92HuI1N5bvScX3EOZTvUnC1hXfIa+AxC8+rDWNyJyw0INaEckHlUBiF9tFMWoZoQF0Tx0FlQ+D0ARrdAqWOwS6wgskgE3QBo0M+6yzYHGJQ+E/mO43bHEGlPyOIZAsLK4U2MtazzHNKQjQk3YKpLXCFUeYKSdvG4oOIDLDEaR55j1F72GWsB1gKkFI7W/iBhZMAxAcZw8AK3Q8vTJexxALjG07jZywi0RoInmE4I1LuNk7jXlCQeO4i03gxzxxgbFhpdWL1kCqyjueZ9JM0/k+XlLtPA6eAGFPoW07jIrz4L/Z7Ljnee0pakvToA8BHCiVW/hVgAA9d9t9nM2GFAAAAAElFTkSuQmCC" alt="">
                    <span>我的钱包</span>
                   </div>
                   <div style="display:flex;align-items: center;">
                     <img style="width: 20px;margin-right: 10px" data-v-42038ca9="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAIh0lEQVR4Xu2dXW7cNhDHScn2a32DJieobxD3BLFPkDVgCXmLfYLaJ4jzFkgGsj5BnROkOUGcE8S5QfIqIZrivx0Z2oU+ySElFRJgNOhKFDk/DoczIodaLdekJKAnVZuayrx+/frZr1+/fq/+pLU+JqJ/qv8vTdPPU29Ln/pNCkgURUdKqRda62dEhH8faa0P+zSkvIdBPSqlHpRSn9M0xX9nc40O5Pz8/KXW+gS9Xin1TFpyRPRDaw1tus+y7ON6vf4h/Q7J8kYBgmGoKIo3RLQaqgG2jSeiNRHd397efrQty8XzXoGcn58fa61faa1XLhozsEwMa1dJktwNfM7p7V6AsGH+wMOS0wYZFP5IRDdpmr4zeFb8EadAVqvV4cHBwV9KqQvxmgsXSEQPRHR5e3u7NXsTfk1ncc6AYHgKguCDC0Pd2Sq7G26yLLsey/iLA5mTVrRweyyK4mwMbREFwn4EbAV8iP/DdZMkyaXPhogBieP4hIgAY5Aj57OxJu+CbQnD8PT9+/eYlTm/RIBEUfRGa33jvLYjvQDOJRGd+hjCrIFEUQSt8OlX/FRK/TYGGyI6S9N07fLdxkBgvPf39986gvETMSmEPIqieNjb23tsGjLY69/EvYgIjucLlwKDp5+m6ZnJO6IoehGG4fe24c8ICMP4JGm8ieg74k1KKTTYOCDIdTtRSiE+9tJEcF3PDIXCEQp0XnScxyRJnje9YzAQBzDu2FM2htDUONaeK6XUqy4hD/29DxR+/1t0jmr5SZI0yn0wkCiKvghpxl2WZRc+HDD2jRAtwJ+Y/WmCwu97g1hZHWgxIEIG/CuivDbD0tDeXN7PgsJsUExjiOhdmqZPoaE4jl9B49um/yJAhGBcJ0lS22tMhWzyHBxYrTVmS3+YPF/zzGlRFPjuUtqJ1mKtgcRxjB6AsdD0wqzpeAytaKtwHMfoHAh+er2sgMADV0r9bVHjr1mWHfuwFSZ15CAoZnditqWrHsZAODaF6a1ROISIPud5fjJVGKXgeDYEKFJDmPyQJTC9vUuSxKcH39UxW39ng49vIc6hGGmIjREnoo9pmm7Nva2k5elh7oT3rr39wUAs7cakbUYXWx+aMhgIKm04A5k1jB1/xdnwZQQEleMYzFprvbVysKGXTXJq26URdb/vxJ5MipA36tXesr+/f6W1Riig8fIRmhaXzE6BTbEn6fcaa0i1Ih3aMqsZ1a6Au2JPkwSCSvEsZEtbEDbP8/xo6r5Gk1D7xJ4mC6Ss2I53e5okCZyqWV2u7USbMESGrAY1XyVJMqtv6Tw8Yb3YaH6SEyCzUodKZQ2n86LNXYBUxOnim8hQWguQGomxDcEExemiiDpYC5CWLhxFEQKgANPH+R2qDLX3L0A6xOjqm3vTaxcgPfu1y1Uq1SosQHoCKW/jD3NYqODEvixABgIpb+cF5AAjal8WIIZAKmCwGEJsTdcCxBJIGcc7ODgQWdO1ABEAUhbBG1jxjcjYvnQCwfdzXpyM/XXv5hq5FZR7Z1EDP95tldcKhKd638onsDkFjtJUtgl3SmbkG3gRIWxM73VdrUA4lP6ppl3YwnU5x9C6b0YVx7LXKkhTIJt2YeMMEV372M7lW5DS72P7gmly674UKyCVoWwdhuG1r82P0sLyWV5X4FIECGsLVngvhr8n3YbA5c8kSRqX5uoWG9L4Wk55dDG1xC095eT9th3D37ogxAhIZRibRH4Q7xI2eCEM/97e3lGXLbYCUqnXfRAEl4t9MSC184gUkLLYq8WxtIMiDQTT5MWxtGAiDqRSl9Ey6ljIY/RHXQJ5cizDMDxb7Es/1s6BVKoxamKwfuIY/y6fQBb70oO3VyBV+7IELuvpjAXkyb4AzNT2r/foyM5uGRVI2aogCJ4vRv8/aUwByCz3JSLU7qITjQkEmeGQWXpW2xnQi8tdykR0If1ldRQgyKCT5/nVHL/d8y6yb2V2C3zAk/SzvAJBqo0wDFcuVN2Zld0pOI5j5H3Z2uwjGS7yAgT7EJEjqyv07Euopu/BByetNVbo1F4S2uIayGztxK7E+ybisdUW10CwamV2RnsXhkkiHmhLnuenQ+2kUyDcW/6cs+NnAqMEivbnef58CBSnQFCxuUOxzIq0lY+xj+1yDmTOUGxgKKWMHF4vQCoq7DxVd59e2OceSxjGiXi8AmFBwDu/7iOUMe4RSixgnN1iDCCb5akmMxDXgITOP7GaWQ4BsvEpkINGIi8hL7Y7m8pibqHzT6yzIvUCUo098fYF5Gnvvfy+o2ePuqZLaIiC1ovkmWwF0hR74szQSIEnBQUN8r6YGwfRcNIAozS4lY5mNKOq66i1QPrEniwTZTYqjWswrBHYLoDhV+KoVzEYmw9U3Nu/sIQGxZ4YCnKoi2lKhdR9URRrqSNSyzN3eeuerUaU1RSFsQHCH1zQW35kWbYe4ubjWRfDV1V92NNHLl1sHPraNwxTOXkaR33j5B0pCM5gPAGxnU5y4yE00Q32bWFu/u1Ra705PY2IMPzg71DofJM2sTg7+2TwgS5NtfSRgNi24wg9bz21bauHGJDyJVEUYY9da0pZIcF4L8ZHKlxxIGyT8InTlbH3DkIpZRybGlpZJ0BQCYmMB0Mb4+J+30duOANSCsdkY70LwRqUOcgFMCi/9hHnQOaoLWOujvECpKItOMBYPP+UVO9EhEJrjd3FoyWG9gqkMhPznniyDRqDwFHdoy/IGAXIjsZgrZOTI1K7NAdDEx/16vTA4a56VH8fFUhZEQ7pYzjD+bXGeaj6NFzqzN0+7zK5ZxJAqhVnj38Tf8IJ0LaAGMADYmFBENxPfRnr5IDU9SrEyojoMAgCQELcCoFCnLxcvSB0bMnG74/4m+PS1VkAMVH9uT6zAJkYuQXIAmRiEphYdRYNWYBMTAITq86/zyDaoWjrej4AAAAASUVORK5CYII=" alt="" class="refresh">
                     <span style="color:#fff;font-size: 16px">{{this.userInfo.money}} </span>
                   </div>
                 </div>

               </template>
             </van-cell>
             <div style="margin-top: 15px">
               <van-cell is-link @click="toService()">
                 <template>
                   <div style="color:#fff;font-size: 14px" class="icons">
                     <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LmRhYmFjYmIsIDIwMjEvMDQvMTQtMDA6Mzk6NDQgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMi40IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkM0RjcxODkwOTQ3RjExRUNBN0QwRkE2RDJCODUzQzNGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkM0RjcxODkxOTQ3RjExRUNBN0QwRkE2RDJCODUzQzNGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QzRGNzE4OEU5NDdGMTFFQ0E3RDBGQTZEMkI4NTNDM0YiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzRGNzE4OEY5NDdGMTFFQ0E3RDBGQTZEMkI4NTNDM0YiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7T0wwkAAAFrElEQVR42uyaC2wVRRSGbwUsGgtWkGtRA1JtitCAUdOkxBdoTURRCaQUrBiiQaSGghZBUdQoIYAoIlqNig/kYZUiURSNCEqLtoqlWBGhBpWHBhsUpdA2cP2P/W8yDrPPu3tJGs7Nl92ZnZm9Z2fm7JwzmxKLxSLtSU6JtDNpdwp1PC6n/p1E2+wELgEDQD+QDk4HLeCg3AH8CL4F+xPWoN8IB4X8yw1gDLgKnOuifBPYCCrAq1Q4+B7yYSRuBg+Byz3Wk17LJzPAM2Ce15unOCvkuq0zQRkoMFz7E2wG34PfwSGQyuHXF+SA3kp56dG5YByYCD4LTCGo5KadK8EKcI6WvxIsB2s5X+zkCg7RQtCFeaLsOjAFPJ2sIXcLx70qH4MHwTce7v0FkeFaCh5Qrs0HvUBJ4grZl883KCPDZLGhbBY5G6SBI+AA+AnUgVaWawTTwGrwljIUJ4EO4N7EzLZ1D/XnUIrL32AIqNGG0WhwNci2ue9e1hMFyplXxXt8QEspUgx+AItczyl9iLXWLrOae/tAlOkW3nwH09eDx0Cuj2HfQOtWpuR9Aq7VHma98aU3sNB+pSAKGpgPokp6CNgBOoHXwEcg16KuE5ngBVAJcph3HdirlFllVd9x6SNlNHqBEiU9E2xkfh0Ya6jjhzywBYxgeqhy7UJwm6meC4WOewqzlHN5ao+DbgA3j2X77BUrZAqUg1tBLZitXJvH6x576P+/rqBQSRfwWM1rYf1WgiwwHbQwLwpG6iW99tAo5ak0AAy12FLQJ+CeMVHJ4wwl73anHnJ6sd6knJdyBV2YJE+gO5gO5hCRwZ79IUX7DiCP503gO7Ak4F6Qdg/bXJf5C+MTq2D6NPbco5zHrhUaB3aCdKZrwDDQP2CFxBxnxdrEqswEUKek5SHD0sbqQYabITcSh1e0bHHY8kIYVn+A3WAy3QeT3M9ViS5RLmBHOSn0pKFyl5DmySoeF4CpoKdFuTSL/Gvc9FD3JE36tZrfM4Wuh1d331Gho0lQZjM9XVVWcAhleGin1Y1ROBbSe+UfWqip4FLQbCjzstd2w4gpmCQe3dlK36eW7vgBh3qvg4eDDZIc86XQFlDJ41Yqc9BHO+JKbKMrfsKiPhIXWBrg/KoKWqEUjyGs1QEbjF88lD3VjUKpLhv7KgRlRP7yUPawG4UaXb5I14dk0o/4eDHbmu2ZLk1mtxDNu5reT1PfquVXg1I3Cr0JisFvSoN3GHyRQSEpdFRLbwJzQV+whnmfM4ZxyK2VW8QAusTIfmZgPb7mSleinOeDXwMecvpwf0Ix6Y08L/fjD4mfso0+SzxvosGjTaQ3BhjysjX3oobnaaCI5+s9RH1s/8AysE5Jj7co19uhnZ4MghQZrg1V5tIYJb+Yx510NgNb+gxjOLcHyAQ3gve1MmNBEV0CWTk0M7CfyejqBJbTfaxcho8jbLdJ+Z+PaEMwsJWCTMRB4GvQlc5gVCszm3Hwd21WyTnKH47LciVevkFb43UGe3juK6Zgh3T7QM6xHuAN7XozreAklo3n7wILWWe7VmcJh2oBWKzk3wNG83y499V2xPVabhefssSk7+TTvlsr8yzJ4I5dg6GdVFpV2aa5TNuSKVAC9bLdUu1jLefJxIozeBf3h+TGH4L3DOX22bTRmXMyXXPYJnOfSOQ5JZQV+mo7/l4ot4kJOK3dZilpefc9BYYzPUfbDEuKQuq+jy4SmDwDfEmLZyXn0fpNU+a27Lc+H9aGl1cRy/dppO1bhbiMBy8p6QtoxvPpV8VFLNx9Hrc4fW1JepEyTRmRF8FFoA+42LDLt4HLq4oT6bFayWCbwKEqEnNYA96OtH1dkpD43dZ3I9sj5o8xFjBospvxgz1Brmw7hjeF/tvFrtLyZP6UREKUMIfcJs4hedmeFWn7rqcs7AhmyskPAE8qlFz5V4ABAEdxwO+9QgRZAAAAAElFTkSuQmCC" alt="">
                     <span>我的客服</span>
                   </div>
                 </template>
               </van-cell>

<!--               <van-cell  is-link @click="doPay()" >-->
<!--                 <template>-->
<!--                   <div style="color:#fff;font-size: 14px" class="icons">-->
<!--                     <img data-v-42038ca9="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyVpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LjE2NDc1MywgMjAyMS8wMi8xNS0xMTo1MjoxMyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjMgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0ZDRUIyMTA5ODczMTFFQzkzRDVEMUZDRTE1NzVFRjUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0ZDRUIyMTE5ODczMTFFQzkzRDVEMUZDRTE1NzVFRjUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozRkNFQjIwRTk4NzMxMUVDOTNENUQxRkNFMTU3NUVGNSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozRkNFQjIwRjk4NzMxMUVDOTNENUQxRkNFMTU3NUVGNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Plmkh1MAAASvSURBVHja7JoLbE9XHMf/1aFVCypk5v3aGJV060gQwsiI1+hSLJVhiWAJMTXmEc8g8UoQiwTJRsdqiLGHxzYqyxRhNKK1VKYZsYhKEIuuvX/fw/cm198993/Ovee2If+TfPr/957Tc+/v/H7n9zi3SdFoNPIytTqRl6wlBEoIVMPtFVmHVVzgd85XQQfwJsgAHUFTUB9UgwegHJSCP/m93Jc2MnLUBfLRssB0MAY00vzbM2AbyAcPQ9GQhjvvBFaD7ADP0ZMsAvPBHlBVG3toNs0m25CWW4Od4Ch4rSY11AxsBjkh7e0B4CKYDH4wJJD0b8QmPwuahOywmoPDNOcvAgsEkWTCnKoBYZxtLj3jKuF8TZqc2G97QYsaDi1JYAU4D34yKdAukFmLMfMg6AFKfHk5IZCDT8H4mGtuHAXrQaXCWJsisBhUxxlXF+SDhvY1vxoSQXKO4ipuBwV05V8rjD8BRoF7YCZIjzP+bTAC7A5icuNBW0WBdoB/GEvuMkCmScYeYFZh7810xXts8RJIanIWBCJrHd/jkQZ+BNPAYTAYlLqMWwbGgrbgV/Chxj0ag08snyY3yWOFZa0RV7ELmMWU5hDoxzwtl9rJosml+XAQn9O8NQSyngg0NoBXmsG4NRIMoZAFdL2j6TUbBAi63cBlHQ01Y+IZpA0DR8AH1La9SHsCztsYdNUVqDmTRZX2Mxgq6XsdPHL8XsjaqFKSuf+leE9hwt+pF3hRSwhTT3Fyoc1eIFUS6UXB9ztoxZV1E0aUC501tNRb1yn005j8HXDao/84NSgcwX6DpYaWU+gcMddsH2vxe5KhbFxLQykhCBT6qaaXQJUhnC7VNaQdH6c+Ueu6xjwi3dkKkiX9ZTS3YrBAIlQ1T4omKt7zjq6GChnpVdoR1izx2lWw0qM/RUOgm7oClXHVkhUm/4iuW5YbXgBL6eUWemionYZVFOl6uds0JZVMO5UpjtfKCyFaguGGtkuhroZu4eNvjdLBq1mO4GnCbd93S3viOIUnHvZ70L+WSu5/eYR1jqnTG9TuW+y75Kd82ADWhu1qXRyH2G/fuPTNA315CFnlRyDxYwlvYMLkonFMroRl9n88bMzj7yKnvMbQ8BX4P0gJvpm1TVNDAVYmTAV4nyv/JZga059OLzmD2+Cu31OfCrBR4xTHjZ4gB4wDSZIxm0A5mA+mesyVAY6BVNdDPNlxUNmhNbGXfgEDQ9w7yayHSh3Zx7wYsxWFon2e/lnHEXM2KJucSx45ijbeMgRhivnAeTGZQL7LWFugCXRaqnvouUvifDmbtU1DwwJd4Od7jmtZ1FKlY4WdNVCmX6cQm26MpFAm389WuTxPHT/W4OehfmNwKzIoUC9+Ot8FnaFHdJLr6D9nQkN2K2VNL46mphgIvN24uOKVyTRHiT3ZEcMsHn/ZbZeWQIrBUtz8W7AuEvzNxHLWSiJwfhx5+tpmu2TsNZlAQfdBlCb4LkuIkz7nER7tIZ9H1GAnPMbe4z6+Y1pDsbXMbtKGx1Z9QHfQnlE+hZtfeMsbNNs/wBV+t8/uRAYwiKdEudS8nfqI+ffJsgTPwPqitsT/+iQESgiUEOiZ9liAAQCq/bG6EJDWWwAAAABJRU5ErkJggg==" alt="">-->
<!--                     <span>充值</span>-->

<!--                   </div>-->
<!--                 </template>-->
<!--               </van-cell>-->
               <van-cell  is-link  @click="doWithdrawal()"  >
                 <template>
                   <div style="color:#fff;font-size: 14px" class="icons">
                     <img data-v-42038ca9="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyVpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LjE2NDc1MywgMjAyMS8wMi8xNS0xMTo1MjoxMyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjMgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0ZDRUIyMTA5ODczMTFFQzkzRDVEMUZDRTE1NzVFRjUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0ZDRUIyMTE5ODczMTFFQzkzRDVEMUZDRTE1NzVFRjUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozRkNFQjIwRTk4NzMxMUVDOTNENUQxRkNFMTU3NUVGNSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozRkNFQjIwRjk4NzMxMUVDOTNENUQxRkNFMTU3NUVGNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Plmkh1MAAASvSURBVHja7JoLbE9XHMf/1aFVCypk5v3aGJV060gQwsiI1+hSLJVhiWAJMTXmEc8g8UoQiwTJRsdqiLGHxzYqyxRhNKK1VKYZsYhKEIuuvX/fw/cm198993/Ovee2If+TfPr/957Tc+/v/H7n9zi3SdFoNPIytTqRl6wlBEoIVMPtFVmHVVzgd85XQQfwJsgAHUFTUB9UgwegHJSCP/m93Jc2MnLUBfLRssB0MAY00vzbM2AbyAcPQ9GQhjvvBFaD7ADP0ZMsAvPBHlBVG3toNs0m25CWW4Od4Ch4rSY11AxsBjkh7e0B4CKYDH4wJJD0b8QmPwuahOywmoPDNOcvAgsEkWTCnKoBYZxtLj3jKuF8TZqc2G97QYsaDi1JYAU4D34yKdAukFmLMfMg6AFKfHk5IZCDT8H4mGtuHAXrQaXCWJsisBhUxxlXF+SDhvY1vxoSQXKO4ipuBwV05V8rjD8BRoF7YCZIjzP+bTAC7A5icuNBW0WBdoB/GEvuMkCmScYeYFZh7810xXts8RJIanIWBCJrHd/jkQZ+BNPAYTAYlLqMWwbGgrbgV/Chxj0ag08snyY3yWOFZa0RV7ELmMWU5hDoxzwtl9rJosml+XAQn9O8NQSyngg0NoBXmsG4NRIMoZAFdL2j6TUbBAi63cBlHQ01Y+IZpA0DR8AH1La9SHsCztsYdNUVqDmTRZX2Mxgq6XsdPHL8XsjaqFKSuf+leE9hwt+pF3hRSwhTT3Fyoc1eIFUS6UXB9ztoxZV1E0aUC501tNRb1yn005j8HXDao/84NSgcwX6DpYaWU+gcMddsH2vxe5KhbFxLQykhCBT6qaaXQJUhnC7VNaQdH6c+Ueu6xjwi3dkKkiX9ZTS3YrBAIlQ1T4omKt7zjq6GChnpVdoR1izx2lWw0qM/RUOgm7oClXHVkhUm/4iuW5YbXgBL6eUWemionYZVFOl6uds0JZVMO5UpjtfKCyFaguGGtkuhroZu4eNvjdLBq1mO4GnCbd93S3viOIUnHvZ70L+WSu5/eYR1jqnTG9TuW+y75Kd82ADWhu1qXRyH2G/fuPTNA315CFnlRyDxYwlvYMLkonFMroRl9n88bMzj7yKnvMbQ8BX4P0gJvpm1TVNDAVYmTAV4nyv/JZga059OLzmD2+Cu31OfCrBR4xTHjZ4gB4wDSZIxm0A5mA+mesyVAY6BVNdDPNlxUNmhNbGXfgEDQ9w7yayHSh3Zx7wYsxWFon2e/lnHEXM2KJucSx45ijbeMgRhivnAeTGZQL7LWFugCXRaqnvouUvifDmbtU1DwwJd4Od7jmtZ1FKlY4WdNVCmX6cQm26MpFAm389WuTxPHT/W4OehfmNwKzIoUC9+Ot8FnaFHdJLr6D9nQkN2K2VNL46mphgIvN24uOKVyTRHiT3ZEcMsHn/ZbZeWQIrBUtz8W7AuEvzNxHLWSiJwfhx5+tpmu2TsNZlAQfdBlCb4LkuIkz7nER7tIZ9H1GAnPMbe4z6+Y1pDsbXMbtKGx1Z9QHfQnlE+hZtfeMsbNNs/wBV+t8/uRAYwiKdEudS8nfqI+ffJsgTPwPqitsT/+iQESgiUEOiZ9liAAQCq/bG6EJDWWwAAAABJRU5ErkJggg==" alt="">
                     <span>在线兑换</span>
                   </div>
                 </template>
               </van-cell>
               <van-cell  is-link  @click="$router.push('/WithdrawRecord')"  >
                 <template>
                   <div style="color:#fff;font-size: 14px" class="icons">
                     <img data-v-42038ca9="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyVpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LjE2NDc1MywgMjAyMS8wMi8xNS0xMTo1MjoxMyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjMgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDJBNkQzNEI5ODczMTFFQzkzRDVEMUZDRTE1NzVFRjUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDJBNkQzNEM5ODczMTFFQzkzRDVEMUZDRTE1NzVFRjUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0MkE2RDM0OTk4NzMxMUVDOTNENUQxRkNFMTU3NUVGNSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0MkE2RDM0QTk4NzMxMUVDOTNENUQxRkNFMTU3NUVGNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PlAb+fEAAANrSURBVHja7JpLaBNRFIYniYlJ+oDWV31UaLW0KoLWN5QuFOnKIgVFkUIRQcGVuJAu7LJYQe2iouBGLWLblQ/ELgQRRdAaxAeitipChSpqpHk0adLE/+opXC9zMzGT6XTCHPg4pzcnMzlz7jlz70wd6XRaKSRxKgUmdkB2QHZAdkD/yBwth9SrgUwf7wC9IAh2gY8qPjXgNigF+8EDFR8/uAHWg5PgojQDa/fqyxC7T0lwgutgMVgNzkn8zoBa8rsq8WkHO8F8cAGskJ3XyCk3FxQJV1lNPJztlfgsF/6uNGzK0VXZQidxsCFwCyRAhAtkgptiG8ETmoIx7nBRLng2RT+AZyAknDZIupkuHJPv4H4+AjoEdUkYrgBfgVsl261UByfAaeDifKb9l4E+qq1mwYdJmPRNYbwbHNNZQ8pxliSBGOkSbqyc9E/S46TLOJ9i0nHSX0h7hONPfx4Wxlt01xAyFFIpzu2ku7ixs6SrSNeR7uF8ukk3kq4hzRpKhOw7YJQahF84b1Dr9zq0OkcscO0x1DZheASsAkmafiGqp3XgETWLcaq9t9SyWd2MUU28AdV0rDZwhZuKo2QPgibhvM+9Gw7UG9G2V4KXYDcYA5PgCHgKisinFARYDYIw+bWAF6CaO9Zl0AHmUWYawCBoyqVta2YoOtSrliFeEkJz0OMXzdD+/2TIv6m1XmeXS2m5uLO8RWTj5zd86WO1Ha32Wq7QAiq4DKVTMxZQHHwCdQZnKDUTwYRp68Dub+2g0+o19JqCUWh/1Wn1Kefg7DKrNQW2RPoFlkpWLC4rte13oBH8AOfBYRPadl6bwj3wjewecwLKbw3xS5sFVruxDrMZC2olteI0JaAca2gIbM6wr7Hc0qePs+/OsoByagr8o6tiqy1OR+hHV0iO67RSQP1gH/CBAD1nMFX0PApm9JOeoMfCitEYnaFyzvZaZIOXdYZdFgkoY0RJYYOmZicldkJiT5oZUISzfZK2Hc/iuyWcHTW0KWgIe3BeSbvNNm6cLTrZW4gqcJAbZ28cGsAS0MWNrwF7wCJwyswMbQWfhQ2aQkG+V/FfCB6CKaHm2IUdoOnmMTpDvv/YbWYrrixWGGrizkdAU8rskRLdUw5yVPn7xs5ncjDswnZoPpyw/3nJDsgOyA7IDshK8luAAQBPqNvomG+ScwAAAABJRU5ErkJggg==" alt="">
                     <span>兑换记录</span>
                   </div>
                 </template>
               </van-cell>

               <van-cell  is-link  @click="$router.push({path:'/Personalreport'});"  >
                 <template>
                   <div style="color:#fff;font-size: 14px" class="icons">
                     <img data-v-42038ca9="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyVpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LjE2NDc1MywgMjAyMS8wMi8xNS0xMTo1MjoxMyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjMgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDJBNkQzNDc5ODczMTFFQzkzRDVEMUZDRTE1NzVFRjUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDJBNkQzNDg5ODczMTFFQzkzRDVEMUZDRTE1NzVFRjUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0MkE2RDM0NTk4NzMxMUVDOTNENUQxRkNFMTU3NUVGNSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0MkE2RDM0Njk4NzMxMUVDOTNENUQxRkNFMTU3NUVGNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgYeaPUAAAKxSURBVHjaYvz//z/DcAJMDMMMjHpo1EOjHhr1EApgwSf57/IqEGUHxDlALAzEf4CYXuU8I9R9b4F4AhAfg8eCbhh5HgLWUVpA6uAgCPhQINYA4puUJrmIQZSaQihOcsAYGkx5jJkaHvo9iDz0mwoeGmal3FBsuI56CA28JTazoldxQCw0mDx0G4j9gPgpmR76C8SyQLwZiJXo6KF/uKQeAPENCu2+BsSP6OwhnDHkCsRLoDFFLlAHYgf6tuXw56Ho0VJuwD30b9gV2/+GWX8If5JbAG3OEyq2QUU0qBsSO5iT3C4gTiTRLhkgdhyshYIKEOsD8X1CZkB7ucrUrm+oneRAjrsAxJ+ITHJ8Q6VQ4KNjfv9HyzxEK3AdiM8C8R1oUpUHYj0gNofmwSFTsW4F4h4gPoBD3p4BMgpE02KbWiANiGejiXEAMSsQf4byD1IpD9HcQ95AvA3K5gHibGi3RAXqtmdAvAOIZxHbEB7IlkIpkmdsgHgFEEujqQF1AnWAuIgBMtg5fbDG0E1ongEBXSA+jCYPyksvGBDjgqDhtGnQkm4mPoOZCHmIRrgVib0Ji3w7EEdiEZ8BxHKDLYZ+AfEmKDsAiBWwqAGNo0vi0F8OzWuDxkOguuYjlB2Ip3WBK/W4URBDNMk/z5DY8jjUCEEHYBShFSwDNM+F44m5AYshZDtxDe8WQD11F6lClUCKvUHlIeRWN2jkyAXHAEorDv33yC7laASUkZLaYjL0r6Ck2GalUbEdA6VPAfEOEvR9AOJJlMTQXxq2EmB2h0LzCjHAHYi/U+Kh5TTyED8QnwJiLiD+AsSGQLwOj3pQl8IEqof8pg8001oAcT601PlDRU+Bil8zaDMH1KoOBmJLaGWrDcRsDJAh5x0EPIsCGEcXL416aNRDox4a9dBQAgABBgCNpqddKfOcMwAAAABJRU5ErkJggg==" alt="">
                     <span>个人报表</span>
                   </div>
                 </template>
               </van-cell>
               <van-cell  is-link  @click="exit()"  >
                 <template>
                   <div style="color:#fff;font-size: 14px" class="icons">
                     <img data-v-42038ca9="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyVpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LjE2NDc1MywgMjAyMS8wMi8xNS0xMTo1MjoxMyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjMgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDJBNkQzNDc5ODczMTFFQzkzRDVEMUZDRTE1NzVFRjUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDJBNkQzNDg5ODczMTFFQzkzRDVEMUZDRTE1NzVFRjUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0MkE2RDM0NTk4NzMxMUVDOTNENUQxRkNFMTU3NUVGNSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0MkE2RDM0Njk4NzMxMUVDOTNENUQxRkNFMTU3NUVGNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgYeaPUAAAKxSURBVHjaYvz//z/DcAJMDMMMjHpo1EOjHhr1EApgwSf57/IqEGUHxDlALAzEf4CYXuU8I9R9b4F4AhAfg8eCbhh5HgLWUVpA6uAgCPhQINYA4puUJrmIQZSaQihOcsAYGkx5jJkaHvo9iDz0mwoeGmal3FBsuI56CA28JTazoldxQCw0mDx0G4j9gPgpmR76C8SyQLwZiJXo6KF/uKQeAPENCu2+BsSP6OwhnDHkCsRLoDFFLlAHYgf6tuXw56Ho0VJuwD30b9gV2/+GWX8If5JbAG3OEyq2QUU0qBsSO5iT3C4gTiTRLhkgdhyshYIKEOsD8X1CZkB7ucrUrm+oneRAjrsAxJ+ITHJ8Q6VQ4KNjfv9HyzxEK3AdiM8C8R1oUpUHYj0gNofmwSFTsW4F4h4gPoBD3p4BMgpE02KbWiANiGejiXEAMSsQf4byD1IpD9HcQ95AvA3K5gHibGi3RAXqtmdAvAOIZxHbEB7IlkIpkmdsgHgFEEujqQF1AnWAuIgBMtg5fbDG0E1ongEBXSA+jCYPyksvGBDjgqDhtGnQkm4mPoOZCHmIRrgVib0Ji3w7EEdiEZ8BxHKDLYZ+AfEmKDsAiBWwqAGNo0vi0F8OzWuDxkOguuYjlB2Ip3WBK/W4URBDNMk/z5DY8jjUCEEHYBShFSwDNM+F44m5AYshZDtxDe8WQD11F6lClUCKvUHlIeRWN2jkyAXHAEorDv33yC7laASUkZLaYjL0r6Ck2GalUbEdA6VPAfEOEvR9AOJJlMTQXxq2EmB2h0LzCjHAHYi/U+Kh5TTyED8QnwJiLiD+AsSGQLwOj3pQl8IEqof8pg8001oAcT601PlDRU+Bil8zaDMH1KoOBmJLaGWrDcRsDJAh5x0EPIsCGEcXL416aNRDox4a9dBQAgABBgCNpqddKfOcMwAAAABJRU5ErkJggg==" alt="">
                     <span>账户明细</span>
                   </div>
                 </template>
               </van-cell>

             </div>

           </div>

           <div style="margin-top: 15px">
             <van-cell is-link  @click="$router.push({path:'/GameRecord'});"  >
               <template>
                 <div style="color:#fff;font-size: 14px" class="icons">
                   <img data-v-42038ca9="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyVpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LjE2NDc1MywgMjAyMS8wMi8xNS0xMTo1MjoxMyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjMgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDJBNkQzNDc5ODczMTFFQzkzRDVEMUZDRTE1NzVFRjUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDJBNkQzNDg5ODczMTFFQzkzRDVEMUZDRTE1NzVFRjUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0MkE2RDM0NTk4NzMxMUVDOTNENUQxRkNFMTU3NUVGNSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0MkE2RDM0Njk4NzMxMUVDOTNENUQxRkNFMTU3NUVGNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgYeaPUAAAKxSURBVHjaYvz//z/DcAJMDMMMjHpo1EOjHhr1EApgwSf57/IqEGUHxDlALAzEf4CYXuU8I9R9b4F4AhAfg8eCbhh5HgLWUVpA6uAgCPhQINYA4puUJrmIQZSaQihOcsAYGkx5jJkaHvo9iDz0mwoeGmal3FBsuI56CA28JTazoldxQCw0mDx0G4j9gPgpmR76C8SyQLwZiJXo6KF/uKQeAPENCu2+BsSP6OwhnDHkCsRLoDFFLlAHYgf6tuXw56Ho0VJuwD30b9gV2/+GWX8If5JbAG3OEyq2QUU0qBsSO5iT3C4gTiTRLhkgdhyshYIKEOsD8X1CZkB7ucrUrm+oneRAjrsAxJ+ITHJ8Q6VQ4KNjfv9HyzxEK3AdiM8C8R1oUpUHYj0gNofmwSFTsW4F4h4gPoBD3p4BMgpE02KbWiANiGejiXEAMSsQf4byD1IpD9HcQ95AvA3K5gHibGi3RAXqtmdAvAOIZxHbEB7IlkIpkmdsgHgFEEujqQF1AnWAuIgBMtg5fbDG0E1ongEBXSA+jCYPyksvGBDjgqDhtGnQkm4mPoOZCHmIRrgVib0Ji3w7EEdiEZ8BxHKDLYZ+AfEmKDsAiBWwqAGNo0vi0F8OzWuDxkOguuYjlB2Ip3WBK/W4URBDNMk/z5DY8jjUCEEHYBShFSwDNM+F44m5AYshZDtxDe8WQD11F6lClUCKvUHlIeRWN2jkyAXHAEorDv33yC7laASUkZLaYjL0r6Ck2GalUbEdA6VPAfEOEvR9AOJJlMTQXxq2EmB2h0LzCjHAHYi/U+Kh5TTyED8QnwJiLiD+AsSGQLwOj3pQl8IEqof8pg8001oAcT601PlDRU+Bil8zaDMH1KoOBmJLaGWrDcRsDJAh5x0EPIsCGEcXL416aNRDox4a9dBQAgABBgCNpqddKfOcMwAAAABJRU5ErkJggg==" alt="">
                   <span>打赏记录</span>
                 </div>
               </template>
             </van-cell>

             <van-cell  is-link  @click="toNotice()"  >
               <template>
                 <div style="color:#fff;font-size: 14px" class="icons">
                   <img data-v-42038ca9="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LmRhYmFjYmIsIDIwMjEvMDQvMTQtMDA6Mzk6NDQgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMi40IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjBFRTRBMzUxOTQ4MDExRUNBN0QwRkE2RDJCODUzQzNGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjBFRTRBMzUyOTQ4MDExRUNBN0QwRkE2RDJCODUzQzNGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MEVFNEEzNEY5NDgwMTFFQ0E3RDBGQTZEMkI4NTNDM0YiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MEVFNEEzNTA5NDgwMTFFQ0E3RDBGQTZEMkI4NTNDM0YiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz475uq4AAAEi0lEQVR42uyaZ2gVQRDHX4pJxEoiasSKioZEjfWLDRXEHoJGg35RFFH8YOwoGisasaFiwwIWjA0bCGqChlixdyOxIipqNFEsUSHP/8A8Wc+9u7323iM48OP27t3tZXZndmfmEuH3+32VSSJ9lUwqnULR/1y5f8hOP+1Ae9AcJIJ4UB18ACWgCNwEF13XIHmYiULq0gYMB0NBkuIzT8AesAs89WKGIrSLgv/eQbNnOoG5IM3Be+mlG0E2+OhIgZQMYx8iBQ1YDa6CNJP7zKCBnASKwXAnfdldFFqB22CKyxZCvrYfrPZsUZBo3RmcBzEeLk40UPXAKA8U+uu0CbgEooKw4o4E75xaQaTcX/9QCKI017wkC4yx9oy6ye0AjUOwN9J7T4HXbvpQChgTwg1/GxjgpkKrQhzB9OdBveeGQk1x6BsGYdk0O1Yi2Vh9mTRJYUA6iOJ2pN59KjPUNUwC51oc9N4AsWw1x2zMkL+FSbixD6wEn3V+fwFWgBMGfewFq8Ank3cl8/E7WAvOmIU+shmqazAAs0EOtzeA6xy+BKSI04hyPt8Kxmn6WAAWcnsNz4DeOxuKiQ2vfPPAYiszVNUkOA20n4OTktkrF85zJH0sEdqvZKMuUE1of+HjItBdOTjFTd8MXjBQc95Fc95Lc54h6SNdc97R4H2lQjtGaB/miF3J5CjLTNCZ0d1gBigFE0ALze89QS47bzOwVKePBuA9m2NLAxN/I7TjhHYdMBMsN03wyi5sz8ehT5isdN3ABW4/BK2F32jg69TuOtbU5O44TN7cgnzxJrcTJKsvXeuv4kP5YaJQoeDP5KvRknuGqfhQHg6fQc0Qm1uuJraTSYqpQhX+il84bGanC5XQgO4Vzkfo3JeoGm0vC7FC08FPbg8y2HjjVRUqA3N0ll2v5RFHGAHJMSmHKWesy7iQmBpkhQYKbSqaJJuYpqWqTy/w2GCjdVsGc3WVpAan40byzKpCZHodQb4kKvAiSz0pnJ9VKJ1ds1OXewGmguMeKUKjnAmuCNeO8ECayVE7CkmdzyVZz6tpubDRnwD9FJ6lGl6BXYXiXFTiDc/2es5xApLKgWuKYj/ZdkvBKkIflT6yn9GeUZUHgfaS77wUP+ARPQd+CM/G8haRbdFMt3ih0HXOYvMkv1UBvwyerQ1Gs382sjiAaVbrcmZC+dB8Nhs9kSlDBfkevKKls1JWZTK4a7dY/ydvEtobfH9/qCLzGsJO+o0XkDi+Hs+JHs1AB67ixDrwP6pHrLNTOdUKZYi3wERwWRvP8h/rdeyXBdbaLQVr5TDYpNMHOfgsVngn+46bUsbmWWCzcipNtt4qJGS5VEYGh1xO9F6CAgefJB1933kNMgA2Rv9pl74ZxTj8PuSKmZxiWvKK1o2j5vqaHKaEqz9JbtmnWxurnhQzgZWpGi8wdPwK3nLY05arqL2dvjDY/xrzlYPdB3wMxHB3uHQ2nhcB9xQKcaVnK5erdgjXKqz8n4LXJmdHqIBI1cMDnOAl8cBXhKPJWV1YqFJKn/lrqT4U8f8fAP8rFFz5LcAAt5T3PktXM2EAAAAASUVORK5CYII=" alt="">
                   <span>我的消息</span>
                 </div>
               </template>
             </van-cell>
            <van-cell  is-link  @click="$router.push({path:'/Setbank'});"  >
              <template>
                <div style="color:#fff;font-size: 14px" class="icons">
                  <img data-v-42038ca9="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyVpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LjE2NDc1MywgMjAyMS8wMi8xNS0xMTo1MjoxMyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjMgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDJBNkQzNDc5ODczMTFFQzkzRDVEMUZDRTE1NzVFRjUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDJBNkQzNDg5ODczMTFFQzkzRDVEMUZDRTE1NzVFRjUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0MkE2RDM0NTk4NzMxMUVDOTNENUQxRkNFMTU3NUVGNSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0MkE2RDM0Njk4NzMxMUVDOTNENUQxRkNFMTU3NUVGNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgYeaPUAAAKxSURBVHjaYvz//z/DcAJMDMMMjHpo1EOjHhr1EApgwSf57/IqEGUHxDlALAzEf4CYXuU8I9R9b4F4AhAfg8eCbhh5HgLWUVpA6uAgCPhQINYA4puUJrmIQZSaQihOcsAYGkx5jJkaHvo9iDz0mwoeGmal3FBsuI56CA28JTazoldxQCw0mDx0G4j9gPgpmR76C8SyQLwZiJXo6KF/uKQeAPENCu2+BsSP6OwhnDHkCsRLoDFFLlAHYgf6tuXw56Ho0VJuwD30b9gV2/+GWX8If5JbAG3OEyq2QUU0qBsSO5iT3C4gTiTRLhkgdhyshYIKEOsD8X1CZkB7ucrUrm+oneRAjrsAxJ+ITHJ8Q6VQ4KNjfv9HyzxEK3AdiM8C8R1oUpUHYj0gNofmwSFTsW4F4h4gPoBD3p4BMgpE02KbWiANiGejiXEAMSsQf4byD1IpD9HcQ95AvA3K5gHibGi3RAXqtmdAvAOIZxHbEB7IlkIpkmdsgHgFEEujqQF1AnWAuIgBMtg5fbDG0E1ongEBXSA+jCYPyksvGBDjgqDhtGnQkm4mPoOZCHmIRrgVib0Ji3w7EEdiEZ8BxHKDLYZ+AfEmKDsAiBWwqAGNo0vi0F8OzWuDxkOguuYjlB2Ip3WBK/W4URBDNMk/z5DY8jjUCEEHYBShFSwDNM+F44m5AYshZDtxDe8WQD11F6lClUCKvUHlIeRWN2jkyAXHAEorDv33yC7laASUkZLaYjL0r6Ck2GalUbEdA6VPAfEOEvR9AOJJlMTQXxq2EmB2h0LzCjHAHYi/U+Kh5TTyED8QnwJiLiD+AsSGQLwOj3pQl8IEqof8pg8001oAcT601PlDRU+Bil8zaDMH1KoOBmJLaGWrDcRsDJAh5x0EPIsCGEcXL416aNRDox4a9dBQAgABBgCNpqddKfOcMwAAAABJRU5ErkJggg==" alt="">
                  <span>银行卡管理</span>
                </div>
              </template>
            </van-cell>
             <van-cell  is-link  @click="$router.push({path:'/Setting'});"  >
               <template>
                 <div style="color:#fff;font-size: 14px" class="icons">
                   <img data-v-42038ca9="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LmRhYmFjYmIsIDIwMjEvMDQvMTQtMDA6Mzk6NDQgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMi40IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjBFRTRBMzREOTQ4MDExRUNBN0QwRkE2RDJCODUzQzNGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjBFRTRBMzRFOTQ4MDExRUNBN0QwRkE2RDJCODUzQzNGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MEVFNEEzNEI5NDgwMTFFQ0E3RDBGQTZEMkI4NTNDM0YiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MEVFNEEzNEM5NDgwMTFFQ0E3RDBGQTZEMkI4NTNDM0YiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7kVDM6AAAD40lEQVR42uyaW0hUQRjHz3Z5qNCMRM0KQrqplQWlCUr3IkvBLLtBBILZ1V6ql+qll+gClklFET5kFwkDi7YLRlaQl+6bRRRkhWb3G6YV7ek/+QW7W2fOOTNnzynZb/mx7NkzM+e/M/PNN9+sS1VVpTNZF6WTWUjQv27d/D41nBCtpztYAvqDx+CIgTIDQA4IA/XgnLCKxLkagsRsEdgI4n2urQG54JlGmTywA0T4XDsJNoN7lg055vBMkAlqQRmID/guBdwBk/9Sbis4CCICrmcDDygCkWaehTOHVCOkAwwPtRIkc+7Dr69WgVIwDcwHHrBBp/5CgGGrrjf4PH4KXL7rkNdTrtej+WC/jXP8NpgEPnCH2chcIS830GYxzEaDM8JeTidqyHDIE6eCUeCu1YK+Obi89AhGD7nBd1pz7LRmcEtQEPfeFlANptosqNrM6DDTQ8weOiDoo7hTUHQFJTkwf9KD5eXGgDQHBCVSGFVupaB4cgpO2XFaM4+ZE+T1EzQBRIKJYDnoKvFALfQeI1HHUbAWXAJN4CLbHxjpobFUeLDkr8ocSBE4D577RBuz6MHiBOpMIXwXe7dmLPe5pvT3rxktKaaYthC8KL8EFEi28wX0DRu/tF2rh9ItEHNAR8yvOJiGMXtfIdFWT4BIXjmlIcibbMGqnm/i/pUgi3avopbEEaTGSQraIlBmO9gl0eYgTafgVdVIiYp/gAqBcm5JQRE8LxcuUfFL8Eqg3CPwhpYIEQvnrUOu/zBz1cbroU8SFTPvGCXQS0MkeofZa56gdxIVs0hiDthnstxMyR5q4jmFRsnKNwkIWifZZiOvh+olK4+lRMoyg/eXSK5BzGo5grxVNAeiJBpgC+tXm0KfGnBfLzjNorWhj0RDq8H0IASngWKyjUTbtRRps83ccNo+iEzcYWCvhduHJ2Cn0pF8bKbPhvdDzNtVEtvAYnBY4mFiJHvDA1ic2W7VjrWMhmCxAwsnS53NMCLGbE5hj9JxbBJtsyA2Sl4EI0nC7KrScUhlpzUEK+tjxVyQjqb1zP/Ai/+KBamqYvtrHujFu4PTQ1zxaYozh8z9KHFTbfWQa3Nwi9AajDl0wYKwSMSegpvBENROebDLlG0xY+8FQym2wGdSdsi8UzBgN8BQxfjRJBumqyiGS1AMpHJ9bDe15RH3cughAzSBAjAOnObcVwcSQAloBQ/AQpCnU38FGAEKwVsjz6TdQ+b+qHAdZIIMUBfwXSlIUdiG8c9yh6hMc8D1K2AKyAENiuAfFQLOh4TMTcym3ADLaV8zUIYdBC8AvWnSn7XCg7hC/5cLCQoJkrKfAgwAQNfjOk/cspEAAAAASUVORK5CYII=" alt="">
                   <span>设置</span>
                 </div>
               </template>
             </van-cell>
           </div>

<!--            <div class="finance">-->
<!--            <div class="finance-item"  @click="doPay()">-->
<!--              <van-icon class="icon" style="" name="peer-pay" />-->


<!--              <span class="text">{{ $t('充值') }}</span>-->
<!--            </div>-->
<!--            <div class="line"></div>-->
<!--            <div class="finance-item"  @click="doWithdrawal()">-->
<!--              <van-icon class="icon" name="idcard" />-->
<!--              <span class="text">{{ $t('提现') }}</span>-->
<!--            </div>-->
<!--          </div>-->
<!--            <div v-if="this.userInfo.money" class="wallet">-->
<!--                <div class="part-1 van-hairline&#45;&#45;bottom">-->
<!--                  <p class="flex-1 font-28 font-primary-color">{{ $t('我的钱包') }}</p>-->
<!--                  <span class="font-28 font-gray">{{ $t('详情') }}</span>-->
<!--                  <van-icon class="font-gray" style="font-size: 28px" name="arrow" />-->
<!--                </div>-->
<!--                <div class="part-2">-->
<!--                  <p class="balance van-ellipsis">{{this.userInfo.money}}</p>-->
<!--                  <span class="font-28 font-gray">{{ $t('余额(元)') }}</span>-->
<!--                  <div class="refresh-btn" @click="refresh()"><van-icon name="replay" /></div>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div :style="{ marginTop: menu_top +'px'}" class="menu" >-->
<!--              <div class="menu-item" @click="$router.push({path:'/Personalreport'});">-->
<!--                <van-image class="menu-item-icon" src="img/mine/baobiao.svg">-->
<!--                  <template v-slot:loading>-->
<!--                    <van-loading type="spinner"/>-->
<!--                  </template>-->
<!--                </van-image>-->
<!--                <span class="menu-item-label" >{{ $t('个人报表') }}</span>-->
<!--              </div>-->
<!--              <div class="menu-item" @click="exit()">-->
<!--                <van-image class="menu-item-icon" src="img/mine/mingxi.svg">-->
<!--                  <template v-slot:loading>-->
<!--                    <van-loading type="spinner"/>-->
<!--                  </template>-->
<!--                </van-image>-->
<!--                <span class="menu-item-label" >{{ $t('账户明细') }}</span>-->
<!--              </div>-->
<!--              <div class="menu-item" @click="$router.push({path:'/GameRecord'});">-->
<!--                <van-image class="menu-item-icon" src="img/mine/youxi.svg">-->
<!--                  <template v-slot:loading>-->
<!--                    <van-loading type="spinner"/>-->
<!--                  </template>-->
<!--                </van-image>-->
<!--                <span class="menu-item-label" >{{ $t('任务记录') }}</span>-->
<!--              </div>-->
<!--              <div class="menu-item" @click="$router.push({path:'/Infomation'});">-->
<!--                <van-image class="menu-item-icon" src="img/mine/user.svg">-->
<!--                  <template v-slot:loading>-->
<!--                    <van-loading type="spinner"/>-->
<!--                  </template>-->
<!--                </van-image>-->
<!--                <span class="menu-item-label" >{{ $t('个人中心') }}</span>-->
<!--              </div>-->
<!--              <div class="menu-item" @click="toNotice()">-->
<!--                <van-image class="menu-item-icon" src="img/mine/gonggao.svg">-->
<!--                  <template v-slot:loading>-->
<!--                    <van-loading type="spinner"/>-->
<!--                  </template>-->
<!--                </van-image>-->
<!--                <span class="menu-item-label" >{{ $t('信息公告') }}</span>-->
<!--              </div>-->
<!--              <div class="menu-item" @click="toService()">-->
<!--                <van-image class="menu-item-icon" src="img/mine/kefu_1.svg">-->
<!--                  <template v-slot:loading>-->
<!--                    <van-loading type="spinner"/>-->
<!--                  </template>-->
<!--                </van-image>-->
<!--                <span class="menu-item-label" >{{ $t('在线客服') }}</span>-->
<!--              </div>-->
<!--            </div>-->
         </div>
      </van-pull-refresh>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      userInfo:{
      },
      menu_top:40,
      isLoading: false,
    };
  },
  methods: {
    refresh(){
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        if(localStorage.getItem('token')){
          this.$toast(this.$t("刷新成功"));
        }else{
          this.$router.push({path:'/Login'})
        }
      }, 500);
    },
    exit(){
      this.$toast(this.$t("请完成任务单后进入"));
    },
    showSetting() {
      if(localStorage.getItem('token')){
        this.$router.push({path:'/Setting'})
      }else{
        this.$router.push({path:'/Login'})
      }
    },
    toNotice(){
      if(localStorage.getItem('token')){
        this.$router.push({path:'/Notice'})
      }else{
        this.$router.push({path:'/Login'})
      }
    },
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
        if(localStorage.getItem('token')){
            this.getUserInfo();
            this.$toast(this.$t("刷新成功"));
        }else{
            this.$router.push({path:'/Login'})
        }
      }, 500);
    },
    doLogin(){
        if(localStorage.getItem('token')){
            this.$router.push({path:'/Infomation'});
        }else {
            this.$router.push({path:'/Login'})
        }
    },
    doPay(){
      this.$toast(this.$t("请联系客服充值"));
      return false;
    },
    doWithdrawal(){
      this.$http({
        method: 'get',
        url: 'user_get_bank'
      }).then(res=>{
          if(res.data.is_bank){
            this.$router.push("withdraw");
          }else {
            this.$router.push("Setbank");
            this.$toast.fail(this.$t("请设置收款卡!"));
          }
      })
    },
    toService(){
      if(this.$store.getters.getBaseInfo.iskefu == 1){
        this.$router.push("ServiceOnline");
      }else {
        this.$toast.fail(this.$t("功能已禁用"));
      }
    },
    getUserInfo(){
      this.$http({
        method: 'get',
        url: 'user_info'
      }).then(res=>{
        if(res.code === 200){
          console.log(res.data,'res.data;')
            this.userInfo = res.data;
            this.menu_top = 15;
            if(this.userInfo.status !== 1){
              this.$toast(this.$t("账号下线"));
              localStorage.clear()
              this.$router.push({path:'/Login'})
            }
        }else if(res.code ===401){
          this.$toast(res.msg);
        }
      })
    },
  },
  created() {
    if(localStorage.getItem('token')){
        this.getUserInfo();
    }else {
      this.userInfo.username = this.$t("登录/注册");
      this.userInfo.ip = this.$t("登录可享受更多服务");
      this.userInfo.header_img = "img/mine/avatar.png";
    }
  }
};
</script>

<style scoped>
.page{
  position: absolute!important;
  top: 0;
  left: 0;
  right: 0;
}
.mine{
  position: relative;
  bottom: 10px;
  background-color: #212121;
}
.mine .wrapper{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 15vw;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.mine .header{
  background-color:#212121;
}
::v-deep .van-nav-bar__content {
  height: 100px;
  background-color: #212121;
}
::v-deep .van-hairline--bottom::after {
  border-bottom-width: 0px;
}
.mine .header .van-nav-bar .van-icon {
  font-size: 45px;
}
.mine .header .user-wrapper{
  display: flex;
  align-items: center;
  padding: 30px 40px 30px 40px;
  background: #282828;

}
.mine .user_img{
  height: 130px;
  width: 130px;
}
::v-deep .van-loading__spinner {
  height: 50px;
  width: 50px;
}
::v-deep .van-image__error-icon {
  font-size: 70px;
}
.mine  .header .user-wrapper .login-content{
  flex: 1;
  margin-left: 60px;
}
.mine  .header .user-wrapper .login-content .login-btn{
  display: inline-block;
  font-size: 30px;
  line-height: 10px;
  color: #fff;
}
.mine .header .user-wrapper .login-content .login-label{
  margin-top: -13px;
  font-size: 28px;
  color: hsla(0,0%,100%,.6);
}
.mine .page-bg{
  height: 500px;
}
.mine .content{
  position: relative;
  min-height: 500px;
  background-color: #212121;
}

::v-deep .van-pull-refresh__track .van-pull-refresh__head *{
  color: #ffffff;
  font-size: 35px;
}

.mine .wrapper .content .finance {
  position: absolute;
  display: flex;
  align-items: center;
  top: -55px;
  left: 30px;
  right: 30px;
  height: 120px;
  background-color:#282828;
  border-radius: 15px;
  box-shadow: 0 1.5px 1px 0 #e6b98a;
}
.mine .wrapper .content .finance .line{
  width: 3px;
  height: 40px;
  background-color: #e6b98a;
}
.mine .wrapper .content .finance .finance-item{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.mine .wrapper .content .finance .finance-item .text{
  margin-left: 30px;
  font-size: 30px;
  color: #e6b98a;
  font-weight: 500;
}
.mine .wrapper .content .finance .finance-item .icon{
  font-size: 50px;
}
.mine .wrapper .content .menu{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  background-color:#282828;
  border-radius: 15px;
  box-shadow: 0 1.5px 1px 0 #e6b98a;
}
.mine .wrapper .content .menu .menu-item{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 50%;
  height: 130px;
}
.mine .wrapper .content .menu .menu-item .menu-item-label{
  font-size: 30px;
  color: #e6b98a;
  font-weight: 500;
}
.mine .wrapper .content .menu .menu-item .menu-item-icon{
  margin: 25px;
  width: 60px;
  height: 60px;
  -o-object-fit: contain;
  object-fit: contain;
}
.mine .wrapper .content .wallet{
  margin-top: 80px;
  padding: 0 30px;
  background-color:#282828;
  border-radius: 15px;
  box-shadow: 0 1.5px 1px 0 #e6b98a;
}
.mine .wrapper .content .wallet .part-1{
  display: flex;
  align-items: center;
  height: 100px;
}
.mine .wrapper .content .wallet .font-primary-color{
  color: #e6b98a;
}
.font-gray {
  color: #e6b98a;
}
.mine .wrapper .content .wallet .part-2{
  display: flex;
  align-items: center;
  height: 150px;
}
.mine .wrapper .content .wallet .part-2 .balance{
  flex: 1;
  font-size: 60px;
  color: #e6b98a;
  font-weight: 700;
}
.mine .wrapper .content .wallet .van-hairline--bottom::after {
  border-bottom-width: 3px;
}
.mine .wrapper .content .wallet .part-2 .refresh-btn{
  margin-left: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  font-size: 30px;
  border-radius: 50%;
  color: #e6b98a;
  background-color: #e6c3a1;
}
::v-deep .van-tabbar-item--active{
  color: #ddb285 !important;
}
::v-deep .van-icon-peer-pay:before , ::v-deep .van-icon-idcard:before{
  color: #e6b98a;
}
::v-deep [class*=van-hairline]::after{
  border: 0 solid #e6b98a;
}
::v-deep .van-cell {
  background: #282828;
  padding: 7px 16px;

}
::v-deep .van-cell__title span{
  color: #fff;
  font-size: 28px;
  margin-left: 10px;
}
::v-deep .van-cell__left-icon{
  font-size: 60px;
  color: #e6b98a;
}
::v-deep .van-cell__right-icon{
  font-size: 40px;
}
::v-deep .van-cell::after{
  border: none;
}
p{
  padding: 0;
  margin: 0;
  color: #fff;
  line-height: 30px;
  font-size: 24px;
  float: left;
  margin-left: 10px;
}
.icons{
  display: flex;
  align-items: center;
}
.icons img{
  width: 48px;
  margin-right: 10px;
}
</style>
