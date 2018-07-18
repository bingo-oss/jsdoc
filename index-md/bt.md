# BT JSSDK

### 用法:

  * <a href="https://github.com/bingo-oss/mobile-btjsapi/blob/master/bingotouch.js" target="_blank">bingotouch.js</a> - 基础功能接口，使用该模块必须先引入Cordova.js提供网络请求、页面切换、数据存储、文件操作、设备操作等通用接口。 更多<a href="https://github.com/bingo-oss/mobile-btjsapi/blob/master/cordova.js" target="_blank">Cordova</a>接口。
  * <a href="https://github.com/bingo-oss/mobile-btjsapi/blob/master/linkplugins.js" target="_blank">linkplugins.js</a> - Link平台功能接口，使用该模块必须先引入Cordova.js 和 bingotouch.js。包含用户信息获取、通讯录、聊天、签到、应用、服务号等操作接口。

```js
 <script src="js/cordova.js"></script>
 <script src="js/bingotouch.js"></script>
 <script src="js/linkplugins.js"></script>
 ```



### app提供以下的命名空间：
  * [barcode](app.barcode.html)
  * [database](app.database.html)
  * [dateTimePicker](app.dateTimePicker.html)
  * [link](app.link.html)
  * [notification](app.notification.html)
  * [page](app.page.html)
  * [phone](app.phone.html)
  * [progress](app.progress.html)
  * [setting](app.setting.html)
  * [timetask](app.timetask.html)
  * [utils](app.utils.html)
  * [wheelSelect](app.wheelSelect.html)