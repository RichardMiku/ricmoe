// 引入 jsSHA 函式庫，這裡假設您會透過 <script> 標籤在 HTML 中載入它
// 例如：<script src="https://cdn.jsdelivr.net/npm/jssha@3.2.0/dist/sha1.min.js"></script>

/**
 * 生成一個隨機字串作為 nonceStr。
 * @returns {string} 隨機字串。
 */
var createNonceStr = function () {
  return Math.random().toString(36).substr(2, 15);
};

/**
 * 生成當前時間戳記。
 * @returns {string} 時間戳記字串。
 */
var createTimestamp = function () {
  return parseInt(new Date().getTime() / 1000) + '';
};

/**
 * 將物件的鍵排序並轉換為小寫，然後組合成 URL 查詢字串的格式。
 * @param {Object} args - 包含簽名參數的物件。
 * @returns {string} 格式化後的查詢字串。
 */
var raw = function (args) {
  var keys = Object.keys(args);
  keys = keys.sort(); // 排序鍵值
  var newArgs = {};
  keys.forEach(function (key) {
    newArgs[key.toLowerCase()] = args[key]; // 將鍵轉換為小寫
  });

  var string = '';
  for (var k in newArgs) {
    string += '&' + k + '=' + newArgs[k]; // 組合成查詢字串
  }
  string = string.substr(1); // 移除開頭的 '&'
  return string;
};

/**
 * @synopsis 簽名演算法
 *
 * @param {string} jsapi_ticket - 用於簽名的 jsapi_ticket。
 * @param {string} url - 用於簽名的 URL，注意必須動態獲取，不能 hardcode。
 *
 * @returns {Object} 包含簽名資訊的物件，包括 jsapi_ticket, nonceStr, timestamp, url, signature。
 */
var sign = function (jsapi_ticket, url) {
  var ret = {
    jsapi_ticket: jsapi_ticket,
    nonceStr: createNonceStr(),
    timestamp: createTimestamp(),
    url: url
  };
  var string = raw(ret);
  // 在瀏覽器環境中，jsSHA 應該已經透過 <script> 標籤全域可用
  // 如果 jsSHA 沒有全域可用，您需要確保它被正確載入並可存取
  var shaObj = new jsSHA('SHA-1', 'TEXT'); // 這裡直接使用 jsSHA 構造函數
  shaObj.update(string);
  ret.signature = shaObj.getHash('HEX');

  return ret;
};


/**
 * @synopsis 簽名演算法2
 *
 * @param {string} jsapi_ticket - 用於簽名的 jsapi_ticket。
 * @param {string} url - 用於簽名的 URL，注意必須動態獲取，不能 hardcode。
 *
 * @returns {Object} 包含簽名資訊的物件，包括 jsapi_ticket, nonceStr, timestamp, url, signature。
 */
var sign_custome = function (jsapi_ticket, nonceStr, timestamp, url) {
  var ret = {
    jsapi_ticket: jsapi_ticket,
    nonceStr: nonceStr,
    timestamp: timestamp,
    url: url
  };
  var string = raw(ret);
  // 在瀏覽器環境中，jsSHA 應該已經透過 <script> 標籤全域可用
  // 如果 jsSHA 沒有全域可用，您需要確保它被正確載入並可存取
  var shaObj = new jsSHA('SHA-1', 'TEXT'); // 這裡直接使用 jsSHA 構造函數
  shaObj.update(string);
  ret.signature = shaObj.getHash('HEX');

  return ret;
};
// 如果您需要在其他腳本中存取 `sign` 函式，可以將它賦值給一個全域物件或命名空間
// 例如：window.sign = sign;
// 或者，如果您使用模組打包工具（如 Webpack, Rollup），可以繼續使用 export

// 範例用法 (在瀏覽器控制台中測試):
// 假設您已經載入了 jsSHA 函式庫

