1. 配置中间件（有坑请注意）
1、在 app/middleware 下编写中间件。
2、配置中间件

坑！！！：请注意一般情况下，我们会在 router.js 中，开启中间件，这么做一般情况下没事儿，但是为了存储访问者ip，我们需要在中间件中插入一条数据，此时我们就用到了module.exports = (optinos,app) =>{} 中的 app。加入我们在 router 中使用中间件会导致 app 不存在。故需要在config.default.js 中配置。
```js
  config.middleware = [ '中间件名称' ];
  config.中间件名称= {
    enable: true,    // 是否开启
    match: [ '/blog' ],	// 作用于的路由
  };
```
实现的功能：

存储session，ip，访问时间等数据。
已存在session则更新其数据
一天之内只算访问一次的量
```js
'use strict';
module.exports = (options, app) => {
  return async function blogauth(ctx, next) {
  	// 直接执行下一步 
    next();
    
	const new_ip = ctx.request.ip;						// 获取ip
	if (new_ip === '120.27.20.14') return false; 		//  判断是“自己”服务器ip就过滤掉
	const date = Date.parse(new Date()) / 1000;			// 获取当期时间/1000（为了字段是int(11)）
	const session_blog = ctx.session.SESSION_BLOG; 		//  获取客户端时候有session（没有则为undefined）
	const visitor = await app.mysql.get('visit', { session: session_blog }); // 查询词session表中已经存在
	if (!session_blog || !visitor) {					// 没有session 或者 表中不存在session用户，则插入一条新的数据
	  const visit_session = 'blog_' + date;				// 产生新的session
	  ctx.session.SESSION_BLOG = visit_session;
	  app.mysql.insert('visit', { session: visit_session, ip: new_ip, visit_time: date, visit_last_time: date });// 插入数据
	} else { // 存在session则更新此seeison用户的数据
	  let { ip, times, id, visit_last_time } = visitor;
	  if ((visit_last_time - date) < (60 * 24)) return false;  // 一天之内 不在记录访问次数
	  if (ip.indexOf(new_ip)) ip += (',' + new_ip);	// 同一session不用ip记录
	  app.mysql.update('visit', { id, ip, times: times += 1, visit_last_time: date }); // 更新数据
	}
  };
};
```