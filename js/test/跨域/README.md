# 跨域
前端调用后台接口时，浏览器出于安全的考虑，根据同源策略对XHR（XMLHttpRequest）进行限制，就出现了跨域的问题。

##产生跨域的原因

* 浏览器限制：浏览器出于安全的考虑，发现请求是跨域的时候，会进行校验，如果校验不通过的时候就会报跨域安全问题

* 跨域：域名、端口号、协议不一致

* XHR（XMLHttpRequest）

只有同时满足上面三个条件的才有可能产生跨域的问题

## 解决跨域问题的方法

* 禁止浏览器的检查：给chrome浏览器添加参数 --disable-web-security

* JSONP：前端请求类型不是XHR（XMLHttpRequest）的原理，通过发出一个script请求，请求的参数要跟后端约定好，后端根据是否是这个参数，给前端返回js代码，前端约定参数的值，就是函数名

	前端代码：
	
	``` 
	  <script type="text/javascript">
	     var messagetow = function(data){
	         alert(data);
	    };
	     var url = "http://192.168.31.137/train/test/jsonpthree?callback=messagetow";
	     var script = document.createElement('script'); 
	    script.setAttribute('src', url); 
	     document.getElementsByTagName('head')[0].appendChild(script);
	</script>
	```
	后端返回：
	
	```
	messagetow(
	  {
	    "resultCode": "1000",
	    "resultMsg": "成功"
	  }
	)
	```
	
	JSONP缺点： 
	
	1、前后端都需要修改， 
	
  2、只支持get方法， 
  
	3、请求非XHR（XMLHttpRequest） ，不支持XHR的新特性
	
* CROS:服务端添加允许跨域的代码：response.setHeader("Access-Control-Allow-Origin","*")，具体看 https://www.jianshu.com/p/0c67823550d6

* 通过中间代理服务器实现: nginx/apache

* 通过iframe
