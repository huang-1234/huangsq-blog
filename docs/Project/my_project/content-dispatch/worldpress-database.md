# worldPress数据库表和字段

## wp_commentmeta  :

> 文章评论额外信息表。

 

```sql
CREATE TABLE IF NOT EXISTS `wp_commentmeta` (
  `meta_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `comment_id` bigint(20) unsigned NOT NULL DEFAULT '0',
  `meta_key` varchar(255) DEFAULT NULL,
  `meta_value` longtext,
  PRIMARY KEY (`meta_id`),
  KEY `comment_id` (`comment_id`),
  KEY `meta_key` (`meta_key`(191))
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;
```

 

## wp_comments :

> 文章评论信息表。


comment_ID – 每个评论的唯一ID号，是一个bigint(20)值。带有附加属性auto_increment。

comment_post_ID – 每个评论对应的文章的ID号，int(11)值，等同于wp_posts.ID。

comment_author – 每个评论的评论者名称，tinytext值。

comment_author_email – 每个评论的评论者电邮地址，varchar(100)值。

comment_author_url – 每个评论的评论者网址，varchar(200)值。

comment_author_IP – 每个评论的评论者的IP地址，varchar(100)值。

comment_date – 每个评论发表的时间，datetime值(是加上时区偏移量后的值)。

comment_date_gmt – 每个评论发表的时间，datetime值(是标准的格林尼治时间)。

comment_content – 每个评论的具体内容，text值。

comment_karma – 不详，int(11)值，默认为0。

comment_approved – 每个评论的当前状态，为一个枚举值enum(’0′,’1′,’spam’)，0为等待审核，1为允许发布，spam为垃圾评论。默认值为1。

comment_agent – 每个评论的评论者的客户端信息，varchar(255)值，主要包括其浏览器和操作系统的类型、版本等资料。

comment_type – 评论的类型，varchar(20)值。

comment_parent – 某一评论的上级评论，int(11)值，对应wp_comment.ID，默认为0，即无上级评论。

user_id – 某一评论对应的用户ID，只有当用户注册后才会生成，int(11)值，对应wp_users.ID。未注册的用户，即外部评论者，这个ID的值为0。

 

 

```sql
CREATE TABLE IF NOT EXISTS `wp_comments` (
  `comment_ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `comment_post_ID` bigint(20) unsigned NOT NULL DEFAULT '0',
  `comment_author` tinytext NOT NULL,
  `comment_author_email` varchar(100) NOT NULL DEFAULT '',
  `comment_author_url` varchar(200) NOT NULL DEFAULT '',
  `comment_author_IP` varchar(100) NOT NULL DEFAULT '',
  `comment_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `comment_date_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `comment_content` text NOT NULL,
  `comment_karma` int(11) NOT NULL DEFAULT '0',
  `comment_approved` varchar(20) NOT NULL DEFAULT '1',
  `comment_agent` varchar(255) NOT NULL DEFAULT '',
  `comment_type` varchar(20) NOT NULL DEFAULT '',
  `comment_parent` bigint(20) unsigned NOT NULL DEFAULT '0',
  `user_id` bigint(20) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`comment_ID`),
  KEY `comment_post_ID` (`comment_post_ID`),
  KEY `comment_approved_date_gmt` (`comment_approved`,`comment_date_gmt`),
  KEY `comment_date_gmt` (`comment_date_gmt`),
  KEY `comment_parent` (`comment_parent`),
  KEY `comment_author_email` (`comment_author_email`(10))
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;
```

 

## wp_links ：

> 用于保存用户输入到Wordpress中的链接的表。

 

link_id – 每个链接的唯一ID号，bigint(20)值，附加属性为auto_increment。

link_url – 每个链接的URL地址，varchar(255)值，形式为http://开头的地址。

link_name – 单个链接的名字，varchar(255)值。

link_image – 链接可以被定义为使用图片链接，这个字段用于保存该图片的地址，为varchar(255)值。

link_target – 链接打开的方式，有三种，_blank为以新窗口打开，_top为就在本窗口中打开并在最上一级，none为不选择，会在本窗口中打开。这个字段是varchar(25)值。

link_category – 某个链接对应的链接分类，为int(11)值。相当于wp_linkcategories.cat_id。

link_description – 链接的说明文字。用户可以选择显示在链接下方还是显示在title属性中。varchar(255)值。

link_visible – 该链接是否可以，枚举enum(’Y’,’N’)值，默认为Y，即可见。

link_owner – 某个链接的创建人，为一int(11)值，默认是1。(应该对应的就是wp_users.ID)

link_rating – 链接的等级，int(11)值。默认为0。

link_updated – 链接被定义、修改的时间，datetime值。

link_rel – 链接与定义者的关系，由XFN Creator设置，varchar(255)值。

link_notes – 链接的详细说明，mediumtext值。

link_rss – 该链接的RSS地址，varchar(255)值。

 

```sql
CREATE TABLE IF NOT EXISTS `wp_links` (
  `link_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `link_url` varchar(255) NOT NULL DEFAULT '',
  `link_name` varchar(255) NOT NULL DEFAULT '',
  `link_image` varchar(255) NOT NULL DEFAULT '',
  `link_target` varchar(25) NOT NULL DEFAULT '',
  `link_description` varchar(255) NOT NULL DEFAULT '',
  `link_visible` varchar(20) NOT NULL DEFAULT 'Y',
  `link_owner` bigint(20) unsigned NOT NULL DEFAULT '1',
  `link_rating` int(11) NOT NULL DEFAULT '0',
  `link_updated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `link_rel` varchar(255) NOT NULL DEFAULT '',
  `link_notes` mediumtext NOT NULL,
  `link_rss` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`link_id`),
  KEY `link_visible` (`link_visible`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;
```

 

## wp_options: 

> 用于保存Wordpress相关设置、参数的表。基本配置信息表，通常通过get_option来操作，该表通常作为插件存储数据的一个地方。是用来存储 WordPress 中所有全局选项的数据表。

 

option_id – 选项的ID，bigint(20)值，附加auto_increment属性。

option_name – 选项名称，varchar(64)值。

option_value – 选项的值，longtext值。

autoload – 选项是否每次都被自动加载，枚举enum(’yes’,’no’)值，默认为yes。

 

```sql
CREATE TABLE IF NOT EXISTS `wp_options` (
  `option_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `option_name` varchar(191) NOT NULL DEFAULT '',
  `option_value` longtext NOT NULL,
  `autoload` varchar(20) NOT NULL DEFAULT 'yes',
  PRIMARY KEY (`option_id`),
  UNIQUE KEY `option_name` (`option_name`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=156 ;
```

 

## wp_postmeta:

> 用于保存文章的元信息(meta)的表。文章额外数据表，例如文章浏览次数，文章的自定义字段等都存储在这里。

 

meta_id – 元信息ID，bigint(20)值，附加属性为auto_increment。

post_id – 文章ID，bigint(20)值，相当于wp_posts.ID。

meta_key – 元信息的关键字，varchar(255)值。

meta_value – 元信息的值，text值。

这 些内容主要是在文章及页面编辑页(Write Post, Write Page)的”Add a new custom field to this post(page):”下进行设定的。meta_key就对应名为”key”的下拉列表中的项，而值由用户自己填上(某些时候，wp也会自动加入，如文 章中有的音频媒体)。

 

```sql
CREATE TABLE IF NOT EXISTS `wp_postmeta` (
  `meta_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `post_id` bigint(20) unsigned NOT NULL DEFAULT '0',
  `meta_key` varchar(255) DEFAULT NULL,
  `meta_value` longtext,
  PRIMARY KEY (`meta_id`),
  KEY `post_id` (`post_id`),
  KEY `meta_key` (`meta_key`(191))
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;
```

 

```sql
INSERT INTO `wp_postmeta` (`meta_id`, `post_id`, `meta_key`, `meta_value`) VALUES
(1, 2, '_wp_page_template', 'default');
```

 

 

## wp_posts:

> 用于保存你所有的文章(posts)的相关信息的表。文章信息表，包括了日志、附件、页面等等信息，是WordPress最重要的一个数据表。

 

ID – 每篇文章的唯一ID，bigint(20)值，附加属性auto_increment。

post_author – 每篇文章的作者的编号，int(4)值，应该对应的是wp_users.ID。

post_date – 每篇文章发表的时间，datetime值。它是GMT时间加上时区偏移量的结果。

post_date_gmt – 每篇文章发表时的GMT(格林威治)时间，datetime值。

post_content – 每篇文章的具体内容，longtext值。你在后台文章编辑页面中写入的所有内容都放在这里。

post_title – 文章的标题，text值。

post_category – 文章所属分类，int(4)值。

post_excerpt – 文章摘要，text值。

post_status – 文章当前的状态，枚举enum(’publish’,’draft’,’private’,’static’,’object’)值，publish为已 发表，draft为草稿，private为私人内容(不会被公开) ，static(不详)，object(不详)。默认为publish。

comment_status – 评论设置的状态，也是枚举enum(’open’,’closed’,’registered_only’)值，open为允许评论，closed为不允 许评论，registered_only为只有注册用户方可评论。默认为open，即人人都可以评论。

ping_status – ping状态，枚举enum(’open’,’closed’)值，open指打开pingback功能，closed为关闭。默认值是open。

post_password – 文章密码，varchar(20)值。文章编辑才可为文章设定一个密码，凭这个密码才能对文章进行重新强加或修改。

post_name – 文章名，varchar(200)值。这通常是用在生成permalink时，标识某篇文章的一段文本或数字，也即post slug。
to_ping – 强制该文章去ping某个URI。text值。

pinged – 该文章被pingback的历史记录，text值，为一个个的URI。

post_modified – 文章最后修改的时间，datetime值，它是GMT时间加上时区偏移量的结果。

post_modified_gmt – 文章最后修改的GMT时间，datetime值。

post_content_filtered – 不详，text值。

post_parent – 文章的上级文章的ID，int(11)值，对应的是wp_posts.ID。默认为0，即没有上级文章。

guid – 这是每篇文章的一个地址，varchar(255)值。默认是这样的形式: http://your.blog.site/?p=1，如果你形成permalink功能，则通常会是: 你的Wordpress站点地址+文章名。

menu_order – 不详，int(11)值，默认为0。

post_type – 文章类型，具体不详，varchar(100)值。默认为0。

post_mime_type – 不详。varchar(100)值。

comment_count – 评论计数，具体用途不详，bigint(20)值。

 

```sql
CREATE TABLE IF NOT EXISTS `wp_posts` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `post_author` bigint(20) unsigned NOT NULL DEFAULT '0',
  `post_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_date_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_content` longtext NOT NULL,
  `post_title` text NOT NULL,
  `post_excerpt` text NOT NULL,
  `post_status` varchar(20) NOT NULL DEFAULT 'publish',
  `comment_status` varchar(20) NOT NULL DEFAULT 'open',
  `ping_status` varchar(20) NOT NULL DEFAULT 'open',
  `post_password` varchar(20) NOT NULL DEFAULT '',
  `post_name` varchar(200) NOT NULL DEFAULT '',
  `to_ping` text NOT NULL,
  `pinged` text NOT NULL,
  `post_modified` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_modified_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_content_filtered` longtext NOT NULL,
  `post_parent` bigint(20) unsigned NOT NULL DEFAULT '0',
  `guid` varchar(255) NOT NULL DEFAULT '',
  `menu_order` int(11) NOT NULL DEFAULT '0',
  `post_type` varchar(20) NOT NULL DEFAULT 'post',
  `post_mime_type` varchar(100) NOT NULL DEFAULT '',
  `comment_count` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `post_name` (`post_name`(191)),
  KEY `type_status_date` (`post_type`,`post_status`,`post_date`,`ID`),
  KEY `post_parent` (`post_parent`),
  KEY `post_author` (`post_author`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;
```

 

```
INSERT INTO `wp_posts` (`ID`, `post_author`, `post_date`, `post_date_gmt`, `post_content`, `post_title`, `post_excerpt`, `post_status`, `comment_status`, `ping_status`, `post_password`, `post_name`, `to_ping`, `pinged`, `post_modified`, `post_modified_gmt`, `post_content_filtered`, `post_parent`, `guid`, `menu_order`, `post_type`, `post_mime_type`, `comment_count`) VALUES
(1, 1, '2016-04-03 08:48:29', '2016-04-03 00:48:29', '欢迎使用WordPress。这是您的第一篇文章。编辑或删除它，然后开始写作吧！', '世界，您好！', '', 'publish', 'open', 'open', '', 'hello-world', '', '', '2016-04-03 08:48:29', '2016-04-03 00:48:29', '', 0, 'http://localhost:8081/?p=1', 0, 'post', '', 1),
(2, 1, '2016-04-03 08:48:29', '2016-04-03 00:48:29', '这是一个范例页面。它和博客文章不同，因为它的页面位置是固定的，同时会显示于您的博客导航栏（大多数主题中）。大多数人会新增一个“关于”页面向访客介绍自己。它可能类似下面这样：\n\n<blockquote>我是一个很有趣的人，我创建了工厂和庄园。并且，顺便提一下，我的妻子也很好。</blockquote>\n\n……或下面这样：\n\n<blockquote>XYZ装置公司成立于1971年，公司成立以来，我们一直向市民提供高品质的装置。我们位于北京市，有超过2,000名员工，对北京市有着相当大的贡献。</blockquote>\n\n作为一个新的WordPress用户，您可以前往<a href="http://localhost:8081/wp-admin/">您的仪表盘</a>删除这个页面，并建立属于您的全新内容。祝您使用愉快！', '示例页面', '', 'publish', 'closed', 'open', '', 'sample-page', '', '', '2016-04-03 08:48:29', '2016-04-03 00:48:29', '', 0, 'http://localhost:8081/?page_id=2', 0, 'page', '', 0),
(3, 1, '2016-04-03 08:58:06', '0000-00-00 00:00:00', '', '自动草稿', '', 'auto-draft', 'open', 'open', '', '', '', '', '2016-04-03 08:58:06', '0000-00-00 00:00:00', '', 0, 'http://localhost:8081/?p=3', 0, 'post', '', 0),
(4, 1, '2016-04-03 09:00:50', '0000-00-00 00:00:00', '', '自动草稿', '', 'auto-draft', 'open', 'open', '', '', '', '', '2016-04-03 09:00:50', '0000-00-00 00:00:00', '', 0, 'http://localhost:8081/?p=4', 0, 'post', '', 0);
```

 

```

```

## wp_termmeta ：

> 分类与文章信息表（wp_posts）、链接表(wp_links)的关联表。

 

```
CREATE TABLE IF NOT EXISTS `wp_termmeta` (
  `meta_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `term_id` bigint(20) unsigned NOT NULL DEFAULT '0',
  `meta_key` varchar(255) DEFAULT NULL,
  `meta_value` longtext,
  PRIMARY KEY (`meta_id`),
  KEY `term_id` (`term_id`),
  KEY `meta_key` (`meta_key`(191))
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;
```

 

## wp_terms ：

> 文章分类、链接分类、标签的信息表。

 

```
CREATE TABLE IF NOT EXISTS `wp_terms` (
  `term_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL DEFAULT '',
  `slug` varchar(200) NOT NULL DEFAULT '',
  `term_group` bigint(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`term_id`),
  KEY `slug` (`slug`(191)),
  KEY `name` (`name`(191))
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;
```

 

```
INSERT INTO `wp_terms` (`term_id`, `name`, `slug`, `term_group`) VALUES
(1, '未分类', 'uncategorized', 0);
```

 

## wp_term_relationships ：

> 分类与文章信息表（wp_posts）、链接表(wp_links)的关联表。

 

```
CREATE TABLE IF NOT EXISTS `wp_term_relationships` (
  `object_id` bigint(20) unsigned NOT NULL DEFAULT '0',
  `term_taxonomy_id` bigint(20) unsigned NOT NULL DEFAULT '0',
  `term_order` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`object_id`,`term_taxonomy_id`),
  KEY `term_taxonomy_id` (`term_taxonomy_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

 

## wp_term_taxonomy ：

> 分类信息表，区分wp_terms信息的分类类型，有category、link_category和tag三种分类类型。

 

```
CREATE TABLE IF NOT EXISTS `wp_term_taxonomy` (
  `term_taxonomy_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `term_id` bigint(20) unsigned NOT NULL DEFAULT '0',
  `taxonomy` varchar(32) NOT NULL DEFAULT '',
  `description` longtext NOT NULL,
  `parent` bigint(20) unsigned NOT NULL DEFAULT '0',
  `count` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`term_taxonomy_id`),
  UNIQUE KEY `term_id_taxonomy` (`term_id`,`taxonomy`),
  KEY `taxonomy` (`taxonomy`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;
```

 

```
INSERT INTO `wp_term_taxonomy` (`term_taxonomy_id`, `term_id`, `taxonomy`, `description`, `parent`, `count`) VALUES
(1, 1, 'category', '', 0, 1);
```

 

## wp_usermeta : 

> 用于保存用户元信息(meta)的表。

 

umeta_id – 元信息ID，bigint(20)值，附加属性auto_increment。

user_id – 元信息对应的用户ID，bigint(20)值，相当于wp_users.ID。

meta_key – 元信息关键字，varchar(255)值。

meta_value – 元信息的详细值，longtext值。

 

```
CREATE TABLE IF NOT EXISTS `wp_usermeta` (
  `umeta_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL DEFAULT '0',
  `meta_key` varchar(255) DEFAULT NULL,
  `meta_value` longtext,
  PRIMARY KEY (`umeta_id`),
  KEY `user_id` (`user_id`),
  KEY `meta_key` (`meta_key`(191))
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=20 ;
```

 

```
INSERT INTO `wp_usermeta` (`umeta_id`, `user_id`, `meta_key`, `meta_value`) VALUES
(1, 1, 'nickname', 'souvc'),
(2, 1, 'first_name', ''),
(3, 1, 'last_name', ''),
(4, 1, 'description', ''),
(5, 1, 'rich_editing', 'true'),
(6, 1, 'comment_shortcuts', 'false'),
(7, 1, 'admin_color', 'fresh'),
(8, 1, 'use_ssl', '0'),
(9, 1, 'show_admin_bar_front', 'true'),
(10, 1, 'wp_capabilities', 'a:1:{s:13:"administrator";b:1;}'),
(11, 1, 'wp_user_level', '10'),
(12, 1, 'dismissed_wp_pointers', ''),
(13, 1, 'show_welcome_panel', '1'),
(14, 1, 'session_tokens', 'a:2:{s:64:"863288c6d33f046c578de0cafee38ec3b49a0ca4e078088b0065cbafcdd06d3c";a:4:{s:10:"expiration";i:1459817885;s:2:"ip";s:3:"::1";s:2:"ua";s:72:"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:45.0) Gecko/20100101 Firefox/45.0";s:5:"login";i:1459645085;}s:64:"310725109de88bde9eb342337323927d2af5e6c98b5662f715dd1acc1697609f";a:4:{s:10:"expiration";i:1459830580;s:2:"ip";s:3:"::1";s:2:"ua";s:72:"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:45.0) Gecko/20100101 Firefox/45.0";s:5:"login";i:1459657780;}}'),
(15, 1, 'wp_dashboard_quick_press_last_post_id', '3'),
(16, 1, 'managenav-menuscolumnshidden', 'a:5:{i:0;s:11:"link-target";i:1;s:11:"css-classes";i:2;s:3:"xfn";i:3;s:11:"description";i:4;s:15:"title-attribute";}'),
(17, 1, 'metaboxhidden_nav-menus', 'a:2:{i:0;s:12:"add-post_tag";i:1;s:15:"add-post_format";}'),
(18, 1, 'wp_user-settings', 'mfold=o'),
(19, 1, 'wp_user-settings-time', '1459658009');
```

 

## wp_users:

> 用于保存Wordpress使用者的相关信息的表。

 

ID – 用户唯一ID,bigint(20)值，带附加属性auto_increment。

user_login – 用户的注册名称，varchar(60)值。

user_pass – 用户密码，varchar(64)值，这是经过加密的结果。好象用的是不可逆的MD5算法。

user_nicename – 用户昵称，varchar(50)值。

user_email – 用户电邮地址，varchar(100)值。

user_url – 用户网址，varchar(100)值。

user_registered – 用户注册时间，datetime值。

user_activation_key – 用户激活码，不详。varchar(60)值。

user_status – 用户状态，int(11)值，默认为0。

display_name – 来前台显示出来的用户名字，varchar(250)值。

 

```
CREATE TABLE IF NOT EXISTS `wp_users` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_login` varchar(60) NOT NULL DEFAULT '',
  `user_pass` varchar(255) NOT NULL DEFAULT '',
  `user_nicename` varchar(50) NOT NULL DEFAULT '',
  `user_email` varchar(100) NOT NULL DEFAULT '',
  `user_url` varchar(100) NOT NULL DEFAULT '',
  `user_registered` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_activation_key` varchar(255) NOT NULL DEFAULT '',
  `user_status` int(11) NOT NULL DEFAULT '0',
  `display_name` varchar(250) NOT NULL DEFAULT '',
  PRIMARY KEY (`ID`),
  KEY `user_login_key` (`user_login`),
  KEY `user_nicename` (`user_nicename`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;
```

 

```
INSERT INTO `wp_users` (`ID`, `user_login`, `user_pass`, `user_nicename`, `user_email`, `user_url`, `user_registered`, `user_activation_key`, `user_status`, `display_name`) VALUES
(1, 'souvc', '$P$B1X3tpz3DDAzQInF0pTRXff8PxMZ6R0', 'souvc', '291117974@qq.com', '', '2016-04-03 00:48:29', '', 0, 'souvc');
```

 

 

参考：

http://blog.csdn.net/liujiyong7/article/details/8042132

http://zmingcx.com/wordpress-database-tdescription.html

http://blog.csdn.net/liujiyong7/article/details/8037843

 

相关资源：[SQL Server 2008实战(SQL Server程序员和DBA不可或缺的权威参考手册)*--*详细书签版](http://download.csdn.net/download/fksec/5056144?spm=1001.2101.3001.5697)