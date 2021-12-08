# 使用egg-sql操作sql数据库

1、安装sql

```js
npm i egg-sql -S
```

2、在config/plugin.js里声明改插件

```js
exports.sql = {
  enable: true,
  package: 'egg-sql',
};
```

3、在config/config.default.js里配置

```js
config.sql = {
  // 单数据库信息配置
  client: {
  // host
  host: 'localhost',
  // 端口号
  port: '3306',
  // 用户名
  user: '****',
  // 密码
  password: '*******',
  // 数据库名
  database: 'egg',
  },
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
};
```

4、在service服务层操作数据库，符合Controller -> Service -> MySQL模式

```js
this.app.sql.query(sql, values); //sql语句模式
 
//比如查询users表name=Jack的数据
let name = 'Jack';
this.app.sql.query('select * from users where name = ?', [name]);
```

5、egg封装增删改查

1、插入，向users表内插入一条数据

```js
const result = await this.app.sql.insert('users', {
  name: 'Jack',
  age: 18
})

```

判断：result.affectedRows === 1
2、查询，查询users表name=Jack的数据

```js
const result = await this.app.sql.select('users', {
  columns: ['id', 'name'], //查询字段，全部查询则不写，相当于查询*
  where: {
    name: 'Jack'
  }, //查询条件
  orders: [
    ['id', 'desc'] //降序desc，升序asc
  ],
  limit: 10, //查询条数
  offset: 0 //数据偏移量（分页查询使用）
})
```

判断：result.length > 0
3、修改，修改users表id=1的数据age为20

```js
const result = await this.app.sql.update('users', {
  age: 20 //需要修改的数据
}, {
  where: {
    id: 1
  } //修改查询条件
});
```

判断：result.affectedRows === 1
4、删除，删除users表name=Jack的数据

```js
const result = await this.app.sql.delete('users', {
  name: 'Jack'
})
```

判断：result.affectedRows === 1
5、Mysql常用语句

(1)关联表查询（查询评价表，关联用户表头像和昵称）

```sql
select evaluate.*, user.name, user.figureurl from evaluate
left join user on evaluate.userId = user.id where cId = 123
```

2)更新商品点赞+1，并且一次更新id为1，2，3三条记录

```sql
update commodity set praise = praise + 1 where id in (1,2,3)
```

事务。在某些情况下，执行一个操作需要多次操作数据库，但这多次操作必须同时成功才行，比如打款的情况，需要从A账户扣钱，再向B账户加钱，假设A账户余额不足，则整个打款操作就应该恢复到原有状态。

```sql
const conn = await app.sql.beginTransaction(); // 初始化事务
 
try {
  await conn.insert(table, row1); // 第一步操作
  await conn.update(table, row2); // 第二步操作
  await conn.commit(); // 提交事务
} catch (err) {
  // error, rollback
  await conn.rollback(); // 一定记得捕获异常后回滚事务！！
  throw err;
}
```





