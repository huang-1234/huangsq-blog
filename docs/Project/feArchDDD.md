## 架构分层

目前前端开发主要是以单页应用为主，当应用的业务逻辑足够复杂的时候，总会遇到类似下面的问题：

*   业务逻辑过于集中在视图层，导致多平台无法共用本应该与平台无关的业务逻辑，例如一个产品需要维护 Mobile 和 PC 两端，或者同一个产品有 Web 和 React Native 两端；

*   产品需要多人协作时，每个人的代码风格和对业务的理解不同，导致业务逻辑分布杂乱无章；

*   对产品的理解停留在页面驱动层面，导致实现的技术模型与实际业务模型出入较大，当业务需求变动时，技术模型很容易被摧毁；

*   过于依赖前端框架，导致如果重构进行框架切换时，需要重写所有业务逻辑并进行回归测试。

针对上面所遇到的问题，笔者学习了一些关于 DDD（领域驱动设计）、Clean Architecture 等知识，并收集了类似思想在前端方面的实践资料，形成了下面这种前端分层架构：

  其中 View 层想必大家都很了解，就不在这里介绍了，重点介绍下下面三个层的含义：

### Services 层

Services 层是用来对底层技术进行操作的，例如封装 AJAX 请求, 操作浏览器 cookie、locaStorage、indexDB，操作 native 提供的能力（如调用摄像头等），以及建立 Websocket 与后端进行交互等。

其中 Services 层又可细分出 request 层和 translator 层， request 层主要是实现 Services 的大部分功能。而 translator 层主要用于清洗从服务端或客户端接口返回的数据：删除部分数据、修改属性名、转化部分数据等，一般可定义成纯函数形式。下面以本项目实际代码为例进行讲解。

从后端获取 quote 数据:

``` ts
export class CommonService implements ICommonService {
  @m({ maxAge: 60 * 1000 })
  public async getQuoteList(): Promise<IQuote[]> {
    const {
      data: { list }
    } = await http({
      method: 'post',
      url: '/quote/getList',
      data: {}
    });

    return list;
  }
}

```

向客户端日历中同步 Note 数据:

``` ts
export class NativeService implements INativeService {
  // 同步到日历
  @p()
  public syncCalendar(params: SyncCalendarParams, onSuccess: () => void): void {
    const cb = async (errCode: number) => {
      const msg = NATIVE_ERROR_CODE_MAP[errCode];

      Vue.prototype.$toast(msg);

      if (errCode !== 6000) {
        this.errorReport(msg, 'syncCalendar', params);
      } else {
        await onSuccess();
      }
    };

    dsbridge.call('syncCalendar', params, cb);
  }
  ...
}

```

从 indexDB 读取某个 Note 详情数据：

``` ts
import { noteTranslator } from './translators';

export class NoteService implements INoteService {
  public async get(id: number): Promise<INotebook | undefined> {
    const db = await createDB();

    const notebook = await db.getFromIndex('notebooks', 'id', id);
    return noteTranslator(notebook!);
  }
}

```

其中，noteTranslator 就属于 translator 层，用于订正接口返回的 note 数据，定义如下：

``` ts
export function noteTranslator(item: INotebook) {
  // item.themeColor = item.color;
  return item;
}

```

另外我们可以拓宽下思路，当后端 API 仍在开发的时候，我们可以使用 indexDB 等本地存储技术进行模拟，建立一个 note-indexDB 服务，先提供给上层 Interactors 层进行调用，当后端 API 开发好后，就可以创建一个 note-server 服务，来替换之前的服务。只要保证前后两个服务对外暴露的接口一致，另外与上层的 Interactors 层没有过度耦合，即可实现快速切换。

### Entities 层

实体 Entity 是领域驱动设计的核心概念，它是领域服务的载体，它定义了业务中某个个体的属性和方法。例如本项目中 Note 和 Notebook 都是实体。区分一个对象是否是实体，主要是看他是否有唯一的标志符（例如 id）。下面是本项目的实体 Note:

``` ts
export default class Note {
  public id: number;
  public name: string;
  public deadline: Date | undefined;
  ...

  constructor(note: INote) {
    this.id = note.id;
    this.name = note.name;
    this.deadline = note.deadline;
    ...
  }

  public get isExpire() {
    if (this.deadline) {
      return this.deadline.getTime() < new Date().getTime();
    }
  }

  public get deadlineStr() {
    if (this.deadline) {
      return formatTime(this.deadline);
    }
  }
}

```

通过上面的代码可以看到，这里主要是以实体本身的属性以及派生属性为主，当然实体本身也可以具有方法，用于实现属于实体自身的业务逻辑（笔者认为业务逻辑可以分为两部分，一部分业务逻辑属于跟实体强相关的，应该通过在实体类中的方法实现。另一部分业务逻辑则更多的是实体之间的业务，则可以放在 Interactors 层中实现）。只是本项目中还没有涉及，在这里就不作更多说明了，有兴趣的可以参考下面列出来的笔者翻译的文章：[可扩展的前端#2--常见模式（译）](https://juejin.cn/post/6844903952182575112 "https://juejin.cn/post/6844903952182575112")。

另外笔者认为并不是所有的实体都应该按上面那样封装成一个类，如果某个实体本身业务逻辑很简单，就没有必要进行封装，例如本项目中 Notebook 实体就没有做任何封装，而是直接在 Interactors 层调用 Services 层提供的 API。毕竟我们做这些分层最终的目的就是理顺业务逻辑，提升开发效率，所以没有必要过于死板。

### Interactors 层

Interactors 层是负责处理业务逻辑的层，主要是由业务用例组成。一般情况下 Interactor 是一个单例，它使我们能够存储一些状态并避免不必要的 HTTP 调用，提供一种重置应用程序状态属性的方法（例如：在失去修改记录时恢复数据），决定什么时候应该加载新的数据。

下面是本项目中 Common 的 Interactors 层提供的公共调用的业务：

``` ts
class CommonInteractor {
  public static getInstance() {
    return this._instance;
  }

  private static _instance = new CommonInteractor(new CommonService());

  private _quotes: any;

  constructor(private _service: ICommonService) {}

  public async getQuoteList() {
    // 单例模式下，将一些基本固定不变的接口数据保存在内存中，避免重复调用
    // 但要注意避免内存泄露
    if (this._quotes !== undefined) {
      return this._quotes;
    }

    let response;

    try {
      response = await this._service.getQuoteList();
    } catch (error) {
      throw error;
    }

    this._quotes = response;
    return this._quotes;
  }
}

```

通过上面的代码可以看到，Sevices 层提供的类的实例主要是通过 Interactors 层的类的构造函数获取到，这样就可以达到两层之间解耦，实现快速切换 service 的目的了，当然这个和依赖注入 DI 还是有些差距的，不过已经满足了我们的需求。

另外 Interactors 层还可以获取 Entities 层提供的实体类，将实体类提供的与实体强相关的业务逻辑和 Interactors 层的业务逻辑融合到一起提供给 View 层，例如 Note 的 Interactors 层部分代码如下：

``` ts
class NoteInteractor {
  public static getInstance() {
    return this._instance;
  }

  private static _instance = new NoteInteractor(
    new NoteService(),
    new NativeService()
  );

  constructor(
    private _service: INoteService,
    private _service2: INativeService
  ) {}

  public async getNote(notebookId: number, id: number) {
    try {
      const note = await this._service.get(notebookId, id);
      if (note) {
        return new Note(note);
      }
    } catch (error) {
      throw error;
    }
  }
}

```

当然这种分层架构并不是银弹，其主要适用的场景是：实体关系复杂，而交互相对模式化，例如企业软件领域。相反实体关系简单而交互复杂多变就不适合这种分层架构了。

在具体业务开发实践中，这种领域模型以及实体一般都是有后端同学确定的，我们需要做的是，和后端的领域模型保持一致，但不是一样。例如同一个功能，在前端只是一个简单的按钮，而在后端则可能相当复杂。

另外需要明确的是，架构和项目文件结构并不是等同的，文件结构是你从视觉上分离应用程序各部分的方式，而架构是从概念上分离应用程序的方式。你可以在很好地保持相同架构的同时，选择不同的文件结构方式。没有完美的文件结构，因此请根据项目的不同选择适合你的文件结构。

最后引用蚂蚁金服数据体验技术的《前端开发-领域驱动设计》文章中的总结作为结尾：

> 要明白，驱动领域层分离的目的并不是页面被复用，这一点在思想上一定要转化过来。领域层并不是因为被多个地方复用而被抽离。它被抽离的原因是：
>
> -   领域层是稳定的（页面以及与页面绑定的模块都是不稳定的）
> -   领域层是解耦的（页面是会耦合的，页面的数据会来自多个接口，多个领域）
> -   领域层具有极高复杂度，值得单独管理(view 层处理页面渲染以及页面逻辑控制，复杂度已经够高，领域层解耦可以轻 view 层。view 层尽可能轻量是我们架构师 cnfi 主推的思路)
> -   领域层以层为单位是可以被复用的（你的代码可能会抛弃某个技术体系，从 vue 转成 react，或者可能会推出一个移动版，在这些情况下，领域层这一层都是可以直接复用）
> -   为了领域模型的持续衍进(模型存在的目的是让人们聚焦，聚焦的好处是加强了前端团队对于业务的理解，思考业务的过程才能让业务前进)

推荐几个相关的类库：

[react-clean-architecture](https://link.juejin.cn?target=https%3A%2F%2Fgithub. com%2Feduardomoroni%2Freact-clean-architecture "https://github.com/eduardomoroni/react-clean-architecture")

[business-rules-package](https://link.juejin.cn?target=https%3A%2F%2Fgithub. com%2Ffabriciomendonca%2Fbusiness-rules-package "https://github.com/fabriciomendonca/business-rules-package")

[ddd-fe-demo](https://link.juejin.cn?target=https%3A%2F%2Fgithub. com%2FVincedream%2Fddd-fe-demo "https://github.com/Vincedream/ddd-fe-demo")

推荐几篇相关文章：

[前端架构-让重构不那么痛苦（译）](https://juejin.cn/post/6844903949166723079 "https://juejin.cn/post/6844903949166723079")

[可扩展的前端#1--架构基础（译）](https://juejin.cn/post/6844903951406465038 "https://juejin.cn/post/6844903951406465038")

[可扩展的前端#2--常见模式（译）](https://juejin.cn/post/6844903952182575112 "https://juejin.cn/post/6844903952182575112")

[领域驱动设计在互联网业务开发中的实践](https://link.juejin.cn?target=https%3A%2F%2Ftech. meituan. com%2F2017%2F12%2F22%2Fddd-in-practice. html "https://tech.meituan.com/2017/12/22/ddd-in-practice.html")

[前端开发-领域驱动设计](https://juejin.cn/post/6844903618680881165 "https://juejin.cn/post/6844903618680881165")

[领域驱动设计在前端中的应用](https://juejin.cn/post/6844903896888918023 "https://juejin.cn/post/6844903896888918023")

PS：

移动 web 最佳实践项目接下来的计划：

实践 APP 离线包技术，即将前端静态资源提前集成到客户端中，可以将网页的网络加载时间变为 0，极大提升应用的用户体验。

计划在今年年底之前完成，因这个方案会涉及到前端、客户端以及后端，尤其是客户端工作量较大，所以会花费较长周期，届时会开源整个方案的所有端代码，敬请期待。
