---
title: VUE2
description: 一款简单的前端框架
categories: 技术
tags: 前端框架
cover: >-
  https://cdn.staticaly.com/gh/apprehen/pciture@master/6A5D0E39BB880E70137F03011E597BBF.2uhydryacw40.webp
abbrlink: e08c89f9
date: 2023-02-27 09:28:53
---
# VUE认识

渐进式的JS框架，关注视图层，数据驱动
初始vue

```html
<script src="./js/vue.js"></script>
<div id="root">
    <h1>helloworld,{{name}}</h1>
</div>
<script>
        new Vue({
        el: '#root',
        data: {
            name:  'vue'
        }
    })
</script>
```

最后会在浏览器上打印helloworld，vue
1.想让vue工作，就必须创建一个vue实例，且要传入一个配置对象
2.root里的容器依然符合html代码的规范，新加入了一些特殊的vue语法
3.root容器里面的代码称之为[vue 模板] (templete)
4.Vue实例和容器是一一对应的
5.脚手架是只有一个vue实例，配合组件一起使用
6.{{xxx}}中要写js表达式,xxx可以自动的读取到data中的所有属性
7.一旦data中的数据发生变化，页面中用到该数据的地方也会自动更新

> JS 表达式 和 JS 代码(语句)
> 1.表达式: 一个表达式会产生一个值，可以放在任何一个需要值的地方:
> 	exp:  a   a+b  test(1)  a==b ? 'a' : 'b'
> 2.代码 : js语句
> 	exp: if () {...}  for(){...}   

# Vue模板语法

```html
<div id="root">
    <h1>helloworld,{{name}}</h1>
    <div>
        <h1>插值语法</h1>
        <h2>{{gumisa.age}}</h2>
        <h2>{{gumisa.sex}}</h2>
        <h1>指令语法</h1>
        <a v-bind:href="url.toUpperCase()">点我去月晕的博客</a>
        <!-- v-bind作用 将标签属性改成js表达式  v-bind:=====>: -->
        <a :href="gumisa.url"></a>
    </div>
</div>
<script>
    new Vue({
        el: '#root',
        data: {
            name:  'vue',
            url: 'https://blog.apprehen.space/',
            gumisa: {
                age: 18,
                sex: '♀',
                url:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fbaike.baidu.com%2Ftashuo%2Fbrowse%2Fcontent%3Fid%3Df24f0a8054a35a347f0c089c&psig=AOvVaw0HW4oaUzGDeJMMHRz42zpZ&ust=1677555645426000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCIjg5vTjtP0CFQAAAAAdAAAAABAE'
            }
        }
    })
</script>
```

Vue模板语法有两大类:

1.插值语法:

​	功能:用于解析标签体内容。

​	写法:{{xxx}},xxx是js表达式,且可以直接读取到data中的所有属性。

2.指令语法:

​	功能:用于解析标签(包括:标签属性，标签体内容，绑定事件......)。

​    举例:v-bind:href='xxx' 或 简写为 :href="xxx",xxx同样要写js表达式且可以直接读取到data中的所有属性。

​    备注:Vue中有很多的指令，且形式都是：v-???，此处我们只是拿v-bind举个例子

# Vue数据绑定

```html
<div id="root">
    <!-- 普通写法 -->
    <!-- 单向数据绑定：<input type="text" v-bind:value="name"><br>
双向数据绑定：<input type="text" v-model:value="name"><br> -->
    <!-- 简写 -->
    单向数据绑定：<input type="text" :value="name"><br>
    双向数据绑定：<input type="text" v-model="name"><br>
</div>
```

Vue中有两种数据绑定的方式:
	1.单向绑定(v-bind):  数据只能从data流向页面
	2.双向绑定(v-model):  数据不仅能从data流向页面，还可以从页面流向data
	备注：
		1.双向绑定一般都应用在表单类元素上(如：input,select等)
  	  2.v-model:value 可以简写为 v-model，因此v-model默认收集的就是value值

# Vue中的el和data的写法

```html
  <div id="root">
    {{name}}
  </div>
  <script>
    const vm = new Vue({
      el: '#root',
      data () {
        return {
          name: 'test'
        }
      }
    })
  </script>
```

data和el有两种写法
	1.el的两种写法
		(1) new Vue 时候配置el属性
		(2) 先创建Vue实例, 随后再通过vm.$mount('#root')指定el的值
	2.data的两种写法
	 （1）对象式
	 （2）函数式 (一般选择函数式)
	3.一个重要原则
		有Vue管理的函数，一定不要写箭头函数，一旦写了箭头函数，this就不再是Vue实例了

# MVVM模型

```html
  <div id="root">
    <h1>gumisa</h1>
    <h2>{{gumisa.age}}</h2>
    <h1>megumi</h1>
    <h2>{{megumi.age}}</h2>
  </div>
  <script>
    const vm = new Vue({
      el: '#root',
      data () {
        return {
          gumisa: {
            age:18,
            sex: '♀'
          },
          megumi: {
            age:19,
            sex:'♀'
          }
        }
      }
    })
  </script>
```

MVVM模型
	1.M：模型(Model)：deta中的数据
	2.V：视图(View)：模板代码
	3.VM：视图模型(ViewModel)：Vue实例

>1.data中的所有属性,最后都出现在了vm身上.
>
>2.vm身上所有的属性 及 Vue原型上所有属性，在Vue模板中都可以直接使用。

# Vue中的数据代理

数据代理：通过一个对象对另外一个对象的操作(读/写)

```html
<script>
    let obj = {
        x:100
    }
	let obj2 = {
        y:200
    }
    Object.defineProperty(obj2,'x',{
        get () {
			return obj.x
        }
        set (value) {
        	obj.x = value
    	}
    })
</script>
```

1.Vue中的数据代理：
	通过vm对象来代理data对象中的属性的操作(读/写)
2.Vue中数据代理的好处:
	更方便的操作data中的数据
3.基本原理:
	通过object.defineProperty()把data对象中的所有属性添加到vm上
	为每一个vm添加的属性，都指定一个getter/setter
	在getter/setter 内部去操作(读/写)data中对应的属性

```html
<div id="root">
    <h1>名称:{{name}}</h1>
    <h1>年龄:{{age}}</h1>
</div>
const vm = new Vue({
	el: '#root',
	data: {
		name: 'gumisa',
		age: 18
	}
})
```

# Vue中的事件代理

```html
  <div id="root">
    <h1>{{name}}</h1>
    <button @click="showinfo">点我提示信息(不传参)</button>
    <button @click="showinfo2($event,18)">点我提示信息(传参)</button>
  </div>
<script>
  const vm = new Vue({
    el: '#root',
    data () {
      return {
        name: 'gumisa'
      }
    },
    methods: {
      showinfo () {
        alert(this.name)
      },
      showinfo2 (event,age) {
        console.log(event,age)
      }
    }
  })
</script>
```

事件的基本使用：
	1.使用v-on:xxx 或 @xxx 绑定事件, 其中xxx是事件名
	2.事件的回调需要配置在methods对象中,最终会在vm上
	3.methods中配置的函数，不要使用箭头函数,否则this不将是vm
	4.methods中配置的函数，都是被vue管理的函数，this的指向是vm 或 组件实例对象
	5.@click = "test" 和 @click="test($event)" 效果一致,但后者可以传参
Vue中的事件修饰符
	1.prevent：阻止默认事件(常用)
	2.stop：阻止事件冒泡(常用)
	3.once：事件只触发一次(常用)
	4.capture：使用事件的捕获模式
	5.self：只有event.target是当前操作的元素时才触发事件
	6.passive：事件的默认行为立即执行，无需等待事件回调执行完毕
1.Vue中常见的按键
	  回车==> enter
	  删除==> delete (捕获"删除"和"退格"键)
      退出==> esc
	  空格==> space
      换行==> tab (特殊：必须配合keydown去使用)
	  上  ==> up
      下  ==> down
      左  ==> left
      右  ==> right
2.Vue未提供别名的按键，可以使用按键原始的key值去绑定，但注意要转为kebab-case(短横线命名)
3.系统修饰键(用法特殊)：ctrl,alt,shift,meta
	(1).配合keyup使用：按下修饰键的同时，再按下其他键，随后释放其他键，事情才会被触发
	(2).配合keydown使用：正常触发事件
4.也可以使用keyCode去指定具体的按键(不推荐)
5.Vue.config.keyCodes.自定义键名 = 键码，可以去定制按键别名

# Vue中的计算属性

插值语法实现

```html
    <div id="root">
        姓：<input type="text" v-model="firstname"><br>
        名：<input type="text" v-model="lastname"><br>
        全名：<span>{{firstname}}-{{lastname}}</span>
    </div>
</body>
<script>
    const vm = new Vue({
        el: '#root',
        data: {
            firstname: '张',
            lastname: '三'
        },
    })
</script>
```

methods实现

```html
    <div id="root">
        姓：<input type="text" v-model="firstname"><br>
        名：<input type="text" v-model="lastname"><br>
        全名：<span>{{fullname()}}</span>
    </div>
</body>
<script>
    const vm = new Vue({
        el: '#root',
        data: {
            firstname: '张',
            lastname: '三'
        },
        methods: {
            fullname() {
                return this.firstname + '-' + this.lastname
            }
        }
    })
</script>
```

计算属性

```html
<div id="root">
    姓：<input type="text" v-model="firstname"><br>
    名：<input type="text" v-model="lastname"><br>
    全名：<span>{{fullname}}</span><br>
    全名：<span>{{fullname}}</span><br>
    全名：<span>{{fullname}}</span><br>
    全名：<span>{{fullname}}</span><br>
    全名：<span>{{fullname}}</span>
</div>
<script>
    const vm = new Vue({
        el: '#root',
        data: {
            firstname: '张',
            lastname: '三'
        },
        computed: {
            fullname: {
                //get有什么作用？当有人读取fullName时，get就会被调用，且返回值就作为fullName的值
                //get什么时候调用？1.初次读取fullName时.2.所依赖的数据发生改变时
                get() {
                    console.log('get被调用了')
                    //console.log(this) //此处的this是vm
                    return this.firstname + '-' + this.lastname
                },
                //get什么时候调用？当fullName被修改时.
                set(value) {
                    console.log('set', value)
                    const arr = value.split('-')
                    this.firstname = arr[0]
                    this.lastname = arr[1]
                }
            }
        }
    })
</script>
```

计算属性：
	1.定义：要用的属性不存在，要通过已有属性计算来。
	2.原理：底层借助了Object.defineproperty方法提供的getter和setter
	3.get函数什么时候执行？
		(1).初次读取时执行一次
		(2).当依赖的数据发生改变时会被再次调用
	4.优势：与methods实现相比，内部有缓存机制(复用),效率更高，调试方便
	5.备注：
		1.计算属性最终会出现在vm上，直接读取使用即可。
		2.如果计算属性要被修改，那必须写set函数去响应修改，且set中要引起计算时依赖的数据发生
简写：

```html
computed: {
    //完整写法
    /*fullname: {
    get() {
    console.log('get被调用了')
    return this.firstname + '-' + this.lastname
    },
    set(value) {
    console.log('set', value)
    const arr = value.split('-')
    this.firstname = arr[0]
    this.lastname = arr[1]
    }
    }*/
    //简写
    fullname() {
    console.log('get被调用')
    return this.firstname + '-' + this.lastname
    }
}
```

# Vue监视属性

普通实现

```html
<div id="root">
    <h2>今天天气很{{info}}</h2>
    <button @click="changeWeather">切换天气</button>
</div>
<script>
    Vue.config.productionTip = false
    const vm = new Vue({
        el: "#root",
        data: {
            isHot: true
        },
        computed: {
            info() {
                return this.isHot ? '炎热' : '凉爽'
            }
        },
        methods: {
            changeWeather() {
                this.isHot = !this.isHot
            }
        },
    })
</script>
```

使用watch实现

```html
<div id="root">
    <h2>今天天气很{{info}}</h2>
    <button @click="changeWeather">切换天气</button>
</div>
<script>
    Vue.config.productionTip = false
    const vm = new Vue({
        el: "#root",
        data: {
            isHot: true
        },
        computed: {
            info() {
                return this.isHot ? '炎热' : '凉爽'
            }
        },
        methods: {
            changeWeather() {
                this.isHot = !this.isHot
            }
        },
        /*watch: {
            isHot: {
                immediate:true,//初始化时让handler调用一下
                //handler什么时候调用，当isHot发生改变时
                handler(newValue, oldValue) {
                    console.log('isHot的值被修改了', newValue, oldValue)
                }
            },
        },*/
    })

    vm.$watch('isHot', {
        immediate: true,//初始化时让handler调用一下
        //handler什么时候调用，当isHot发生改变时
        handler(newValue, oldValue) {
            console.log('isHot的值被修改了', newValue, oldValue)
        }
    })
</script>
```

监视属性watch
	1.当被监视的属性变化时，回调函数自动调用，进行相关操作
	2.监视的属性必须存在，才能进行监视
	3.监视的两种方法
		(1): new Vue时传入watch配置
		(2): 通过vm.$watch监视

深度监视

```html
<div id="root">
    <h2>今天天气很{{info}}</h2>
    <button @click="changeWeather">切换天气</button>
    <hr>
    <h3>a的值是{{numbers.a}}</h3>
    <button @click="numbers.a++">点我让a+1</button>
    <h3>b的值是{{numbers.b}}</h3>
    <button @click="numbers.b++">点我让b+1</button>
</div>
<script>
    Vue.config.productionTip = false
    const vm = new Vue({
        el: "#root",
        data: {
            isHot: true,
            numbers: {
                a: 1,
                b: 2,
            }
        },
        computed: {
            info() {
                return this.isHot ? '炎热' : '凉爽'
            }
        },
        methods: {
            changeWeather() {
                this.isHot = !this.isHot
            }
        },
        watch: {
            isHot: {
                //immediate:true,//初始化时让handler调用一下
                //handler什么时候调用，当isHot发生改变时
                handler(newValue, oldValue) {
                    console.log('isHot的值被修改了', newValue, oldValue)
                }
            },
            //监视多级结构中某个属性的变化
            'numbers.a': {
                handler() {
                    console.log('a被改变了捏')
                }
            },
            //监视多级结构中所有属性的变化
            numbers: {
                deep: true,
                handler() {
                    console.log('numbers改变了')
                }
            }
        },
    })
</script>
```

深度监视：
 	1) Vue中的watch默认不监测对象内部值的改变(一层)
 	2) 配置`deep:true` 可以监测对象内部值改变(多层)

备注：
	1.Vue自身可以监测对象内部值的改变,但默认不可以
	2.使用watch时根据数据的具体结构，决定是否采用深度监视

监视属性简写

```html
<div id="root">
    <h2>今天天气很{{info}}</h2>
    <button @click="changeWeather">切换天气</button>
</div>
<script>
    Vue.config.productionTip = false
    const vm = new Vue({
        el: "#root",
        data: {
            isHot: true,
        },
        computed: {
            info() {
                return this.isHot ? '炎热' : '凉爽'
            }
        },
        methods: {
            changeWeather() {
                this.isHot = !this.isHot
            }
        },
        watch: {
            //正常写法
            /*isHot: {
                // deep:true,//深度监视
                // immediate:true,//初始化时让handler调用一下
                //handler什么时候调用，当isHot发生改变时
                handler(newValue, oldValue) {
                    console.log('isHot的值被修改了', newValue, oldValue)
                }
            },*/
            //简写
            /*isHot(newValue, oldValue) {
                console.log('isHot的值被修改了', newValue, oldValue)
            }*/
        },
    })
</script>
```

computed和watch之间的区别：
	1.computed能完成的功能，watch都可以完成
	2.watch能完成的功能，computed不一定能完成，例如：watch可以进行异步操作。
 两个重要的小原则：
	1.所被Vue管理的函数，最好写成普通函数，这this的指向才是vm 或者 组件实例对象
	2.所有不被Vue所管理的函数(定时器的回调函数，ajax的回调函数等，promise的回调函数)，最好写成箭头函数.这样this的指向才是vm或组件实例对象

# Vue样式绑定

```html
    <div id="root">
        <!-- 绑定class样式--字符串写法，使用于：样式的类名不确定，需要动态指定 -->
        <div class="basic" :class="mood" @click="changeMood">{{name}}</div><br>
        <!-- 绑定class样式--数组写法，适用于：要绑定的样式个数不确定，名字也不确定 -->
        <div class="basic" :class="classArr">{{name}}</div>
        <!-- 绑定class样式--对象写法，适用于：要绑定的样式个数确定，名字也确定，但要动态决定用不用 -->
        <div class="basic" :class="classObj">{{name}}</div>
        <!-- 绑定style样式--对象写法 -->
        <div class="basic" :style="styleObj">{{name}}</div>
        <!-- 绑定style样式--数组写法 -->
        <div class="basic" :style="styleArr">{{name}}</div>
    </div>
<script>
    new Vue({
        el: '#root',
        data: {
            name: 'Explosion！！',
            mood: 'normal',
            classArr: ['atguigu1', 'atguigu2', 'atguigu3'],
            classObj: {
                atguigu1: false
            },
            styleObj: {
                fontSize: '40px',
                color: 'red',
                //backgroundColor: 'grey'
            },
            styleObj2: {
                backgroundColor: 'grey'
            },
            styleArr: [
                {
                    fontSize: '40px',
                    color: 'red',
                    //backgroundColor: 'grey'
                },
                {
                    backgroundColor: 'grey'
                },
            ]
        },

        methods: {
            changeMood() {
                //实现随机获取
                const arr = ['happy', 'sad', 'normal']
                const index = Math.floor(Math.random() * 3)
                this.mood = arr[index]
            }
        }
    })
</script>
```

绑定样式：
	1.class样式
		写法：class="xxx" xxx可以是字符串，对象，数组。
			字符串写法适用于：类名不确定，要动态获取。
			对象写法适用于：要绑定多个样式，个数不确定，名字也不确定。
			数组写法适用于：要绑定多个样式，个数确定，名字也确定，但不确定用不用。
	2.style样式
		:style="{fontSize:xxx}"其中xxx是动态值。
		:style="[a,b]"其中a，b是样式对象

# Vue条件渲染

```html
<div id="root">
    <h2>当前n的值是:{{n}}</h2>
    <button @click="n++">点我n+1</button>
    <!-- 使用v-show做条件渲染-->
    <!-- <h2 v-show="false">欢迎来到{{name}}学习</h2> -->
    <!-- <h2 v-show="1===1">欢迎来到{{name}}学习</h2> -->
    <!-- 使用V-if做条件渲染 -->
    <!-- <h2 v-if="false">欢迎来到{{name}}学习</h2> -->
    <!-- <h2 v-if="1===1">欢迎来到{{name}}学习</h2> -->
    <!-- v-else和v-else-if -->
    <!-- <div v-if="n===1">Angular</div>
    <div v-else-if="n===2">React</div>
    <div v-else-if="n===3">Vue</div>
    <div v-else>哈哈</div> -->
    <template v-if="n===1">
        <h2>你好</h2>
        <h2>gumisa</h2>
        <h2>toko</h2>
    </template>
</div>
<script>
    const vm = new Vue({
        el: '#root',
        data: {
            name: '尚硅谷',
            n: 0,
        }
    })
</script>
```

条件渲染:

1.v-if

  	写法：

​          (1).v-if="表达式"

​          (2).v-else-if="表达式"

​          (3).v-else="表达式"

​        适用于：切换频率较低的场景。

​        特点：不展示的DOM元素直接被移除。

​        注意：v-if可以和:v-else-if,v-else一起使用，但要求结构不能被"打断"

2.v-show

​          写法：v-show="表达式"

​          适用于：切换频率较高的场景

​          特点：不展示的DOM元素未被移除，仅仅是使用样式隐藏掉

3.备注：使用v-if的时，元素可能无法直接获取到，而使用v-show一定可以获取到		

# Vue渲染列表

