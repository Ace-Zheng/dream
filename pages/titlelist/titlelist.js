var n = require("../../utils/titleData.js");

Page({
    data: {
        index: null,
        titleData: n
    },
    onLoad: function(n) {
        var t = n.index, e = n.title || "类目";
        this.setData({
            index: t
        }), wx.setNavigationBarTitle({
            title: e
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
          title: "想知道你的梦境预示着什么吗？答案在这里！",
          desc: "想知道你的梦境预示着什么吗？答案在这里！",
          imageUrl: "../../images/share-outimg.jpeg",
          path: "/pages/home/home"
        };
    }
});