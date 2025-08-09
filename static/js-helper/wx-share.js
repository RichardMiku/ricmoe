
var jsapi_ticket = 'O3SMpm8bG7kJnF36aXbe8xNcJ5lBk8LW15uc45b3pL3SoPOvZQfuza3dvti29OOH_zTEuSbNYrD8-iWsJ225hQ';
var share_url = window.location.href.split('#')[0];

var config_data = {
    debug: false,
    appId:'wxb6f9509aa28e3c58',
    timestamp: createTimestamp(),
    nonceStr: createNonceStr(),
    signature: '',
    jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData']
};

var sign_ret = sign_custome(jsapi_ticket, config_data.nonceStr, config_data.timestamp, share_url);

config_data.signature = sign_ret.signature;

wx.config(config_data);

console.log('wx.config', config_data);

const share_title = document.title ? document.title : 'RICMOE';
const share_description = document.querySelector('meta[name="description"]').getAttribute('content');

wx.ready(function() {
    var shareData = {
    title: share_title,
    desc: share_description,
    link:  window.location.href.split('#')[0],
    imgUrl: 'https://www.ric.moe/img/logo.png',
  };
  console.log('wx.ready', shareData);
  wx.updateAppMessageShareData(shareData);
  wx.updateTimelineShareData(shareData);
});

function refreshShareData() {
  wx.ready(function() {
    var shareData = {
      title: document.title,
      desc: document.querySelector('meta[name="description"]').getAttribute('content'),
      link:  window.location.href.split('#')[0],
      imgUrl: 'https://www.ric.moe/img/logo.png',
    };
    console.log('wx.ready', shareData);
    wx.updateAppMessageShareData(shareData);
    wx.updateTimelineShareData(shareData);
  });
}
