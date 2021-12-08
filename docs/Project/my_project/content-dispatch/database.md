## 目前的数据库

### 第一个表article

```sql
SELECT `article`.`articleId`,
    `article`.`type_id`,
    `article`.`title`,
    `article`.`article_content`,
    `article`.`introduce`,
    `article`.`addTime`,
    `article`.`view_count`
FROM `react_blog`.`article`;

```

表admin_user包含七个字段

### 第二个表dmin_user

```sql
SELECT `admin_user`.`id`,
    `admin_user`.`username`,
    `admin_user`.`password`,
    `admin_user`.`email`,
    `admin_user`.`create_time`
FROM `react_blog`.`admin_user`;
```

目前包含5个字段

### 第三个表type

文章类型的表