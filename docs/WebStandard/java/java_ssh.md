## [Java SSH框架学习（入门）](https://www.cnblogs.com/skipping/p/5373257.html)

SSH就是 struts+spring+hibernate 的一个集成框架，是java中一种流行的JAVA WEB 应用程序开源框架。因为我最熟悉的还是ASP.NET的的MVC和Python的Django框架，今天有必要学习下java 的流行框架SSH，其实作为WEB应用的整体框架，我发现其中有很多类似的地方，比如这里的Struts就是Django中的Views层+模板层的一个前台数据填充模块，而spring 就是连接Struts和Hibernate 的中间业务逻辑层,但是这在Django中已经被划分到views中去了，最后的Hibernate 就是典型的数据库映射层嘛，这一点和Django的models 层有相似之处，就是没有Django的简化，下面是看了篇博客然后总结的：

Struts

这是的java 基于Sun J2EE 平台的MVC框架，主要是采用 Servlet 和 JSP 技术来实现的。

官方地址：[http://struts.apache.org](http://struts.apache.org/)

 

Spring 

解决许多J2EE开发中常见的问题的框架，Spring提供了管理业务对象的一致性方法并且鼓励面向接口编程而不是对类编程，Spring架构的基础是基于JavaBean属性的Inersion of Control容器，String提供了唯一的数据访问抽象，包括简单和有效的JDBC框架，String 结合Hibernate和其他的O/R mapping 解决方案等。

官方地址：spring: [http://www.springsource.org](http://www.springsource.org/)

 

Hibernate

他是一个开源的对象关系映射框架，它对JDBC进行了非常轻量级的对象封装，使得Java 程序员可以随心所欲的使用对象编程思维来操控数据库，Hibernate可以在应用EJB的J2EE架构中取代CMP，完成数据持久化的重任。

官方地址：[http://www.hibernate.org](http://www.hibernate.org/)

 

在SSH的组合模式中，三者各自的作用

Struts 是一个很好的MVC框架，主要技术是Servlet 和Jsp.Struts的MVC设计模式可以使我们的逻辑变得很清晰，让程序变得层次分明（类似于Django中的Views层）。

Spring提供了管理业务对象的一致化方法，并且鼓励对接口编程而不是对类编程，这样在很大程度上松解了耦合（已经被融入到Views层中了）。

Hibernate 是用来持久化数据的，提供全面的面向对象的数据库操作，Hibernate 对JDBC进行了非常轻量级的封装，这样和数据库打交道就容易多了（类似于Django 中的models层）。

其中很多没说的，直接看看SSH架构图吧：

![img](java_ssh.assets/20140417203418265)

Struts负责的是web层：

ActionFormBean接收网页中表单提交的数据，然后通过Action进行处理，再Forward到对应的网页中，在Struts-config.xml中定义`<action-mapping>`,这样ActionServlet会加载进来。

Spring负责的是业务逻辑层，即Service：

Service为Action提供统一的调用接口，封装持久层的DAO，并且集成了Hibernate ,Spring可对JavaBean（对象）和事物进行统一的管理。

Hibernate负责持久层，完成数据库的CRUD操作：

Hibernate有一组hbm.xml和PO，是数据库中的对应的表相对应的，然后定义DAO，这些是与数据库打交道的类。（直接就是复杂化的Models层）

下面是SSH中的对象调用流程图：

![img](java_ssh.assets/20140417204518296)

主要的数据流路径是：Struts->Spring->Hibernate(JSP->Action->Service->DAO->Hibernate)

 

转载地址：http://blog.csdn.net/l_f0rm4t3d/article/details/23956247