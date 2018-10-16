require("./utils/ald-stat.js");
import { config } from './config'
import { request, setLoginUrl, extend, constants, login } from './sdk/index'
import dataList from '/utils/constellation/list'

App({
  data: {
    needShare: ['2','3','4','5','6','7','8','9'], // 初始化加锁的板块
    constellationList: dataList.tabList // 初始化星座分类
  },

  // 微信登录方法
  login(callback) {
    wx.login({
      success: function (res) {
        // console.log(res)

        if (res.code) {
          //发起网络请求
          const url = config.apiUrl + '/account/dreamLogin/wx_login'
          getApp().ajax({
            url: url || '',
            type: 'POST',
            login: false,
            para: {
              code: res.code || ''
            },
            success(data) {
              // console.log(data)
              // return false

              callback && callback(data)

            },
            fail(error) {
              wx.showModal({
                title: '提示',
                showCancel: false,
                content: error,
                success: function (confirm, cancel) {
                  if (confirm) {

                    // 判断如果是用户未授权的情况.
                    if (error.indexOf('ERR_WX_GET_USER_INFO') >= 0) {

                      // 跳转到重新授权页面
                      // wx.navigateTo({
                      //   url: '/pages/account/authorize/authorize',
                      // })

                    }
                  }
                }
              })

            },
            complete() {

            }
          })

        } else {
          console.log('登录失败！' + res.errMsg)

        }
      }
    });

  },
  request(options, success, fail, complete) {
    request(extend(true, {
      method: 'GET',
      data: {},
      // 请求之前是否需要授权登陆，如果该项指定为 true，会在请求之前进行授权登录
      login: true,

      success(res) {
        if (res.data && res.data.original && res.data.original.status == 'fail') {
          return fail && fail(res.data.original.msg)
        }

        success && success(res.data)
      },

      fail(error) {
        // request:fail 可能是网络原因
        fail && fail(error.type ? (error.type + error.message) : (error.errMsg ? error.errMsg : error))
      },

      complete() {
        complete && complete()
      }
    }, options))
  },

  // 二次封装request方法.
  ajax(option) {
    let url = option.url || ''
    let data = option.para || ''
    let method = option.type || ''
    let login = option.login || '' // 请求之前是否需要授权登陆，如果该项指定为 true，会在请求之前进行授权登录
    let success = option.success || ''
    let fail = option.fail || ''
    let complete = option.complete || ''

    let option_new = {
      url: url,
      data: data,
      method: method,
      login: login
    }

    this.request(option_new, success, fail, complete)
  },

  // 小程序富文本解释器
  convertHtmlToText: function convertHtmlToText(inputText) {
        var returnText = "" + inputText;
         returnText = returnText.replace(/<\/div>/ig, '\r\n');
         returnText = returnText.replace(/<\/li>/ig, '\r\n');
         returnText = returnText.replace(/<li>/ig, '  *  ');
         returnText = returnText.replace(/<\/ul>/ig, '\r\n');
         //-- remove BR tags and replace them with line break
         returnText = returnText.replace(/<br\s*[\/]?>/gi, "\r\n");

         //-- remove P and A tags but preserve what's inside of them
         returnText = returnText.replace(/<p.*?>/gi, "\r\n");
         returnText = returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");

         //-- remove all inside SCRIPT and STYLE tags
         returnText = returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
         returnText = returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
         //-- remove all else
         returnText = returnText.replace(/<(?:.|\s)*?>/g, "");

         //-- get rid of more than 2 multiple line breaks:
         returnText = returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\r\n\r\n");

         //-- get rid of more than 2 spaces:
         returnText = returnText.replace(/ +(?= )/g, '');

         //-- get rid of html-encoded characters:
         returnText = returnText.replace(/ /gi, " ");
         returnText = returnText.replace(/&/gi, "&");
         returnText = returnText.replace(/"/gi, '"');
         returnText = returnText.replace(/</gi, '<');
         returnText = returnText.replace(/>/gi, '>');

         return returnText;
       }


});