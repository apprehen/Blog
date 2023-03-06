---
title: Vue2~Vue3
description: 一款简单的前端框架
categories: 技术
tags: 前端框架
cover: >-
  https://cdn.staticaly.com/gh/apprehen/pciture@master/6A5D0E39BB880E70137F03011E597BBF.2uhydryacw40.webp
abbrlink: ce292cdd
date: 2023-02-27 09:28:53
---
# Vue认识

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

​	写法:`{{xxx}}`,xxx是js表达式,且可以直接读取到data中的所有属性。

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
		写法：`class="xxx"` xxx可以是字符串，对象，数组。
			字符串写法适用于：类名不确定，要动态获取。
			对象写法适用于：要绑定多个样式，个数不确定，名字也不确定。
			数组写法适用于：要绑定多个样式，个数确定，名字也确定，但不确定用不用。
	2.style样式
		`:style="{fontSize:xxx}"`其中xxx是动态值。
		`:style="[a,b]"`其中a，b是样式对象

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

基本原理

```html
<div id="root">
    <!-- 遍历数组 -->
    <h2>人员列表(遍历数组)</h2>
    <ul>
        <li v-for="(p,index) of persons" :key="index">
            {{p.id}}--{{p.name}}--{{p.age}}
        </li>
    </ul>
</div>
<script>
    const vm = new Vue({
        el: '#root',
        data: {
            persons: [
                { id: '001', name: '张三', age: '18' },
                { id: '002', name: '李四', age: '19' },
                { id: '003', name: '王五', age: '20' }
            ]
        }
    })
</script>
```

v-for 指令：
	1.用于展示列表数据
	2.语法: `v-for = "(item, index) in xxx"  :key = "yyy"`
	3.可遍历：数组，对象，字符串，指定的次数

渲染列表中key的作用:

```html
<div id="root">
    <!-- 遍历数组 -->
    <h2>人员列表(遍历数组)</h2>
    <button @click.once="add">添加一个老刘</button>
    <ul>
        <li v-for="(p,index) of persons" :key="p.id">
            {{p.name}}--{{p.age}}
            <input type="text">
        </li>
    </ul>
</div>
<script>
    const vm = new Vue({
        el: '#root',
        data: {
            persons: [
                { id: '001', name: '张三', age: '18' },
                { id: '002', name: '李四', age: '19' },
                { id: '003', name: '王五', age: '20' }
            ],
        },
        methods: {
            add() {
                const p = { id: '004', name: '老刘', age: '40' }
                this.persons.unshift(p)
            }
        },
    })
</script>
```

key的作用:
1.虚拟DOM中key的作用：

  key是虚拟DOM对象的标识，当状态中的数据发生变化时，Vue会根据【新数据】生成【新的虚拟DOM】，

  随后Vue进行【新虚拟DOM】与【旧虚拟DOM】的差异比较，比较规则如下：

2.对比规则：

  (1).旧虚拟DOM中找到了与新虚拟DOM相同的key：

​    a.若虚拟DOM中内容没变，直接使用之前的真实DOM！

​    b.若虚拟DOM中内容变了，则生成新的真实DOM，随后替换掉页面中之前的真实DOM

  (2).旧虚拟DOM中未找到与新虚拟DOM相同的key

​    创建新的真实DOM，随后渲染到页面

3.用index作为key可能会引发的问题

  1.若对数据进行：逆序添加，逆序删除等破坏顺序操作：

​    会产生没有必要的真实DOM更新==>界面效果没问题，但效率低

  2.如果结构中还包含输入类的DOM

​    会产生错误DOM更新==>界面有问题

4.开发中任何选择key?

  1.最好使用每条数据的唯一标识作为key，比如id，手机号，身份证号，学号，等唯一值

  2.如果不存在对数据的逆序添加，逆序删除等破坏顺序操作，仅用于渲染列表用于展示

​    使用index作为key是没有问题的

列表过滤

```html
<div id="root">
    <h2>人员列表</h2>
    <input type="text" placeholder="请输入名字" v-model="keyWords">
    <ul>
        <li v-for="(p,index) of filpersons" :key="index">
            {{p.name}}--{{p.age}}--{{p.sex}}
        </li>
    </ul>
</div>
<script>
    //watch实现
    //#region
    /*const vm = new Vue({
        el: '#root',
        data: {
            persons: [
                { id: '001', name: '马冬梅', age: '18', sex: '女' },
                { id: '002', name: '周冬雨', age: '19', sex: '女' },
                { id: '003', name: '周杰伦', age: '20', sex: '男' },
                { id: '004', name: '温兆伦', age: '22', sex: '男' },
            ],
            keyWords: '',
            filpersons: [],
        },
        watch: {
            keyWords: {
                immediate: true,
                handler(val) {
                    //过滤数组
                    this.filpersons = this.persons.filter((p) => {
                        return p.name.indexOf(val) !== -1
                    })
                }
            }
        }
    })*/
    //#endregion

    //用computed实现
    const vm = new Vue({
        el: '#root',
        data: {
            persons: [
                { id: '001', name: '马冬梅', age: '18', sex: '女' },
                { id: '002', name: '周冬雨', age: '19', sex: '女' },
                { id: '003', name: '周杰伦', age: '20', sex: '男' },
                { id: '004', name: '温兆伦', age: '22', sex: '男' },
            ],
            keyWords: '',
        },
        computed: {
            filpersons() {
                return this.persons.filter((p) => {
                    return p.name.indexOf(this.keyWords) !== -1
                })
            }
        }
    })
</script>
```

列表排序

```html
<div id="root">
    <h2>人员列表</h2>
    <input type="text" placeholder="请输入名字" v-model="keyWords">
    <button @click="sortType=2">年龄升序</button>
    <button @click="sortType=1">年龄降序</button>
    <button @click="sortType=0">原顺序</button>
    <ul>
        <li v-for="(p,index) of filpersons" :key="index">
            {{p.name}}--{{p.age}}--{{p.sex}}
        </li>
    </ul>
</div>
<script>
    const vm = new Vue({
        el: '#root',
        data: {
            persons: [
                { id: '001', name: '马冬梅', age: '30', sex: '女' },
                { id: '002', name: '周冬雨', age: '31', sex: '女' },
                { id: '003', name: '周杰伦', age: '20', sex: '男' },
                { id: '004', name: '温兆伦', age: '22', sex: '男' },
            ],
            keyWords: '',
            sortType: 0,//0代表原顺序，1降序，2升序
        },
        computed: {
            filpersons() {
                const arr = this.persons.filter((p) => {
                    return p.name.indexOf(this.keyWords) !== -1
                })
                //判断
                if (this.sortType) {
                    arr.sort((a, b) => {
                        return this.sortType === 1 ? b.age - a.age : a.age - b.age
                    })
                }
                return arr
            }
        }
    })
</script>
```

Vue监测数据：

```html
<div id="root">
    <h1>学生信息</h1>
    <button @click="student.age++">年龄＋1岁</button><br>
    <button @click="addSex">添加一个性别属性，默认值：男</button><br>
    <button @click="student.sex= '你说捏' ">修改性别</button><br>
    <button @click="addFriend">在列表首位添加一个朋友</button><br>
    <button @click="updateFirstFriend">修改第一个朋友的名字为:张三</button><br>
    <button @click="addHobby">添加一个爱好</button><br>
    <button @click="updateHobby">修改第一个爱好为:开车</button><br>
    <button @click="removeSmoke">过滤掉爱好中的抽烟</button>
    <h3>姓名：{{student.name}}</h3>
    <h3>年龄：{{student.age}}</h3>
    <h3 v-if="student.sex">性别：{{student.sex}}</h3>
    <h3>爱好：</h3>
    <ul>
        <li v-for="(h,index) in student.hobby" :key="index">
            {{h}}
        </li>
    </ul>
    <h3>朋友们：</h3>
    <ul>
        <li v-for="(f,index) in student.friends" :key=""index>
            {{f.name}}--{{f.age}}
        </li>
    </ul>
</div>
<script>
		const vm = new Vue({
			el:'#root',
			data:{
				student:{
					name:'tony',
					age:'18',
					hobby:['抽烟','喝酒','烫头'],
					friends:[
						{name:'Tom',age:35},
						{name:'jerry',age:36}
					]
				}
			},
			methods:{
				addSex(){
					Vue.set(this.student,'sex','男')
				},
				addFriend(){
					this.student.friends.unshift({name:'jack',age:70})
				},
				updateFirstFriend(){
					this.student.friends[0].name='张三'
				},
				addHobby(){
					this.student.hobby.push('学习')
				},
				updateHobby(){
					//this.student.hobby.splice(0,1,'开车')
					// Vue.set(this.student.hobby,0,'开车')
					this.$set(this.student.hobby,0,'开车')
				},
				removeSmoke(){
					this.student.hobby=this.student.hobby.filter((h) => {
						return h !== '抽烟'
					})
				}
			}
		})
</script>
```

Vue监视数据的原理:

 1.Vue会监视data中所有层次的数据。



 2.如何监测对象中的数据？

   通过setter实现监视，且要在new Vue时就传入要监测的数据。

​    (1).对象中后追加的属性，Vue默认不做响应式处理

​    (2).如需给后添加的属性做响应式，请使用如下API

​       `Vue.set(target,propertyName/index,value)`或

​       `vm.$set(target,propertyName/index,value)`

 

 3.如何监测数组中的数据？

   通过包裹数组跟新元素的方法实现，本质就是做了两件事:

​    (1).调用原生对应的方法对数组进行更新

​    (2).重新解析模板，进而更新页面



 4.在Vue修改数组中的某个元素一定要用如下方法:

   (1).使用这些API: push(),pop(),shift(),unshift(),splice(),sort(),reverse()

   (2).Vue.set() 或 vm.$set()

> 特别注意：Vue.set() 和 vm.$set() 不能给vm 或 vm的根数据对象 添加属性!!!

# Vue收集表单数据

```html
<div id="root">
    <form @click.prevent="Demo">
        账号：<input type="text" v-model="userInfo.account" value="male"><br><br>
        密码：<input type="password" v-model="userInfo.password" value="female"><br><br>
        性别：
        男<input type="radio" v-model="userInfo.sex" value="male" name="sex">
        女<input type="radio" v-model="userInfo.sex" value="female" name="sex"><br><br>
        爱好：
        学习<input type="checkbox" v-model="userInfo.hobby" value="study">
        打游戏<input type="checkbox" v-model="userInfo.hobby" value="game">
        吃饭<input type="checkbox" v-model="userInfo.hobby" value="eat"><br><br>
        所属校区
        <select v-model="userInfo.city">
            <option value="">请选择校区</option>
            <option value="beijing">北京</option>
            <option value="shanghai">上海</option>
            <option value="shenzhen">深圳</option>
            <option value="wuhan">武汉</option>
        </select>
        <br><br>
        其他信息
        <textarea cols="30" rows="10" v-model="userInfo.other"></textarea>
        <br><br>
        <input type="checkbox" v-model="userInfo.agree">阅读并接受<a href="http://www.atguigu.com">《用户协议》</a><br><br>
        <button>提交</button>
    </form>
</div>
<script>
    Vue.config.productionTip=false
    const vm= new Vue({
      el:'#root',
      data:{
        userInfo:{
          account:'',
          password:'',
          sex:'female',
          hobby:[],
          city:'beijing',
          other:'',
          agree:''
        }
      },
      methods:{
        Demo(){
          console.log(JSON.stringify(this.userInfo))
        }
      }
    })
</script>
```

收集表单数据：

 若：`<input type="text"/>`,则v-model收集的是value值，用户输入的就是value值。

 若：`<input type="radio"/>`,则v-model收集的是value值，且要给标签配置value的值。

 若：`<input type="checkbox"/>`

   1.没有配置input的value属性，那么收集的就是checked(勾选 or 未勾选，是布尔值)

   2.配置input的value属性：

​     (1)v-model的初始值是非数组，那么收集的就是checked(勾选 or 未勾选，是布尔值)

​     (2)v-model的初始值是数组，那么收集的就是value组成的数组

 备注：v-model的三个修饰符：

​     lazy：失去焦点在收集数据

​     number：输入字符串转为有效数字

​     trim：输入首尾空格过滤

# Vue过滤器

```html
<div id="root">
    <h2>显示格式化后的时间</h2>
    <!-- 计算属性实现 -->
    <h3>现在是:{{fmtTime}}</h3>
    <!-- methods实现 -->
    <h3>现在是:{{getFmtTime()}}</h3>
    <!-- 过滤器实现 -->
    <h3>现在是:{{time | timeFormater }}</h3>
    <!-- 过滤器实现(传参) -->
    <h3>现在是:{{time | timeFormater('YYYY_MM_DD') | mySlice}}</h3>
    <h3 :x="msg | mySlice">捏捏捏</h3>
</div>
<script>
  Vue.config.productionTip=false
  //全局过滤器
  Vue.filter('mySlice',function(value){
    return value.slice(0,4)
  })
  const vm = new Vue({
    el:'#root',
    data:{
      time:1648366720578,//获取当前的时间戳
      msg:'你好捏捏捏捏'
    },
    computed:{
      fmtTime(){
        return dayjs(this.time).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    methods:{
      getFmtTime(){
        return dayjs(this.time).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    filters:{
      //局部过滤器
      timeFormater(value,str='YYYY年MM月DD日 HH:mm:ss'){
        return dayjs(value).format(str)
      },
      mySlice(value){
        return value.slice(0,4)
      }
    }
  })
</script>
```

过滤器：

 定义：对要显示的数据进行特定格式化后再显示(适用于一些简单逻辑的处理)。

 语法：

   1.注册过滤器：Vue.filter(name,callback) 或 new Vue{filters"{}}

   2.使用过滤器：`{{ xxx | 过滤器名}}  或  v-bind:属性 = "xx | 过滤器名"`

 备注：

   1.过滤器也可以接收额外参数，多个过滤器也可以串联

   2.并没有改变原本的数据，是产生新的对应的数据

# Vue指令

> 内置指令我们学过的指令： v-bind   : 单向绑定解析表达式，可简写为 :xxx
>
>   v-model  : 双向数据绑定
>
>   v-for   : 遍历数组/对象/字符串
>
>   v-on    : 绑定事件监听，可简写为@
>
>   v-if    : 条件渲染(动态控制节点是否存存在)
>
>   v-else   : 条件渲染(动态控制节点是否存存在)
>
>   v-show   : 条件渲染(动态控制节点是否展示)
>
>  v-text指令：
>
>    1.作用：向其所在的节点中渲染文本内容。
>
>    2.与插值语法的区别：v-text会替换掉节点中的内容，`{{xx}}`则不会
>
> v-html指令：
>
>  1.作用：向指定节点中渲染包含html结构的内容
>
>  2.与插值语法的区别：
>
>    (1).v-html会替换掉节点中所有的内容，`{{}}`则不会
>
>    (2).v-html可以识别html结构
>
>  3.严重注意：v-html有安全性问题！！！
>
>    (1).在网站上动态渲染任意HTML是非常危险的，容易导致XSS攻击
>
>    (2).一定要在可信的内容上使用v-html，永不要用在用户提交的内容上
>
> v-cloak指令(没有值):
>
>   1.本质是一个特殊属性，vue实例创建完毕并接管容器后，会删掉v-cloak属性。
>
>   2.使用css配合v-cloak可以解决网速慢时页面展出`{{xxx}}`的问题
>
> v-once指令：
>
>    1.v-once所在节点在初次动态渲染后，就视为静态内容了。
>
>    2.以后数据的改变不会引起v-once所在结构的更新，可以用于优化性能
>
> v-pre指令：
>
>   1.跳过其所在节点的编译过程。
>
>   2.可利用它跳过：没有使用指令语法，没有使用插值语法的节点，会加快编译

自定义指令

```html
<div id="root">
    <h2>{{name}}</h2>
    <h2>当前的n值是:<span v-text="n"></span></h2>
    <!-- <h2>当放大十倍后的n值是:<span v-big="n"></span></h2> -->
    <h2>当放大十倍后的n值是:<span v-big-number="n"></span></h2>
    <button @click="n++">点我n+1</button>
    <hr>
    <input type="text" v-fbind:value="n" >
</div>
<script>
  new Vue({
    el:'#root',
    data:{
      name:'gumisa',
      n:1,
    },
    directives:{
      //big函数何时会被调用？ 1.指令与元素成功绑定时(一上来).2.指令所在的模板被重新解析时.
      // big(element,binding){
      //   // console.log('big')，简写属性其中只包括了 bind 和 update
      //   element.innerText = binding.value * 10         
      // },
      'big-number'(element,binding){
        // console.log('big')，简写属性其中只包括了 bind 和 update
        element.innerText = binding.value * 10         
      },
      fbind:{
        //指令与元素成功绑定时(一上来)
        bind(element,binding){
          element.value = binding.value
        },
        //指令所在元素被插入页面时
        inserted(element,binding){
          element.focus()
        },
        //指令所在的模板被重新解析
        update(element,binding){
          element.value = binding.value
        }
      }
    }
  })
</script>
```

需求1：定义一个v-big指令，和v-text功能类似，但会把绑定的数值放大十倍。

需求2：定义一个v-fbind指令，和v-bind功能类似，但可以让其所绑定的input元素默认获取焦点

自定义指令总结:

 一，定义语法：

​    1.局部指令:

```js
new Vue({              new Vue({

	directives:{指令名:配置对象} 或      directives{指令名:回调函数}

})                  })
```

​    2.全局指令:

​       Vue.directive(指令名,配置对象) 或 Vue.directive(指令名,回调函数)

 二，配置对象中常用的3个回调：

​    1.bind:  指令与元素成功绑定时调用

​    2.inserted:  指令所在元素被插入页面时调用

​    3.updata   指令所在模板结构被重新解析时调用

 三，备注：

​    1.指令定义时不加V-，但使用时要加v-；

​    2.指令名如果是多个单词，要使用kebab-case命名方式，不要使用camelCase命名

# Vue生命周期

生命周期：

 1.又名：生命周期回调函数，生命周期函数，生命周期钩子。

 2.是什么：Vue在关键时刻帮我们调用的一些特殊名称的函数

 3.生命周期函数的名字不可更改，但函数的具体内容是程序员根据需求编写的

 4.生命周期函数中的this指向是vm或组件实例对象

```html
<div id="root">
    <h2 :style="{opacity}">欢迎学习Vue</h2>
</div>
</body>
<script>
  Vue.config.productionTip = false
  new Vue({
    el:"#root",
    data:{
      opacity:1
    },
    methods:{

    },
    //Vue 完成模板的解析并把初始的真实的DOM元素放入页面后(完成挂载)调用mounted
    mounted(){
      setInterval(() => {
        this.opacity -= 0.01
        if(this.opacity <=0) this.opacity = 1
      },16)
    }
  })
    //通过外部的定时器去实现(不推荐)
    // setInterval(() => {
    //     vm.opacity -= 0.01
    //     if(vm.opacity <=0) vm.opacity = 1
    //   },16)
</script>
```

分析生命周期

```html
<div id="root">
    <h2>当前的n值是:{{n}}</h2>
    <button @click="add">点我n+1</button>
    <button @click="bye">点我销毁vm</button>
</div>
<script>
    new Vue({
        el:'#root',
        // template:`
        //   <div>
        //     <h2>当前的n值是:{{n}}</h2>
        //     <button @click="add">点我n+1</button>
        //   </div>
        // `,
        data:{
            n:1,
        },
        methods:{
            add(){
                console.log('add')
                this.n++
            },
            bye(){
                console.log('bye')
                this.$destroy()
            }
        },
        watch:{
            n(){
                console.log('n变了')
            }
        },
        beforeCreate(){
            console.log('beforeCreate')
            console.log(this)
        },
        created(){
            console.log('created')
            console.log(this)
        },
        beforeMount(){
            console.log('beforeMount')
            console.log(this)
        },
        mounted(){
            console.log('mounted')
            console.log(this)
        },
        beforeUpdate(){
            console.log('beforeUpdate')
        },
        updated(){
            console.log('updated')
        },
        beforeDestroy(){
            console.log("beforeDestroy")
            this.add()
        },
        destroyed(){
            console.log('destroyed')
        }
    })
</script>
```

总结常用的生命周期钩子:

 1.mounted:发送ajax请求，启动定时器，绑定自定义事件，订阅消息等【初始化操作】.

 2.beforeDestroy:清除定时器，解绑自定义事件，取消订阅消息等【收尾工作】.

关于销毁Vue实例

 1.销毁后借助Vue开发者工具看不到任何消息.

 2.销毁后自定义事件会失效，但原生DOM事件依然有效。

 3.一般不会在beforeDestroy操作数据，因为即便操作数据，也不会在触发更新流程了。

> 1.一个重要的内置关系：VueComponent.prototype.__proto__ === Vue.prototype
>
> 2.为什么要有这个关系：让组件实例对象(vc)可以访问Vue原型上的属性、方法。

# Vue的渲染函数

```js
render(createElement){ 
  return createElement('h1','你好啊')
}
render:q => q('h1','你好啊')
render:h => h(App)
```

# Vue脚手架文件结构

```powershell
|————node_modules
|————public
|    |————favicon.ico：页签图标
|    |————index.html：主页面
|
|————src
|    |————assets：存放静态资源
|    |     |——logo.png
|    |————component：存放组件
|    |     |——HelloWorld.vue
|    |————App.vue：汇总所有组件
|    |————main.js：入口文件
|————.gitignore：git版本管制忽略的配置
|————babel.config.js：babel的配置文件
|————package.json:：应用包配置文件
|————README.md：应用描述文件
|————package-lock.json：包版本控制文件
```

# Vue的ref属性

1.被用来给元素或子组件注册引用信息(id的替代者)

2.应用在html标签上获取的是真实的DOM元素，应用在组件标签上是组件实例对象(vc)

3.使用方式：

  打标识：`<h1 *ref*="xxx">.....</h1>` 或 `<School *ref*="xxx"></School>`

  获取：`this.$refs.xxx`

# Vue的配置项props

功能：让组件接收外部传过来的数据

 (1).传递数据：

​    `<Demo *name* = "xxx" />`

 (2).接收数据：

​    第一种方式(只接受):

​     `props:['name']`

​    第二种方式(限制类型):

```js
props:{

	name:Number

}
```

​    第三种方式(限制类型，限制必要性，指定默认值):

```js
props:{
	name:{
       type:String,//类型
       required:true,//必要性
       default:'老王'//默认值
   }
}
```

 备注：

> props是只读的 ,Vue底层会监测你对props的修改,如果进行了修改，就会发出警告,若业务需求确实需要修改，那么请复制props的内容到data中一份，然后去修改data中的数据

# Vue中的mixin(混入)

功能：可以把多个组件共用的配置提取成一个混入对象

使用方法：

  第一步定义混合，例如：

```js
{

    data(){....},

        methods:{...}

            ...

 }
```

  第二步使用混入，例如：

​    (1).全局混入：`Vue.mixin(xxx)`

​    (2).局部混入：`mixins:['xxx']`

# Vue插件

功能: 用于增强Vue
本质: 包含install方法的一个对象，install的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据。
定义插件：对象.install = function (Vue, options) {

```js
 //  1. 添加全局过滤器
 Vue.filter(....)
 //  2.添加全局指令
 Vue.directive(....)
 //  3.配置全局混入(合)
 Vue.mixin(...)
 //  4.添加实例方法
 Vue.prototype.$myMethod = function () {...}
 Vue.prototype.$myMethod = xxx
}
// 使用插件:Vue.use()
```

# Vue中scoped

  作用：让样式在局部生效，防止冲突。

  写法：`<style scoped>`

也可以不写scoped 让其污染全局，方便组件直接调用样式名

# WebStorage

1.储存内容大小一般支持5MB左右(不同浏览器可能不一样)

2.浏览器端通过Window.sessionStorage 和 Window.localStorage 属性来实现本地储存机制

3.相关API:

  `1.xxxxxStorage.setItem('key','value');`

​    该方法接受一个键和值作为参数，会把键值对添加到储存中，如果键名存在，则更新其对应的值

  `2.xxxxxStorage.getItem('person');`

​    该方法接受一个键名作为参数，返回键名对应的值。

  `3.xxxxxStorage.removeItem('key');`

​    该方法接受一个键名作为参数，并把该键名从存储中删掉

  `4.xxxxxStorage.clear()`

​    该方法会清空储存中的所有数据。

4.备注：

  1.SessionStorage存储的内容会随着浏览器窗口关闭而消失

  2.LocalStorage存储的内容，需要手动清除才会消失

  3.xxxxxStorage.getItem(xxx) 如果xxx对应的value获取不到，那么getItem的返回值是null

  4.JSON.parse(null)的结果依然是null

# 组件的自定义事件

1.一种组件间通信的方式，适用于：子组件=====>父组件

2.使用场景：A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件(事件的回调在A中)

3.绑定自定义事件：

  1.第一种方式，在父组件中:<Demo @*xxxx*="test"> 或<Demo *v-on*:*xxxx*="test"/>

  2.第二种方式，在父组件中:

```js
<Demo *ref* = "demo"/>

   .....

   mounted(){

    this.$refs.xxx.$on('atguigu',this.test)

   }
```

  3.若想让自定义事件只能触发一次，可以使用once修饰符，或$once方法

4.触发自定义事件：`this.$emit('atguigu'，数据)`

5.解绑自定义事件`this.$off('atguigu')`

6.组件上也可以绑定原生DOM事件，需要使用native修饰符

7.注意:通过`this.$refs.xxx.$on('atguigu',回调)`绑定自定义事件时，回调要么配置在methods中，要么用箭头函数，否则this指向会出问题

# 全局事件总线

1.一种组件间通信的方式，适用于任意组件间通信。

2.安装全局事件总线:

```js
new Vue({

   ...

   beforeCreat() {

     Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm

   },

   ....

  })
```

3.使用事件总线:

  1.接受数据:A组件想接受数据，则在A组件中给$bus绑定自定义事件，事件的回调留在A组件自身

```js
methods(){

     demo(data){....}

   }

   ....

   mounted() {

     this.$bus.$on('xxxx',this.demo)

   }
```

  2.提供数据:this.$bus.$emit('xxx',数据)

4.最好在beforeDestroy钩子中，用$off去解绑当前组件所用到的事件

# 消息订阅与发布 (pubsub)

1.一种组件间通信方式，适用于任意组件间通信。

2.使用步骤：

  1.安装pubsub: `npm i 'pubsub-js'`

  2.引入: `import pubsub from 'pubsub-js'`

  3.接受数据:A组件想接受数据,则在A组件中订阅消息,订阅的回调留在A组件自身

```js
 methods () {

     demo(data){...}

    }

    ....

    mounted () {

     this.pId = pubsub.sunscribe('xxx',this.demo)//订阅消息

   }
```

  4.提供数据:`pubsub.publish('xxx',数据)`

  5.最好在beforeDestroy钩子中，用`pubsub.unsubscribe(pId)`去取消订阅

# nextTick

1.语法:`this.$nextTick(回调函数)`

2.作用:在下次DOM更新结束后执行其指定的回调

3.什么时候用:当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行

# Vue封装的过渡和动画

1.作用:在插入，更新或移除DOM元素时，在合适的时候给元素加样式类名。

2.图示

​     Enter                 Leave

opacity:0--------->opacity:1     opacity:1--------->opacity:0

  |         |         |         |

  |         |         |         |

  |         |         |         |

 v-enter      v-enter-to     v-leave     v-leave-to

  |———————————————————|        |———————————————————|

  |——v-enter-active ——|        |——v-leave-active ——| 

3.写法:

  1.准备好样式:

​    (1).元素进入的样式:

​      a.v-enter: 进入的起点

​      b.v-enter-active: 进入过程中

​      c.v-enter-to: 进入的终点

​    (2).元素离开的样式:

​      1.v-leave:离开的起点

​      2.v-leave-active:离开过程中

​      3.v-leave-to:离开的终点

  2.使用`<transition>`包裹要过度的元素，并配置name属性:

```html
<transition *name*="hello">

    <h1 *v-show*="isShow">你好啊</h1>

</transition>
```

  3.备注:若有多个元素需要过渡，则需要使用:<transition-group> 且每个元素都要指定key值

# 插槽

1.作用:让父组件可以向子组件指定位置插入html结构，也是一种组件间通信的方式适用于父组件====>子组件

2.分类:默认插槽，具名插槽，作用域插槽

3.适用方式:
1.默认插槽:

```vue
// 父组件
<Category>
    <div>html结构1</div>
</Category>
// 子组件
<template>
  <div>
    <!-- 定义插槽 -->
    <slot>插槽默认内容...</slot>
  </div>
</template>
```

2.具名插槽

```vue
// 父组件中:
<Category>
    <template slot="center">
<div>html结构1</div>
    </template>
    <template v-slot:footer>
<div>html结构2</div>
    </template>
</Category>
// 子组件中:
<template>
<div>
    <!-- 定义插槽 -->
    <slot name="center">插槽默认内容...</slot>
    <slot name="footer">插槽默认内容...</slot>
    </div>
</template>
```

3.作用域插槽
1.理解:数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定。(games数据在Category组件中，但使用数据遍历出来的结构有App决定)

```vue
// 父组件中:
<Category>
    <template scope="scopeData">
<!-- 生成的是ul列表 -->
        <ul>
    		<li v-for="g in scopeData.games" :key="g">{{g}}</li>
        </ul>
    </template>
</Category>

<Category>
    <template slot-scope="scopeData">
        <!-- 生成的是h4标题 -->
        <h4 v-for="g in scopeData.games" :key="g">{{g}}</h4>
    </template>
</Category>
// 子组件
<template>
	<div>
    	<slot :games="games"></slot>
    </div>
</template>

<script>
    export default {
        name:'Category',
        props:['title'],
        //数据在子组件自身
        data() {
            return {
                games:['红色警戒','穿越火线','劲舞团','超级玛丽']
            }
        },
    }
</script>  
```

# Vuex

**搭建vuex环境**

```html
1.创建文件:src/store/index.js.
  <!-- 引入Vue核心库 -->
  improt Vue from 'vue'
  <!-- 引入Vuex -->
  improt Vuex from 'vuex'
  <!-- 应用Vuex插件 -->
  Vue.use(Vuex)
  <!-- 准备actions对象--响应组件中用户的动作 -->
  const actions = { }
  <!-- 准备mutations对象--修改state中的数据 -->
  const mutations = { }
  <!-- 准备state对象--保存具体的数据 -->
  const state = { }
  <!-- 创建并暴露 -->
  export default new Vuex.Store({
    actions,
    mutations,
    state
  })
```

2.在main.js中创建vm时传入store配置项

```js
 .....

 <!-- 引入store -->

 import store from './store'

 ...

 <!-- 创建vm -->

 new Vue({

  el:'#app',

  render: h => h(App),

  store,

  beforeCreate() {

  Vue.prototype.$bus = this

 },

})
```

**基本使用**
1.初始化数据，配置actions，配置mutations，操作文件store.js

```js
<!-- 引入Vue核心库 -->
improt Vue from 'vue'
<!-- 引入Vuex -->
improt Vuex from 'vuex'
<!-- 应用Vuex插件 -->
Vue.use(Vuex)
<!--  -->
const actions = { 
    <!-- 响应组件动作 -->
    jia (context,value) {
        //  console.log('actions中的jia被调用辣',miniStore,value)
        context.commit('JIA',value)
    }
}
const mutations = {
    //  执行加
    JIA(state,value){
        //  console.log('mutations的JIA被调用辣',state,value)
        state.sum += value
    }
}
<!-- 初始化数据 -->
const state = { 
    sum:0
}
<!-- 创建并暴露 -->
export default new Vuex.Store({
    actions,
    mutations,
    state
})
```

2.组件中读取vuex中的数据:`$store.state.sum`
3.组件中修改vuex中的数据:`$store.dispatch('actions中的方法名',数据)` 或 `$store.commit('mutation中的方法名',数据)`

> 备注: 若没有网络请求或其他业务逻辑,组件中也可以越过actions，即不写dispatch,直接写commit

**getters的使用**

1.概念: 当state中的数据需要经过加工后在使用时，可以使用getters加工。

2.在store.js中追加getters配置

```js
.....

const getters = {

 bigSum(state){

  return state.sum * 10

 }

}

//  创建并暴露store

export default new Vuex.store({

 ....

 getters

})
```

3.组件中读取数据: `$store.getters.bigSum`

**四个map方法的使用**

```js
1.mapState方法：用于帮助我们映射state中的数据为计算属性
  computed: {
    <!-- 借助mapState生成计算属性，sum,school,subject(对象写法) -->
    ...mapState({sum:'sum', school:'school', subject:'subject'}),
    <!-- 借助mapState生成计算属性，sum,school,subject(数组写法) -->
    ...mapState(['sum','school','subject'])
  },
2.mapGetters方法：用于帮我们映射getters中的数据为计算属性
  computed: {
  <!-- 借助mapGetters生成计算属性，bigSum(对象写法) -->
  ...mapGetters({bigSum:'bigSum'}),
  <!-- 借助mapGetters生成计算属性，bigSum(数组写法) -->
  ...mapGetters(['bigSum'])
  }
3.mapActions方法：用于帮助我们生成与actions对话的方法，即：包含$store.dispatch(xxx)的函数
  methods:{
    <!-- 靠mapActions生成:incrementOdd,incrementWait(对象形式) -->
    ...mapMutations({incrementOdd:'jiaOdd',incrementWait:'jiaWait'}),
    <!-- 靠mapMutations生成:incrementOdd,incrementWait(数组形式) -->
    ...mapMutations(['jiaOdd','jiaWait']),
} 
4.mapMutations方法：用于帮助我们生成与mutations对话的方法，即：包含$store.commit(xxx)的函数
  methods:{
    <!-- 靠mapMutations生成:increment,decrement(对象形式) -->
    ...mapMutations({increment:'JIA',decrement:'JIAN'}),
    <!-- 靠mapMutations生成:JIA,JIAN(数组形式) -->
    ...mapMutations(['JIA','JIAN']),
  }
```

> mapActions与mapMutations使用时,若有传递参数需要:在模板中绑定事件时传递好参数,否则参数是事件对象

**模块化＋命名空间**

1.目的：让代码更好维护，让多种数据分类更加明确。

2.修改store.js

```js
 const countAbout = {

  namespaced:true,//开启命名空间

  state:{x:1},

  mutations:{...},

  actions:{...},

  getters:{

   bigSum(state){

​    return state.sum * 10

   }

  }

 }

 const personAbout = {

  namespaced:true,//开启命名空间

  state:{...},

  mutations:{...},

  actions:{...}

 }

 const store = new Vuex.store({

  modules: {

   countAbout,

   personAbout

  }

 })
```

3.开启命名空间后，组件中读取state数据:

 //方式一：自己直接读取

  `this.$store.state.personAbout.list`

 //方式二：借助mapState读取,

  `...mapState('countAbout',['sum','school','subject'])`,

4.开启命名空间后，组件中读取getters数据:

 //方式一：自己直接读取

  `this.$store.getters['personAbout/firstPersonName']`

 //方式二：借助mapgetters读取

  `...mapGetters('countAbout',['bigSum'])`

5.开启命名空间后，组件中调用dispatch

 //方式一：自己直接dispatch

  `this.$store.dispatch('personAbout/addPersonWang',person)`

 //方式二：借助mapActions:

  `...mapAction('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})`

6.开启命名空间后，组件中调用commit

 //方式一：自己直接commit

  `this.$store.commit('personAbout/ADD_PERSON',person)`

 //方式二：借助mapMutations：

  `...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'}),`

# 路由

1.理解：一个路由(route)就是一组映射关系(key-value),多个路由则需要路由器(router)进行管理

2.前端路由：key是路径，value是组件。

 **一.基本使用:**
1.安装vue-router,命令：npm i vue-router

2.应用插件：Vue.use(VueRouter)

3.编写router配置项:

```js
//引入VueRouter

  import VueRouter from 'vue-router'

  //引入路由组件

  import About from '../components/About'

  import Home from '../components/Home'

  //创建router实例对象去管理一组一组的路由规则

  const router = new VueRouter({

   routes:[

    {

     path: '/About'，

     component:About

    },

    {

     path: '/home',

     component: Home

    }

   ]

  })

  //暴露router

  export default router
```

4.实现切换(active-class可配置高亮样式)
	`<router-link active-class = 'active' to = '/about'>About</router-link>`

5.指定展示位置
	`<router-view></router-view>`	

**二.几个注意点**:
1.路由组件通常存放在pages(views)文件夹，一般组件通常存在components文件夹

2.通过切换，隐藏了的路由组件，默认是被销毁掉的，需要的时候在去挂载

3.每个组件都有自己的$route属性，里面储存着自己的路由信息

4.整个应用只有一个router，可以通过组件的$router属性获取到

**三.多级路由(嵌套路由)**
1.配置路由规则，使用children配置项：

```js
routes:[
    {
        path:'/about',
        component:About
    },
    {
        path:'/home',
        component:Home,
        children:[//通过children配置子级路由
            {
                path:'news',//此处一定不要写:/news
                component:News
            },
            {
                path:'message',//此处一定不要写:/message
                component:Message
            }
        ]
    }
]
```

2.跳转(要写完整路径):
	`<router-link *to*="/home/news">News</router-link>`

**四.路由的query参数**:
	1.传递参数

```js
<!-- 跳转并携带query参数，to的字符串写法 -->
<rounter-link :to="/home/message/detail?id=666&title=你好">跳转</rounter-link>
<!-- 跳转并携带query参数，to的对象写法 -->
<rounter-link
to:{
    path:'/home/message/detail',
        query:{
            id:666,
                title:'你好捏'
        }
}
>跳转</router-link>
```

2.接受参数:

```js
$route.query.id
$route.query.title
```

**五.命名路由**:
 1.作用：可以简化路由的跳转。
 2.如何使用

 1. 给路由命名：

    ```
    {
     path:'/demo',
     component:Demo,
     children:[
        {
          path:'test',
          component:Test,
          children:[
             {
               name:'hello' //给路由命名
               path:'welcome',
               component:Hello,
              }
           ]
        }
     ]
    } 
    ```

    2.简化跳转：

    ```vue
    <!--简化前，需要写完整的路径 -->
    <router-link to="/demo/test/welcome">跳转</router-link>
    
    <!--简化后，直接通过名字跳转 -->
    <router-link :to="{name:'hello'}">跳转</router-link>
    
    <!--简化写法配合传递参数 -->
    <router-link 
                 :to="{
                      name:'hello',
                      query:{
                      id:666,
                      title:'你好'
                      }
                      }"
                 >跳转</router-link>
    ```

**六.路由的params参数**：
1.配置路由，声明接收params参数

```js
{
    path:'/home',
        component:Home,
            children:[
                {
                    path:'news',
                    component:News
                },
                {
                    component:Message,
                    children:[
                        {
                            name:'xiangqing',
                            path:'detail/:id/:title', //使用占位符声明接收params参数
                            component:Detail
                        }
                    ]
                }
            ]
}
```

2.传递参数

```js
<!-- 跳转并携带params参数，to的字符串写法 -->
<router-link :to="/home/message/detail/666/你好">跳转</router-link>

<!-- 跳转并携带params参数，to的对象写法 -->
<router-link 
:to="{
name:'xiangqing',
    params:{
        id:666,
            title:'你好'
    }
}"
>跳转</router-link>
```

>  特别注意：路由携带params参数时，若使用to的对象写法，则不能使用path配置项，必须使用name配置！

3.接收参数：
	1.$route.params.id
	2.$route.params.title

**七.路由的props配置**
作用：让路由组件更方便的收到参数

```js
{
    name:'xiangqing',
        path:'detail/:id',
            component:Detail,

                //第一种写法：props值为对象，该对象中所有的key-value的组合最终都会通过props传给Detail组件
                // props:{a:900}

                //第二种写法：props值为布尔值，布尔值为true，则把路由收到的所有params参数通过props传给Detail组件
                // props:true

                //第三种写法：props值为函数，该函数返回的对象中每一组key-value都会通过props传给Detail组件
                props(route){
                return {
                    id:route.query.id,
                    title:route.query.title
                }
            }
}
```

**八.```<router-link>```的replace属性**
1.作用：控制路由跳转时操作浏览器历史记录的模式
2.浏览器的历史记录有两种写入方式：分别为```push```和```replace```，```push```是追加历史记录，```replace```是替换当前记录。路由跳转时候默认为```push```
3.如何开启```replace```模式：```<router-link replace .......>News</router-link>```

**九.编程式路由导航**
1.作用:不借助<router-link>实现路由跳转,让路由跳转更加灵活
2.具体编码:

```js
//$router的两个API
this.$router.push({
  name:'xiangqing',
  params:{
    id:xxx,
    title:xxx
  }
})
this.$router.replace({
  name:'xiangqing',
  params:{
    id:xxx,
    title:xxx
  }
})
this.$router.forward()  //前进
this.$router.back() //后退
this.$router.go() //可前进也可后退
```

**十.缓存路由组件**
1.作用：让不展示的路由组件保持挂载，不被销毁
2.具体编码：

```js
<keep-alive include="News">
  <router-view></router-view>
</keep-alive>
```

**十一.两个新的生命周期钩子**
1.作用：路由组件所独有的两个钩子，用于捕获路由组件的激活状态
2.具体名字：
	1.activated 路由组件被激活时触发
	2.deactivated 路由组件失活时触发

**十二.路由守卫**
1.作用：对路由进行权限控制
2.分类：全局守卫，独享守卫，组件内守卫
3.全局守卫：

```js
router.beforeEach((to,from,next)=>{
  console.log('beforeEach',to,from)
  if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
    if(localStorage.getItem('school') === 'atguigu'){ //权限控制的具体规则
      next() //放行
    }else{
      alert('暂无权限查看')
      // next({name:'guanyu'})
    }
  }else{
    next() //放行
  }
})
//全局后置守卫：初始化时执行、每次路由切换后执行
router.afterEach((to,from)=>{
  console.log('afterEach',to,from)
  if(to.meta.title){ 
    document.title = to.meta.title //修改网页的title
  }else{
    document.title = 'vue_test'
  }
})
```

4.独享守卫：

```js
beforeEnter(to,from,next){
  console.log('beforeEnter',to,from)
  if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
    if(localStorage.getItem('school') === 'atguigu'){
      next()
    }else{
      alert('暂无权限查看')
      // next({name:'guanyu'})
    }
  }else{
    next()
  }
}
```

5.组件内守卫

```js
//进入守卫：通过路由规则，进入该组件时被调用
beforeRouteEnter (to, from, next) {
},  
//离开守卫：通过路由规则，离开该组件时被调用
beforeRouteLeave (to, from, next) {
}
```

**十三.路由器的两种工作模式**

1.对于一个url来说，什么是hash值？—— #及其后面的内容就是hash值
2.hash值不会包含在 HTTP 请求中，即：hash值不会带给服务器。
3.hash模式：
	1.地址中永远带着#号，不美观 。
	2.若以后将地址通过第三方手机app分享，若app校验严格，则地址会被标记为不合法。
	3.兼容性较好
4.history模式：
	1.地址干净，美观 。
	2.兼容性和hash模式相比略差。
	3.应用部署上线时需要后端人员支持，解决刷新页面服务端404的问题。





# **Vue3常用的Composition API**

**setup**

1.理解: Vue3.0中的一个新的配置项，值为函数
2.setup是所有Composition API (组合API) 的**表演舞台**
3.组件中所有的数据，方法，属性等等均配置在setup
4.setup函数的两种返回值
	1.若返回一个对象，则对象中的属性，方法，在模板中均可以直接使用
	2.若返回一个渲染函数：则可以自定义渲染内容
5.注意点
1.尽量不要与Vue2.x配置混用
	 · Vue2.X配置(data,methods,computed...) 中可以访问到setup中的属性，方法。
	 · 但在setup中不能访问到vue2.x配置（data，methods，computed...）
	 · 如果有重名，setup优先
2.setup 不能是一个async函数,因为返回值不再是return的对象，而是promise，模板看不到return对象中的属性

**ref函数**
作用：定义一个响应式的数据
语法：`const xxx = ref(initvalue)`
	· 创建一个包含响应式的应用对象 (reference对象)
	· JS中操作数据：`xxx.value`
	· 模板中读取数据：不需要.value 直接`<div>{{ xxx }} </div>`
备注:
	· 接收的数据可以是：基本类型，也可以是对象类型
	· 基本类型的数据：响应式依然是靠`Object.defineProperty()` 中的 `get` 和 `set`完成的
	· 对象数据类型：内部借用了Vue3.0中的一个新函数 -- `reactive` 函数

**reactive函数**
作用: 定义一个对象类型的响应式数据(基本数据不用,要用`ref`函数)
语法：`const 代理对象 = reactive(源对象)` 接收一个对象(或数组),返回一个代理对象(proxy对象)
reactive定义的响应式数据是深层次的
内部基于ES6的Proxy实现,通过代理对象操作源对象内部数据进行操作

**Vue3.0中的响应式原理**

Vue2.x的响应式
	实现原理
	对象类型：通过`object.defineProperty()对属性进行读取，修改进行拦截(数据劫持)`
	数组类型：通过重写更新数组的一系列方法来实现拦截(对数组的变更方法进行了包裹)

```js
Object.defineProperty(data,'count',{
    get () {}
	set () {}
})
```

存在问题:
	新增属性：删除属性，界面不会更新 （this.$set ... this.delete）
	直接通过下标修改数组，界面不会自动更新

Vue3.0的响应式
	实现原理
	通过Proxy(代理): 拦截对象中任意属性的变化，包括：属性值的读写，属性的添加，属性的删除等
	通过Reflect(反射): 对被代理对象的属性进行操作

**Vue3.0的响应式**
实现原理：
	通过Proxy(代理): 拦截对象中任意属性的变化,包括：属性值的读写,属性的添加,属性的删除等
	通过Reflect(反射)：对被代理对象的属性进行操作

```js
new Proxy(person, {
    // 拦截读取属性值
      get(target, key) {
        return Reflect.get(target, key)
      },
	// 拦截设置属性值或添加新属性
      set(target, key, val) {
        return Reflect.set(target, key, val)
      },
    // 拦截删除属性
      deleteProperty(target, key) {
        return Reflect.deleteProperty(target, key)
      }
    })
```

**reactive和ref的对比**
1.从定义数据角度对比:
	ref用来定义：基本数据类型
	reactive用来定义：对象(或数组)类型数据
	备注：ref也可以用来定义对象(或数组)数据类型，它内部会自动通过`reactive` 转为代理对象
2.从原理角度对比：
	ref通过`Object.defineProperty()`的 `get` 和 `set` 来实现响应式(数据劫持)
	reactive通过使用Proxy来实现响应式(数据劫持),并通过Reflect操作源对象内部的数据
3.从使用角度对比：
	ref定义的数据：操作数据需要`.value`,读取数据时模板中直接读取不需要`.value`
	reactive定义的数据：操作数据与读取数据：均不需要`.value`

**setup的两个注意点**
setup执行的时机
	在beforeCreate之前执行一次，this是undefined
setup的参数
	props：值为对象，包含：组件外部传递过来，且组件内部声明接收了的属性
	context：上下文对象
		attrs：值为对象，包含：组件外部传递过来，但没有在props配置中声明的属性，相当于`this.$attrs`
		slots：收到的插槽内容,相当于`this.$slots`
		emit：分发自定义事件的函数,相当于`this.$emit`

**计算属性与监视**

**1.computed函数**
	与Vue2.x中computed配置功能一致
	写法：

```js
import { reactive,computed } from 'vue'
setup () {
    ...
    // 计算属性简写
	let fullName = computed(()=>{
        return person.firstName + '-' + person.lastName
    })
    // 计算属性完整
	let fullName = computed({
        get () {
            return person.firstName + '-' + person.lastName
        }
        set (value) {
        	let names = value.split('-')
        	person.fitstName = names[0]
        	person.lastName = names[1]
    	}
    })
}
```

**2.watch函数**
	与Vue2.x中watch配置功能呢一致
	两个小坑：
	1.监视reactive定义的响应式：oldVue无法正确获取,强制开启了深度监视 (deep配置失败)
	2.监视reactive定义的响应式中某个属性时,deep配置有效

```js
// 情况一：监视ref定义的响应式数据
watch(sum, (newVal, oldVal) => {
  console.log('sum发生了变化', newVal, oldVal)
}, {immediate: true}})
// 情况二：监视多个ref定义的响应式数据
watch([sum, msg], ([newSum, newMsg], [oldSum, oldMsg]) => {
  console.log('sum和msg发生了变化', newSum, newMsg, oldSum, oldMsg)
}, {immediate: true})
/*情况三：监视reactive定义的响应式数据
	若watch监视的是reactive定义的响应式数据，则无法正确获取oldvalue
	若watch监视的是reactive定义的响应式数据，则强制开启了深度监视
*/
watch(person, (newPerson, oldPerson) => {
  console.log('person发生了变化', newPerson, oldPerson)
}, {deep: true})
// 情况四：监视reactive定义的响应式数据中的某个属性
watch(()=>person.name, (newName, oldName) => {
  console.log('person.name发生了变化', newName, oldName)
})
// 情况五：监视reactive所定义的一个响应式数据中的某些属性变化
watch([()=>{person.name}, ()=>{person.age}], ([newName, newAge], [oldName, oldAge]) => {
  console.log('person.name和person.age发生了变化', newName, newAge, oldName, oldAge)
})
// 特殊情况
watch(()=>person.job, (newJob, oldJob) => {
  console.log('person.job发生了变化', newJob, oldJob)
}, {deep:true})
```

**3.watchEffect函数**
watch的套路是：既要指明监视的属性，也要指明监视的回调
watchEffect的套路是：不用指明监视那个属性，监视的回调中用到那个属性，那么就监视那个属性
watchEffect有点像computed
	1.但computed注重的计算出来的值(回调函数的返回值)，所以必须要写返回值
	2.而watchEffect更注重的是过程(回调函数的函数体)，所以不用写返回值

```js
// watchEffect所指定的回调中用到的数据只要发生变化，则直接重新执行回调
watchEffect(()=>{
    const x1 = sum.value
	const x2 = person.age
	console.log('watchEffect配置的回调执行了')
})
```

**4.Vue3的生命周期**

Vue3.0中可以继续使用Vue2.x中的生命周期钩子，但是有两个被更名

​	1.`beforeDestory` 改名为 `beforeUnmount`
​	2.`destroyed` 改名为 `unmounted`

Vue3.0也提供了Composition API形式的生命周期钩子，与Vue2.x中钩子对应关系如下

​	1.`beforeCreate` ===> `setup()`
​	2.`created` ===> `setup()`
​	3.`beforeMount` ===> `onBeforeMount`
​	4.`mounted` ===> `onMounted`
​	5.`beforeUpdate` ===> `onBeforeUpdate`
​	6.`update` ===> `onUpdate`
​	7.`beforeUnMount` ===> `onBeforeUnmount`
​	8.`unmounted` ===> `onUnmounted` 

**自定义函数hook**

​	什么是hook？ -- 本质是一个函数，把setup函数中使用的Composition API进行了封装
​	类似于Vue2.x中的mixin
​	自定义hook的优势，复用代码，让setup中的逻辑更清楚易懂

**toRef**

​	作用：创建一个ref对象，其value值指向另一个对象中的某个属性
​	语法：`const name = toRef(person,'name')`
​	应用：要将响应式对象中的某个属性单独提供给外部使用时
​	扩展：`toRefs` 和 `toRef` 功能一致，但可以批量创建多个ref对象,语法`toRefs(person)`

**shallowReactive 和 shallowRef**

​	shallowReactive：只处理对象最外层属性的响应式(浅响应式)
​	shallowRef：只处理基本数据类型的响应式，不进行对象的响应式处理
​	什么时候使用？
​		如果有一个对象数据，结构比较深，但变化时只是外层属性变化 ===> shallowReactive
​		如果有一个对象数据，后续功能不会修改该对象中的属性，而是生新的对象来替代 ===> shallowRef

 **readonly 与 shallowReadonly**
	readonly：让一个响应式数据变为只读的(深只读)
	shallowReadonly：让一个响应式数据变为只读的(浅只读)
	应用场景：不希望数据被修改时

**toRaw 与 markRaw**
	toRaw：
		作用：将一个由 `reactive` 生成的响应式对象转为普通对象
		使用场景：用于读取响应式对象的普通对象，对这个普通对象的所有操作，不会引起页面更新
	markRaw：
		作用：标记一个对象，使其永远不会再成为响应式对象
		应用场景：
			1.有些值不应被设置为响应式的，例如复杂的第三方库
			2.当渲染具有不可变数据的大列表时，跳过响应式转换可以提高性能 
