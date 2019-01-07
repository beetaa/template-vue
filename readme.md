# 自定义 Vue 开发模板

- vue + vuex + vue-router
  - `.vue` 单文件组件支持
- typescript
  - vue, vuex, vue-router 自带声明文件，无需另外安装
  - vue-class-component
  - vue-property-decorator
- less
- 基于 webpack 的开发、编译自动化
- 基于 cdn + webpack 的发布自动化
  - 字体：本地和cdn自动转换
- 单元测试自动化
  - vue-test-utils + jest + typescript
- e2e 测试自动化
- vscode 开发配置
  - vetur 插件
  - eslint
  - prettier

**注意事项**

- import vue 组件时必须加上 `.vue` 后缀
- 要让 TypeScript 正确推断 Vue 组件选项中的类型，您需要使用 Vue.component 或 Vue.extend 定义组件：

```js
import Vue from 'vue'
const Component = Vue.extend({
  // 类型推断已启用
})

const Component = {
  // 这里不会有类型推断，
  // 因为TypeScript不能确认这是Vue组件的选项
}
```

- 引入第三方库需要声明文件

```js
declare module 'vue-awesome-swiper' {
  export const swiper: any
  export const swiperSlide: any
}

declare module 'vue-lazyload'
```

**安装依赖**

```bash
# vue
npm install vue --save
```

```bash
# webpack 基本
npm i -D webpack webpack-cli
npm i -D webpack-dev-server
npm i -D html-webpack-plugin clean-webpack-plugin

# typescript 相关
npm i -D typescript ts-loader

# less 相关
npm i -D less style-loader css-loader less-loader

# vue 相关
npm i -D vue-loader vue-template-compiler vue-style-loader

# 生产环境相关(按需安装)
npm i -D mini-css-extract-plugin

```

## Jest + TypeScript + vue-test-utils 的几个坑

**找不到 vue 文件**

```bash
TypeScript diagnostics (customize using `[jest-config].globals.ts-jest.diagnostics` option):
test/HelloWorld.spec.ts:2:21 - error TS2307: Cannot find module '../src/components/Counter.vue'.
    
2 import Counter from '../src/components/Counter.vue'
```

> 解决方法：要让 `ts-jest` 认识 `.vue` 文件，需要在 `tsconfig.json` 中包含文件类型的声明文件

```json
  //...
  
  "files": [
    "ts-shim.d.ts"
  ],
  
  //...
```

`ts-shim.d.ts` 声明文件至少包含以下内容：

```js
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
```

**Jest 不认识 import**

```bash
Jest encountered an unexpected token

...

/workspace/template-vue/src/components/Counter.vue:10
export default {
^^^^^^
```

> 解决方法：jest 不能处理非纯 js 的内容，这里的 import 是 es6 特性，需要通过 babel 或 typescript 进行解析。所以应该（1）在 vue 文件中注明 script 的类型，如 `<script lang="ts">` ，让 typescript 来编译；或者（2）配置 bable 处理 es6。

**ts-jest 编译时警告 import**

```bash
ts-jest[config] (WARN) TypeScript diagnostics (customize using `[jest-config].globals.ts-jest.diagnostics` option):
message TS151001: If you have issues related to imports, you should consider setting `esModuleInterop` to `true` in your TypeScript configuration file (usually `tsconfig.json`). See https://blogs.msdn.microsoft.com/typescript/2018/01/31/announcing-typescript-2-7/#easier-ecmascript-module-interoperability for more information.
```

> 解决问题：这只是警告，编译和测试其实是可以通过的，但为了和谐，应当按照指引配置 `tsconfig.json`

```js
...

"esModuleInterop": true,

...
```

[//]: 资源和链接

[vue 2.5 的 typescript 支持]: https://cn.vuejs.org/v2/guide/typescript.html
[vue-loader 文档]: https://vue-loader.vuejs.org/zh/
[vue test utils]: https://vue-test-utils.vuejs.org/zh/
[WebPack 4 + TypeScript 3 + Vue 2.5 + SCSS 简单环境搭建]: https://blog.csdn.net/hmxever/article/details/81635426
[Vue2.5 + Typescript 引入全面指南]: https://segmentfault.com/a/1190000011853167
[Vue2.5 + Typescript 引入全面指南 - Vuex篇]: https://segmentfault.com/a/1190000011864013
[vue + typescript 项目起手式]: https://segmentfault.com/a/1190000011744210
[vue + typescript 进阶篇]: https://segmentfault.com/a/1190000011878086
[cypress]: https://www.cypress.io/
[mocha]: https://mochajs.org/
[jest]: https://jestjs.io/docs/zh-Hans/getting-started
[理解 es7 中的 decorator]: http://taobaofed.org/blog/2015/11/16/es7-decorator/
[详解在Vue中使用TypeScript的一些思考(实践)]: https://www.jb51.net/article/143260.htm
[vue-class-component]: https://github.com/vuejs/vue-class-component
[vue-property-decorator]: https://github.com/kaorun343/vue-property-decorator
[vuex-class]: https://github.com/ktsn/vuex-class/
[vue-test-utils + typescript + jest 测试]: https://vue-test-utils.vuejs.org/zh/guides/using-with-typescript.html
[vue-test-utils + typescript + jest 范例]: https://github.com/vuejs/vue-test-utils-typescript-example
[jest + vue-test-utils 实践]: https://blog.csdn.net/duola8789/article/details/80434962
[单元测试 - 技术选型及配置]: https://blog.csdn.net/sinat_33312523/article/details/82952662
[单元测试 - jest + vue-test-utils]: https://blog.csdn.net/sinat_33312523/article/details/82966085
[单元测试 - jest mock + axios promise]: https://blog.csdn.net/sinat_33312523/article/details/82970655
[e2e 测试 - 选型和配置]: https://blog.csdn.net/sinat_33312523/article/details/82955514
[e2e 测试 - 基本使用]: https://blog.csdn.net/sinat_33312523/article/details/82968308



