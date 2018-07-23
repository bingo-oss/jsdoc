# jsdoc
基于jsdoc3生成对应的js文档

### 用法：
* 首先确保是否安装jsdoc，如果没有可以用以下的方法安装，在终端输入：

  <pre>npm install -g jsdoc  //全局安装<br/>npm install --save-dev jsdoc  //局部安装</pre>
  在终端输入jsdoc -v ，如果有版本号出来说明安装成功。
* 终端运行以下命令生成对应的方档out-bt,out-weex
	<pre>./jsdoc.sh</pre>

* 配置文件 `jsdoc-conf-bt.json` `jsdoc-conf-weex.json` 
	```js
	"source":{
        "include": [ "../mobile-btjsapi/bingotouch.js","../mobile-btjsapi/linkplugins.js" ],  //需要生成文档的js入口文件
        "includePattern": ".+\\.js(doc)?$"
    }
    ```
    `source` 需要生成文档的JS入口文件，使用相对路径。bt、weex都需要把相应用的工程拉到本地

* 子模块需装依赖
  在终端进入`bingo-jsdoc-template`文件运行以下命令：
  <pre>npm install</pre>

