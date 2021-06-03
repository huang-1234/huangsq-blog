# axios

> 一个基于





## 3 axios 的理解和使用

```js
基于 xhr + promise 的异步 ajax请求库
浏览器端/node 端都可以使用
支持请求／响应拦截器
支持请求取消
请求/响应数据转换
批量发送多个请求
```

### 3.3 axios 常用语法

```js
axios(config): 通用/最本质的发任意类型请求的方式
axios(url[, config]): 可以只指定url 发get 请求
axios.request(config): 等同于axios(config)
axios.get(url[, config]): 发get 请求
axios.delete(url[, config]): 发delete 请求
axios.post(url[, data, config]): 发post 请求
axios.put(url[, data, config]): 发put 请求

axios.defaults.xxx: 请求的默认全局配置（method\baseURL\params\timeout…）
axios.interceptors.request.use(): 添加请求拦截器
axios.interceptors.response.use(): 添加响应拦截器

axios.create([config]): 创建一个新的axios(它没有下面的功能)

axios.Cancel(): 用于创建取消请求的错误对象
axios.CancelToken(): 用于创建取消请求的 token 对象
axios.isCancel(): 是否是一个取消请求的错误
axios.all(promises): 用于批量执行多个异步请求
axios.spread(): 用来指定接收所有成功数据的回调函数的方法
```

### 3.4 难点语法的理解和使用

3.4.1 axios.create(config)
根据指定配置创建一个新的 axios, 也就是每个新 axios 都有自己的配置
新 axios 只是没有取消请求和批量发请求的方法, 其它所有语法都是一致的
为什么要设计这个语法?
(1) 需求: 项目中有部分接口需要的配置与另一部分接口需要的配置不太一样, 如何处理（比如有多个baseURL需要指定）
(2) 解决: 创建2 个新axios, 每个都有自己特有的配置, 分别应用到不同要求的接口请求中

```js
const instance = axios.create({ // instance是函数类型
	baseURL: 'http://localhost:3000'
})
// 使用instance发Ajax请求
instance({
	url: '/posts'
})
instance.get('/posts')

```



#### 3.4.2 拦截器函数/ajax 请求/请求的回调函数的调用顺序

说明: 调用axios()并不是立即发送ajax 请求, 而是需要经历一个较长的流程
流程: 请求拦截器2 => 请求拦截器1 => 发ajax 请求 => 响应拦截器1 => 响应拦截器2 => 请求的回调
注意: 此流程是通过 promise 串连起来的, 请求拦截器传递的是config, 响应拦截器传递的是response
// 添加两个请求拦截器(回调函数)



## 4axios 的处理链流程

先贴代码

```js
// 处理请求拦截器
axios.interceptors.request.use(
  config=>{
    console.log('request interceptor1 onResolve');
    console.log('request config<<',config);
    return config;
  },
  error=>{
    console.log('request interceptor1 onReject');
    return Promise.reject(error);
  }
)
axios.interceptors.request.use(
  config=>{
    console.log('request interceptor2 onResolve');
    return config;
  },
  error=>{
    console.log('request interceptor2 onReject');
    return Promise.reject(error);
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  response =>{
    console.log('response interceptor1 onResolve');
    console.log('response interceptor1<< ',response)
    return response;
  },
  error =>{
    console.log('request interceptor1 onReject');
    return Promise.reject(error);
  }
)

axios.interceptors.response.use(
  response =>{
    console.log('response interceptor2 onResolve');
    return response;
  },
  error =>{
    console.log('request interceptor2 onReject');
    return Promise.reject(error);
  }
)
function testGet(){
  axios({
    url:'http://localhost:3000/posts',
    method: 'GET',
    params:{
      // id: 4,
    }
  })
  .then(
    response =>{
      console.log('data<<', response.data)
    }
  )
  .catch(error =>{
    console.log('error<<', error.message)
  })
}
```

console.log输出

```js
request interceptor2 onResolve
request interceptor1 onResolve
request config << { url: "http://localhost:3000/posts", method: "get", headers: { … }, params: { … }, transformRequest: Array(1), … }
response interceptor1 onResolve
response interceptor1<<
{data: Array(17), status: 200, statusText: "OK", headers: {…}, config: {…}, …}
response interceptor2 onResolve
data<< 
(17) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
0: {id: 1, title: "my first +++", author: "hsq+++"}
1: {id: 1, title: "json-server", author: "hsq"}
2: { id: 3, title: "json-server3", author: "hsq" }
XHR finished loading: GET "http://localhost:3000/posts".
```

lanqi