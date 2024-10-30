import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { Locale } from 'vant'
import enUS from 'vant/lib/locale/lang/en-US'
import zhCN from 'vant/lib/locale/lang/zh-CN'
import zhHK from 'vant/lib/locale/lang/zh-HK'
import zhTW from 'vant/lib/locale/lang/zh-TW'
import enLocale from './en_us'
import zhLocale from './zh_cn'
import TW from './tw'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enUS,
    ...enLocale
  },
  cn: {
    ...zhCN,
    ...zhLocale
  },
  tw:{
    ...TW,
    ...zhHK,
    ...zhTW
  }
}


const lang = navigator.language

let language = ''
if(lang == 'zh-CN'  || lang == 'zh-SG'){
  language = 'cn'
}else if (lang == 'zh-TW' || lang == 'zh-HK'){
  language = 'tw'
}
else{
  language = 'cn'
}

let i18n = new VueI18n({
  locale: window.localStorage.getItem('lang') || language, // 设置默认语言
  messages: messages // 设置资源文件对象

})
console.log(window.localStorage)
// 更新vant组件库本身的语言变化，支持国际化
function vantLocales(lang) {
  if (lang === 'en') {
    i18n = new VueI18n({
      locale: 'en', // 设置默认语言
      messages: messages // 设置资源文件对象
    })
    Locale.use(lang, enUS)
    window.localStorage.setItem('lang',lang)
  } else if (lang === 'cn') {

    i18n = new VueI18n({
      locale: 'cn', // 设置默认语言
      messages: messages // 设置资源文件对象
    })
    Locale.use(lang, zhCN)
    window.localStorage.setItem('lang',lang)
  }else if (lang === 'tw') {

    i18n = new VueI18n({
      locale: 'tw', // 设置默认语言
      messages: messages // 设置资源文件对象
    })
    Locale.use(lang, zhTW)
    window.localStorage.setItem('lang',lang)
  }
}

export { i18n, vantLocales }
