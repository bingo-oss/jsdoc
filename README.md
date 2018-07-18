# jsdoc
基于jsdoc3生成对应的js文档

### 用法：
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

