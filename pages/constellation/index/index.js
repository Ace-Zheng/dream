var t = getApp();

Page({
  data: {
    list: t.data.constellationList
  },
  onLoad: function(t) {},
  onShareAppMessage: function(t) {
    return "button" === t.from && console.log(t.target), {
      title: "星座运势",
      path: "/pages/index/index",
      success: function(t) {},
      fail: function(t) {}
    };
  }
});