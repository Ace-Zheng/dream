const app = getApp();
import { requestApi } from '../../../api'
import { save } from '../../../utils/dataCount'

Page({
  data: {
    src: "",
    srcWidth: '',
    srcHeight: '',
    text: "",
    text_background: "",
    src_yh1: "",
    src_yh2: "",
    today: "",
    tomorrow: "",
    week: "",
    month: "",
    year: "",
    twmy_line: "",
    color1: "",
    color2: "",
    color3: "",
    color4: "",
    color5: "",
    data: "",
    array: [ 1, 2, 3, 4, 5 ],
    xingzuos: [ "白羊座", "金牛座", "双子座", "巨蟹座", "狮子座", "处女座", "天秤座", "天蝎座", "射手座", "魔蝎座", "水瓶座", "双鱼座" ],
    xingzuo: "",
    xingzuo_cn: '',
    duanping: [],
    duanping_label: "",
    duanping_value: "",
    nyr: "",

    lateShow: false, // tab悬浮栏延迟显示标识
    selectData: '', // 星座基本信息
    loadingMark: true, // loading层标识
    tabSelectCss: 'background-color: #FFEAC3;color:#000;font-size: 32rpx;', // 选中样式
  },
  onLoad: function(a) {
    const type = a.type ? a.type.toLowerCase() : 'aries'
    const seleData = this.mapList(type)

    this.setData({
      xingzuo: type,
      xingzuo_cn: seleData.name,
      selectData: seleData
    })

    this.fortune_date();

    app.showLoading() // loading动态图.

  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  bindPickerChange: function(a) {
    var t = "", o = a.detail.value;
    0 == o ? t = "aries" : 1 == o ? t = "taurus" : 2 == o ? t = "gemini" : 3 == o ? t = "cancer" : 4 == o ? t = "leo" : 5 == o ? t = "virgo" : 6 == o ? t = "libra" : 7 == o ? t = "scorpio" : 8 == o ? t = "sagittarius" : 9 == o ? t = "capricorn" : 10 == o ? t = "aquarius" : 11 == o && (t = "pisces")

    const seleData = this.mapList(t)

    this.setData({
      xingzuo: t,
      xingzuo_cn: seleData.name,
      selectData: seleData
    })

    app.showLoading()

    this.fortune();
  },
  changeColor1: function() {
    var a = this, t = a.data.today_date;

    this.setData({
      color1: a.data.tabSelectCss,
      color2: "",
      color3: "",
      color4: "",
      color5: "",
    })

    app.showLoading()

    const para = {
      category: '0'
    }
    this.colorRequire(para, function (o) {
      a.setData({
        duanping: o.data.ul.pop(),
        data: o.data,
        nyr: t
      }), a.setData({
        duanping_label: "精简" + a.data.duanping.label + "：",
        duanping_value: a.data.duanping.value
      });

    })

  },
  changeColor2: function() {
    var a = this, t = a.data.tomorrow_date;

    this.setData({
      color2: a.data.tabSelectCss,
      color1: "",
      color3: "",
      color4: "",
      color5: "",
    })

    app.showLoading()

    const para = {
      category: '1'
    }
    this.colorRequire(para, function (o) {
      a.setData({
        duanping: o.data.ul.pop(),
        data: o.data,
        nyr: t
      }), a.setData({
        duanping_label: "精简" + a.data.duanping.label + "：",
        duanping_value: a.data.duanping.value
      });

    })

  },
  changeColor3: function() {
    var a = this, t = a.data.week_date;

    this.setData({
      color3: a.data.tabSelectCss,
      color1: "",
      color2: "",
      color4: "",
      color5: "",
    })

    app.showLoading()

    const para = {
      category: '2'
    }
    this.colorRequire(para, function (o) {
      a.setData({
        duanping: o.data.ul.pop(),
        data: o.data,
        nyr: t
      }), a.setData({
        duanping_label: "精简" + a.data.duanping.label + "：",
        duanping_value: a.data.duanping.value
      });

    })

  },
  changeColor4: function() {
    var a = this, t = a.data.month_date;

    this.setData({
      color4: a.data.tabSelectCss,
      color1: "",
      color2: "",
      color3: "",
      color5: "",
    })

    app.showLoading()

    const para = {
      category: '3'
    }
    this.colorRequire(para, function (o) {
      a.setData({
        duanping: o.data.ul.pop(),
        data: o.data,
        nyr: t
      }), a.setData({
        duanping_label: "精简" + a.data.duanping.label + "：",
        duanping_value: a.data.duanping.value
      });

    })

  },
  changeColor5: function() {
      var a = this, t = a.data.year_date;

    this.setData({
      color5: a.data.tabSelectCss,
      color1: "",
      color2: "",
      color3: "",
      color4: "",
    })

    app.showLoading()

      const para = {
        category: '4'
      }
      this.colorRequire(para, function (o) {
        a.setData({
          duanping: o.data.ul.pop(),
          data: o.data,
          nyr: t
        }), a.setData({
          duanping_label: "精简" + a.data.duanping.label + "：",
          duanping_value: a.data.duanping.value
        });

      })

  },

  colorRequire (para, callback) {
    const category = para.category || '0'

    const url = requestApi.get_data + '?url=https://aliyun.zhanxingfang.com/zxf/appclient/fortune.php'
    const params = {
      get: '?xingzuo=' + this.data.xingzuo + '&category=' + category,
      method: 'get'
    }
    app.ajax({
      url: url,
      type: 'POST',
      para: params,
      login: false,
      success: function (o) {
        // console.log(t)

        callback && callback(o)

      },
      fail: function (error) {
        console.log(error)
      },
      complete: function () {
        app.hideLoading()
      }

    })

  },

  fortune_date: function() {
    var a = this;

    const url = requestApi.get_data + '?url=https://aliyun.zhanxingfang.com/zxf/appclient/fortune_date.php'
    const params = {
        get: '',
        method: 'get'
    }
    app.ajax({
      url: url,
      type: 'POST',
      para: params,
      login: false,
      success: function (t) {
        // console.log(t)

        var o = t.data;
        a.setData({
          today_date: o.today,
          tomorrow_date: o.tomorrow,
          week_date: o.week,
          month_date: o.month,
          year_date: o.year
        })

        // 加载数据
        a.fortune()

      },
      fail: function (error) {
        console.log(error)
      },
      complete: function () {}

    })

  },
  fortune: function() {
    var a = this, t = a.data.xingzuo, o = "";
    "aries" == t ? o = " 出生于阳历3.21-4.19,白羊座的内心一直是一个孩子,保有天真的一面,即使长大了,他还是相信世界上有小精灵的存在。有时白羊座的人相当幼稚,可是他绝不是不聪明,他的反应可快的很呢! " : "taurus" == t ? o = " 出生于阳历4月20日—5月20日，金牛座的性格平稳、有毅力和耐力，勤劳智慧，富有实干精神。他的突出特点就是执着，家庭观念较强，思想趋于保守担又十分大胆，但善于理财，是个自我要求完美的人。 " : "gemini" == t ? o = " 出生于阳历5月21日〜6月21日，双子座的人无拘无束，对外界的事物有永无休止的好奇心。有典型的大城市人气质，生活节奏快，每天有各种各样的活动和安排。弱点是好动和缺乏耐心。" : "cancer" == t ? o = " 出生于阳历6月22日－7月22日，超群的直觉和敏感是巨蟹座人的主要性格特征，喜欢收集储存东西，对任何事情都不舍不弃。他们充满爱心，感情真挚、坦诚，但性格比较脆弱，不善于在公众面前表现自己。" : "leo" == t ? o = " 出生于阳历7月23日－8月22日，狮子座毫无复杂或隐藏难解之处。是王者，是上司，总之，在团体中他就是Leader，且其深知自己此种操纵和领导别人的能力。天生具有戏剧天分，相当敏感，容易受到伤害。 " : "virgo" == t ? o = " 出生于阳历8月23日－9月22日，丰富的知性，做事一丝不苟，有旺盛的批判精神，是个完美主义者，极度的厌恶虚伪与不正当的事。做事周到、细心、谨慎而有条理，并非常理性，甚至冷酷。  " : "libra" == t ? o = " 出生于阳历9月23日－10月23日，天秤座的人温柔、娴雅，富有魅力、性格平稳、目光敏锐，具有合作精神，是和平主义者。不足之处是优柔寡断，缺乏坦率、难于理解。" : "scorpio" == t ? o = " 出生于阳历10月24日－11月22日，这个星座的人有着强烈的第六感、神秘的探视能力及吸引力，做事常凭直觉；虽然有着敏锐的观察力，但往往仍靠感觉来决定一切。 " : "sagittarius" == t ? o = " 出生于阳历11月23日－12月21日，崇尚自由，生命过程中的理想和憧憬，往往比目的更重要。他们大多数都有自由奔放，豪爽大方，无惧无畏的性格，但缺乏细腻的情感和责任感。  " : "capricorn" == t ? o = " 出生于阳历12月22日－1月19日，有独立精神和阴柔的个性，追求高难度的理想，使得摩羯座人充满斗志。喜欢控制全局，有时间观念、有责任感、重视权威和名声。  " : "aquarius" == t ? o = " 出生于阳历1月19日－2月18日，讨厌束缚、追求自由，富有开拓精神，思维能力高于本能，是个先锋派人物。不能忍受任何约束，具有前瞻性、有独创性、聪慧、富理性，喜欢追求新的事物及生活方式。 " : "pisces" == t && (o = " 出生于阳历2月19日－3月20日，充满着幻想，温情，灵活而且神秘，情绪起伏非常大，有自己独特的幽默方式，对世界上发生的一切，乃至虚无缥缈的事物都有浓厚的兴趣。总保持着一种天真、忠厚的气质。 ")

    const url = requestApi.get_data + '?url=https://aliyun.zhanxingfang.com/zxf/appclient/fortune.php'
    const params = {
      get: '?xingzuo=' + this.data.xingzuo + '&category=0',
      method: 'get'
    }
      app.ajax({
        url: url,
        type: 'POST',
        para: params,
        login: false,
        success: function (t) {
          // console.log(t)

          const seleData = a.mapList(a.data.xingzuo)

          a.setData({
            color1: a.data.tabSelectCss,
            color2: "",
            color3: "",
            color4: "",
            color5: "",
            duanping: t.data.ul.pop(),
            data: t.data,
            src: seleData.imgUrl,
            srcWidth: seleData.imgWidth,
            srcHeight: seleData.imgHeight,
            text: o,
            text_background: "background:#f2fafc;width:90%;margin:10px auto;padding:5px 10px; border-radius: 6px;",
            src_yh1: "/img/star_img/ys_yh1.png",
            src_yh2: "/img/star_img/ys_yh2.png",
            today: "今日",
            tomorrow: "明日",
            week: "本周",
            month: "本月",
            year: "本年",
            twmy_line: "border-bottom: 2px solid #f5f5f5;",
            nyr: a.data.today_date
          })

          a.setData({
            duanping_label: "精简" + a.data.duanping.label + "：",
            duanping_value: a.data.duanping.value,
            lateShow: true, // 延迟展示tab悬浮层.
          });

        },
        fail: function (error) {
          console.log(error)
        },
        complete: function () {
          app.hideLoading() // 清除loading动态图.
        }

      })

  },
  mapList (xingzuoName = 'aries') {
    const name = xingzuoName.toLowerCase()

    // 总星座数据
    const selectData = app.data.constellationList.find(item => item.en.toLowerCase() == name)

    return selectData

  },


  // 分享配置
  onShareAppMessage: function(res) {
    let shareObj = {
      title: "水逆？不能够！最全的星座运势分析请点我🙃",
      desc: "水逆？不能够！最全的星座运势分析请点我🙃",
      path: "/pages/constellation/detail_fortune/index?type="+this.data.xingzuo+"",
      success: function () {},
      fail: function () {},
      complete: function () {}
    }

    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target)

      shareObj.success = function () {
        const para = {
          type: 5.5 // 该用户是点击分享按钮，分享首页
        }
        save(para) // 统计首页分享数据，存入数据库

      }

    } else if (res.from === 'menu') {
      // 来自页面内转发按钮
      // console.log(res.target)

      shareObj.success = function () {
        const para = {
          type: 5 // 该用户是点击右上角，分享首页
        }
        save(para) // 统计首页分享数据，存入数据库

      }
    }

    return shareObj;

  },



});