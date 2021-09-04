# vue+ts 项目 vue-property-decorator

在 vue 项目使用 ts 时，装饰器有以下几种，下面为这些装饰器的具体用法并且有和 js 中写法的对比：

1. @Component
2. @Emit
3. @Prop
4. @Watch
5. @Model
6. @Inject / @Provide
7. Mixins

下面为具体代码：

### 1.@Component

#### ts 中引入组件 components 写在@Component 中，如下：

```vue
<template>
  <div class="parent">
    parent组件--{{title}}
    <hr />
    <Home v-model="title"></Home>
    <About v-model="title"></About>
  </div>
</template>

<script lang="ts">
  import Home from "./Home.vue";
  import About from "./About.vue";
  import { Component, Vue } from "vue-property-decorator";
  @Component({
    components: {
      Home,
      About,
    },
  })
  export default class extends Vue {
    private title: string = "父组件中的值";
  }
</script>

```

#### 下面为在 js 中引入组件 components 的写法，与上面 ts 的代码效果一样：

```vue
<script>
import Home from './Home.vue'
import About from './About.vue'
export default {
    data() {
        return {
            title: '父组件中的值'
        }
    },
    components: {
        Home,
        About
    }
}
</script>

```

### 2.@Emit

#### ts 中@Emit 的用法如下：

```vue
<template>
  <div class="home">
    vue+ts项目vue-property-decorator用法
    <hr>
    <button @click="triggerEmit('qqq')">触发emit</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';

@Component({})
export default class Home extends Vue {

  private mounted() {
    this.$on('demo-log', (data: any): void => {
      alert(data)
    })
  }

  @Emit('demo-log')
  triggerEmit(n: any) {
    console.log('hhh')
  }
}
</script>

```

下面为@Emit 的另一种写法，\$on 位置使用 - 链接，@Emit 位置直接使用驼峰命名，则可以省略括号中的名称：”

```tsx
export default class Home extends Vue {
  private mounted() {
    this.$on('trigger-emit', (data: any): void => {
      alert(data)
    })
  }
  @Emit()
  triggerEmit(n: any) {
    console.log('hhh')
  }
}

```

#### 下面为\$Emit 在 js 中的写法，与上面 ts 的代码效果一样：

```tsx
export default {
  data() {
    return {}
  },
  mounted() {
    this.$on('trigger-emit', data => {
      alert(data)
    })
  },
  methods: {
    triggerEmit(val) {
      this.$emit('trigger-emit', val)
    }
  }
}

```

### 3.@Prop

#### ts 中@Prop 的用法如下：

```tsx
<template>
  <div class="home">
    vue+ts项目vue-property-decorator用法
    <hr>
    <p>这是从父组件中传过来的值: {{title}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class Home extends Vue {
  @Prop() title!: string;
  // prop的类型和默认值
  // @Prop({type: String, default: 'default value'}) title!: string;
}
</script>

```

#### 下面为 prop 在 js 中的写法，与上面 ts 的代码效果一样：

```tsx
export default {
  data() {
    return {}
  },
  props: ['title'],
  // props: {
  //   title: {
  //     style: String,
  //     default: 'default value'
  //   }
  // }
}

```

### 4.@Watch

#### ts 中@Watch 的用法如下

```tsx
<template>
  <div class="home">
    vue+ts项目vue-property-decorator用法
    <hr>
    <input type="text" v-model="inputValue">
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component({})
export default class Home extends Vue {
  private inputValue: string = ''
  @Watch('inputValue')
  valueChange(newValue: string, oldValue: string) {
    console.log(newValue, oldValue)
  }
  // 对watch的配置为第二个参数，以对象形式传入
  // @Watch('inputValue',{ deep: true })
  // valueChange(newValue: string, oldValue: string) {
  //   console.log(newValue, oldValue)
  // }

}
</script>

```

#### 下面为 watch 在 js 中的写法，与上面 ts 的代码效果一样：

```tsx
export default {
  data() {
    return {
      inputValue: ''
    }
  },
  watch: {
    inputValue(newValue, oldValue) {
      console.log(newValue, oldValue)
    }
  }
}

```

### 5.@Model

#### ts 中@Model 的用法如下

父组件代码如下

```vue
<template>
    <div class="parent">
        parent组件--{{title}}
        <hr>
        <Home v-model="title"></Home>
        <!-- 直接使用v-mode为以下使用标签的语法糖，默认子组件使用value接受prop传值使用emit调用input方法修改值，在使用model参数prop修改如何接受，event修改emit调用哪个方法来修改值 -->
        <!--<Home :value="title" @input="title=$event.target.value"></Home>-->
    </div>
</template>

<script lang='ts'>
    import Home from './Home.vue'
    import { Component, Vue } from 'vue-property-decorator';
    @Component({
        components: {
            Home
        }
    })
    export default class  extends Vue {
        private title: string = '父组件中的值'
    }
</script>

```

子组件 ts 代码如下

```vue
<template>
  <div class="home">
    vue+ts项目vue-property-decorator用法
    <hr>
    <input type="text" v-model="inputValue" @input="valueChange($event.target.value)">
  </div>
</template>

<script lang="ts">
import { Component, Vue, Model, Emit, Prop } from 'vue-property-decorator';

@Component({})
export default class Home extends Vue {
  private inputValue: string = ''
  private created() {
    this.inputValue = this.valueFromModel
  }
  @Model ('changeValueFromModel')  valueFromModel !: string;
  @Emit('changeValueFromModel')
  // 参数应该为输入框的值，所以上面传过来的值应该为value而不能是e
  valueChange(val: string) {}

}
</script>

```

#### 下面为 model 在 js 中的写法，与上面 ts 的代码效果一样：

```tsx
export default {
  model:{
    prop: 'valueFromModel',
    event: 'changeValueFromModel'
  },
  props: ['valueFromModel'],
  data() {
    return {
      inputValue: ''
    }
  },
  created() {
    this.inputValue = this.valueFromModel
  },
  methods: {
    valueChange(e) {
      this.$emit('changeValueFromModel', e.target.value)
    }
  }

}

```

### 6.@Provide / @Inject

#### ts 中@Provide / @Inject 用法如下

父组件

```vue
<template>
    <div class="parent">
        parent组件--{{title}}
        <Home></Home>
    </div>
</template>

<script lang='ts'>
    import Home from './Home.vue'
    import { Component, Vue, Provide } from 'vue-property-decorator';
    @Component({
        components: {
            Home
        }
    })
    export default class  extends Vue {
        private title: string = '父组件中的值'
        @Provide()
        pOne = 'oneFromProvide'

        @Provide('pTwo')
        two = 'twoFromProvide'
    }
</script>

```

子组件

```vue
<template>
  <div class="home">
    vue+ts项目vue-property-decorator用法
    <hr>
    来自provide中的值--1--{{pOne}}--2--{{pTwo}}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Inject } from 'vue-property-decorator';
import outMixins from './mixins';

@Component({})
export default class Home extends Vue {
  @Inject('pOne')
    pOne!: string;

  @Inject({
      from:'pTwo',
      default:'default value'
  })
  pTwo!: string;
}
</script>

```

#### 下面为 project / inject 在 js 中的写法，与上面 ts 的代码效果一样：

父组件

```vue
<template>
    <div class="parent">
        parent组件
        <About></About>
    </div>
</template>

<script>
import About from './About.vue'
export default {
    components: {
        About
    },
    provide () {
        return {
            pOne: 'oneFromProvide',
            pTwo: 'twoFromProvide'
        }
    }
}
</script>

```

子组件

```vue
<template>
  <div class="home">
    vue+js项目
    <hr>
    来自provide中的值--1--{{pOne}}--2--{{pTwo}}
  </div>
</template>

<script>
export default {
  inject: {
    pOne: 'pOne',
    pTwo: { from: 'pTwo', default: 'default value' }
  }
}
</script>

```

### 7.Mixins

#### ts 中 Mixins 的用法如下

mixins.ts 文件如下

```tsx
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class myMixins extends Vue {
    valueFromMixins: string = "来自mixins的value"
}

```

ts 代码如下

```vue
<template>
  <div class="home">
    vue+ts项目vue-property-decorator用法
    <hr>
    来自mixins中的变量--{{valueFromMixins}}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Model, Emit, Prop } from 'vue-property-decorator';
import outMixins from './mixins';

@Component({
  mixins: [outMixins]
})
export default class Home extends Vue {}
</script>


```

#### 下面为 mixins 在 js 中的写法，与上面 ts 的代码效果一样：

```vue
<script>
import {outMixins} from './mixins'
export default {
  mixins:[outMixins]
}
</script>
```
