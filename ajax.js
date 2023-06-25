/*
 * @Author: wyj
 * @Date: 2022-08-08 17:47:04
 * @LastEditTime: 2022-08-09 14:01:14
 * @LastEditors: wyj
 * @Description:
 */
function ajax(url, method, data, callback) {
  const xhr = new XMLHttpRequest(); //新建ajax请求，不兼容IE7以下
  xhr.onreadystatechange = function () {
    //注册回调函数
    if (xhr.readyState === 4) {
      if (xhr.responseText) {
        callback && callback(JSON.parse(xhr.responseText));
      } else {
        showTips("error", "网络异常，请稍后再试");
      }
    }
  };
  if (method === "get") {
    //如果是get方法，需要把data中的数据转化作为url传递给服务器
    xhr.open(method, url, true);
    xhr.send(null);
  } else if (method === "post") {
    //如果是post，需要在头中添加content-type说明
    xhr.open(method, url, true);
    //   xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.send(data); //发送的数据需要转化成JSON格式
  } else {
    showTips("error", "不识别的方法:" + method);
    return false;
  }
}
