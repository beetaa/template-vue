// 告诉 TypeScript *.vue 后缀的文件可以交给 vue 模块来处理
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

// 让 webpack 认识和处理 .less 文件
declare module "*.less" {
  const content: any;
  export default content;
}